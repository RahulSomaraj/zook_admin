import axios from "../../../lib/axios";

export const fetchSpecifications = async () => {
  const { data } = await axios.get("/admin/specifications");
  return data;
};