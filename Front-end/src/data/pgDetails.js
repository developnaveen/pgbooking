import axiosInstance from "../api/axiosInstance";

const pgDetails = async () => {
  try {
    const response = await axiosInstance.get("/user"); // Correct endpoint
    return response.data; // Axios stores the response in data
  } catch (error) {
    console.error("Failed to fetch PG details:", error);
    return []; // return empty array on error
  }
};

export default pgDetails;
