import React from "react";
import Tuturi from "../img/tuturi.png";
function header() {
  return (
    <div className="flex bg-blue-400 ">
      <div className="size-16 m-3 jus">
        <img src={Tuturi} alt="image" />
      </div>
      <div></div>
    </div>
  );
}

export default header;
