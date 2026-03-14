const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2/promise");
const cors = require("cors");
const { validateData } = require("./validate");

const port = 8000;
const corsOptions = {
  origin: "*",
  optionSuccessStatus: 200,
};

const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

let conn = null; // Global variable to hold the MySQL connection

const initMySQL = async () => {
  conn = await mysql.createConnection({
    host: "localhost",
    port: 8888,
    user: "root",
    password: "root",
    database: "webdb",
  });
};

app.get("/users", async (req, res) => {
  const [result] = await conn.query(
    "SELECT * FROM users WHERE deletedAt IS NULL",
  );
  res.send(result);
});
app.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  const [result] = await conn.query(
    "SELECT * FROM users WHERE id = ? AND deletedAt IS NULL",
    [id],
  );
  if (result.length === 0) {
    return res.status(404).json({
      message: "User not found",
    });
  } else {
    res.json({
      message: "User retrieved successfully",
      user: result[0],
    });
  }
});
app.post("/user", async (req, res) => {
  try {
    const rawData = req.body;
    // force interests ให้เป็น array
    const interests = Array.isArray(rawData.interests)
      ? rawData.interests
      : rawData.interests
        ? [rawData.interests]
        : [];
    const errors = validateData({ ...rawData, interests });
    if (errors.length > 0) {
      throw { code: "INVALID_VALIDATION", errors };
    }

    const [result] = await conn.query(
      "INSERT INTO users (firstname, lastname, age, gender,interests, description) VALUES (?, ?, ?, ?, ?, ?)",
      [
        rawData.firstname,
        rawData.lastname,
        rawData.age,
        rawData.gender,
        rawData.interests.join(",") || rawData.interests,
        rawData.description,
      ],
    );
    res.send({ message: "User added successfully!", userId: result.insertId });
  } catch (error) {
    res.setHeader("Content-Type", "application/json");

    if (error.code === "INVALID_VALIDATION") {
      return res
        .status(400)
        .json({ message: "Validation Error", error: error.errors });
    }
    console.error("Error inserting user:", error);
    res
      .status(500)
      .json({ message: "Failed to add user", error: error.message });
  }
});
app.get("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await conn.query("SELECT * FROM users WHERE id = ?", [id]);
    if (result.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.json({
      message: "User retrieved successfully",
      user: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve user",
      error: error.message,
    });
  }
});
app.put("/user/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedUser = req.body;

    const [result] = await conn.query(
      `UPDATE users 
       SET firstname = ?, lastname = ?, age = ?, gender = ?, interests = ?, description = ?
       WHERE id = ?`,
      [
        updatedUser.firstname,
        updatedUser.lastname,
        updatedUser.age,
        updatedUser.gender,
        updatedUser.interests,
        updatedUser.description,
        id,
      ]
    );

    if (result.affectedRows === 0) {
      throw { statusCode: 404, message: "User not found" };
    }

    res.json({
      message: "User updated successfully",
    });

  } catch (error) {
    console.error("Error updating user:", error);
    res.status(error.statusCode || 500).json({
      message: error.message || "Failed to update user",
    });
  }
});

// app.patch("/user/:id", (req, res) => {
//   const { id } = req.params;
//   const updates = req.body;

//   const targetIndex = users.findIndex((user) => user.id == id);

//   if (targetIndex === -1) {
//     return res.status(404).json({
//       message: "User not found",
//     });
//   }

//   const { id: _, ...allowedUpdates } = updates;

//   users[targetIndex] = {
//     ...users[targetIndex],
//     ...allowedUpdates,
//   };

//   res.status(200).json({
//     message: "User updated successfully",
//     user: users[targetIndex],
//   });
// });
app.delete("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await conn.query("UPDATE users SET deletedAt = NOW() WHERE id = ?", [id]);
    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(error.statusCode || 500).json({
      message: error.message || "Failed to delete user",
    });
  }
});

// app.get("/testDB", async (req, res) => {
//   const db = await mysql.createConnection({
//     host: "localhost",
//     port: 8888,
//     user: "root",
//     password: "root",
//     database: "webdb",
//   });
//   const [result] = await db.query("SELECT * FROM users").catch((err) => {
//     console.error("Error querying database:", err);
//     res.status(500).json({
//       message: "Database query failed",
//       error: err.message,
//     });
//   });
//   res.json({
//     message: "Database connection successful!",
//     result,
//   });
// });

app.get("/testDB-New", async (req, res) => {
  try {
    const [result] = await conn.query("SELECT * FROM users");
    res.json({
      message: "Database connection successful!",
      result,
    });
  } catch (err) {
    console.error("Error querying database:", err);
    res.status(500).json({
      message: "Database query failed",
      error: err.message,
    });
  }
});
app.listen(port, async () => {
  await initMySQL();
  console.log(`Running at port: ${port}`);
});
