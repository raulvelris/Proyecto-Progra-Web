import axios from "axios";

const API_URL = "http://localhost:5000/api/admin";

export const getAccessLogs = async () => {
    try {
        const response = await axios.get(`${API_URL}/accesslogs`);
        return response.data;
    } catch (error) {
        console.error("Error fetching access logs:", error);
        return null;
    }
};
