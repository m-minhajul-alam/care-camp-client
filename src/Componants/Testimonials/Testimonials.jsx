// import { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
  Typography,
  Container,
  Paper,
  CircularProgress,
  Rating,
} from "@mui/material";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "react-query";
import { Box } from "@mui/system";

const Testimonials = () => {
  const axiosPublic = useAxiosPublic();

  const {
    isPending,
    isError,
    error,
    data: feedbacks,
  } = useQuery({
    queryKey: ["feedbacks"],
    queryFn: async () => {
      const res = await axiosPublic.get("/feedbacks");
      return res.data;
    },
  });
  if (isPending) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          color: "red",
        }}
      >
        {error.message}
      </Box>
    );
  }

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("/testimonialsData.json");
  //       const data = await response.json();
  //       setTestimonials(data);
  //     } catch (error) {
  //       console.error("Error fetching testimonials data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <Container sx={{ my: "68px" }}>
      <Typography variant="h4" align="center" color="primary" sx={{ mb: 4 }}>
        Testimonials
      </Typography>

      <Carousel
        showArrows={false}
        showStatus={false}
        showThumbs={false}
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        interval={2000}
      >
        {feedbacks &&
          feedbacks?.map((feedback, index) => (
            <Paper
              key={index}
              sx={{
                padding: 3,
                textAlign: "center",
                height: "200px",
                overflow: "auto",
              }}
            >
              <Typography variant="h6" color="textSecondary" gutterBottom>
                {feedback.name}
              </Typography>

              <Rating
                name="rating"
                sx={{ mt: 1 }}
                defaultValue={feedback.rating}
                readOnly
              />

              <Typography
                sx={{ maxWidth: "md", textAlign: "center", m: "auto" }}
                variant="body2"
                color="textSecondary"
              >
                {feedback.feedback}
              </Typography>
            </Paper>
          ))}
      </Carousel>
    </Container>
  );
};

export default Testimonials;
