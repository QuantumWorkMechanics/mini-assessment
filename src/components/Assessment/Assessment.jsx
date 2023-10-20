import React, { useState, useEffect } from "react";
import NavBar from "../Navigation/NavBar";
import { Widget } from "@typeform/embed-react";

export default function Assessment() {
  return (
    <>
      <NavBar />
      <div className="w-screen h-screen">
        <Widget id="sMl7Q9WK" style={{ height: "100%" }} className="my-form" />
      </div>
    </>
  );
}
