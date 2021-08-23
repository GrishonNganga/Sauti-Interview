import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getVideoData, getVideoLikes, getVideoDislikes, likeVideo, dislikeVideo } from "../../data/db";
import { AuthContext } from '../../context/auth';

export const WatchComponent = () => {
  
  const { id } = useParams();

  const { user, canAuthenticate } = useContext(AuthContext);
  const [userValue] = user;
  const [ setCanAuthenticate] = canAuthenticate;

  const videoData = getVideoData(id);
  const [videoExists] = useState(videoData ? true: false);
  const [{...videoObject }, setVideoToWatch] = useState((videoExists && videoData) || {});
  const [videoLikes] = useState((videoExists && getVideoLikes(id)) || []);
  const [videoDislikes] = useState((videoExists && getVideoDislikes(id)) || []);
  const [userLiked, setUserLiked] = useState(false)
  const [userDisliked, setUserDisliked] = useState(false)

  useEffect(()=>{
    if(userValue && videoExists && videoLikes.includes(userValue.id)){
      setUserLiked(true)
    }
    if(userValue && videoExists && videoDislikes.includes(userValue.id)){
      setUserDisliked(true)
    }
  },[userValue, videoExists, videoLikes, videoDislikes ])

  const userLikeVideo = () =>{
    if (!userValue){ setCanAuthenticate(true);  return; } 
    if(!userLiked){
      const [updatedVideo, toggledDislike] = likeVideo(videoObject.id, userValue.id)
      if(updatedVideo){
        setUserLiked(prevState=> !prevState)
        if(toggledDislike){
          setUserDisliked(false)
        } 

        setVideoToWatch(updatedVideo)
      }
    }
  }

  const userDislikeVideo = () =>{
    if (!userValue){ setCanAuthenticate(true);  return; } 
    if(!userDisliked){
      const [updatedVideo, toggledLike] = dislikeVideo(videoObject.id, userValue.id)
      if(updatedVideo){
        setUserDisliked(prevState=>!prevState) 
        if(toggledLike){
          setUserLiked(false)
        }
        setVideoToWatch(updatedVideo)
      }
    }
  }

  return (
    <div className="h-full">
        {(
            <div className="text-white p-5 h-4/5">
            <div className="w-full h-3/4 ">
              <video
                id="video"
                className="w-3/4 h-full rounded border border-gray-700 shadow-md"
                src={videoObject.video}
                controls
              ></video>
            </div>
            <div className="w-3/4  flex justify-between h-20 mb-4 border-b border-gray-800">
              <div className="flex items-start">
                <div className="flex flex-col">
                  <div className="text-xl pt-2">{videoObject.title}</div>
                  <div className="text-md py-1">5,081 viewsAug 16, 2020</div>
                </div>
              </div>
              <div className="flex items-end space-x-8 pb-4 border-b-2 ">
                <div className="flex space-x-2">
                  <div className="flex items-center space-x-2 cursor-pointer" onClick={userLikeVideo}>
                    <div>{userLiked ?
                      (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                        </svg>)
                        :(
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 cursor-pointer text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                        />
                      </svg>)
                      }
                      
                    </div>
                    <div className="text-md">{videoObject.likes}</div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <div className="flex items-center space-x-2 cursor-pointer"  onClick={userDislikeVideo}>
                    <div>{userDisliked ?
                      (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z" />
                      </svg>)
                        :(
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                      </svg>)
                      }
                      
                    </div>
                    <div className="text-md">{videoObject.dislikes}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};
