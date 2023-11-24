import Banner from "../../Componants/Banner/Banner";
import Testimonials from "../../Componants/Testimonials/Testimonials";
import PopularCamp from "../../PopularCamps/PopularCamps";
import UpcomingCamps from "../../Componants/UpcomingCamps/UpcomingCamps";
import HealthTips from "../../Componants/HealthTips/HealthTips";
import Footer from "../../Componants/Footer/Footer";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <PopularCamp></PopularCamp>
      <UpcomingCamps></UpcomingCamps>
      <HealthTips></HealthTips>
      <Testimonials></Testimonials>
      <Footer></Footer>
    </div>
  );
};

export default Home;
