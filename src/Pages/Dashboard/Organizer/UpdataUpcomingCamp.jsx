import { CircularProgress, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";

const UpdataUpcomingCamp = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigaet = useNavigate();
  const axiosPublic = useAxiosPublic();

  const {
    isPending,
    isFetching,
    isError,
    error,
    data: upcomingCamps,
  } = useQuery({
    queryKey: ["upcomingCamps"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/upcomingCamps/${id}`);
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
  if (isFetching) {
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

  if (!upcomingCamps) {
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
        No Data Found
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

  const hendelUpdateCamp = (e) => {
    e.preventDefault();
    const form = e.target;
    const campName = form.campName.value;
    const image = form.image.value;
    const campFees = form.campFees.value;
    const scheduledDateTime = form.scheduledDateTime.value;
    const venueLocation = form.venueLocation.value;
    const specializedService = form.specializedService.value;
    const healthcareProfessional = form.healthcareProfessional.value;
    const targetAudience = form.targetAudience.value;
    const description = form.description.value;
    const updateUpcomingCampInfo = {
      campName,
      image,
      campFees,
      scheduledDateTime,
      venueLocation,
      specializedService,
      healthcareProfessional,
      targetAudience,
      description,
      userEmail: user.email,
    };
    console.log(updateUpcomingCampInfo);

    axiosPublic
      .patch(`/upcomingCamps/${upcomingCamps._id}`, updateUpcomingCampInfo)
      .then((data) => {
        if (data.data.modifiedCount > 0) {
          toast.success("Camp Details Updated");
          navigaet("/dashboard/manageUpcomingCamps");
        }
      });
  };

  return (
    <Container>
      <Helmet>
        <title>Care Camp | Dashboard | Update Upcoming Camp</title>
      </Helmet>

      <Typography variant="h4" align="center" color="primary" sx={{ mb: 4 }}>
        Update Upcoming Camp
      </Typography>

      <form
        onSubmit={hendelUpdateCamp}
        style={{ maxWidth: "400px", margin: "auto" }}
      >
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="campName">Camp Name</label>
          <input
            type="text"
            id="campName"
            name="campName"
            defaultValue={upcomingCamps.campName}
            required
            style={{ width: "100%", height: "40px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="image">Image Link</label>
          <input
            type="url"
            id="image"
            name="image"
            defaultValue={upcomingCamps.image}
            readOnly
            required
            style={{ width: "100%", height: "40px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="campFees">Camp Fees</label>
          <input
            type="number"
            id="campFees"
            name="campFees"
            defaultValue={upcomingCamps.campFees}
            required
            style={{ width: "100%", height: "40px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="scheduledDateTime">Scheduled Date and Time</label>
          <input
            type="datetime-local"
            id="scheduledDateTime"
            name="scheduledDateTime"
            defaultValue={upcomingCamps.scheduledDateTime}
            required
            style={{ width: "100%", height: "40px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="venueLocation">Venue Location</label>
          <input
            type="text"
            id="venueLocation"
            name="venueLocation"
            defaultValue={upcomingCamps.venueLocation}
            required
            style={{ width: "100%", height: "40px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="specializedService">
            Specialized Services Provided
          </label>
          <input
            type="text"
            id="specializedService"
            name="specializedService"
            defaultValue={upcomingCamps.specializedService}
            required
            style={{ width: "100%", height: "40px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="healthcareProfessional">
            Healthcare Professionals in Attendance
          </label>
          <input
            type="text"
            id="healthcareProfessional"
            name="healthcareProfessional"
            defaultValue={upcomingCamps.healthcareProfessional}
            required
            style={{ width: "100%", height: "40px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="targetAudience">Target Audience</label>
          <input
            type="text"
            id="targetAudience"
            name="targetAudience"
            defaultValue={upcomingCamps.targetAudience}
            required
            style={{ width: "100%", height: "40px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="description">Comprehensive Description</label>
          <textarea
            id="description"
            name="description"
            defaultValue={upcomingCamps.description}
            required
            style={{ width: "100%", height: "200px" }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            background: "#0389ff",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Submit
        </button>
      </form>
    </Container>
  );
};

export default UpdataUpcomingCamp;
