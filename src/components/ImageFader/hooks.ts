import { useState, useEffect } from "react";
import { loadImageAsync } from "../../utils/image";

export const useLoadImagesFromPaths = (
  srcPaths: string[]
): ["idle" | "loading" | "loaded", HTMLImageElement[] | null] => {
  const [state, setState] = useState<"idle" | "loading" | "loaded">("idle");
  const [data, setData] = useState<HTMLImageElement[] | null>(null);

  useEffect(() => {
    if (!srcPaths) {
      return;
    }

    const loadImages = async (srcPaths: string[]) => {
      // TODO: allow the images to load at any rate?
      // Can memoize the returns and use a map of path and data to avoid calling on same paths. But browser might be smart enough anyway and pull from cache, would need to test that.
      setState("loading");
      const results = await Promise.allSettled(srcPaths.map(loadImageAsync));
      const fulfilled = results
        .filter((result) => result.status === "fulfilled")
        .map(
          (result) => (result as PromiseFulfilledResult<HTMLImageElement>).value
        );

      setData(fulfilled);
      setState("loaded");
    };

    loadImages(srcPaths);
  }, [srcPaths]);

  return [state, data];
};
