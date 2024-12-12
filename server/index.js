const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

app.post("/todos", async (req, res) => {
  const { description } = req.body;

  const newTodo = await pool.query(
    "INSERT INTO todo (description) VALUES ($1) RETURNING *",
    [description]
  );

  res.status(201).send(newTodo.rows[0]);
});

app.get("/todos", async (req, res) => {
  const todos = await pool.query("SELECT * FROM todo");

  res.send(todos.rows);
});

app.get("/todos/:id", async (req, res) => {
  const { id } = req.params;

  const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);

  res.send(todo.rows[0]);
});

app.put("/todos/:id", async (req, res) => {
  const { description } = req.body;

  const updatedTodo = await pool.query(
    "UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING *",
    [description, req.params.id]
  );

  res.send(updatedTodo.rows[0]);
});

app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;

  const deletedTodo = await pool.query(
    "DELETE FROM todo WHERE todo_id = ($1) RETURNING *",
    [id]
  );

  res.send(deletedTodo.rows[0]);
});
