import Card from "react-bootstrap/Card";

function HomeCard({ title, description, imgSrc }) {
  return (
    <Card className="home-card">
      <Card.Img variant="top" src={imgSrc} className="img" />
      <Card.Body className="info">
        <Card.Title className="title">{title}</Card.Title>
        <Card.Text className="des">{description}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default HomeCard;
