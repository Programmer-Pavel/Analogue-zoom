import { Box } from "@mui/material";
import React from "react";

export const User = ({ onSelectUser, user }: any) => {
  return (
    <Box bgcolor="gray" onClick={() => onSelectUser(user)}>
      <Box display="flex" gap="10px">
        <Box display="flex">
          {user.username} {user.self ? " (yourself)" : ""}
        </Box>

        {user.connected ? "online" : "offline"}
      </Box>
      {user.hasNewMessages && <div>!</div>}
    </Box>
  );
};
