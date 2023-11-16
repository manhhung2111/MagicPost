import Intro from "../components/Intro/Intro";
import HomeCards from "../components/HomeCards/HomeCards";
import HomeServices from "../components/HomeServices/HomeServices";
import HomeTestimonials from "../components/HomeTestimonials/HomeTestimonials";
import HomeFAQ from "../components/HomeFAQ/HomeFAQ";
import Slider from "../components/Slider/Slider";
function HomePage() {
  return (
    <>
      <Slider />
      <Intro />
      <HomeCards />
      <HomeServices />
      <HomeTestimonials />
      <HomeFAQ />
    </>
  );
}

export default HomePage;
