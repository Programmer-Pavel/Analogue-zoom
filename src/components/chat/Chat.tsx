import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState,
} from "react";
import styles from "./Chat.module.scss";
import TextField from "@mui/material/TextField/TextField";
import Button from "@mui/material/Button/Button";
import { Box } from "@mui/material";
import { socket } from "../../../socket";

export const Chat = () => {
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState<any>([]);

  useEffect(() => {
    socket.on("get messages", (args) => {
      setMessages(args);
    });
  }, []);

  const sessionID = localStorage.getItem("sessionID");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    socket.emit("send message", value);
    socket.on("messagesUpdate", (data: any) => {
      setMessages(data);
    });
    setValue("");
  };

  return (
    <Box border="1px solid gray" padding="10px">
      <Box width="100%" height="100%" display="flex" flexDirection="column">
        {
          messages?.map((el: any) => (
            <Box
              key={el.message}
              display="flex"
              alignItems="flex-end"
              width="max-content"
              bgcolor={`${sessionID === el.id ? "gray" : "rgb(141, 95, 95)"}`}
              padding="5px"
              mb="5px"
              mt="5px" 
            >
              {el.message} ({el.createdDate})
            </Box>
          )
         )
        }
      </Box>

      <Box
        component="form"
        display="flex"
        alignItems="center"
        gap="20px"
        width="600px"
        mt="10px"
        onSubmit={onSubmit}
      >
        <TextField
          value={value}
          fullWidth
          placeholder="textarea"
          multiline
          rows={2}
          onChange={onChange}
        />

        <Button type="submit" variant="contained" style={{ width: "20%" }}>
          Send
        </Button>
      </Box>
    </Box>
  );
};
