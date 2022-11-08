import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Food() {
	const [foodData, setFoodData] = useState([]);

	const API_URL =
		"https://edamam-food-and-grocery-database.p.rapidapi.com/parser";

	useEffect(() => {
		axios
			.get(API_URL, {
				params: { ingr: "apple" },
				headers: {
					"X-RapidAPI-Key": `${process.env.REACT_APP_API_KEY}`,
					"X-RapidAPI-Host": "edamam-food-and-grocery-database.p.rapidapi.com",
				},
			})
			.then((res) => {
				setFoodData(res.data.hints);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	return (
		<>
			{/* <div>{foodData}</div> */}
			<div className="flex flex-wrap gap-5 justify-center">
				{foodData.map((item) => {
					return <img src={item.food.image} />;
				})}
			</div>
			{/* <img src={foodData.hints} */}
		</>
	);
}
