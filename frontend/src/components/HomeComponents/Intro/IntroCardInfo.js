
function IntroCardInfo({name, position}) {
  return (
    <div className="card-info">
      <img src="https://images.unsplash.com/photo-1493946740644-2d8a1f1a6aff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYW5zcG9ydGF0aW9ufGVufDB8fDB8fHww" 
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
