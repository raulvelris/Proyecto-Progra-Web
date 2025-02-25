import axios from "axios";

// const API_URL = "http://localhost:5000/accesslogs";

// export const getAccessLogs = async () => {
//     try {
//         const response = await axios.get(`${API_URL}/accesslogs`);
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching access logs:", error);
//         return null;
//     }
// };

export const getAccessLogs = async () => {
    let res: any;
    try {
        res = await fetch("http://localhost:5000/accesslogs"); 
    } catch (e) {
        console.log(e);
    }

    if (!res.ok) {
        res.json({ msg: "Error fetching access logs" });
    }

    return await res.json();
};
