import { useEffect, useState, useRef } from "react";
import { loadImageAsync, drawScaledImage } from "../../utils/image";
import "./ImageFader.scss";

export type ImageFaderProps = {
  srcPaths: string[];
};

export const ImageFader = (props: ImageFaderProps) => {
  const [images, setImages] = useState<HTMLImageElement[] | null>(null);
  const canvasRef = useRef(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const loadImages = async (paths: string[]) => {
      // TODO: allow the images to load at any rate
      const results = await Promise.allSettled(paths.map(loadImageAsync));
      const fulfilled = results
        .filter((result) => result.status === "fulfilled")
        .map(
          (result) => (result as PromiseFulfilledResult<HTMLImageElement>).value
        );

      setImages(fulfilled);
    };

    loadImages(props.srcPaths);
  }, []);

  // TODO: Move one level down so we know we have images before we do any of this.
  useEffect(() => {
    const canvas: HTMLCanvasElement | null = canvasRef.current;
    // So we don't call the transition more than once
    let nextImageStartTimeout: null | number = null;

    if (!images) {
      return;
    }

    if (canvas) {
      // NOTE: Normally I want to target the parent so this is agnostic. But the astro islands architecture means we'd need to go one level up.
      // @ts-expect-error
      const parent: HTMLElement = (canvas as HTMLCanvasElement).parentNode!
        .parentNode!;
      const width = parent.clientWidth;
      const height = parent.clientHeight;
      (canvas as HTMLCanvasElement).width = width;
      (canvas as HTMLCanvasElement).height = height;

      // TODO: The following lines should be in the stylesheet
      // (canvas as HTMLCanvasElement).style.position = "absolute";
      // (canvas as HTMLCanvasElement).style.top = "0";
      // (canvas as HTMLCanvasElement).style.left = "0";
      // (canvas as HTMLCanvasElement).style.zIndex = "-1";
      // (canvas as HTMLCanvasElement).style.background = "none";

      const ctx = (canvas as HTMLCanvasElement).getContext("2d")!;

      // https://jakearchibald.com/2021/dom-cross-fade/
      const drawBlendedScaledImages = (
        img1: HTMLImageElement,
        img2: HTMLImageElement,
        mix: number
      ) => {
        ctx.clearRect(0, 0, width, height);

        ctx.globalCompositeOperation = "source-over";
        ctx.globalAlpha = 1 - mix;
        drawScaledImage(img1, canvas!, ctx);
        ctx.globalCompositeOperation = "lighter";
        ctx.globalAlpha = mix;
        drawScaledImage(img2, canvas!, ctx);
      };

      let previousTime = 0;
      const MAX_FPS = 60;

      let blendRatio = 1;

      let currentIndex = 0;
      let currentImg = images[currentIndex];
      let nextImg = images[currentIndex + 1];

      const animate = (currentTime: number) => {
        frameRef.current = requestAnimationFrame(animate);
        if (currentTime - previousTime < 1000 / MAX_FPS) return;

        previousTime = currentTime;
        if (blendRatio >= 0.0) {
          drawBlendedScaledImages(nextImg, currentImg, blendRatio);
          blendRatio -= 0.005;
        } else {
          if (!nextImageStartTimeout) {
            const startNewBlend = () => {
              clearTimeout(nextImageStartTimeout ?? 0);
              nextImageStartTimeout = null;
              // Now that a fade has finished, we want to change the target picture. But we also want a delay.
              // 1. Set the currentImg to the nextImg.
              // 2. Set the nextImg to the next index in images (or back to 1 if we're at the end) (This is a loop now, we'll do random later)
              currentImg = nextImg;
              let nextIndex = currentIndex + 1;
              blendRatio = 1;
              nextIndex = nextIndex >= images.length - 2 ? 0 : nextIndex;
              nextImg = images[nextIndex];
              currentIndex = nextIndex;
            };

            nextImageStartTimeout = setTimeout(startNewBlend, 2000);
          }
        }
      };

      function resizeCanvas() {
        (canvas as HTMLCanvasElement).width = parent.clientWidth;
        (canvas as HTMLCanvasElement).height = parent.clientHeight;
      }

      resizeCanvas();

      const observer = new ResizeObserver(() => {
        resizeCanvas();
      });
      observer.observe(parent);

      const init = async () => {
        frameRef.current = requestAnimationFrame(animate);
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
      <canvas ref={canvasRef} className="fader-canvas"></canvas>
    </>
  );
};

export default ImageFader;
