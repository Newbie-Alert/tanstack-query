import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import GlobalStyles from "../common/GlobalStyles";
import styled from "styled-components";
import SideBar from "../components/sidebar/SideBar";
import Task from "../pages/task/Task";
import Layout from "../layout/Layout";
import DashBoard from "../pages/dashboard/DashBoard";

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
`;

export default function Rotuer() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Layout />
      <ContentWrapper>
        <SideBar />
        <Routes>
          <Route path="/tasks" element={<Task />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </ContentWrapper>
    </BrowserRouter>
  );
}
