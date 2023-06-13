import { useEffect, useState, useRef } from "react";
import {
  loadImageAsync,
  drawScaledImage,
  drawBlendedScaledImages,
} from "../../utils/image";
import { shuffle } from "../../utils/array";
import "./ImageFader.scss";

// NOTE: This was fun. But probably very suboptimal. Would make more sense to blend images with layers. Maybe without canvas at all and just using image elements. I did reinvent the wheel here. Also, many other transitions, like wipes, can probably be done with css masking. But anyway... MVP :)

export type ImageFaderProps = {
  images: HTMLImageElement[] | null;
  className?: string;
  fps?: number;
  transitionStep?: number; // Clamped to 0.001 - 0.999
  looping?: boolean;
  startDelay?: number;
  transitionDelay?: number;
  // Because the initial array can already be randomized, this is insinuatin randomizing on each new loop.
  reshuffle?: boolean;
  // TODO:
  // - Option to rerandomize after each pass
  // - Timeout for next image
  // - FPS
  // - Step
  // - Easing (might want a library for this though (framer-motion?))
  // - Transition style - maybe not just fade one day. Wipes, star wipes...
  // - Infinite (looping or not)
  // - Start timeout
  // Allow randomization for timeout and step.
  // Allow increasing or decreasing step over the course of a full cycle? (Easing across more than one transition)
  // Need to handle just two images. Think my logic might not?
};

export const ImageFader = (props: ImageFaderProps) => {
  const {
    images,
    className,
    fps = 60,
    startDelay = 0,
    transitionStep = 0.005,
    transitionDelay = 2000,
    looping = true,
    reshuffle = false,
  } = props;
  const canvasRef = useRef(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas: HTMLCanvasElement | null = canvasRef.current;
    // So we don't call the transition more than once
    let nextImageStartTimeout: null | number = null;

    // No point in running this with only one image. Wasteful.
    if (!images?.length || images?.length < 2) {
      return;
    }

    if (canvas) {
      // Not being used
      // const ctx = (canvas as HTMLCanvasElement).getContext("2d", { alpha: false })!;
      // @ts-expect-error
      const parent: HTMLElement = (canvas as HTMLCanvasElement).parentNode!;

      function resizeCanvas() {
        (canvas as HTMLCanvasElement).width = parent.clientWidth;
        (canvas as HTMLCanvasElement).height = parent.clientHeight;
      }

      resizeCanvas();

      // If we are randomizing, we'll be mucking with the order of the images on each pass. But we don't wan't to confuse our useEffect dependency. So we'll suffer one more array in memory. (Thankfully, unless someone is very very stupid, it's just a second array of references less than a few hundred at the absolute most. So miniscule in memory...).
      // This leaves me with a problem
      let workingImages = images;
      let currentImageIndex = 0;
      let currentImg = workingImages[currentImageIndex];
      let nextImg = workingImages[currentImageIndex + 1];

      let previousTime = 0;
      let blendRatio = 1;

      const animate = (currentTime: number) => {
        frameRef.current = requestAnimationFrame(animate);
        if (currentTime - previousTime < 1000 / fps) return;

        previousTime = currentTime;
        if (blendRatio >= 0.0) {
          drawBlendedScaledImages(canvas, nextImg, currentImg, blendRatio);
          blendRatio -= transitionStep;
        } else {
          cancelAnimationFrame(frameRef.current);
          clearTimeout(nextImageStartTimeout ?? 0);
          nextImageStartTimeout = null;
          // Now that a fade has finished, we want to change the target picture. But we also want a delay.
          // 1. Set the currentImg to the nextImg.
          // 2. Set the nextImg to the next index in images (or back to 1 if we're at the end) (This is a loop now, we'll do random later)
          currentImg = nextImg;
          let nextImageIndex = (currentImageIndex + 1) % workingImages.length;

          // We've done one loop. Time to peace out.
          if (nextImageIndex === 0) {
            if (!looping) {
              return;
            }

            if (reshuffle) {
              workingImages = shuffle(workingImages);
            }
          }

          blendRatio = 1;
          nextImg = workingImages[nextImageIndex];
          currentImageIndex = nextImageIndex;

          nextImageStartTimeout = setTimeout(() => {
            frameRef.current = requestAnimationFrame(animate);
          }, transitionDelay);
        }
      };

      const observer = new ResizeObserver(() => {
        resizeCanvas();
      });

      // Before we do anything. We want to draw the initial image to the screen so that a startDelay isn't a blank canvas (we can achieve that already by just delaying the rendering of the component itself)
      // Now, if someone resizes the screen while the animation hasn't started, well, that's a bit of a different issue...
      resizeCanvas();
      drawScaledImage(currentImg, canvas!);

      const init = async () => {
        setTimeout(() => {
          // TODO: Having issues with the observer clearing the static initial image. Moving it here fixed that but caused blitting. Need to sort out. FOr now, don't resize the page mister!
          // observer.observe(parent);
          frameRef.current = requestAnimationFrame(animate);
        }, startDelay);
      };

      init();

      return () => {
        observer?.disconnect();
        if (frameRef.current) {
          cancelAnimationFrame(frameRef.current);
        }
        nextImageStartTimeout && clearTimeout(nextImageStartTimeout);
      };
    }
  }, [canvasRef, images]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className={`fader-canvas ${className ? className : ""}`}
      ></canvas>
    </>
  );
};

export default ImageFader;
