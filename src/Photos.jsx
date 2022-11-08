import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Photos() {
	const [photos, setPhotos] = useState([]);

	const baseUrl = "https://api.pexels.com/v1/";

	useEffect(() => {
		axios
			.get(baseUrl, {
				headers: {
					Authorization: process.env.REACT_APP_PEXELS_API_KEY,
					// "Access-Control-Allow-Origin": "http://localhost:3001",
					"Access-Control-Allow-Origin": baseUrl,
					"Access-Control-Allow-Credentials": true,
				},
			})
			.then((res) => {
				setPhotos(res.photos);
			});
	}, []);

	console.log(photos);
	console.log(process.env.REACT_APP_PEXELS_API_KEY);
	return <div>Photos</div>;
}
