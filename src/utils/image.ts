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
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
) => {
  const iw = image.width;
  const ih = image.height;
  const cw = canvas.width;
  const ch = canvas.height;
  const f = Math.max(cw / iw, ch / ih);

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
