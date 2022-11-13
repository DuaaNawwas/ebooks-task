import axios from "axios";
import React, { useEffect, useState } from "react";
import RecipeEditM from "./components/RecipeEditM";

export default function FavRecipes() {
	const [fav, setFav] = useState([]);

	useEffect(() => {
		axios.get("https://recipe-israa.herokuapp.com/favRecipes").then((res) => {
			const myFavs = res.data.filter((rec) => rec.title?.startsWith("Duaa"));

			// setFav(res.data);
			setFav(myFavs);
		});
	}, []);

	const deleteRecipe = (id) => {
		window.confirm("are you sure?");
		axios
			.delete(`https://recipe-israa.herokuapp.com/deleteFavRecipe/${id}`)
			.then((res) => {
				const newfavs = fav.filter((item) => item.id != id);
				setFav(newfavs);
			});
	};

	const [toEdit, setToEdit] = useState();
	const [modal, setModal] = useState(false);

	const [edit, setEdit] = useState();

	const handleEdit = (id) => {
		setToEdit(id);
	};

	useEffect(() => {
		const singleRecipe = fav.find((recipe) => {
			return toEdit == recipe.id;
		});
		setEdit(singleRecipe);
	}, [toEdit]);

	const closeModal = () => {
		setModal(false);
	};

	console.log(fav);

	const editRecipeData = (
		id,
		title,
		readyinminutes,
		summary,
		vegetarian,
		instructions,
		sourceurl,
		image
	) => {
		axios
			.put(`https://recipe-israa.herokuapp.com/updateFavRecipe/${id}`, {
				title: title,
				readyinminutes: readyinminutes,
				summary: summary,
				vegetarian: vegetarian,
				instructions: instructions,
				sourceurl: sourceurl,
				image: image,
			})
			.then((res) => {
				const newFav = [...fav];
				const oneFav = newFav.find((item) => item.id == id);
				oneFav.title = title;
				oneFav.readyInMinutes = readyinminutes;
				oneFav.summary = summary;
				oneFav.vegetarian = vegetarian;
				oneFav.instructions = instructions;
				oneFav.sourceUrl = sourceurl;
				oneFav.image = image;
				setFav(newFav);
			});
	};

	return (
		<>
			<RecipeEditM
				recipe={edit}
				show={modal}
				closeModal={closeModal}
				editRecipeData={editRecipeData}
			/>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-10">
				{fav?.map((rec) => {
					return (
						<div class="relative block border border-gray-100" key={rec?.id}>
							<img
								alt="Toy"
								src={rec?.image}
								class="h-56 w-full object-contain lg:h-72"
							/>

							<div class="p-6">
								<strong class="inline-block bg-yellow-400 px-3 py-1 text-xs font-medium">
									{rec?.vegetarian && "vegetarian"}
								</strong>

								<h3 class="mt-4 text-lg font-bold">{rec?.title}</h3>

								<p class="mt-2 text-sm text-white">
									ready in: {rec?.readyinminutes} minutes
								</p>
								<p class="mt-2 text-sm text-white">{rec?.summary}</p>
							</div>
							<button onClick={() => deleteRecipe(rec?.id)}>del</button>
							<button
								onClick={() => {
									handleEdit(rec?.id);
									setModal(true);
								}}
							>
								update
							</button>
						</div>
					);
				})}
			</div>
		</>
	);
}
