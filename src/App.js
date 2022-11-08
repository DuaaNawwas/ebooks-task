import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./Home";
import Todos from "./Todos";

function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/todos" element={<Todos />} />
			</Routes>
			<Footer />
		</>
	);
}

export default App;
