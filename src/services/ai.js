import httpService from "./httpService"
httpService.setCommonHeader("secret", process.env.NEXT_PUBLIC_API_SECRET);

export function generateImag(prompt,imagePath){
 return httpService.post('/ai/images',{prompt,imagePath});
}

export function saveImage(url, imagePath){
 return httpService.put("/ai/images", {url , imagePath });
}