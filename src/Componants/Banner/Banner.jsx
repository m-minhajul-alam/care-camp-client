import { Container } from "@mui/system";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Banner = () => {
  return (
    <Container sx={{ maxWidth: "lg", maxHeight: "600px" }}>
      <Carousel
        showThumbs={false}
        autoPlay={true}
        infiniteLoop={true}
        showStatus={false}
        showArrows={false}
        style={{ height: "100%" }}
      >
        <div>
          <img
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            src="https://i.ibb.co/VMjm0GQ/telehealth-consultation.jpg"
            alt="Telehealth Consultation"
          />
        </div>
        <div>
          <img
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            src="https://i.ibb.co/FhXHBfZ/coronavirus-vaccine.jpg"
            alt="Coronavirus Vaccine"
          />
        </div>
        <div>
          <img
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            src="https://i.ibb.co/S08j2jr/coronavirus-medical-staff.jpg"
            alt="Coronavirus Medical Staff"
          />
        </div>
      </Carousel>
    </Container>
  );
};

export default Banner;
