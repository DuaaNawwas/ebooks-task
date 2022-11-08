import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Food from "./Food";
import Home from "./Home";
import Photos from "./Photos";
import Todos from "./Todos";

function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/todos" element={<Todos />} />
				<Route path="/food" element={<Food />} />
				{/* <Route path="/photos" element={<Photos />} /> */}
			</Routes>
			<Footer />
		</>
	);
}

export default App;
