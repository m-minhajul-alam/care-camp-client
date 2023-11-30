import { Typography } from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";
import useAuth from "../../../Hooks/useAuth";

const image_hosting_key = import.meta.env.VITE_Image_Hosting_Key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddCamp = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const validate = (values) => {
    const errors = {};

    const requiredFields = [
      "campName",
      // "image",
      "campFees",
      "scheduledDateTime",
      "venueLocation",
      "specializedService",
      "healthcareProfessional",
      "targetAudience",
      "description",
    ];

    requiredFields.forEach((field) => {
      if (!values[field]) {
        errors[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required`;
      }
    });

    return errors;
  };

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    const imageFile = document.getElementById("image").files[0];

    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);

      try {
        const response = await axiosPublic.post(image_hosting_api, formData);
        const imageUrl = response.data.data.url;
        values.image = imageUrl;
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Error uploading image. Please try again.");
        setSubmitting(false);
        return;
      }
    }
    values.userEmail = user.email;

    try {
      const response = await axiosPublic.post("/camps", values);
      console.log(response);
      resetForm();
      toast.success("Form submitted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Error submitting form. Please try again.");
    }

    setSubmitting(false);
  };

  return (
    <>
      <Typography variant="h4" align="center" color="primary" sx={{ mb: 4 }}>
        Add Camp
      </Typography>

      <Formik validate={validate} onSubmit={onSubmit}>
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
            <input
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
              style={{ width: "100%", height: "200px" }}
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
              background: "#0389ff",
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
