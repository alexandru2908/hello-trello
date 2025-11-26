"use client";

import { useState } from "react";
import { Board } from "@/model/board";
import { createBoard, deleteBoard, updateBoardName } from "@/app/actions";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface BoardListProps {
	boardsInitial: Board[];
}

export default function BoardList({ boardsInitial }: BoardListProps) {
	const [newBoardName, setNewBoardName] = useState("");
	const [editingBoardId, setEditingBoardId] = useState<string | null>(null);
	const [editingName, setEditingName] = useState("");
	const router = useRouter();

	const handleCreateBoard = async () => {
		if (!newBoardName.trim()) return;
		await createBoard(newBoardName);
		setNewBoardName("");
		router.refresh();
	};

	const handleDeleteBoard = async (id: string) => {
		if (confirm("Are you sure you want to delete this board?")) {
			await deleteBoard(id);
			router.refresh();
		}
	};

	const startEditing = (board: Board) => {
		setEditingBoardId(board._id);
		setEditingName(board.name);
	};

	const saveEditing = async () => {
		if (editingBoardId && editingName.trim()) {
			await updateBoardName(editingBoardId, editingName);
			setEditingBoardId(null);
			setEditingName("");
			router.refresh();
		}
	};

	const cancelEditing = () => {
		setEditingBoardId(null);
		setEditingName("");
	};

	return (
		<div className="p-8 max-w-7xl mx-auto">
			<h1 className="text-3xl font-bold mb-8 text-gray-800 flex items-center gap-2">
				<span className="text-4xl">📋</span> My Boards
			</h1>
			
			<div className="mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
				<h2 className="text-lg font-semibold mb-4 text-gray-700">Create a new board</h2>
				<div className="flex gap-3">
					<input
						type="text"
						value={newBoardName}
						onChange={(e) => setNewBoardName(e.target.value)}
						placeholder="What shall we call it?"
						className="border border-gray-300 p-3 rounded-lg flex-grow text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
						onKeyDown={(e) => e.key === 'Enter' && handleCreateBoard()}
					/>
					<button
						onClick={handleCreateBoard}
						disabled={!newBoardName.trim()}
						className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors shadow-sm"
					>
						Create Board
					</button>
				</div>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{boardsInitial.map((board) => (
					<div
						key={board._id}
						className="bg-white shadow-sm hover:shadow-md rounded-xl p-4 flex flex-col justify-between h-32 relative group transition-all border border-gray-200 hover:border-blue-300"
					>
						{editingBoardId === board._id ? (
							<div className="flex flex-col h-full justify-center gap-2">
								<input
									type="text"
									value={editingName}
									onChange={(e) => setEditingName(e.target.value)}
									className="border p-2 rounded text-gray-800 w-full focus:ring-2 focus:ring-blue-500 outline-none"
									autoFocus
									onKeyDown={(e) => {
										if (e.key === 'Enter') saveEditing();
										if (e.key === 'Escape') cancelEditing();
									}}
								/>
								<div className="flex justify-end space-x-2">
									<button
										onClick={saveEditing}
										className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
									>
										Save
									</button>
									<button
										onClick={cancelEditing}
										className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
									>
										Cancel
									</button>
								</div>
							</div>
						) : (
							<>
								<Link href={`/board/${board._id}`} className="flex-grow flex items-start pt-2">
									<h2 className="text-lg font-bold text-gray-800 break-words w-full line-clamp-2">
										{board.name}
									</h2>
								</Link>
								<div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1 bg-white/90 rounded-md p-1 shadow-sm">
									<button
										onClick={() => startEditing(board)}
										className="text-gray-500 hover:text-blue-600 p-1.5 hover:bg-blue-50 rounded"
										title="Rename"
									>
										✏️
									</button>
									<button
										onClick={() => handleDeleteBoard(board._id)}
										className="text-gray-500 hover:text-red-600 p-1.5 hover:bg-red-50 rounded"
										title="Delete"
									>
										🗑️
									</button>
								</div>
							</>
						)}
					</div>
				))}
			</div>
		</div>
	);
}
