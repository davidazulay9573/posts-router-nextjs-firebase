import httpService from "./httpService";

export function getUsers(){
  return httpService.get('/users');
}