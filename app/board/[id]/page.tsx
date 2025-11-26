import { getBoard, getLists, getItems } from "@/app/actions";
import CardList from "@/app/components/CardList";
import CreateListForm from "@/app/components/CreateListForm";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function BoardPage({ params }: { params: { id: string } }) {
	const board = await getBoard(params.id);
	if (!board) {
		notFound();
	}

	const lists = await getLists(params.id);
	
	// Fetch todos for each list
	const listsWithTodos = await Promise.all(
		lists.map(async (list) => {
			const todos = await getItems(list._id);
			return { ...list, todos };
		})
	);

	return (
		<div className="flex flex-col h-screen bg-gradient-to-br from-blue-600 to-blue-500">
			<div className="px-6 py-3 bg-black/20 backdrop-blur-sm text-white flex items-center shadow-sm border-b border-white/10">
				<Link 
					href="/" 
					className="mr-4 hover:bg-white/20 p-2 rounded-md transition-colors flex items-center gap-2 text-sm font-medium"
				>
					<span>←</span> All Boards
				</Link>
				<div className="h-6 w-px bg-white/20 mx-2"></div>
				<h1 className="text-xl font-bold px-2">{board.name}</h1>
			</div>
			
			<div className="flex-grow overflow-x-auto p-6">
				<div className="flex items-start space-x-6 h-full">
					{listsWithTodos.map((list) => (
						<CardList key={list._id} list={list} todosInitial={list.todos} />
					))}
					<CreateListForm boardId={params.id} />
				</div>
			</div>
		</div>
	);
}
