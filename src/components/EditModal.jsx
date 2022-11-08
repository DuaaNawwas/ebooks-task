import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";

export default function EditModal({ todo, show, closeModal, editTodoData }) {
	// const editTodo = props.todos.find((todo) => todo.id == props.id);
	const [newTitle, setNewTitle] = useState(todo?.title);
	const [newChecked, setNewChecked] = useState(todo?.checked);
	useEffect(() => {
		setNewTitle(todo?.title);
		setNewChecked(todo?.checked);
	}, [todo]);
	console.log(todo);
	// console.log(editTodo);
	return (
		<React.Fragment>
			<Modal show={show} size="md" popup={true} onClose={closeModal}>
				<Modal.Header />
				<Modal.Body>
					<div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
						<form
							onSubmit={(e) => {
								e.preventDefault();
								editTodoData(todo?.id, newTitle, newChecked);
								closeModal();
							}}
						>
							<div>
								<div className="mb-2 block">
									<Label htmlFor="email" value="Todo title" />
								</div>
								<TextInput
									required={true}
									type="text"
									value={newTitle}
									onChange={(e) => setNewTitle(e.target.value)}
								/>
							</div>

							<div className="flex justify-between">
								<div className="flex items-center gap-2">
									<Checkbox
										id="remember"
										checked={newChecked}
										onChange={(e) => {
											console.log(e);
											setNewChecked(e.target.checked);
										}}
									/>
									<Label htmlFor="remember">Done</Label>
								</div>
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
