import Banner from "../../Componants/Banner/Banner";
import Testimonials from "../../Componants/Testimonials/Testimonials";
import PopularCamp from "../../PopularCamps/PopularCamps";
import UpcomingCamps from "../../Componants/UpcomingCamps/UpcomingCamps";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <PopularCamp></PopularCamp>
      <Testimonials></Testimonials>
      <UpcomingCamps></UpcomingCamps>
    </div>
  );
};

export default Home;
