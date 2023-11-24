import { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Typography, Container, Paper } from "@mui/material";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/testimonialsData.json");
        const data = await response.json();
        setTestimonials(data);
      } catch (error) {
        console.error("Error fetching testimonials data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container sx={{ my: "68px" }}>
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          font: "700px",
          mb: "26px",
          color: "primary",
        }}
        gutterBottom
      >
        Testimonials
      </Typography>
      <Carousel
        showArrows={false}
        showStatus={false}
        showThumbs={false}
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        interval={5000}
      >
        {testimonials.map((testimonial, index) => (
          <Paper
            key={index}
            sx={{
              padding: 3,
              textAlign: "center",
              height: "200px",
              overflow: "auto",
            }}
          >
            <Typography variant="h5" gutterBottom>
              {testimonial.campName}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              Date: {testimonial.date}
            </Typography>
            <Typography
              sx={{ maxWidth: "md", textAlign: "center", mx: "auto" }}
              variant="body2"
            >
              {testimonial.feedback}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Rating: {testimonial.rating}
            </Typography>
          </Paper>
        ))}
      </Carousel>
    </Container>
  );
};

export default Testimonials;
