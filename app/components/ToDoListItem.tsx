"use client";

interface TodoItemProps {
	_id: string;
	text: string;
	completed: boolean;
	onToggle: (id: string) => void;
	onClick: (id: string) => void;
}

export default function TodoItem({ _id, text, completed, onToggle, onClick }: TodoItemProps) {
	return (
		<div
			onClick={() => onClick(_id)}
			className="group relative flex items-start p-3 rounded-lg shadow-sm bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 transition-all cursor-pointer"
		>
			<div className="flex items-start flex-grow min-w-0 gap-3">
				<div className="pt-0.5" onClick={(e) => e.stopPropagation()}>
					<input
						type="checkbox"
						id={`todo-${_id}`}
						checked={completed}
						onChange={() => onToggle(_id)}
						className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer mt-1"
					/>
				</div>
				
				<div
					className={
						"text-sm leading-relaxed break-words w-full py-0.5" +
						(completed ? " line-through text-gray-400" : " text-gray-700")
					}
				>
					{text}
				</div>
			</div>
		</div>
	);
}
