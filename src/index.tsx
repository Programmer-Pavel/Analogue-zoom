import { createRoot } from "react-dom/client";
import React from "react";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { App } from "./App";
import { Chat } from "./components/chat/Chat";
//@ts-expect-error fix
import ru from "react-timeago/lib/language-strings/ru";
// @ts-expect-error fix
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";

buildFormatter(ru);

const rootElement = document.getElementById("root");

if (!rootElement) throw new Error("Failed to find the root element");
const root = createRoot(rootElement);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // children: [
    //   {
    //     path: "userchat/:id",
    //     element: <NewChat />,
    //   },
    // ],
  },
]);

root.render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  // </React.StrictMode>
);
