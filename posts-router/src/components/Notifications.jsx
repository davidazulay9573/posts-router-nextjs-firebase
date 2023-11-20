'use client'
import { useState, useEffect } from "react"
import { getNotifications } from "@/services/notifications"
import NotificationCard from "./NotificationCard"
export default function Notifications({session}){
    const [notifications, setNotifications] = useState([])
    useEffect(() => {
       (async () => {
         setNotifications((await getNotifications(session?.user.id)).data)
       })()
    },[session])
        if (!notifications.length){
            return( <div className="m-4 items-center text-center ">Dont have notifications yet</div>)
        }
          return (
            <div className="m-4 items-center text-center ">
              {notifications.map((not) => {
                return <NotificationCard key={not.id} notification={not} />;
              })}
            </div>
          );
}