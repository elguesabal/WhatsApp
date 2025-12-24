import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:3000" });

api.interceptors.response.use(
	(response) => {
		return (response);
	},
	(error) => {
		return (error.response);
	}
);

export default api;