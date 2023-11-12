import Container from "react-bootstrap/Container";
import HomeService from "./HomeService";
import "./HomeService.scss";

function HomeServices() {
  const services = [
    {
      title: "Track and trace",
      description:
        "From warehouse to warehouse or port to port, track your cargo wherever it is in the world, 24/7.",
      imgSrc:
        "https://www.maersk.com/~/media_sc9/maersk/solutions/transportation-services/maersk-go/route_blue.svg?w=1000&hash=24F8CD4645F56F5CE6086D7D03A844AB",
    },
    {
      title: "Hassle-free paperwork",
      description:
        "View, manage and complete all necessary tasks online. We'll let you know what you need to do and when.",
      imgSrc:
        "https://www.maersk.com/~/media_sc9/maersk/solutions/transportation-services/maersk-go/computer_blue.svg?w=1000&hash=4D112C324545F140CE2549F7D27AD1C2",
    },
    {
      title: "Simple reporting",
      description:
        "Generate reports quickly and easily, so you can make the most of your data and take informed decisions.",
      imgSrc:
        "https://www.maersk.com/~/media_sc9/maersk/solutions/transportation-services/maersk-go/book-open_blue.svg?w=1000&hash=A198EE2061539E8D90260C2B1147F945",
    },
    {
      title: "Collaborate with partners",
      description:
        "Work on shipments with your buyer or supplier, so you'll always have full transparency about who's doing what.",
      imgSrc:
        "https://www.maersk.com/~/media_sc9/maersk/solutions/transportation-services/maersk-go/handshake_blue.svg?w=1000&hash=85F579DCB5AFCA5DD31CEF3352D62028",
    },
  ];
  return (
    <Container className="home-services-container">
      <h2>It's your one-stop shop for integrated logistics</h2>
      <p>
        Book and track shipments every step of the way, collaborate with your
        partners based on Incoterms, fill out shipping documents, and create
        neat reports — all in one place.
      </p>
      <div className="services">
        {services.map((service) => {
          return (
            <HomeService
              title={service.title}
              description={service.description}
              imgSrc={service.imgSrc}
            />
          );
        })}
      </div>
    </Container>
  );
}

export default HomeServices;
