import Contacts from "./contacts.jsx"
import Chat from "./chat.jsx"

/**
 * @author VAMPETA
 * @brief TELA PRINCIPAL
*/
export default function App() {
	return (
		<div className="flex h-screen">
			<Contacts/>
			<Chat/>
		</div>
	);
}