import axios from "axios";
import { Pagination } from "flowbite-react";
import React, { useEffect, useState } from "react";
import EditModal from "./components/EditModal";

export default function Todos() {
	const [todos, setTodos] = useState([]);
	const [error, setError] = useState(null);

	const [currentPage, setCurrentPage] = useState(1);
	const [recordsPerPage] = useState(9);
	const indexOfLastRecord = currentPage * recordsPerPage;
	const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
	const currentRecords = todos.slice(indexOfFirstRecord, indexOfLastRecord);
	const nPages = Math.ceil(todos.length / recordsPerPage);

	const [toEdit, setToEdit] = useState();
	const [modal, setModal] = useState(false);

	const [edit, setEdit] = useState();

	const apiUrl = "https://jsonplaceholder.typicode.com/todos";

	useEffect(() => {
		axios
			.get(apiUrl)
			.then((res) => {
				setTodos(res.data);
			})
			.catch((error) => setError(error));
	}, []);

	const createTodo = () => {
		axios
			.post(apiUrl, {
				title: "understand apis",
				userId: 2,
				completed: true,
			})
			.then((res) => {
				setTodos([res.data, ...todos]);
			});
	};

	const handleEdit = (id) => {
		setToEdit(id);
	};

	useEffect(() => {
		const singleTodo = todos.find((todo) => {
			return toEdit == todo.id;
		});
		setEdit(singleTodo);
	}, [toEdit]);

	const closeModal = () => {
		setModal(false);
	};

	const editTodoData = (id, title, checked) => {
		axios
			.put(`${apiUrl}/${id}`, {
				title: title,
				completed: checked,
			})
			.then((res) => {
				const newTodos = [...todos];
				const todo = newTodos.find((item) => item.id == id);
				todo.title = res.data.title;
				todo.completed = res.data.completed;
				setTodos(newTodos);
			});
	};

	const deleteTodo = (id) => {
		window.confirm("are you sure?");
		axios.delete(`${apiUrl}/${id}`).then((res) => {
			// alert("todo deleted");
			const newTodos = todos.filter((item) => item.id != id);
			setTodos(newTodos);
		});
	};

	if (error) return `Error: ${error.message}`;
	if (!todos) return "No todos";

	return (
		<>
			<EditModal
				todo={edit}
				show={modal}
				closeModal={closeModal}
				editTodoData={editTodoData}
			/>

			<button type="button" onClick={createTodo}>
				create todo
			</button>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-10">
				{currentRecords.map((todo) => {
					return (
						<div
							key={todo.id}
							class="flex flex-col justify-between rounded-sm bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white p-4 shadow-xl transition-shadow hover:shadow-lg shadow-slate-700"
						>
							<div>
								<h3 class="text-5xl font-bold ">
									{todo.completed ? "Done" : "In progress"}
								</h3>
								<div class="mt-4 border-t-2 border-indigo-100 pt-2">
									<p class="text-sm font-medium uppercase tracking-widest ">
										{todo.title}
									</p>
								</div>
							</div>

							<div class="mt-16 inline-flex items-center ">
								<p class="text-lg font-medium">User: {todo.userId}</p>
							</div>
							<button
								onClick={() => {
									handleEdit(todo.id);
									setModal(true);
								}}
							>
								edit
							</button>
							<button type="button" onClick={() => deleteTodo(todo.id)}>
								delete
							</button>
						</div>
					);
				})}
			</div>
			<Pagination
				currentPage={currentPage}
				onPageChange={(e) => setCurrentPage(e)}
				showIcons={true}
				totalPages={nPages}
			/>
		</>
	);
}
