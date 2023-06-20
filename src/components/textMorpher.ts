export const createSVGFilter = (filterId = "text-morpher-matrix-filter") => {
  const SVG_NS = "http://www.w3.org/2000/svg";
  const svgElement = document.createElementNS(SVG_NS, "svg");
  svgElement.innerHTML = `
    <defs>
      <filter id="${filterId}">
        <feColorMatrix in="SourceGraphic"
            type="matrix"
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 255 -140" />
      </filter>
    </defs>
  `;

  return svgElement;
};

export const initTextMorpher = async (
  parentElement: HTMLDivElement,
  texts: string[],
  displayTextDuration = 5000,
  transitionDuration = 1500,
  fps = 60,
  loop = true
) => {
  const filterId = "text-morpher-matrix-filter";
  parentElement.appendChild(createSVGFilter(filterId));
  // TODO: This drop shadow is very custom to my use case, not great for a generic implementation (also I removed the .6px blur)
  parentElement.style.filter = `url(#${filterId}) drop-shadow(0 0 5px rgba(0,10,120,0.8))`;

  const textContainer1 = document.createElement("span");
  textContainer1.id = "#text-cross-fader-text-1";
  textContainer1.style.position = "absolute";
  textContainer1.style.top = "0";
  textContainer1.style.bottom = "0";
  textContainer1.style.left = "0";
  textContainer1.style.right = "0";
  textContainer1.innerHTML = texts[0];
  parentElement.appendChild(textContainer1);

  const textContainer2 = document.createElement("span");
  textContainer2.style.position = "absolute";
  textContainer2.style.top = "0";
  textContainer2.style.bottom = "0";
  textContainer2.style.left = "0";
  textContainer2.style.right = "0";
  textContainer2.style.opacity = "0";
  textContainer2.id = "#text-cross-fader-text-2";
  parentElement.appendChild(textContainer2);

  function morphTexts(text1: string, text2: string, fraction: number) {
    const base = 4;
    const basePower = 0.25;
    textContainer2.style.filter = `blur(${Math.min(
      base / fraction - base,
      100
    )}px)`;
    textContainer2.style.opacity = `${Math.pow(fraction, basePower) * 100}%`;

    fraction = 1 - fraction;
    textContainer1.style.filter = `blur(${Math.min(
      base / fraction - base,
      100
    )}px)`;
    textContainer1.style.opacity = `${Math.pow(fraction, basePower) * 100}%`;

    // TODO: Only allow a few element types.
    textContainer1.innerHTML = text1;
    textContainer2.innerHTML = text2;
  }

  const animateForwards = (
    duration: number,
    fps: number,
    callback: (elapsedFraction: number) => void
  ) =>
    new Promise(function (resolve, reject) {
      if (duration <= 0) {
        reject("Cannot animate without a positive duration.");
      }
      if (duration < 1000 / fps) {
        reject("Duration must be at least as long as one frame of animation.");
      }
      const startTime = Date.now();
      let previousTime = Date.now();
      let animationFrame = 0;

      const animate = () => {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        const fractionalTime = elapsed / duration;
        if (fractionalTime >= 1) {
          cancelAnimationFrame(animationFrame);
          // This ensures the last frame is fully rendering the final text (we could also just completely ignore the morph effect)
          callback(1);
          // @ts-expect-error
          resolve();
        } else {
          animationFrame = requestAnimationFrame(animate);
          const delta = currentTime - previousTime;
          if (delta < 1000 / fps) return;
          previousTime = currentTime;
          callback(fractionalTime);
        }
      };

      animationFrame = requestAnimationFrame(animate);
    });

  let textIndex = 0;
  // textContainer1.innerHTML = texts[textIndex];
  while (textIndex < texts.length - 1) {
    await new Promise((res) => {
      setTimeout(res, displayTextDuration);
    });
    await animateForwards(transitionDuration, fps, (fraction: number) => {
      morphTexts(
        texts[textIndex],
        texts[(textIndex + 1) % texts.length],
        fraction
      );
    });

    textIndex++;
    if (textIndex >= texts.length - 1) {
      if (loop) {
        await new Promise((res) => {
          setTimeout(res, displayTextDuration);
        });
        await animateForwards(transitionDuration, fps, (fraction: number) => {
          morphTexts(
            texts[textIndex],
            texts[(textIndex + 1) % texts.length],
            fraction
          );
        });
        textIndex = 0;
      }
    }
  }
};
