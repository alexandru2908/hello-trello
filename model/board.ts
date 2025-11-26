import { model, models, Schema, Types } from "mongoose";

export interface Board {
	_id: string;
	name: string;
}

const BoardSchema = new Schema({
	_id: { type: Types.ObjectId, required: true },
	name: { type: String, required: true },
});

const Board = models.Board || model<Board>("Board", BoardSchema, "Boards");
export default Board;
