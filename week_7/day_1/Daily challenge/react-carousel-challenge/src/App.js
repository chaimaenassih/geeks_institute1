// src/App.js
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "./App.css";

const images = [
  {
    label: "Hong Kong",
    url: "https://res.klook.com/image/upload/fl_lossy.progressive,q_65/c_fill,w_480,h_384/cities/jrfyzvgzvhs1iylduuhj.jpg", 
  },
  {
    label: "Macao",
    url: "https://res.klook.com/image/upload/fl_lossy.progressive,q_65/c_fill,w_480,h_384/cities/c1cklkyp6ms02tougufx.webp", 
  },
  {
    label: "Japan",
    url: "https://res.klook.com/image/upload/fl_lossy.progressive,q_65/c_fill,w_480,h_384/cities/e8fnw35p6zgusq218foj.webp", 
    
  },
  {
    label: "Las Vegas",
    url: "https://res.klook.com/image/upload/fl_lossy.progressive,q_65/c_fill,w_480,h_384/cities/liw377az16sxmp9a6ylg.webp", 
  },
];

function App() {
  return (
    <div className="container my-5">
      <Carousel
        showArrows={true}
        showThumbs={true}      
        showStatus={true}      
        infiniteLoop={true}
        autoPlay={true}
        interval={3000}
        swipeable={true}
        emulateTouch={true}
        dynamicHeight={false}
      >
        {images.map((img, index) => (
          <div key={index}>
            <img src={img.url} alt={img.label} />
            <p className="legend">{img.label}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default App;
