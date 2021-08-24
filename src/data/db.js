import AES from "crypto-js/aes";

import { uploadsFromInit, usersFromInit } from './init'

/*eslint-disable eqeqeq*/

export let users = [];
const globalSecurity = "strongpassword&shouldnotbehere";

export let upload = [];

const getNextUserID = () => {
  return getAllUsers().length + 1;
};

export const createUser = (user) => {
  const userToCreate = {
    id: getNextUserID(),
    name: user.name,
    email: user.email,
    password: AES.encrypt(user.password, globalSecurity).toString(),
  };
  const allUsers = getAllUsers();
  allUsers.push(userToCreate);
  logInUser(userToCreate);
  refreshDB("users", JSON.stringify(allUsers));
  return userToCreate;
};

export const authUser = (user) => {
  const foundUser = findUserByEmail(user.email);
  if(foundUser) {
    const password = AES.decrypt(foundUser.password, globalSecurity);
    if(password){
      logInUser(foundUser);
      const allUsers = getAllUsers();
      allUsers.push(foundUser);
      refreshDB("users", JSON.stringify(allUsers));
      return foundUser;
    }
  }
  return null;  
};

export const logoutUser = () =>{
  if (localStorage.getItem("user")) {
    localStorage.removeItem("user");
  }
}

const findUserByEmail = (email) => {
  return getAllUsers().find(user => user.email == email);
}

export const logInUser = (user) => {
  if (localStorage.getItem("user")) {
    localStorage.removeItem("user");
  }
  localStorage.setItem("user", JSON.stringify(user));
};

export const getLoggedInUser = () => {
  const userObject = localStorage.getItem("user");
  if (userObject) {
    return JSON.parse(userObject);
  }
  return null;
};

export const saveUserUpload = (user, videoObject) => { //Returns video uploaded by user on success. 
  const uploadToCreate = {
    id: getNextUploadID(),
    title: videoObject.title,
    description: videoObject.description,
    thumbnail: videoObject.thumbnail,
    video: videoObject.vid,
    userId: user.id,
    likes: 0,
    dislikes: 0,
  };
  const allUploads = getAllUploads();
  allUploads.push(uploadToCreate);
  const allUsers = getAllUsers();
  for(let i = 0; i < allUsers.length; i++){
    if(allUsers[i].id == user.id){
      if (allUsers[i].uploads){
        allUsers[i].uploads = [...allUsers[i].uploads, uploadToCreate.id]
      }else{
        allUsers[i].uploads = [uploadToCreate.id]
      }
      break;
    }
  }
  refreshDB("uploads", JSON.stringify(allUploads));
  refreshDB("users", JSON.stringify(allUsers));
  return uploadToCreate;
};

export const getUserUploads = (userId) =>{ //Returns videos uploaded by a user
  const allUsers = getAllUsers();
  let uploadList;
  for (let i = 0; i < allUsers.length; i++) {
    if (allUsers[i].id == userId){
      uploadList = allUsers[i].uploads;
      break;
    }
  }
  if (!uploadList){
    return []
  }else{
    const allUploads = getAllUploads();
    return allUploads.filter((upload)=>{
      return uploadList.find(vidId=>upload.id == vidId);
    })
    
  }
}

export const getSortedVids = (criteria) => { //Returns videos from storage sorted based on predefined criteria
  const allVids = getAllUploads();
  if (criteria == "likes"){
    allVids.sort((a, b) =>{
      return b.likes - a.likes;
    })
    return allVids
  }
  return allVids
}

export const getVideoData = (videoId) => { //Returns a video from storage
  const allVids = getAllUploads();
  return allVids.find(({id}) => id == videoId) || null;
}

const refreshDB = (table, data) => { // Nothing is returned
  //Takes in a table to be made changes on && the new version of the table
  if (localStorage.getItem(table)) {
    localStorage.removeItem(table);
  }
  localStorage.setItem(table, data);
};

const getAllUsers = () => {
  const users = localStorage.getItem("users");
  if (users) {
    return JSON.parse(users);
  } else {
    refreshDB("users", JSON.parse(usersFromInit))
    return getAllUsers();
  }
};

const getNextUploadID = () => { //Returns the next ID for use as PK.
  return getAllUploads().length + 1;
};

const getAllUploads = () => { //Returns array of all all videos uploaded on storage
  const uploads = localStorage.getItem("uploads");
  if (uploads) {
    let uploaded = JSON.parse(uploads);
    const users = getAllUsers();

    const querriedUploads = uploaded.filter(upload => upload.userId )
    .map((upload) =>{
      let user = users.find(({id}) => id == upload.userId)
      return {...upload, "user":{"name": user.name}}
    });

    return querriedUploads
  } else {
    
    //If user session is new -> Load starter videos
    refreshDB("uploads", JSON.stringify(uploadsFromInit))
    refreshDB("users", JSON.stringify(usersFromInit))
    return getAllUploads() ;
    
  }
};

export const getVideoLikes = (videoId) => { //Returns array of the likes on video
  const allVidsLikes = getAllVideoLikes();
  if (allVidsLikes.length > 0) {
    
    const final = allVidsLikes.filter((vid)=>{

      return videoId in vid; 
    }).map(v => v[videoId])

    return final[0]
  } else {
    return [];
  }
};

export const likeVideo = (videoId, userId) => { //Returns array of the liked video and boolean of whether removed dislike [videoObj, false]
  
  const currentVidLikes = getVideoLikes(videoId)
  const currentVidDislikes = getVideoDislikes(videoId) || [];
  let toggledUnlikedValue = false

  if(currentVidDislikes.includes(userId)){
    unDislikeVideo(videoId, userId, currentVidDislikes);
    toggledUnlikedValue = true //Return true if there was a dislike prior and was removed
  }

  let videoObject = getVideoData(videoId);
  const allVidsLikes = getAllVideoLikes();

  if (allVidsLikes.length == 0 || !currentVidLikes){ //No likes on storage && for the specific video
    allVidsLikes.push({[videoId]:[userId]})
    videoObject.likes = videoObject.likes + 1;
    const allVideosUploaded = getAllUploads()
    const updatedVideosAfterLike = allVideosUploaded.map((video)=>{
      if(video.id == videoId) return videoObject;
      else{ return video}
    })
    refreshDB("videoLikes", JSON.stringify(allVidsLikes))
    refreshDB("uploads", JSON.stringify(updatedVideosAfterLike))
    return [videoObject, toggledUnlikedValue]

  }else{

    if(currentVidLikes.includes(videoId)) {return;}
    currentVidLikes.push(userId)
    const updatedLikes = allVidsLikes.map((videoLikes)=>{
      if(videoId in videoLikes){
        videoLikes[videoId] = currentVidLikes
        return videoLikes
      }else{
        return videoLikes
      }
    })

    videoObject.likes = videoObject.likes + 1;
    const allVideosUploaded = getAllUploads()
    const updatedVideosAfterLike = allVideosUploaded.map((video)=>{
      if(video.id == videoId) return  videoObject;
      else{return video}
    })
    refreshDB("videoLikes", JSON.stringify(updatedLikes))
    refreshDB("uploads", JSON.stringify(updatedVideosAfterLike))
    return [videoObject, toggledUnlikedValue]
  }
}

export const getAllVideoLikes = () => { //Returns array of objects containing {videoIdKey: array of video Dislikes} from storage 
  const allVidsLikes = localStorage.getItem("videoLikes");
  if (allVidsLikes) {
    return JSON.parse(allVidsLikes);
    
  } else {
    return [];
  }
};

export const getVideoDislikes = (videoId) => { //Returns array of a video's dislikes
  const allVidsDislikes = getAllVideoDislikes();
  if (allVidsDislikes.length > 0) {
    
    const final = allVidsDislikes.filter((vid)=>{
      return videoId in vid; 
    }).map(v => v[videoId])

    return final[0]
  } else {
    return [];
  }
};

export const getAllVideoDislikes = () => { //Returns array of objects containing {videoIdKey: array of video Likes} from storage 
  const allVidsDislikes = localStorage.getItem("videoDislikes");
  if (allVidsDislikes) {
    return JSON.parse(allVidsDislikes);
    
  } else {
    return [];
  }
};

export const dislikeVideo = (videoId, userId) => { //Returns array of the disliked video and boolean of whether removed like [videoObj, false]
  
  const currentVidDislikes = getVideoDislikes(videoId)
  const currentVidLikes = getVideoLikes(videoId) || [];
  let toggledUnlikedValue = false

  if(currentVidLikes.includes(userId)){
    unlikeVideo(videoId, userId, currentVidLikes);
    toggledUnlikedValue = true
  }

  let videoObject = getVideoData(videoId);
  const allVidsDislikes = getAllVideoDislikes();
  
  if (allVidsDislikes.length == 0 || !currentVidDislikes){
    allVidsDislikes.push({[videoId]:[userId]})
    videoObject.dislikes = videoObject.dislikes + 1;
    const allVideosUploaded = getAllUploads()
    const updatedVideosAfteDislLike = allVideosUploaded.map((video)=>{
      if(video.id == videoId) return  videoObject;
      else{return video}
    })
    refreshDB("videoDislikes", JSON.stringify(allVidsDislikes))
    refreshDB("uploads", JSON.stringify(updatedVideosAfteDislLike))
    return [videoObject, toggledUnlikedValue]

  }else{
    
    if(currentVidDislikes.includes(videoId)){return;}
    currentVidDislikes.push(userId)
    const updatedDislikes = allVidsDislikes.map((videoDislikes)=>{
      if(videoId in videoDislikes){
        videoDislikes[videoId] = currentVidDislikes
        return videoDislikes
      }else{
        return videoDislikes
      }
    })

    videoObject.dislikes = videoObject.dislikes + 1;
    const allVideosUploaded = getAllUploads()
    const updatedVideosAfterDislike = allVideosUploaded.map((video)=>{
      if(video.id == videoId) return  videoObject;
      else{return video}
    })
    refreshDB("videoLikes", JSON.stringify(updatedDislikes))
    refreshDB("uploads", JSON.stringify(updatedVideosAfterDislike))
    return [videoObject, toggledUnlikedValue]
  }
}

const unDislikeVideo = (videoId, userId, videoDislikesAtTheTime)=>{ //Nothing returned (But refreshes the storage after execution)
  const newCurrentVideoDislikes = videoDislikesAtTheTime.filter(dislike => dislike !== userId);

  const allVideoDislikes = getAllVideoDislikes();
  const newdisLikeList = allVideoDislikes.map((vid)=>{
    if(videoId in vid){
      vid[parseInt(videoId)] = newCurrentVideoDislikes
      return vid
    }else{
      return vid
    }
  });
  let videoObject = getVideoData(videoId);
  videoObject.dislikes = videoObject.dislikes  > 0 ? videoObject.dislikes - 1 : 0;

  const allVideosUploaded = getAllUploads()
  const updatedVideosAfterUndislike = allVideosUploaded.map((video)=>{
    if (video.id == videoId) {return videoObject;}
    else {return video}
  })
  refreshDB("videoDislikes", JSON.stringify(newdisLikeList));
  refreshDB("uploads", JSON.stringify(updatedVideosAfterUndislike))
}

const unlikeVideo = (videoId, userId, videoLikesAtTheTime)=>{ //Nothing returned (But refreshes the storage after execution)
  const newCurrentVideoLikes = videoLikesAtTheTime.filter(like => like !== userId);

  const allVideoLikes = getAllVideoLikes();
  const newlikeList = allVideoLikes.map((vid)=>{
    if(videoId in vid){
      vid[parseInt(videoId)] = newCurrentVideoLikes
      return vid
    }else{
      return vid
    }
  });

  let videoObject = getVideoData(videoId);
  videoObject.likes = videoObject.likes  > 0 ? videoObject.likes - 1 : 0;

  const allVideosUploaded = getAllUploads()
  const updatedVideosAfterUnlike = allVideosUploaded.map((video)=>{
    if(video.id == videoId) return  videoObject;
    else{ return video; }
  })

  refreshDB("videoLikes", JSON.stringify(newlikeList));
  refreshDB("uploads", JSON.stringify(updatedVideosAfterUnlike))
}