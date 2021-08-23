import { useState, useRef, useEffect, useContext } from "react";
import { InputError } from "../../utils/errors";
import { ButtonLoader } from "../../utils/loader";
import { uploadThumbnail, uploadVideo } from "../../../data/api";
import { AuthContext } from "../../../context/auth";
import { saveUserUpload } from "../../../data/db";

export const VideoMoreInfo = ({ videoSrc, setLoadedComponent }) => {
  const initialState = {
    title: "",
    description: "",
    isLoading: false,
    hasError: false,
  };

  const { user } = useContext(AuthContext);
  const [userValue] = user;

  const [{ title, description, isLoading, hasError }, setState] =
    useState(initialState);

  const [imageSrc, setImageSrc] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    videoRef.current.load();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setState((prevState) => ({ ...prevState, "isLoading": true }));
    if (
      !inputValid(title) ||
      !inputValid(description) ||
      !imageSrc ||
      !videoSrc
    ) {
      setState((prevState) => ({
        ...prevState,
        "isLoading": false,
        "hasError": true,
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        "isLoading": true,
        "hasError": false,
      }));
      const thumbnailUrl = uploadThumbnail(imageSrc).then((response) => {
        return response;
      });
      const videoUrl = uploadVideo(videoSrc).then((response) => {
        return response;
      });

      Promise.all([thumbnailUrl, videoUrl]).then((values) => {
        const thumbnail = values[0];
        const vid = values[1];

        setState((prevState) => ({
          ...prevState,
          "isLoading": false,
        }));
        saveUpload(thumbnail, vid);
      });
    }
  };
  const saveUpload = (thumbnail, vid) => {
    const uploadedVideo = saveUserUpload(userValue, { title, description, thumbnail, vid });
    if (uploadedVideo){
      setLoadedComponent("videos")
    }
  };
  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleThumbnailUpload = (e) => {
    const files = e.target.files || [];
    const reader = new FileReader();

    reader.onload = (e) => {
      setImageSrc(e.target.result);
    };

    reader.onprogress = function (e) {
      //Add loader when loading
    };

    reader.readAsDataURL(files[0]);
  };

  const inputValid = (str) => {
    return str || /^\s*$/.test(str);
  };

  return (
    <div className="flex justify-center">
      <div className="w-11/12 flex justify-center ">
        <div className="w-3/5 flex justify-center ">
          <div className="w-3/4">
            <div className="p-4">
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col space-y-4">
                  {hasError && <InputError />}
                  <div>
                    <label
                      for="title"
                      className="text-sm font-semibold text-gray-400"
                    >
                      Title
                    </label>
                    <textarea
                      type="text"
                      name="title"
                      className="w-full rounded-md border focus:outline-none focus:ring-0 focus:border-red-400 bg-black text-white"
                      placeholder="Add a title that describes your video"
                      required
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <div>
                    <label
                      for="description"
                      className="text-sm font-semibold text-gray-400"
                    >
                      Description
                    </label>
                    <textarea
                      type="text"
                      name="description"
                      className="w-full rounded-md border focus:outline-none focus:ring-0 focus:border-red-400 bg-black text-white h-48"
                      placeholder="Tell viewers about your video"
                      required
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <div className="flex justify-center space-x-6">
                    <div class="">
                      <label class="flex flex-col items-center  text-blue rounded border border-gray-500 cursor-pointer px-3 py-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-7 h-7 text-gray-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        <span class="text-xs  text-gray-500">
                          Add Thumbnail
                        </span>
                        <input
                          type="file"
                          class="hidden"
                          onChange={handleThumbnailUpload}
                        />
                      </label>
                    </div>
                    <div>
                      <img src={imageSrc} className="w-28 h-16 object-cover" alt="" />
                    </div>
                  </div>
                  <div className="w-full flex justify-center pt-2">
                    <div className="w-full">
                      <button
                        type="submit"
                        id="sign-in"
                        className={`bg-red-400 w-full text-white py-3 rounded-md font-semibold focus:outline-none ${
                          isLoading ? "cursor-not-allowed" : "cursor-pointer"
                        }`}
                      >
                        {isLoading ? <ButtonLoader /> : "Upload"}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="w-4/12 p-6">
          <video
            id="video"
            className="h-72 rounded"
            controls
            ref={videoRef}
            src={videoSrc}
          ></video>
        </div>
      </div>
    </div>
  );
};
