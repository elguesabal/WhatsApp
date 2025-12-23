import { useEffect, useState } from "react";
import api from "../config_axios.js";

/**
 * @author VAMPETA
 * @brief COMPONENTE DE CONTATOS
*/
export default function Contacts() {
	// const contacts = ["a", "b", "c", "a", "b", "c", "a", "b", "c", "a", "b", "c"];


	const [contacts, setContacts] = useState([]);

	useEffect(() => {
		async function request() {		// BLOQUEI DE CORS
			const res = await api({
				method: "GET",
				url: "/contacts"
			});
			console.log(res)
		}
		request();
	}, []);
	return (
		<ul className="w-[30%] bg-gray-800 h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
			{contacts.map((message, i) => (
				<li key={i} className="flex items-center p-3 gap-3 w-[90%] h-[10vh] mx-auto my-4 bg-gray-200">
					{/* {message} */}
					<img className="w-12 h-12 rounded-full object-cover" alt="Foto de perfil" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT548e7yKxVzd9AoGwcjuciTV94wTtuZPzyC_-kWy3r&s" />
					<div>
						<h1 className="text-[clamp(0.875rem,1.5vw,1.125rem)]">numero</h1>
						<p className="text-[clamp(0.875rem,1.2vw,1rem)]">ultima mensagem...</p>
					</div>
				</li>
			))}
		</ul>
	);
}