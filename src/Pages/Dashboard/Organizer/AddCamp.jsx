import { Typography } from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";

const AddCamp = () => {
  const initialValues = {
    campName: "",
    image: "",
    campFees: "",
    scheduledDateTime: "",
    venueLocation: "",
    specializedService: "",
    healthcareProfessional: "",
    targetAudience: "",
    description: "",
  };
  const validate = (values) => {
    const errors = {};

    if (!values.campName) {
      errors.campName = "Camp Name is required";
    }
    if (!values.image) {
      errors.image = "Camp image is required";
    }
    if (!values.campFees) {
      errors.campFees = "Camp Fees is required";
    }
    if (!values.scheduledDateTime) {
      errors.scheduledDateTime = "Scheduled Date Time is required";
    }
    if (!values.venueLocation) {
      errors.venueLocation = "Venue Location is required";
    }
    if (!values.specializedService) {
      errors.specializedService = "Specialized Service is required";
    }
    if (!values.healthcareProfessional) {
      errors.healthcareProfessional = "Healthcare Professional is required";
    }
    if (!values.targetAudience) {
      errors.targetAudience = "Target Audience is required";
    }
    if (!values.description) {
      errors.description = "Description is required";
    }

    return errors;
  };

  const onSubmit = (values, { resetForm }) => {
    console.log("Form data submitted:", values);
    resetForm();
  };

  return (
    <>
      <Typography variant="h4" align="center" color="primary" sx={{ mb: 4 }}>
        Add Camp
      </Typography>

      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={onSubmit}
      >
        <Form style={{ maxWidth: "400px", margin: "auto" }}>
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="campName">Camp Name</label>
            <Field
              type="text"
              id="campName"
              name="campName"
              style={{ width: "100%", height: "40px" }}
            />
            <ErrorMessage
              name="campName"
              component="div"
              style={{ color: "red", fontSize: "10px", fontWeight: "bold" }}
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="image">Image</label>
            <Field
              type="file"
              id="image"
              name="image"
              style={{ width: "100%", height: "30px" }}
            />
            <ErrorMessage
              name="image"
              component="div"
              style={{ color: "red", fontSize: "10px", fontWeight: "bold" }}
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="campFees">Camp Fees</label>
            <Field
              type="number"
              id="campFees"
              name="campFees"
              style={{ width: "100%", height: "40px" }}
            />
            <ErrorMessage
              name="campFees"
              component="div"
              style={{ color: "red", fontSize: "10px", fontWeight: "bold" }}
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="scheduledDateTime">Scheduled Date and Time</label>
            <Field
              type="datetime-local"
              id="scheduledDateTime"
              name="scheduledDateTime"
              style={{ width: "100%", height: "40px" }}
            />
            <ErrorMessage
              name="scheduledDateTime"
              component="div"
              style={{ color: "red", fontSize: "10px", fontWeight: "bold" }}
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="venueLocation">Venue Location</label>
            <Field
              type="text"
              id="venueLocation"
              name="venueLocation"
              style={{ width: "100%", height: "40px" }}
            />
            <ErrorMessage
              name="venueLocation"
              component="div"
              style={{ color: "red", fontSize: "10px", fontWeight: "bold" }}
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="specializedService">
              Specialized Services Provided
            </label>
            <Field
              type="text"
              id="specializedService"
              name="specializedService"
              style={{ width: "100%", height: "40px" }}
            />
            <ErrorMessage
              name="specializedService"
              component="div"
              style={{ color: "red", fontSize: "10px", fontWeight: "bold" }}
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="healthcareProfessional">
              Healthcare Professionals in Attendance
            </label>
            <Field
              type="text"
              id="healthcareProfessional"
              name="healthcareProfessional"
              style={{ width: "100%", height: "40px" }}
            />
            <ErrorMessage
              name="healthcareProfessional"
              component="div"
              style={{ color: "red", fontSize: "10px", fontWeight: "bold" }}
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="targetAudience">Target Audience</label>
            <Field
              type="text"
              id="targetAudience"
              name="targetAudience"
              style={{ width: "100%", height: "40px" }}
            />
            <ErrorMessage
              name="targetAudience"
              component="div"
              style={{ color: "red", fontSize: "10px", fontWeight: "bold" }}
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="description">Comprehensive Description</label>
            <Field
              as="textarea"
              id="description"
              name="description"
              style={{ width: "100%", height: "40px" }}
            />
            <ErrorMessage
              name="description"
              component="div"
              style={{ color: "red", fontSize: "10px", fontWeight: "bold" }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              background: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Submit
          </button>
        </Form>
      </Formik>
    </>
  );
};

export default AddCamp;
