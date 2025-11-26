"use client";

import { useState } from "react";
import { getItems, createItem, updateItem, deleteItem, markDone, markIncomplete, updateListName, deleteList } from "@/app/actions";
import TodoItem from "@/app/components/ToDoListItem";
import CardModal from "@/app/components/CardModal";
import { List } from "@/model/list";
import { useRouter } from "next/navigation";

type ToDoListType = Awaited<ReturnType<typeof getItems>>;

interface CardListProps {
	list: List;
	todosInitial: ToDoListType;
}

export default function CardList({ list, todosInitial }: CardListProps) {
	const [todos, setTodos] = useState<ToDoListType>(todosInitial);
	const [newTodo, setNewTodo] = useState("");
	const [isEditingName, setIsEditingName] = useState(false);
	const [listName, setListName] = useState(list.name);
	const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
	const router = useRouter();

	const handleToggle = async (id: string) => {
		const item = todos.find((todo) => todo._id === id);
		if (item) {
			if (item.completed) {
				await markIncomplete(id);
			} else {
				await markDone(id);
			}
			setTodos(await getItems(list._id));
		}
	};

	const handleDelete = async (id: string) => {
		await deleteItem(id);
		setTodos(await getItems(list._id));
		setSelectedCardId(null);
	};

	const handleAddTodo = async (e: React.FormEvent) => {
		e.preventDefault();
		if (newTodo.trim()) {
			await createItem(newTodo.trim(), list._id);
			setTodos(await getItems(list._id));
			setNewTodo("");
		}
	};

	const handleSaveCard = async (id: string, text: string, description: string) => {
		await updateItem(id, text, description);
		setTodos(await getItems(list._id));
	};

	const handleUpdateListName = async () => {
		if (listName.trim() && listName !== list.name) {
			await updateListName(list._id, listName);
			router.refresh();
		}
		setIsEditingName(false);
	};

	const handleDeleteList = async () => {
		if (confirm("Are you sure you want to delete this list?")) {
			await deleteList(list._id);
			router.refresh();
		}
	};

	const selectedCard = todos.find(t => t._id === selectedCardId);

	return (
		<div className="bg-[#f1f2f4] rounded-xl p-3 w-72 flex-shrink-0 flex flex-col max-h-full shadow-sm border border-gray-200">
			<div className="flex justify-between items-start mb-3 px-1 pt-1">
				{isEditingName ? (
					<input
						type="text"
						value={listName}
						onChange={(e) => setListName(e.target.value)}
						onBlur={handleUpdateListName}
						onKeyDown={(e) => {
							if (e.key === "Enter") handleUpdateListName();
						}}
						autoFocus
						className="font-semibold text-sm bg-white border-2 border-blue-500 rounded px-2 py-1 w-full text-gray-800 outline-none"
					/>
				) : (
					<h2
						onClick={() => setIsEditingName(true)}
						className="font-semibold text-sm cursor-pointer text-gray-700 w-full px-2 py-1 hover:bg-gray-200 rounded transition-colors"
					>
						{listName}
					</h2>
				)}
				<button
					onClick={handleDeleteList}
					className="text-gray-400 hover:text-red-500 hover:bg-gray-200 p-1 rounded transition-colors"
					title="Delete List"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
						<path d="M3 6h18"></path>
						<path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
						<path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
					</svg>
				</button>
			</div>

			<div className="overflow-y-auto flex-grow px-1 space-y-2 min-h-[10px]">
				{todos.map((todo) => (
					<TodoItem
						key={todo._id}
						{...todo}
						onToggle={handleToggle}
						onClick={setSelectedCardId}
					/>
				))}
			</div>

			<form onSubmit={handleAddTodo} className="mt-3 px-1">
				<div className="relative">
					<input
						type="text"
						value={newTodo}
						onChange={(e) => setNewTodo(e.target.value)}
						placeholder="+ Add a card"
						className="w-full py-2 px-3 rounded-lg hover:bg-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:shadow-md transition-all text-sm text-gray-700 outline-none placeholder-gray-500 bg-transparent cursor-pointer focus:cursor-text"
					/>
				</div>
			</form>

			{selectedCard && (
				<CardModal
					todo={selectedCard}
					isOpen={!!selectedCard}
					onClose={() => setSelectedCardId(null)}
					onSave={handleSaveCard}
					onDelete={handleDelete}
				/>
			)}
		</div>
	);
}
