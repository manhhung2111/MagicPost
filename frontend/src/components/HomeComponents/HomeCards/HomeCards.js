import HomeCard from "./HomeCard";
import "./HomeCard.scss";
import freightTruck from "../../../assets/freight_truck.jpg";
import freightShip from "../../../assets/freight_ship.jpg";
import freightRailRoad from "../../../assets/freight_railroad.jpg";
import Container from "react-bootstrap/Container";

function HomeCards() {
  const cards = [
    {
      title: "Freight Truck Logistics",
      description: `Magic Post provides a range of integrated supply chain and logistics products
       designed to meet the needs of all types of businesses.`,
      imgSrc: freightTruck,
    },
    {
      title: "Freight Ship Transportation",
      description: `Magic Post provides a range of integrated supply chain and logistics products
         designed to meet the needs of all types of businesses.`,
      imgSrc: freightShip,
    },
    {
      title: "Railroad Freight Shipments",
      description: `Magic Post provides a range of integrated supply chain and logistics products
         designed to meet the needs of all types of businesses.`,
      imgSrc: freightRailRoad,
    },
  ];
  return (
    <Container className="home-cards-container">
      {cards.map((card, index) => {
        return (
          <HomeCard
            title={card.title}
            description={card.description}
            imgSrc={card.imgSrc}
            key={index}
          />
        );
      })}
    </Container>
  );
}

export default HomeCards;
