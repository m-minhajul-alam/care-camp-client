import Banner from "../../Componants/Banner/Banner";
import Testimonials from "../../Componants/Testimonials/Testimonials";
import PopularCamp from "../../PopularCamps/PopularCamps";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <PopularCamp></PopularCamp>
      <Testimonials></Testimonials>
    </div>
  );
};

export default Home;