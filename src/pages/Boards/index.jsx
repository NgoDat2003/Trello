import { Container } from "@mui/material";
import React, { useState } from "react";

import AppBar from "~/components/AppBar";
import BoardBar from "~/components/AppBar/BoardBar/BoardBar";
import BoardContent from "./BoardContent/BoardContent";
import { mockData } from "~/apis/mock-data";

export default function Boards() {

  console.log("Boards render", mockData);
  
  return (
    <Container maxWidth={false} disableGutters sx={{ height: "100vh" }}>
      <AppBar />
      <BoardBar board= {mockData?.board}/>
      <BoardContent board= {mockData?.board}/>
    </Container >
  );
}
