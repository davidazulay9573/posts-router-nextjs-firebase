import httpService from "./httpService";
httpService.setCommonHeader("secret", process.env.NEXT_PUBLIC_API_SECRET);
export function getUsers(){
  return httpService.get('/users');
}

export function getUser(userId){
  return httpService.get(`/users/${userId}`);
}

export function updateUser(id, user){
  return httpService.put(`/users/${id}`,user);
  
}
