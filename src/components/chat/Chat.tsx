import React, {
  Fragment,
  useEffect,
  useRef,
  useState,
} from "react";
import { socket } from "../../../socket";
import { MessagePanel } from "../message-panel/MessagePanel";

interface ChatProps {
  users: any[]
  selectedUser: any
  setUsers: (value: any[]) => void
  setSelectedUser: (value: any) => void
}

export const Chat = ({users, setUsers, selectedUser, setSelectedUser}: ChatProps) => {
  useEffect(() => {
    socket.on("private message", ({ content, from, to }) => {
      // @ts-expect-error fix
      const fromSelf = socket.userID === from;

      const changedData = users?.map((item) => {
        if(item?.userID === ( fromSelf ? to : from )) {
          return {
            ...item,
            messages: [
              ...item?.messages,
              {
                content,
                fromSelf
              }
            ],
            hasNewMessages: item?.userID !== selectedUser?.userID ? true : false
          }
        }
        return item
      })

      setUsers(changedData);
    });

    return () => {
      socket.off("private message");
    };
  }, [users]);

  const onMessage = (content: any) => {
    if (selectedUser) {
      socket.emit("private message", {
        content,
        to: selectedUser.userID,
      });
      setSelectedUser((prevState: any) => {
        if(prevState) {
          return {
            ...prevState,
            messages: [
              ...prevState?.messages,
              {
                content,
                fromSelf: true,
              },
            ],
          }
        } else {
          return prevState
        }
      });
    }
  };

  return (
    <MessagePanel onMessage={onMessage} user={selectedUser} />
  );
};
