import { useEffect } from "react";
import { useSocket } from "./services/useSocket.js";

import Contacts from "./contacts/contacts.jsx"
import Chat from "./chat.jsx"

/**
 * @author VAMPETA
 * @brief CONECTA AO SOCKET E SALVA DADOS
 * @param socket CONEXAO SOCKET
*/
function connectSocket(socket) {		// EVENTO DE TESTE, REMOVER DEPOIS
const teste = (res) => {
	console.log("enviou dados:", res.message);
}
socket.on("teste", teste);

	return (() => {
socket.off("teste", teste);
	});
}

/**
 * @author VAMPETA
 * @brief TELA PRINCIPAL
*/
export default function App() {
	const socket = useSocket();

	useEffect(() => {
		socket.connect();
		const clear = connectSocket(socket);

		return (() => {
			clear();
			socket.disconnect();
		});
	}, [socket]);

	return (
		<div className="flex h-screen">
			<Contacts />
			<Chat />
		</div>
	);
}