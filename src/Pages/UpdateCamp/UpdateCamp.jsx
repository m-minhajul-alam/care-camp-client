import { CircularProgress, Typography } from "@mui/material";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Box, Container } from "@mui/system";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const UpdateCamp = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigaet = useNavigate();
  const axiosPublic = useAxiosPublic();

  const {
    isPending,
    isError,
    error,
    isFetching,
    data: camps,
  } = useQuery({
    queryKey: ["camps"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/camps/${id}`);
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

  if (!camps) {
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
    const updateCampInfo = {
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

    axiosPublic.patch(`/camps/${camps._id}`, updateCampInfo).then((data) => {
      if (data.data.modifiedCount > 0) {
        toast.success("Camp Details Updated");
        navigaet("/dashboard/manageCamps");
      }
    });
  };

  return (
    <Container>
      <Helmet>
        <title>Care Camp | Dashboard | Upadate Camp</title>
      </Helmet>

      <Typography variant="h4" align="center" color="primary" sx={{ mb: 4 }}>
        Update Camp
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
            defaultValue={camps.campName}
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
            defaultValue={camps.image}
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
            defaultValue={camps.campFees}
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
            defaultValue={camps.scheduledDateTime}
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
            defaultValue={camps.venueLocation}
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
            defaultValue={camps.specializedService}
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
            defaultValue={camps.healthcareProfessional}
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
            defaultValue={camps.targetAudience}
            required
            style={{ width: "100%", height: "40px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="description">Comprehensive Description</label>
          <textarea
            id="description"
            name="description"
            defaultValue={camps.description}
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

export default UpdateCamp;
