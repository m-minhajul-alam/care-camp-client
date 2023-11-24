import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

const AvailableCamps = () => {
  const [camps, setCamps] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortCriteria, setSortCriteria] = useState("mostRegistered");

  useEffect(() => {
    // Fetch and set the camp data from your API or JSON file
    const fetchCamps = async () => {
      try {
        const response = await fetch("/campData.json");
        const data = await response.json();
        setCamps(data);
      } catch (error) {
        console.error("Error fetching camp data:", error);
      }
    };

    fetchCamps();
  }, []);

  // Function to handle the join camp action
  const joinCamp = (campId) => {
    // Implement your logic for joining a camp, e.g., redirect to a registration page
    console.log(`Joining camp with ID: ${campId}`);
  };

  // Filter and sort the camps based on search and sort criteria
  const filteredCamps = camps.filter(
    (camp) =>
      camp.name && camp.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedCamps = filteredCamps.sort((a, b) => {
    // Implement sorting logic based on the selected criteria
    switch (sortCriteria) {
      case "mostRegistered":
        return b.participantCount - a.participantCount;
      case "targetAudience":
        return a.targetAudience.localeCompare(b.targetAudience);
      case "alphabeticalOrder":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  return (
    <Container sx={{ my: "68px" }}>
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          font: "700px",
          mb: "26px",
          color: "#00A19D",
        }}
        gutterBottom
      >
        Available Camps
      </Typography>

      {/* Optional: Search functionality */}
      <TextField
        label="Search Camps"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Optional: Sort by field */}
      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel id="sortCriteriaLabel">Sort by</InputLabel>
        <Select
          labelId="sortCriteriaLabel"
          id="sortCriteriaSelect"
          value={sortCriteria}
          label="Sort by"
          onChange={(e) => setSortCriteria(e.target.value)}
        >
          <MenuItem value="mostRegistered">Most Registered</MenuItem>
          <MenuItem value="targetAudience">Target Audience</MenuItem>
          <MenuItem value="alphabeticalOrder">Alphabetical Order</MenuItem>
          <MenuItem value="alphabeticalOrder">Open to all age groups</MenuItem>
        </Select>
      </FormControl>

      {/* Camps list */}
      <Grid container spacing={3}>
        {sortedCamps?.map((camp) => (
          <Grid item key={camp.id} xs={12} sm={6} md={4} lg={4}>
            <Card>
              {/* Camp image */}
              <img
                src={camp.image}
                alt={camp.name}
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
              />

              <CardContent>
                {/* Camp details */}
                <Typography variant="h5" gutterBottom>
                  {camp.name}
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  gutterBottom
                >
                  Date: {camp.scheduledDateTime}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Venue: {camp.venueLocation}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Target Audience: {camp.targetAudience}
                </Typography>

                {/* Join Camp button */}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => joinCamp(camp.id)}
                  component={Link}
                  to={`/camps/${camp.id}`}
                  sx={{ mt: 2 }}
                >
                  Join Camp
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AvailableCamps;
