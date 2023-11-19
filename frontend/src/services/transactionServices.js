import axios from "../config/axiosConfig";

const handleGetAllDistricts = async() => {
    const result = await axios.get("resLocations");
    return result;
}


export {handleGetAllDistricts}