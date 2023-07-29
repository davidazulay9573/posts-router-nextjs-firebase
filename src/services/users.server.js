import admin from "@/fireBase/fireBaseAdmin";
const db = admin.firestore();

export async function getFriends(userId){
 try {
  const snapshot = await db
    .collection("users")
    .where("friends", "array-contains", userId)
    .get();
  const friends = snapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });
  return friends;
 } catch (error) {
  console.error(error);
 }
  return [];
}

export async function getFollowers(userId){
 try {
   const snapshot = await db
     .collection("users")
     .where("followers", "array-contains", userId)
     .get();
   const friends = snapshot.docs.map((doc) => {
     return {
       id: doc.id,
       ...doc.data(),
     };
   });
   return friends;
 } catch (error) {
   console.error(error);
 }
 return [];
}

export async function getFriendRequests(userId){
  try {
    const snapshot = await db
      .collection("users")
      .where("friendRequests", "array-contains", userId)
      .get();
    const friends = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    return friends;
  } catch (error) {
    console.error(error);
  }
  return [];
}



