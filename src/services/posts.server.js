import admin from "@/fireBase/fireBaseAdmin";
const db = admin.firestore();

export async function getPostsServer() {
  const snapshot = await db
    .collection("posts")
    .orderBy("createdAt", "desc")
    .get();
  const posts = snapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });
 return  posts;
}
