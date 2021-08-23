import axios from "axios";

const api = axios.create({
    headers: {
        'Content-Type': 'multipart/form-data'
    }
})

export const uploadThumbnail = async (image) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "ft5o86u2grishon");
  formData.append("cloud_name", "dh5acw9p6");
  
  const data = await api.post(
    "https://api.cloudinary.com/v1_1/dh5acw9p6/image/upload",
    formData
  ).then(({data}) => data)
  return data.url;
};

export const uploadVideo = async (vid) => {
    const formData = new FormData();
    formData.append("file", vid);
    formData.append("upload_preset", "ft5o86u2grishon");
    formData.append("cloud_name", "dh5acw9p6");
    
    const data = await api.post(
      "https://api.cloudinary.com/v1_1/dh5acw9p6/video/upload",
      formData
    ).then(({data}) => data)
    return data.url
  };
