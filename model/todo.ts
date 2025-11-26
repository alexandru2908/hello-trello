import { model, models, Schema, Types } from "mongoose";

export interface Todo {
	_id: string;
	text: string;
	description?: string;
	completed: boolean;
	listId: string;
}

const ToDoSchema = new Schema({
	_id: { type: Types.ObjectId, required: true },
	text: { type: String, required: true },
	description: { type: String, required: false },
	completed: { type: Boolean, required: true },
	listId: { type: Types.ObjectId, ref: "List", required: true },
});

const ToDo = models.ToDo || model<Todo>("ToDo", ToDoSchema, "Todos"); // Explicitly set collection name "Todos"
export default ToDo;
