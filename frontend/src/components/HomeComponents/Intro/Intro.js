import IntroCardInfo from "./IntroCardInfo";
import "./Intro.scss";
import Container from "react-bootstrap/Container";

function Intro() {
  return (
    <Container className="intro-container">
      <div className="left-content">
        <h3>WHAT WE DO</h3>
        <h1>We are the best at transportation</h1>
        <p>
          We do our best to implement your ideas into the project to make it
          successful and profitable.
        </p>
        <div className="info-cards">
          <IntroCardInfo name={"Hoang Manh Hung"} position={"Co-founder"} />
          <IntroCardInfo name={"Hoang Hung Manh"} position={"Ceo"} />
          <IntroCardInfo name={"Phan Anh Duc"} position={"Co-founder"} />
        </div>
      </div>
      <div className="right-content">
        <div className="left">
          <p>
            True industry-leading customer experience isn't a vision. It's a
            passion. A passion for our customers whose business is dependent on
            moving the right products to the right market at the right time.
          </p>
          <p>
            Magic Post is for small and medium businesses looking for simple and
            reliable global transportation solutions. You don't need to be a
            shipping expert to get started with Magic Post.
          </p>
        </div>
        <p className="right">
          As Magic Post is striving to be a true integrator of container
          logistics connecting and simplifying our customers' supply chain
          through global end-to-end solutions we just made our customers' life a
          lot easier. We are able to manage the entire product journey for them
          including Inland Services, Magic Post Customs Services, Ocean Freight,
          Warehouse Management and Distribution to name but a few.
        </p>
      </div>
    </Container>
  );
}

export default Intro;
