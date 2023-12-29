function IntroCardInfo({ name, position, src }) {
  return (
    <div className="card-info">
      <img
        src={src}
        alt="Ceo avatar"
      />
      <div className="info">
        <h3>{name}</h3>
        <p>{position}</p>
      </div>
    </div>
  );
}

export default IntroCardInfo;
