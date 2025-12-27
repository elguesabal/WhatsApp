import { useReducer, useEffect } from "react";
import { useSocket } from "../services/useSocket.js";
import { requestContacts, clickChat } from "./functions.js";

import { theme } from "../style/theme.js";

/**
 * @author VAMPETA
 * @brief TELA DE LOAD DOS CONTATOS
*/
function Load() {
	return (
		<div className="flex items-center justify-center w-[30%] bg-gray-800">
			<h1 className="text-white">LOAD</h1>
		</div>
	);
}

/**
 * @author VAMPETA
 * @brief TELA DE ERRO DOS CONTATOS
*/
function Error() {
	return (
		<div className="flex items-center justify-center w-[30%] bg-gray-800">
			<h1 className="text-white">ERROR</h1>
		</div>
	);
}

/**
 * @author VAMPETA
 * @brief COMPONENTE DE CONTATOS
*/
export default function Contacts() {
	const socket = useSocket();
	const [contacts, setContacts] = useReducer((contacts, value) => ({ ...contacts, ...value }), { contacts: [], load: true, error: false });
	const icon = { "sent": "check", "delivered": "check-all", "read": "check-all text-blue-500", "failed": "x-circle" };

	useEffect(() => requestContacts(socket, setContacts), [socket]);	// PROXIMO PASSO E MUDAR O ICONE DE STATUS DE VISUALIZACAO COM WEBSOCKET
	if (contacts.load) return (<Load/>);
	if (contacts.error) return (<Error/>);
	return (
		<ul className={`${theme.color2} w-[30%] h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent`}>
			{contacts.contacts.map((contact, i) => (
				<li key={i} className={`flex items-center p-3 gap-3 w-[90%] h-[10vh] mx-auto my-4 ${(contact.lastMessage.humanViewed) ? theme.color3 : theme.color4} cursor-pointer`} onClick={() => clickChat(socket, contact.phone)}>
					<img className="w-12 h-12 rounded-full object-cover" alt="Foto de perfil" src={contact.photo} />
					<div>
						<div className="flex justify-between">
							<h1 className="text-[clamp(0.875rem,1.5vw,1.125rem)]">{contact.phone}</h1>
							{!contact.lastMessage.humanViewed && (<i className="bi bi-chat-left-dots text-gray-800"/>)}
						</div>
						<p className="text-[clamp(0.875rem,1.2vw,1rem)]">
							<i className={`bi bi-${icon[contact.lastMessage.status]} ${(contact.lastMessage.status === "read") ? "text-blue-500" : "text-gray-500"} text-sm`}/>
							{contact.lastMessage.text}
						</p>
					</div>
				</li>
			))}
		</ul>
	);
}