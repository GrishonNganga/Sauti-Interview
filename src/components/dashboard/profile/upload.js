import { useState } from "react";

import { VideoMoreInfo } from "./videoMoreInfo";
import { VideoUpload } from "./videoUpload";

export const Upload = ({setLoadedComponent}) => {
  const [videoSrc, setVideoSrc] = useState(null);
  const [loadVideoComponent, setLoadVideoComponent] = useState(true);

  return (
    <div>
      {loadVideoComponent ? (
        <VideoUpload setVideoSrc={setVideoSrc} setLoadVideoComponent={setLoadVideoComponent} />
      ) : (
        <VideoMoreInfo videoSrc={videoSrc} setLoadedComponent={setLoadedComponent}/>
      )}
    </div>
  );
};
