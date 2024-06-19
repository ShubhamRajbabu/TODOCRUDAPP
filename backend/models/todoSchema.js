import mongoose, { Schema } from "mongoose";

const todoSchema = new Schema({
    text: { type: "string" },
    isDeleted: { type: "boolean", default:false },
});

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
