import { useState, useRef } from "react";
import { InputError } from "../../utils/errors";
import { ButtonLoader } from "../../utils/loader";
import { uploadThumbnail, uploadVideo } from "../../../data/api";

export const VideoUpload = ({setVideoSrc, setLoadVideoComponent}) => {
  
  const uploadInpRef = useRef();

  const handleUpload = (e) => {
    const files = e.target.files || [];
    const reader = new FileReader();

    reader.onload = (e) => {
      setVideoSrc(e.target.result);
      setLoadVideoComponent(false)
    };

    reader.onprogress = function (e) {
      //Add loader when loading
    };

    reader.readAsDataURL(files[0]);
  };

  const clickUploadInput = () => {
    uploadInpRef.current.click();
  };

  return (
    <main className="container mx-auto max-w-screen-lg h-full border border-gray-700 rounded-lg shadow-xl">
      <div
        aria-label="File Upload Modal"
        className="relative h-full flex flex-col shadow-xl rounded-md"
      >
        <section className="h-full overflow-auto p-8 w-full flex flex-col">
          <header className="border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center">
            <p className="mb-3 font-semibold text-gray-500 flex flex-wrap justify-center ">
              <span>Drag and drop your</span>&nbsp;
              <span>files anywhere or</span>
            </p>
            <button
              id="button"
              className="mt-2 rounded-sm px-4 py-2 bg-red-400 text-white focus:shadow-outline focus:outline-none"
              onClick={clickUploadInput}
            >
              Upload a video
              <input
                id="hidden-input"
                name="video"
                type="file"
                class="hidden"
                required
                ref={uploadInpRef}
                onChange={handleUpload}
                accept="video/*"
              />
            </button>
          </header>

          <ul id="gallery" className="flex flex-1 flex-wrap mt-12">
            <li
              id="empty"
              className="h-full w-full text-center flex flex-col items-center justify-center items-center"
            >
              {/* <img className="mx-auto w-32" src={video} alt="no data" /> */}
              <span className="text-small text-gray-500 mt-2">
                No video selected
              </span>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
};
