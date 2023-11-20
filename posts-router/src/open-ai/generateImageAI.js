import openai from "./config";
import fs from "node:fs"
import axios from "axios";

export async function generateImagAI(prompt) {
const response = await openai.createImage({
  prompt,
  n: 1,
  size: "1024x1024",
});
 
 return response.data.data[0].url

}
export async function createFile(url,imagePath){
  const imageFile = await axios({
  method: "get",
  url: url,
  responseType: "stream",
})
const imageWS = fs.createWriteStream(imagePath);
return new Promise((resolve, reject) => {
  imageFile.data
    .pipe(imageWS)
    .on("finish", () => resolve(imagePath)) 
    .on("error", reject); 
});
}
