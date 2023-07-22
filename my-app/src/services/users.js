import httpService from "./httpService";

export async function getUsers(){
  return httpService.get('/users');
}