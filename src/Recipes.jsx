import axios from "axios";
import { Pagination } from "flowbite-react";
import React, { useEffect, useState } from "react";

export default function Recipes() {
	const [recipes, setRecipes] = useState([]);
	const [favrecipes, setFavRecipes] = useState([]);
	const [error, setError] = useState(null);
	const apiUrl =
		"https://api.spoonacular.com/recipes/random?apiKey=8bc54457afc04573ac0f10e7492dc1e7";
	const addUrl = "https://recipe-israa.herokuapp.com/addFavRecipe";

	useEffect(() => {
		axios
			.get(`${apiUrl}`)
			.then((res) => {
				// console.log(res.data);
				setRecipes(res.data.recipes[0]);
			})
			.catch((error) => setError(error));
	}, []);

	console.log(recipes);
	if (error) return `Error: ${error.message}`;
	if (!recipes) return "No recipes";

	const addToFav = (title, ready, summary, veg, ins, url, img) => {
		axios
			.post(addUrl, {
				title: "Duaa" + title,
				readyInMinutes: ready,
				summary: summary,
				vegetarian: veg,
				instructions: ins,
				sourceUrl: url,
				image: img,
			})
			.then((res) => {
				setFavRecipes(res.data);
			});
	};

	console.log(favrecipes);
	return (
		<>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-10">
				{/* {recipes?.map((recipe) => { */}
				{/* return ( */}
				<div class="relative block border border-gray-100" key={recipes?.id}>
					<button
						type="button"
						class="absolute right-4 top-4 rounded-full bg-black p-2 text-white"
						onClick={() =>
							addToFav(
								recipes.title,
								recipes.readyInMinutes,
								recipes.summary,
								recipes.vegetarian,
								recipes.instructions,
								recipes.sourceUrl,
								recipes.image
							)
						}
					>
						<span class="sr-only">Wishlist</span>
						<svg
							class="h-4 w-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
							></path>
						</svg>
					</button>

					<img
						alt="Toy"
						src={recipes?.image}
						class="h-56 w-full object-contain lg:h-72"
					/>

					<div class="p-6">
						<strong class="inline-block bg-yellow-400 px-3 py-1 text-xs font-medium">
							{recipes?.vegetarian && "vegetarian"}
						</strong>

						<h3 class="mt-4 text-lg font-bold">{recipes?.title}</h3>

						<p class="mt-2 text-sm text-white">
							ready in: {recipes?.readyInMinutes} minutes
						</p>
						<p class="mt-2 text-sm text-white">{recipes?.summary}</p>
					</div>
				</div>
				{/* ); */}
				{/* })} */}
			</div>
		</>
	);
}
