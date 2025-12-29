import { io } from "socket.io-client";

export default io("http://localhost:3000", {
	autoConnect: false,
	auth: {
		phone: "5521998869425",
		password: "vampeta"
	}
});