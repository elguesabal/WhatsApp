/**
 * @author VAMPETA
 * @brief FUNCAO DE CLIQUE NO CHAT
 * @param socket CONEXAO SOCKET
 * @param setContacts HOOK QUE SALVA OS ESTADOS DO COMPONENTE
*/
export function requestContacts(socket, setContacts) {
	socket.emit("contacts", null, (res) => {
		if (res.ok) setContacts({ contacts: res.data, load: false });
		if (!res.ok) setContacts({ load: false, error: true });
	});
}

/**
 * @author VAMPETA
 * @brief FUNCAO DE CLIQUE NO CHAT
 * @param socket CONEXAO SOCKET
 * @param phone NUMERO DO CONTATO CLICADO
*/
export function clickChat(socket, phone) {
	socket.emit("open_chat", { phone });
	alert("chat aberto");
}