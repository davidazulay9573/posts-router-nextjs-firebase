import {
  ref,
  uploadBytes,
  getDownloadURL,
  
} from "firebase/storage";
import { storage } from "./fireBase";

  const uploadFile = async(imageUpload) => {

    if (!imageUpload) return;
    const imageRef = ref(storage, `images/${imageUpload.name }`);
    const snapshot = await uploadBytes(imageRef, imageUpload);
    const url = await getDownloadURL(snapshot.ref);
     return url
  };

  export default uploadFile;