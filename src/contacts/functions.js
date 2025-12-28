/**
 * @author VAMPETA
 * @brief FUNCAO DE CLIQUE NO CHAT
 * @param socket CONEXAO SOCKET
 * @param setContacts HOOK QUE SALVA OS ESTADOS DO COMPONENTE
*/
export function requestContacts(socket, setContacts) {
	socket.emit("contacts", null, (res) => {
		if (res.ok) setContacts({ type: "SET_CONTACTS", contacts: res.data });
		if (!res.ok) setContacts({ type: "ERROR" });
	});
}

/**
 * @author VAMPETA
 * @brief FUNCAO DE CLIQUE NO CHAT
 * @param socket CONEXAO SOCKET
 * @param setContacts HOOK QUE SALVA OS ESTADOS DO COMPONENTE
*/
export function listenOpenChat(socket, setContacts) {
	function new_message(payload, callback) {
		setContacts({ type: "NEW_MESSAGE", update: payload });
	}
	socket.on("new_message", new_message);
	return (() => socket.off("new_message", new_message));
}

/**
 * @author VAMPETA
 * @brief FUNCAO DE CLIQUE NO CHAT
 * @param socket CONEXAO SOCKET
 * @param phone NUMERO DO CONTATO CLICADO
 * @param setContacts HOOK QUE SALVA OS ESTADOS DO COMPONENTE
*/
export function clickChat(socket, phone, setContacts) {
	socket.emit("open_chat", { phone });
	setContacts({ type: "OPEN_CHAT", phone: phone, humanViewed: true });
}