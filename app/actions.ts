"use server";

import connectMongo from "@/db/mongoose";
import ToDo, { Todo } from "@/model/todo";
import BoardModel, { Board } from "@/model/board";
import ListModel, { List } from "@/model/list";
import { Types } from "mongoose";

export async function getBoards(): Promise<Board[]> {
	try {
		await connectMongo();
		const boards = await BoardModel.find({}).lean<Board[]>();
		return boards.map((board) => ({
			_id: board._id.toString(),
			name: board.name,
		}));
	} catch (e) {
		console.error(e);
		throw e;
	}
}

export async function getBoard(id: string): Promise<Board | null> {
	try {
		await connectMongo();
		const board = await BoardModel.findById(id).lean<Board>();
		if (!board) return null;
		return {
			_id: board._id.toString(),
			name: board.name,
		};
	} catch (e) {
		console.error(e);
		throw e;
	}
}

export async function createBoard(name: string) {
	try {
		await connectMongo();
		const newBoard = new BoardModel({
			_id: new Types.ObjectId(),
			name,
		});
		await newBoard.save();
		console.log("Created new Board:", newBoard);
	} catch (e) {
		console.error(e);
		throw e;
	}
}

export async function updateBoardName(id: string, name: string) {
	try {
		await connectMongo();
		await BoardModel.updateOne({ _id: id }, { name });
		console.log(`Updated Board ${id} name to ${name}`);
	} catch (e) {
		console.error(e);
		throw e;
	}
}

export async function deleteBoard(id: string) {
	try {
		await connectMongo();
		await BoardModel.deleteOne({ _id: id });
		// Find all lists in the board
		const lists = await ListModel.find({ boardId: id });
		const listIds = lists.map(l => l._id);
		
		// Delete all todos in those lists
		await ToDo.deleteMany({ listId: { $in: listIds } });
		
		// Delete all lists
		await ListModel.deleteMany({ boardId: id });
		
		console.log(`Deleted Board ${id}`);
	} catch (e) {
		console.error(e);
		throw e;
	}
}

export async function getLists(boardId: string): Promise<List[]> {
	try {
		await connectMongo();
		const lists = await ListModel.find({ boardId }).lean<List[]>();
		return lists.map((list) => ({
			_id: list._id.toString(),
			name: list.name,
			boardId: list.boardId.toString(),
		}));
	} catch (e) {
		console.error(e);
		throw e;
	}
}

export async function createList(name: string, boardId: string) {
	try {
		await connectMongo();
		const newList = new ListModel({
			_id: new Types.ObjectId(),
			name,
			boardId: new Types.ObjectId(boardId),
		});
		await newList.save();
		console.log("Created new List:", newList);
	} catch (e) {
		console.error(e);
		throw e;
	}
}

export async function updateListName(id: string, name: string) {
	try {
		await connectMongo();
		await ListModel.updateOne({ _id: id }, { name });
		console.log(`Updated List ${id} name to ${name}`);
	} catch (e) {
		console.error(e);
		throw e;
	}
}

export async function deleteList(id: string) {
	try {
		await connectMongo();
		await ListModel.deleteOne({ _id: id });
		await ToDo.deleteMany({ listId: id });
		console.log(`Deleted List ${id}`);
	} catch (e) {
		console.error(e);
		throw e;
	}
}

export async function getItems(listId: string): Promise<Todo[]> {
	try {
		await connectMongo();
		const todos = await ToDo.find({ listId }).lean<Todo[]>();
		const formattedTodos = todos.map((todo) => ({
			_id: todo._id.toString(),
			text: todo.text,
			description: todo.description || "",
			completed: todo.completed,
			listId: todo.listId.toString(),
		}));
		return formattedTodos;
	} catch (e) {
		console.error(e);
		throw e;
	}
}

export async function createItem(text: Todo["text"], listId: string) {
	try {
		await connectMongo();
		const newTodo = new ToDo({
			_id: new Types.ObjectId(), // Manually provide an _id
			text,
			description: "",
			completed: false, // Default to false when creating a new task
			listId: new Types.ObjectId(listId),
		});
		await newTodo.save();
		console.log("Created new Todo:", newTodo);
	} catch (e) {
		console.error(e);
		throw e;
	}
}

export async function deleteItem(id: Todo["_id"]) {
	console.log(id);
	try {
		await connectMongo();
		const result = await ToDo.deleteOne({ _id: id });
		if (result.deletedCount === 0) {
			console.log(`No Todo found with id: ${id}`);
		} else {
			console.log(`Deleted Todo with id: ${id}`);
		}
	} catch (e) {
		console.error(e);
		throw e;
	}

}

export async function markIncomplete(id: Todo["_id"]) {
	console.log(id);
	try {
		await connectMongo();
		const result = await ToDo.updateOne({ _id: id }, { completed: false });
		if (result.modifiedCount === 0) {
			console.log(`No Todo found or already incomplete with id: ${id}`);
		} else {
			console.log(`Marked Todo as incomplete with id: ${id}`);
		}
	} catch (e) {
		console.error(e);
		throw e;
	}
}

export async function markDone(id: Todo["_id"]) {
	console.log(id);
	try {
		await connectMongo();
		const result = await ToDo.updateOne({ _id: id }, { completed: true });
		if (result.modifiedCount === 0) {
			console.log(`No Todo found or already completed with id: ${id}`);
		} else {
			console.log(`Marked Todo as completed with id: ${id}`);
		}
	} catch (e) {
		console.error(e);
		throw e;
	}
}

export const updateItem = async (id: Todo["_id"], text: Todo["text"], description?: string) => {
	console.log(id);
	console.log(text);
	try {
		await connectMongo();
		const updateData: { text: string; description?: string } = { text };
		if (description !== undefined) {
			updateData.description = description;
		}
		const result = await ToDo.updateOne({ _id: id }, updateData);
		if (result.modifiedCount === 0) {
			console.log(`No Todo found or text is the same with id: ${id}`);
		} else {
			console.log(`Updated Todo with id: ${id}`);
		}
	} catch (e) {
		console.error(e);
		throw e;
	}
};
