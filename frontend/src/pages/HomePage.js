import Intro from "../components/HomeComponents/Intro/Intro";
import HomeCards from "../components/HomeComponents/HomeCards/HomeCards";
import HomeServices from "../components/HomeComponents/HomeServices/HomeServices";
import HomeTestimonials from "../components/HomeComponents/HomeTestimonials/HomeTestimonials";
import HomeFAQ from "../components/HomeComponents/HomeFAQ/HomeFAQ";
import Slider from "../components/HomeComponents/Slider/Slider";
import { useEffect } from "react";
function HomePage() {
  useEffect(() => {
    const scrollToSection = (id) => {
      const element = document.getElementById(id);
      if (element) {
        // 👇 Will scroll smoothly to the top of the next section
        console.log("hi");
        element.scrollIntoView({ behavior: "smooth" });
      }
    };
    scrollToSection("home-page");
  }, [])
  return (
    <div id="home-page">
      <Slider />
      <Intro />
      <HomeCards />
      <HomeServices />
      <HomeTestimonials />
      <HomeFAQ />
    </div>
  );
}

export default HomePage;
