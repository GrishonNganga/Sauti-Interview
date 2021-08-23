import { useRef, createElement, useState } from "react";

import { InputError } from "../../utils/errors";
import { ButtonLoader } from "../../utils/loader";
import { VideoMoreInfo } from "./videoMoreInfo";
import { VideoUpload } from "./videoUpload";

import video from "../../../assets/video.svg";

export const Upload = ({setLoadedComponent}) => {
  const [videoSrc, setVideoSrc] = useState(null);
  const [loadVideoComponent, setLoadVideoComponent] = useState(true);

  const sth = () => {};

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
