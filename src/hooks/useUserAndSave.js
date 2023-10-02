import { useState, useEffect } from "react";
import { getUser, updateUser } from "@/services/users";

function useUserAndSave(userAT){
  const [user, setuser] = useState(null);
  useEffect(() => {
    (async () => {
      const user = (await getUser(userAT?.id)).data.user;
      setuser(user);
    })();
  }, [userAT]); 

  const setUserAndSave = async (newUser) => {
    await updateUser(userAT?.id , newUser)
    setuser(newUser)
  }

  return [user, setUserAndSave];
}

export default useUserAndSave;