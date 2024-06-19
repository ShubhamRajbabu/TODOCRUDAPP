import Todo from "../models/todoSchema.js";

const getTodos = async(req,res) => {
    try {
        const allTodos = await Todo.find({isDeleted:false});
        res.status(200).json({success:true, allTodos} );
    } catch (error) {
       return res.status(500).json({ "error":{message: error.message} })
    }
}

const createTodo = async(req, res) => {
    try {
        const { text } = req.body;
        if (!text) return res.status(404).json({ success: false, message: "Please provide inputs" })
        const isTodoExist = await Todo.findOne({ text });
        if (isTodoExist) return res.status(404).json({ success: false, message: "Todo already exist" })
        const newTodo = new Todo({text});
        await newTodo.save();
        const allTodos = await Todo.find({isDeleted:false});
        return res.status(201).json({ success: true,allTodos, message:"Todo added successfully"});
    } catch (error) {
       return res.status(500).json({ "error":{message: error.message} })
    }
}

const editTodo = async (req, res) => {
    try {
        const { todoId, newTodoText } = req.body;
        if (!todoId || !newTodoText) {
            res.status(404).json({ success: false, message: "Todo not found" })
        }
        const updatedTodo = await Todo.findByIdAndUpdate(todoId, { text: newTodoText }, { new: true });
        const allTodos = await Todo.find({isDeleted:false});
        return res.status(200).json({ success: true, message: "Todo updated successfully",allTodos }); 
    } catch (error) {
        return res.status(500).json({ "error": { message: error.message } })
    }
}

const deleteTodo = async (req, res) => {
    try {
        const { todoId } = req.body;
        if (!todoId) return res.status(404).json({ success: false, message: "Todo not found" })
        const deletedTodo = await Todo.findByIdAndUpdate(todoId,{isDeleted:true});
        const allTodos = await Todo.find({isDeleted:false});
        return res.status(200).json({ success: true, message: "Todo deleted successfully", allTodos });
        
    } catch (error) {
       return res.status(500).send({success: false, message: error.message})
    }
}
export {getTodos,createTodo, editTodo, deleteTodo}