function HomeService({ imgSrc, title, description }) {
  return (
    <div className="home-service-container">
      <img src={imgSrc} alt={`service ${title}`} />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default HomeService;
