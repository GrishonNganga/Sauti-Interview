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

export const saveUserUpload = (user, videoObject) => {
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

export const getUserUploads = (userId) =>{
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

export const getSortedVids = (criteria) => {
  const allVids = getAllUploads();
  if (criteria == "likes"){
    allVids.sort((a, b) =>{
      return b.likes - a.likes;
    })
    return allVids
  }
  return allVids
}

export const getVideoData = (videoId) => {
  const allVids = getAllUploads();
  return allVids.find(({id}) => id == videoId) || null;
}

const refreshDB = (table, data) => {
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

const getNextUploadID = () => {
  return getAllUploads().length + 1;
};

const getAllUploads = () => {
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

    refreshDB("uploads", JSON.stringify(uploadsFromInit))
    refreshDB("users", JSON.stringify(usersFromInit))
    return getAllUploads() ;
    
  }
};

export const getVideoLikes = (videoId) => {
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

export const likeVideo = (videoId, userId) => {
  
  const currentVidLikes = getVideoLikes(videoId)
  const currentVidDislikes = getVideoDislikes(videoId) || [];
  let toggledUnlikedValue = false

  if(currentVidDislikes.includes(userId)){
    unDislikeVideo(videoId, userId);
    toggledUnlikedValue = true
  }

  let videoObject = getVideoData(videoId);
  const allVidsLikes = getAllVideoLikes();
  if (allVidsLikes.length == 0 || !currentVidLikes){
    allVidsLikes.push({[videoId]:[userId]})
    videoObject.likes++;
    const allVideosUploaded = getAllUploads()
    const updatedVideosAfterLike = allVideosUploaded.map((video)=>{
      if(video.id == videoId) return {...videoObject};
      else{ return video}
    })
    refreshDB("videoLikes", JSON.stringify(allVidsLikes))
    refreshDB("uploads", JSON.stringify(updatedVideosAfterLike))
    return [videoObject, toggledUnlikedValue]
  }else{
    currentVidLikes.push(userId)
    const updatedLikes = allVidsLikes.map((vidLikes, idx, obj)=>{
      for(const prop in vidLikes){
        if(parseInt(prop) == videoId){
          vidLikes[prop] = currentVidLikes
          break;
        }
      }
      return vidLikes
    })
    videoObject.likes++;
    const allVideosUploaded = getAllUploads()
    const updatedVideosAfterLike = allVideosUploaded.map((video)=>{
      if(video.id == videoId) return  {...videoObject};
      else{return video}
    })
    refreshDB("videoLikes", JSON.stringify(updatedLikes))
    refreshDB("uploads", JSON.stringify(updatedVideosAfterLike))
    return [videoObject, toggledUnlikedValue]
  }
}

export const getAllVideoLikes = () => {
  const allVidsLikes = localStorage.getItem("videoLikes");
  if (allVidsLikes) {
    return JSON.parse(allVidsLikes);
    
  } else {
    return [];
  }
};

export const getVideoDislikes = (videoId) => {
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

export const getAllVideoDislikes = () => {
  const allVidsDislikes = localStorage.getItem("videoDislikes");
  if (allVidsDislikes) {
    return JSON.parse(allVidsDislikes);
    
  } else {
    return [];
  }
};

export const dislikeVideo = (videoId, userId) => {
  
  const currentVidDislikes = getVideoDislikes(videoId)
  const currentVidLikes = getVideoLikes(videoId) || [];
  let toggledUnlikedValue = false

  if(currentVidLikes.includes(userId)){
    unlikeVideo(videoId, userId);
    toggledUnlikedValue = true
  }

  let videoObject = getVideoData(videoId);
  const allVidsDislikes = getAllVideoDislikes();
  if (allVidsDislikes.length == 0 || !currentVidDislikes){
    allVidsDislikes.push({[videoId]:[userId]})
    videoObject.dislikes++;
    const allVideosUploaded = getAllUploads()
    const updatedVideosAfteDislLike = allVideosUploaded.map((video)=>{
      if(video.id == videoId) return  {...videoObject};
      else{return video}
    })
    refreshDB("videoDislikes", JSON.stringify(allVidsDislikes))
    refreshDB("uploads", JSON.stringify(updatedVideosAfteDislLike))
    return [videoObject, toggledUnlikedValue]
  }else{
    currentVidDislikes.push(userId)
    const updatedDislikes = allVidsDislikes.map((vidDislikes, idx, obj)=>{
      for(const prop in vidDislikes){
        if(parseInt(prop) == videoId){
          vidDislikes[prop] = currentVidDislikes
          break;
        }
      }
      return vidDislikes
    })
    videoObject.dislikes++;
    const allVideosUploaded = getAllUploads()
    const updatedVideosAfterDislike = allVideosUploaded.map((video)=>{
      if(video.id == videoId) return  {...videoObject};
      else{return video}
    })
    refreshDB("videoLikes", JSON.stringify(updatedDislikes))
    refreshDB("uploads", JSON.stringify(updatedVideosAfterDislike))
    return [videoObject, toggledUnlikedValue]
  }
}

const unDislikeVideo = (videoId, userId)=>{
  const currentVideoDisikes = getVideoDislikes(videoId);
  const newCurrentVideoDislikes = currentVideoDisikes.filter(dislike => dislike !== userId);

  const allVideoDislikes = getAllVideoDislikes();
  const newdisLikeList = allVideoDislikes.map((vid)=>{
    
    for(const prop in vid){
      if (prop == parseInt(videoId)){
        vid[parseInt(videoId)] = newCurrentVideoDislikes
        break;
      }
    }
    return vid
  });
  let videoObject = getVideoData(videoId);
  videoObject.dislikes = ( videoObject.dislikes > 0 ? videoObject.dislikes-- : 0 );

  const allVideosUploaded = getAllUploads()
  const updatedVideosAfterUndislike = allVideosUploaded.map((video)=>{
    if(video.id == videoId) return  {...videoObject};
    else{return video}
  })
  refreshDB("videoDislikes", JSON.stringify(newdisLikeList));
  refreshDB("uploads", JSON.stringify(updatedVideosAfterUndislike))
}

const unlikeVideo = (videoId, userId)=>{
  const currentVideoLikes = getVideoLikes(videoId);
  const newCurrentVideoLikes = currentVideoLikes.filter(like => like !== userId);

  const allVideoLikes = getAllVideoLikes();
  const newlikeList = allVideoLikes.map((vid)=>{

    for(const prop in vid){
      if (prop == parseInt(videoId)){
        vid[parseInt(videoId)] = newCurrentVideoLikes
        break;
      }
    }

    return vid
  });
  let videoObject = getVideoData(videoId);
  videoObject.likes = ( videoObject.likes > 0 ? videoObject.likes-- : 0 );

  const allVideosUploaded = getAllUploads()
  const updatedVideosAfterUnlike = allVideosUploaded.map((video)=>{
    if(video.id == videoId) return  {...videoObject};
    else{ return video; }
  })

  refreshDB("videoLikes", JSON.stringify(newlikeList));
  refreshDB("uploads", JSON.stringify(updatedVideosAfterUnlike))
}