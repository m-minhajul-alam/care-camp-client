import { Container } from "@mui/system";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Banner = () => {
  return (
    <Container sx={{ maxWidth: "lg", maxHeight: "60vh" }}>
      <Carousel
        showThumbs={false}
        autoPlay={true}
        infiniteLoop={true}
        showStatus={false}
        showArrows={false}
      >
        <div>
          <img
            style={{ height: "60vh", objectFit: "cover" }}
            src="https://i.ibb.co/VMjm0GQ/telehealth-consultation.jpg"
          />
        </div>
        <div>
          <img
            style={{ height: "60vh", objectFit: "cover" }}
            src="https://i.ibb.co/FhXHBfZ/coronavirus-vaccine.jpg"
          />
        </div>
        <div>
          <img
            style={{ height: "60vh", objectFit: "cover" }}
            src="https://i.ibb.co/S08j2jr/coronavirus-medical-staff.jpg"
          />
        </div>
      </Carousel>
    </Container>
  );
};

export default Banner;
