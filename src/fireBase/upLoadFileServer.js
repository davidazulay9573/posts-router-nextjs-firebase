import admin from "./fireBaseAdmin";
import { getStorage, getDownloadURL } from "firebase-admin/storage";
import fs from 'node:fs'

const bucket = admin.storage().bucket();
export async function uploadImageServer(filePath) {
  try {
    const [file] = await bucket.upload(filePath, {
      metadata: {
        contentType: "image/png",
      },
      public: true,
      validation: "md5",
    });

    const url = await getDownloadURL(file);
     fs.unlinkSync(filePath);
    return url;
  } catch (error) {
    console.error("Error uploading file:", error);
  }
}
