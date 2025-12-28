import { useReducer, useEffect } from "react";
import { useSocket } from "../services/useSocket.js";
import { requestContacts, listenOpenChat, clickChat } from "./functions.js";

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
 * @brief HANDLER DE REDUCER DOS CONTATOS
*/
function contactReducer(contacts, value) {
	if (value.type === "SET_CONTACTS") return ({ ...contacts, contacts: value.contacts, load: false });
	if (value.type === "NEW_MESSAGE") {
		const updatedChat = contacts.contacts.map((contact) => {
			if (contact.phone === value.update.phone) {
				return {
					...contact,
					lastMessage: {
						...contact.lastMessage,
						...value.update.lastMessage,
						humanViewed: false
					}
				};
			}
			return contact;
		});
		const sortedChat = [...updatedChat].sort((a, b) => (new Date(b.lastMessage.timestamp).getTime() - new Date(a.lastMessage.timestamp).getTime()));

		return ({
			...contacts,
			contacts: sortedChat
		});
	}
	if (value.type === "OPEN_CHAT") {
		return ({
			...contacts,
			contacts: contacts.contacts.map((contact) => {
				return ((contact.phone === value.phone) ? { ...contact, lastMessage: { ...contact.lastMessage, humanViewed: true } } : contact);
			})
		});
	}
	if (value.type === "LOAD") return ({ ...contacts, load: true });
	if (value.type === "ERROR") return ({ ...contacts, load: false, error: true });
	return (contacts);
}

/**
 * @author VAMPETA
 * @brief COMPONENTE DE CONTATOS
*/
export default function Contacts() {
	const socket = useSocket();
	const [contacts, setContacts] = useReducer(contactReducer, { contacts: [], load: true, error: false });
	const icon = { "sent": "check", "delivered": "check-all", "read": "check-all text-blue-500", "failed": "x-circle" };

	useEffect(() => requestContacts(socket, setContacts), [socket]);
	useEffect(() => (listenOpenChat(socket, setContacts)), [socket]);
	if (contacts.load) return (<Load />);
	if (contacts.error) return (<Error />);
	return (
		<ul className={`${theme.color2} w-[30%] h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent`}>
			{contacts.contacts.map((contact, i) => (
				<li key={contact.phone} className={`flex items-center p-3 gap-3 w-[90%] h-[10vh] mx-auto my-4 ${(contact.lastMessage.humanViewed) ? theme.color3 : theme.color4} cursor-pointer`} onClick={() => clickChat(socket, contact.phone, setContacts)}>
					<img className="w-12 h-12 rounded-full object-cover" alt="Foto de perfil" src={contact.photo} />
					<div className="w-full">
						<div className="flex justify-between">
							<h1 className="text-[clamp(0.875rem,1.5vw,1.125rem)]">{(() => (`+${contact.phone.slice(0, 2)} ${contact.phone.slice(2, 4)} ${contact.phone.slice(4, 9)}-${contact.phone.slice(9)}`))()}</h1>
							{!contact.lastMessage.humanViewed && (<i className="bi bi-chat-left-dots text-gray-800" />)}
						</div>
						<span className="flex items-center justify-between">
							<div className="flex items-center">
								<i className={`bi bi-${icon[contact.lastMessage.status]} ${(contact.lastMessage.status === "read") ? "text-blue-500" : "text-gray-500"} text-3xl`} />
								<p className="text-[clamp(0.875rem,1.2vw,1rem)]">{(contact.lastMessage.text?.length < 20) ? contact.lastMessage.text : contact.lastMessage.text.slice(0, 20) + "..."}</p>
							</div>
							<div className="flex flex-col items-center">
								<p className="text-[0.6rem]">
									{contact.lastMessage.timestamp && (() => {
										const d = new Date(contact.lastMessage.timestamp);
										const hh = String(d.getHours()).padStart(2, "0");
										const mm = String(d.getMinutes()).padStart(2, "0");

										return (`${hh}:${mm}`);
									})()}
								</p>
								<p className="text-[0.6rem]">
									{contact.lastMessage.timestamp && (() => {
										const d = new Date(contact.lastMessage.timestamp);
										const dd = String(d.getDate()).padStart(2, "0");
										const MM = String(d.getMonth() + 1).padStart(2, "0");
										const yyyy = d.getFullYear();

										return (`${dd}/${MM}/${yyyy}`);
									})()}
								</p>
							</div>
						</span>
					</div>
				</li>
			))}
		</ul>
	);
}