import { useEffect, useReducer } from "react";
import socket from "./services/config_socketio.js";

import Contacts from "./contacts.jsx"
import Chat from "./chat.jsx"

/**
 * @author VAMPETA
 * @brief CONECTA AO SOCKET E SALVA DADOS
 * @param contacts CONTATOS DOS USUARIOS
 * @param setContacts HOOK QUE SALVA OS ESTADOS DO COMPONENTE
*/
function connectSocket(setContacts) {
	socket.connect();
	socket.emit("contacts", null, (res) => {
console.log("recebeu dados:", res);
		if (res.ok) setContacts({ contacts: res.data, load: false });
		if (!res.ok) setContacts({ load: false, error: true });
	});
socket.on("teste", (res) => {
	console.log("enviou dados:", res.message);
});
	return (() => {
socket.off("teste");
		socket.disconnect();
	});
}

/**
 * @author VAMPETA
 * @brief TELA PRINCIPAL
*/
export default function App() {
	const [contacts, setContacts] = useReducer((contacts, value) => ({ ...contacts, ...value }), { contacts: [], load: true, error: false });

	useEffect(() => (connectSocket(setContacts)), []);
	return (
		<div className="flex h-screen">
			<Contacts contacts={contacts} />
			<Chat />
		</div>
	);
}