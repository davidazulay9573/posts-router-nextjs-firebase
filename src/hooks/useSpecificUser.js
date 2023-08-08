import { useState, useEffect } from "react";
import { getUser } from "@/services/users";
const useSpicificUser = (userId) => {
    const [user, setuser] = useState(null);
    useEffect(() => {
      (async () => {
        const user = (await getUser(userId)).data.user;
        setuser(user);
      })();
    }, []);

  return user;
}

export default useSpicificUser;