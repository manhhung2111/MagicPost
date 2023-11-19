import Carousel from "react-bootstrap/Carousel";
import React, { useState } from "react";
import airFreight from "../../../assets/header_air_cargo.jpg";
import truckFreight from "../../../assets/header_truck.jpg";
import shipFreight from "../../../assets/header_ship.jpg";
import "./Slider.scss";
function Slider() {
  const slides = [
    {
      image: truckFreight,
      title: "Truck Freight",
      subTitle: `Magic Post has specialized in the handling and transportation of bulk commodities for the agricultural industry
        since its inception in 1998. The grain handling industry has experienced significant changes since that time. 
        Advances in grain handling technologies, along with the continued increase in size of farming operations has 
        had an impact on grain transportation and logistics.`,
      interval: 5000,
    },
    {
      image: shipFreight,
      title: "Ship Freight",
      subTitle: `Ocean freight shipping is the method of transporting containerised cargo loaded onto vessels by sea. Over 90% 
        of all the world's trade is carried by sea. If you want to ship your freight around the world, ocean freight is 
        the most convenient option. As a general rule, shipments weighing more than 100kg - or consisting of multiple 
        cartons - will be sent by sea freight. The containers are designed and built for intermodal freight transport. 
        That means the containers can be used across various transportation modes - from ship to rail to truck - 
        without unloading and reloading the cargo.`,
      interval: 5000,
    },
    {
      image: airFreight,
      title: "Air Freight",
      subTitle: `If you rely on air freight for your business, rely on Yusen Logistics for cost-effective, smooth delivery of 
        your cargo via our air freight forwarding services. Thanks to our strategic alliances around the globe, 
        you have the flexibility to choose from a range of air freight service options tailored to your precise needs, 
        complete with end-to-end visibility.`,
      interval: 5000,
    },
  ];
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel
      activeIndex={index}
      onSelect={handleSelect}
      // fade={true}
      className="carousel-container"
      // pause= {false}
      // touch={true}
      // slide={true}
    >
      {slides.map((slide) => (
        <Carousel.Item key={slide.image} interval={slide.interval}>
          <img
            className="d-block w-100 image"
            src={slide.image}
            alt="First slide"
          />
          <Carousel.Caption className="caption">
            <h1>{slide.title}</h1>
            <p>{slide.subTitle}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default Slider;
