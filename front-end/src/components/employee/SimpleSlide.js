import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";

export default function SimpleSlide() {
  const [hidden, setHidden] = useState(true);

  return (
    <div>
      <h1> Hello World </h1>
      {!hidden ? <p>You can see me!</p> : null}
      <button onClick={() => setHidden(s => !s)}>
        react show hide component
      </button>
    </div>
  );
}