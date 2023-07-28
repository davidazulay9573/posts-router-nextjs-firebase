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
   
}

async function getFollowers(userId){
  try {
   const querySnapshot = await usersRef
     .where("followers", "array-contains", userId)
     .get();

   querySnapshot.forEach((doc) => {
     console.log(doc.id, " => ", doc.data());
   });
 } catch (error) {
   console.log("Error getting documents: ", error);
 }
}

async function getFriendRequests(userId){
   try {
   const querySnapshot = await usersRef
     .where("friendRequests", "array-contains", userId)
     .get();

   querySnapshot.forEach((doc) => {
     console.log(doc.id, " => ", doc.data());
   });
 } catch (error) {
   console.log("Error getting documents: ", error);
 }
}



