export const loadImageAsync = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => {
      resolve(img);
    };
    img.onerror = (e) => {
      reject(e);
    };
  });
};

// https://stackoverflow.com/questions/66560704/adjust-canvas-image-size-like-background-size-cover-and-responsive
export const drawScaledImage = (
  image: HTMLImageElement,
  canvas: HTMLCanvasElement
) => {
  const iw = image.width;
  const ih = image.height;
  const cw = canvas.width;
  const ch = canvas.height;
  const f = Math.max(cw / iw, ch / ih);

  // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas#turn_off_transparency
  const ctx = (canvas as HTMLCanvasElement).getContext("2d", { alpha: false })!;
  ctx.setTransform(
    /*     scale x */ f,
    /*      skew x */ 0,
    /*      skew y */ 0,
    /*     scale y */ f,
    /* translate x */ (cw - f * iw) / 2,
    /* translate y */ (ch - f * ih) / 2
  );

  ctx.drawImage(image, 0, 0);
  ctx.resetTransform();
};

// https://jakearchibald.com/2021/dom-cross-fade/
export const drawBlendedScaledImages = (
  canvas: HTMLCanvasElement,
  img1: HTMLImageElement,
  img2: HTMLImageElement,
  mix: number
) => {
  const ctx = (canvas as HTMLCanvasElement).getContext("2d", { alpha: false })!;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.globalCompositeOperation = "source-over";
  ctx.globalAlpha = 1 - mix;
  drawScaledImage(img1, canvas!);
  ctx.globalCompositeOperation = "lighter";
  ctx.globalAlpha = mix;
  drawScaledImage(img2, canvas!);
};
