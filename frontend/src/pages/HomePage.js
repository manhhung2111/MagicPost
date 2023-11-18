import Intro from "../components/HomeComponents/Intro/Intro";
import HomeCards from "../components/HomeComponents/HomeCards/HomeCards";
import HomeServices from "../components/HomeComponents/HomeServices/HomeServices";
import HomeTestimonials from "../components/HomeComponents/HomeTestimonials/HomeTestimonials";
import HomeFAQ from "../components/HomeComponents/HomeFAQ/HomeFAQ";
import Slider from "../components/HomeComponents/Slider/Slider";
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
