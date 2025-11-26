"use client";

import { useState } from "react";
import { createList } from "@/app/actions";
import { useRouter } from "next/navigation";

export default function CreateListForm({ boardId }: { boardId: string }) {
	const [isAdding, setIsAdding] = useState(false);
	const [name, setName] = useState("");
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (name.trim()) {
			await createList(name.trim(), boardId);
			setName("");
			setIsAdding(false);
			router.refresh();
		}
	};

	if (!isAdding) {
		return (
			<button
				onClick={() => setIsAdding(true)}
				className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-xl w-72 flex-shrink-0 text-left font-semibold backdrop-blur-sm transition-colors flex items-center gap-2"
			>
				<span>+</span> Add another list
			</button>
		);
	}

	return (
		<div className="bg-[#f1f2f4] rounded-xl p-3 w-72 flex-shrink-0 shadow-lg border border-gray-200">
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder="Enter list title..."
					className="w-full p-2 rounded border border-blue-500 mb-2 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
					autoFocus
				/>
				<div className="flex items-center space-x-2">
					<button
						type="submit"
						className="bg-blue-600 text-white px-3 py-1.5 rounded text-sm font-medium hover:bg-blue-700 transition-colors"
					>
						Add list
					</button>
					<button
						type="button"
						onClick={() => setIsAdding(false)}
						className="text-gray-500 hover:text-gray-700 hover:bg-gray-200 p-1.5 rounded transition-colors"
					>
						✕
					</button>
				</div>
			</form>
		</div>
	);
}
