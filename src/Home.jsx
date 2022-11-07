import { Label, Select } from "flowbite-react";
import React, { useEffect, useState } from "react";
import Card from "./components/Card";
import data from "./ebooks.json";

export default function Home() {
	const [price, setPrice] = useState({ min: 0, max: 0 });
	const [priceItems, setPriceItems] = useState([]);
	const [search, setSearch] = useState("");
	const [searchItems, setSearchItems] = useState([]);
	const allBooks = data.eBooks;
	const [books, setBooks] = useState(allBooks);
	// console.log(data.eBooks);
	// useEffect(() => {
	// 	const allBooks = data.eBooks;
	// 	console.log(allBooks);
	// 	setBooks(allBooks);
	// 	console.log(books);
	// }, []);

	// // works but loses data when deleting
	// useEffect(() => {
	// 	console.log(search);
	// 	if (search == "") {
	// 		setBooks(allBooks);
	// 	} else {
	// 		const searchData = books.filter((book) => {
	// 			const name = book.language;
	// 			return name.toLowerCase().includes(search.toLowerCase());
	// 		});
	// 		setBooks(searchData);
	// 	}
	// }, [search]);

	// useEffect(() => {
	// 	console.log(price);
	// 	let rangeData = [];
	// 	if (price.min == null) {
	// 		setBooks(allBooks);
	// 	} else {
	// 		if ((price.min && price.max) != null) {
	// 			rangeData = books.filter((book) => {
	// 				return book.price <= price.max && book.price >= price.min;
	// 			});
	// 		} else {
	// 			rangeData = books.filter((book) => {
	// 				return book.price >= price.min;
	// 			});
	// 		}
	// 		setBooks(rangeData);
	// 	}
	// }, [price]);

	useEffect(() => {
		if (search == "") setSearchItems([]);
		const searchData = books.filter((book) => {
			const name = book.language;
			return name.toLowerCase().includes(search.toLowerCase());
		});
		setSearchItems(searchData);
	}, [search]);

	useEffect(() => {
		if (price.min == 0 && price.max == 0) setPriceItems([]);

		// else {
		// if ((price.min && price.max) != 0) {
		const rangeData = books.filter((book) => {
			const bookPrice = book.price;
			return bookPrice <= price.max && bookPrice >= price.min;
		});
		setPriceItems(rangeData);
		// }

		// else {
		// 	const rangeData2 = books.filter((book) => {
		// 		return book.price >= price.min;
		// 	});
		// 	setPriceItems(rangeData2);
		// 	console.log(priceItems);
		// }
		// }
	}, [price]);
	console.log(price);
	console.log(priceItems);

	const handlePriceSelection = (e) => {
		const [min, max] = e.target.value.split("-");
		setPrice({ min: parseInt(min), max: parseInt(max) });
	};

	return (
		<>
			{/* <form class="mb-0 hidden lg:flex"> */}
			<div class="relative flex justify-around p-6">
				<input
					class="h-10 rounded-lg border-gray-200 pr-10 text-sm placeholder-black focus:z-10"
					placeholder="Search..."
					type="text"
					onChange={(e) => setSearch(e.target.value)}
				/>
				<div id="select" className="w-48">
					<select
						id="countries"
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						onChange={handlePriceSelection}
						value={`${price.min}-${price.max}`}
					>
						<option value="0-0">Choose a price range</option>
						<option value="10-20">10 - 20</option>
						<option value="21-30">21 - 30</option>
						<option value="31-60">above 30</option>
					</select>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-10">
				{priceItems.length > 0
					? priceItems.map((book, i) => {
							console.warn(priceItems);
							return <Card book={book} i={i} />;
					  })
					: searchItems.length > 0
					? searchItems.map((book, i) => {
							console.warn(searchItems);
							return <Card book={book} i={i} />;
					  })
					: books.map((book, i) => {
							return <Card book={book} i={i} />;
					  })}
			</div>
		</>
	);
}
