import CountUp from "react-countup";

function Counter({ end, duration, decimal }) {
  return (
    <CountUp
      start={0}
      end={end}
      duration={duration ?? 2}
      separator=","
      decimals={decimal ?? 0}
      decimal="."
      className="counter"
    />
  );
}

export default Counter;
