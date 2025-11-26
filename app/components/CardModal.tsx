"use client";

import { useState, useEffect } from "react";
import { Todo } from "@/model/todo";

interface CardModalProps {
	todo: Todo;
	isOpen: boolean;
	onClose: () => void;
	onSave: (id: string, text: string, description: string) => void;
	onDelete: (id: string) => void;
}

export default function CardModal({ todo, isOpen, onClose, onSave, onDelete }: CardModalProps) {
	const [text, setText] = useState(todo.text);
	const [description, setDescription] = useState(todo.description || "");

	useEffect(() => {
		if (isOpen) {
			setText(todo.text);
			setDescription(todo.description || "");
		}
	}, [isOpen, todo]);

	if (!isOpen) return null;

	const handleSave = () => {
		onSave(todo._id, text, description);
		onClose();
	};

	const handleDelete = () => {
		if (confirm("Are you sure you want to delete this card?")) {
			onDelete(todo._id);
			onClose();
		}
	};

	return (
		<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
			<div 
				className="bg-[#f4f5f7] w-full max-w-2xl rounded-lg shadow-2xl p-6 relative mx-4"
				onClick={(e) => e.stopPropagation()}
			>
				<button 
					onClick={onClose}
					className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 p-2 rounded-full hover:bg-gray-200 transition-colors"
				>
					✕
				</button>

				<div className="mb-6">
					<div className="flex items-center gap-3 mb-2 text-gray-700">
						<span className="text-xl">💳</span>
						<h2 className="font-semibold text-lg">Title</h2>
					</div>
					<input
						type="text"
						value={text}
						onChange={(e) => setText(e.target.value)}
						className="w-full text-xl font-bold bg-transparent border-2 border-transparent focus:border-blue-500 focus:bg-white rounded px-2 py-1 transition-all text-gray-800"
					/>
				</div>

				<div className="flex gap-8">
					<div className="flex-grow">
						<div className="flex items-center gap-3 mb-2 text-gray-700">
							<span className="text-xl">📝</span>
							<h3 className="font-semibold text-lg">Description</h3>
						</div>
						<textarea
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							placeholder="Add a more detailed description..."
							className="w-full min-h-[150px] p-4 rounded-lg bg-gray-200 hover:bg-gray-300 focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all resize-none text-gray-800 placeholder-gray-500"
						/>
					</div>

					<div className="w-40 flex flex-col gap-3 pt-8">
						<h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Actions</h3>
						<button
							onClick={handleSave}
							className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors font-medium text-sm text-left flex items-center gap-2"
						>
							<span>💾</span> Save
						</button>
						<button
							onClick={handleDelete}
							className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors font-medium text-sm text-left flex items-center gap-2"
						>
							<span>🗑️</span> Delete
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
