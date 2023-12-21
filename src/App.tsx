import { useEffect, useState } from "react";
import React from "react";
// import { Modal } from "./components/Modal";
// import { Clock } from "./components/clock/Clock";
// import { GradientRoundedBorder } from "./components/gradient-rounded-border/GradientRoundedBorder";
// import { Typography } from "@mui/material";
// import { VideoPlayer } from "./components/VideoPlayer";
// import { ContextProvider } from "../SocketContext";
import { socket } from "../socket";
import { ConnectionState } from "./components/ConnectionState";
import { Chat } from "./components/chat/Chat";

export const App = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    const sessionID = localStorage.getItem("sessionID");

    if (sessionID) {
      socket.auth = { sessionID };
      socket.connect();
    }

    function sessionSet({ sessionID, userID }: any) {
      socket.auth = { sessionID };
      localStorage.setItem("sessionID", sessionID);
      // @ts-expect-error fix it
      socket["userID"] = userID;
    }

    function getUsers(users: string[]) {
      setUsers(users)
    }


    socket.on("session", sessionSet);
    socket.on("users", getUsers);
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("session", sessionSet);
      socket.off("users", getUsers);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  const onConnectBtn = () => {
    socket.connect();
  };

  const onDisConnectBtn = () => {
    socket.disconnect();
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '300px', background: 'gray' }}>
        {
          users.map(el => <div>{el}</div>)
        }
      </div>
      <div>
        <button onClick={onConnectBtn}>connect</button>
        <button onClick={onDisConnectBtn}>disconnect</button>
        <ConnectionState isConnected={isConnected} />
        <Chat />
      </div>
    </div>
  );
};

{
  /* <Events events={ fooEvents } />
      <ConnectionManager />
      <MyForm /> */
}

{
  /* <VideoPlayer /> */
}

{
  /* <button onClick={() => setIsShow(true)}>show modal</button>
            <Modal isShow={isShow} setIsShow={setIsShow} />

            <div style={{ background: "blue" }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
                minima maiores ipsa quod fugit autem quis laudantium molestias
                cum iste. Fugit, odit voluptatum tempora non qui pariatur unde
                harum! Pariatur?
            </div>

            <Clock />

            <GradientRoundedBorder /> */
}
// </ContextProvider>
