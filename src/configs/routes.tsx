import React from 'react';
import { Routes, Route } from "react-router-dom";
import { PrivateRoutes } from "./PrivateRoutes";
import { Layout } from '../components/layout/Layout';
import { SignIn } from '../components/sign/Sign';
import { Chat } from '../components/chat/Chat';

export const AppRoutes = () => (
  <Routes>
    {/* private routes */}
    <Route element={<PrivateRoutes />}>
      <Route path="/" element={<Layout />}>
        <Route path="/chat" element={<Chat />} />
      </Route>
    </Route>

    {/* public routes */}
    <Route path="/login" element={<SignIn />} />
    {/* <Route path="/register" element={<Register />} />
    <Route path="*" element={<Missing />} /> */}
  </Routes>
);