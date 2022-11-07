import React from "react";

export default function Card({ book, i }) {
	return (
		<div
			key={i}
			class="flex flex-col justify-between rounded-sm bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white p-4 shadow-xl transition-shadow hover:shadow-lg shadow-slate-700"
		>
			<div>
				<h3 class="text-5xl font-bold ">{book.language}</h3>
				<div class="mt-4 border-t-2 border-indigo-100 pt-2">
					<p class="text-sm font-medium uppercase tracking-widest ">
						Edition: {book.edition}
					</p>
				</div>
			</div>

			<div class="mt-16 inline-flex items-center ">
				<p class="text-lg font-medium">Price: {book.price} Jd </p>
			</div>
		</div>
	);
}
