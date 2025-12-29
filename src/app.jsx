import { useEffect } from "react";
import { useSocket } from "./services/useSocket.js";

import Contacts from "./contacts/contacts.jsx"
import Chat from "./chat.jsx"

/**
 * @author VAMPETA
 * @brief TELA PRINCIPAL
*/
export default function App() {
	const socket = useSocket();

	useEffect(() => {
		socket.connect();
		socket.on("connect_error", (error) => console.log("Erro ao conectar:", error.message));
		return (() => socket.disconnect());
	}, [socket]);

	return (
		<div className="flex h-screen">
			<Contacts />
			<Chat />
		</div>
	);
}