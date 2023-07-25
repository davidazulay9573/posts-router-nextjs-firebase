import httpService from "./httpService";

export async function signUp(user){
  return httpService.post("/auth/sign-up", user);
  
}