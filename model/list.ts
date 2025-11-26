import { model, models, Schema, Types } from "mongoose";

export interface List {
	_id: string;
	name: string;
	boardId: string;
}

const ListSchema = new Schema({
	_id: { type: Types.ObjectId, required: true },
	name: { type: String, required: true },
	boardId: { type: Types.ObjectId, ref: "Board", required: true },
});

const List = models.List || model<List>("List", ListSchema, "Lists");
export default List;
