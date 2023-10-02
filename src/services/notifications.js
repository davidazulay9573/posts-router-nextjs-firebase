import httpService from "./httpService";

httpService.setCommonHeader("secret", process.env.NEXT_PUBLIC_API_SECRET);

export function getNotifications(userReceives) {
  return httpService.get(`/notifications/?user-receives=${userReceives}`);
}

export function sendNotification(notification) {
  return httpService.post("/notifications", notification);
}
