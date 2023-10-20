import React from "react";
import logo from "../../assets/GreyLogo.png";

export default function NavBar() {
  return (
    <div className="h-[60px] md:h-[100px] w-screen bg-[#878787]">
      <img src={logo} alt="" className="h-[40px] md:h-[70px] mt-3 ml-5" />
    </div>
  );
}
