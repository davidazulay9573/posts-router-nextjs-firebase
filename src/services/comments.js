import httpService from "./httpService";

httpService.setCommonHeader("secret", process.env.NEXT_PUBLIC_API_SECRET);

export function getComments() {
  return httpService.get(`/comments`);
}

export async function getComment(commentId) {
  return httpService.get(`/comments/${commentId}`);
}

export function saveComment(comment) {
  return httpService.comment("/comments", comment);
}

export function updateComment(commentId, newcomment) {
  return httpService.put(`/comments/${commentId}`, newcomment);
}

export function deleteComment(commentId) {
  return httpService.delete(`/comments/${commentId}`);
}
