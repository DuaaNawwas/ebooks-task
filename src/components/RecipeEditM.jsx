import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";

export default function RecipeEditM({
	recipe,
	show,
	closeModal,
	editRecipeData,
}) {
	const [newTitle, setNewTitle] = useState(recipe?.title);
	const [newReady, setNewReady] = useState(recipe?.readyinminutes);
	const [newSummary, setNewSummary] = useState(recipe?.summary);
	const [newVeg, setNewVeg] = useState(recipe?.vegetarian);
	const [newIns, setNewIns] = useState(recipe?.instructions);
	const [newUrl, setNewUrl] = useState(recipe?.sourceurl);
	const [newImg, setNewImg] = useState(recipe?.image);
	useEffect(() => {
		setNewTitle(recipe?.title);
		setNewReady(recipe?.readyinminutes);
		setNewSummary(recipe?.summary);
		setNewVeg(recipe?.vegetarian);
		setNewIns(recipe?.instructions);
		setNewUrl(recipe?.sourceurl);
		setNewImg(recipe?.image);
	}, [recipe]);

	return (
		<React.Fragment>
			<Modal show={show} size="md" popup={true} onClose={closeModal}>
				<Modal.Header />
				<Modal.Body>
					<div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
						<form
							onSubmit={(e) => {
								e.preventDefault();
								editRecipeData(
									recipe?.id,
									newTitle,
									newReady,
									newSummary,
									newVeg,
									newIns,
									newUrl,
									newImg
								);
								closeModal();
							}}
						>
							<div>
								<div className="mb-2 block">
									<Label value="Title" />
								</div>
								<TextInput
									required={true}
									type="text"
									value={newTitle}
									onChange={(e) => setNewTitle(e.target.value)}
								/>
							</div>
							<div>
								<div className="mb-2 block">
									<Label value="Ready in" />
								</div>
								<TextInput
									required={true}
									type="number"
									value={newReady}
									onChange={(e) => setNewReady(e.target.value)}
								/>
							</div>
							<div>
								<div className="mb-2 block">
									<Label value="Summary" />
								</div>
								<TextInput
									required={true}
									type="text"
									value={newSummary}
									onChange={(e) => setNewSummary(e.target.value)}
								/>
							</div>
							<div className="flex justify-between py-5">
								<div className="flex items-center gap-2">
									<Checkbox
										id="remember"
										checked={newVeg}
										onChange={(e) => {
											console.log(e);
											setNewVeg(e.target.checked);
										}}
									/>
									<Label htmlFor="remember">Vegetarian</Label>
								</div>
							</div>
							<div>
								<div className="mb-2 block">
									<Label value="Instructions" />
								</div>
								<TextInput
									required={true}
									type="text"
									value={newIns}
									onChange={(e) => setNewIns(e.target.value)}
								/>
							</div>
							<div>
								<div className="mb-2 block">
									<Label value="Source Url" />
								</div>
								<TextInput
									required={true}
									type="text"
									value={newUrl}
									onChange={(e) => setNewUrl(e.target.value)}
								/>
							</div>
							<div>
								<div className="mb-2 block">
									<Label value="Image" />
								</div>
								<TextInput
									required={true}
									type="text"
									value={newImg}
									onChange={(e) => setNewImg(e.target.value)}
								/>
							</div>

							<div className="w-full">
								<Button type="submit">Edit</Button>
							</div>
						</form>
					</div>
				</Modal.Body>
			</Modal>
		</React.Fragment>
	);
}
