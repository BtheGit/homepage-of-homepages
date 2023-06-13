import { useLoadImagesFromPaths } from "../ImageFader/hooks";
import { shuffle } from "../../utils/array";
import { ImageFader } from "../ImageFader/ImageFader";
import "./PhotoArray.scss";

export type PhotoArrayProps = {
  srcPaths: string[];
};

export const PhotoArray = (props: PhotoArrayProps) => {
  const { srcPaths } = props;
  const [imageLoadingState, images] = useLoadImagesFromPaths(srcPaths);
  // TODO: Pull in original photo separately to have as initial image.

  if (imageLoadingState !== "loaded" || !images?.length) return null;

  // NOTE: Resize isnt working. Might want to brute force and just rerender this component on resizes.

  return (
    <div className="bfa-container__inner">
      <div className="bfa-canvas-container">
        <ImageFader images={shuffle(images)} startDelay={0} />
      </div>
      <div className="bfa-canvas-container">
        <ImageFader
          images={shuffle(images)}
          startDelay={2000}
          transitionDelay={0}
          reshuffle={true}
        />
      </div>
      <div className="bfa-canvas-container">
        <ImageFader
          images={shuffle(images)}
          startDelay={1000}
          transitionDelay={0}
          reshuffle={true}
        />
      </div>
      <div className="bfa-canvas-container">
        <ImageFader
          images={shuffle(images)}
          startDelay={2000}
          transitionDelay={0}
          reshuffle={true}
        />
      </div>
      <div className="bfa-canvas-container splash">
        <ImageFader
          images={images.slice(0, 2)}
          startDelay={1000}
          looping={false}
        />
      </div>
      <div className="bfa-canvas-container">
        <ImageFader
          images={shuffle(images)}
          startDelay={4000}
          transitionDelay={0}
          reshuffle={true}
        />
      </div>
      <div className="bfa-canvas-container">
        <ImageFader
          images={shuffle(images)}
          startDelay={3000}
          transitionDelay={0}
          reshuffle={true}
        />
      </div>
      <div className="bfa-canvas-container">
        <ImageFader
          images={shuffle(images)}
          startDelay={1500}
          transitionDelay={0}
          reshuffle={true}
        />
      </div>
      <div className="bfa-canvas-container">
        <ImageFader
          images={shuffle(images)}
          startDelay={3500}
          transitionDelay={0}
          reshuffle={true}
        />
      </div>
    </div>
  );
};

export default PhotoArray;
