const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 8000;
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/test", (req, res) => {
  let user = {
    name: "John Doe",
    age: 30,
    email: "john.doe@example.com",
  };
  res.json(user);
});
let users = [];
let counter = 1;
app.post("/user", (req, res) => {
  const rawData = req.body;
  rawData.id = counter++;
  users.push(rawData);
  res.send({ message: "User added successfully!", user: rawData });
});
app.get("/users", (req, res) => {
  res.json(users);
});

app.put("/user/:id", (req, res) => {
  let id = req.params.id;
  let updatedUser = req.body;
  const targetIndex = users.findIndex((user) => user.id == id);
  users[targetIndex] = {
    ...users[targetIndex],
    ...updatedUser,
    id: users[targetIndex].id,
  };
  //   users[targetIndex] = { ...users[targetIndex], ...req.body };
  res.json({
    message: "User updated successfully!",
    user: updatedUser,
    indexUpdated: targetIndex,
  });
});

app.patch("/user/:id", (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const targetIndex = users.findIndex((user) => user.id == id);

  if (targetIndex === -1) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const { id: _, ...allowedUpdates } = updates;

  users[targetIndex] = {
    ...users[targetIndex],
    ...allowedUpdates,
  };

  res.status(200).json({
    message: "User updated successfully",
    user: users[targetIndex],
  });
});
app.delete("/user/:id", (req, res) => {
  const { id } = req.params;
  const targetIndex = users.findIndex((user) => user.id == id);
  if (targetIndex === -1) {
    return res.status(404).json({
      message: "User not found",
    });
  }
  users.splice(targetIndex, 1);
  users = users.map((user, index) => ({
    ...user,
    id: index + 1,
  }));

  res.status(200).json({
    message: "User deleted successfully",
  });
});
app.listen(port, () => {
  console.log(`Running at port: ${port}`);
});
