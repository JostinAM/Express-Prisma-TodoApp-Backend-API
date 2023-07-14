//imports

const express = require("express");
const cors = require("cors");


//prisma es el orm
const PrismaClient = require("@prisma/client").PrismaClient;
const prisma = new PrismaClient();
/////////////////////////////////////////////////////

///iniciar app y configurar
const app = express();
//cors necesario caundo se usa una api
app.use(cors());
app.use(express.static("public"));
app.use(express.json());


//rutas
//get all todos
app.get("/api/", async (req, res) => {
    //query con orm
    const todos = await prisma.todo.findMany();

    //tira JSON + datos
    res.json({ ok: true, message: todos });
});

//new todo
app.post("/api/", async (req, res) => {
    const { title, description, priority } = req.body;

    const newTodo = await prisma.todo.create({
        data: {
            title,
            description,
            priority,
        },
    });

    res.json({ ok: true, message: newTodo });
});

//get todo by id
app.get("/api/:id", async (req, res) => {
    const { id } = req.params;

    const todo = await prisma.todo.findUnique({
        where: {
            id,
        },
    });

    res.json({ ok: true, message: todo });
});

//update todo
app.put("/api/:id", async (req, res) => {
    const { id } = req.params;
    const { title, description, priority, state } = req.body;

    const updatedTodo = await prisma.todo.update({
        where: {
            id,
        },
        data: {
            title,
            description,
            priority,
            state,
        },
    });

    res.json({ ok: true, message: updatedTodo });
});

//delete todo
app.delete("/api/:id", async (req, res) => {
    const { id } = req.params;

    await prisma.todo.delete({
        where: {
            id,
        },
    });

    res.json({ ok: true, message: "Todo deleted" });
});

///////////////////////////////////////////////


//iniciar server
app.listen(3000, () => {
    console.log("Server running http://localhost:3000");
});
