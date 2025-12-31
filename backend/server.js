const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

if (!fs.existsSync(path.join(__dirname, "uploads"))) {
  fs.mkdirSync(path.join(__dirname, "uploads"));
}

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mobile_shop"
});

db.connect((err) => {
  if (err) console.log("MySQL connection error:", err);
  else console.log("MySQL Connected");
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

const MAIN_ADMIN_USERNAME = "72330526@students.liu.edu.lb";


app.post("/api/auth/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.json({ success: false, message: "All fields required" });

  db.query(
    "SELECT * FROM admins WHERE username=? AND password=?",
    [username, password],
    (err, admins) => {
      if (err) return res.status(500).json({ success: false, message: "DB error" });

      if (admins.length > 0) return res.json({ success: true, role: "admin" });

      db.query(
        "SELECT * FROM users WHERE username=? AND password=?",
        [username, password],
        (err2, users) => {
          if (err2) return res.status(500).json({ success: false, message: "DB error" });

          if (users.length > 0) return res.json({ success: true, role: "user" });

          return res.json({ success: false, message: "Invalid username or password" });
        }
      );
    }
  );
});

app.post("/api/auth/signup", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.json({ success: false, message: "All fields required" });

  if (password.length < 8)
    return res.json({ success: false, message: "Password must be at least 8 characters" });

  db.query("SELECT * FROM users WHERE username=?", [username], (err, found) => {
    if (err) return res.status(500).json({ success: false, message: "DB error" });
    if (found.length > 0) return res.json({ success: false, message: "Username already exists" });

    db.query(
      "INSERT INTO users (username,password) VALUES (?,?)",
      [username, password],
      (err2) => {
        if (err2) return res.status(500).json({ success: false, message: "DB error" });
        return res.json({ success: true, message: "Signup successful" });
      }
    );
  });
});


app.get("/api/users", (req, res) => {
  db.query("SELECT * FROM users ORDER BY id DESC", (err, results) => {
    if (err) return res.status(500).json({ success: false, message: "DB error" });
    res.json(results);
  });
});

app.delete("/api/users/:id", (req, res) => {
  db.query("DELETE FROM users WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ success: false, message: "DB error" });
    res.json({ success: true });
  });
});


app.get("/api/admins", (req, res) => {
  db.query("SELECT id, username FROM admins ORDER BY id DESC", (err, results) => {
    if (err) return res.status(500).json({ success: false, message: "DB error" });
    res.json(results);
  });
});

app.post("/api/admins", (req, res) => {
  const loggedAdmin = req.headers["x-admin-username"];
  const { username, password } = req.body;

  if (loggedAdmin !== MAIN_ADMIN_USERNAME)
    return res.json({ success: false, message: "Only main admin can add admins" });

  if (!username || !password)
    return res.json({ success: false, message: "All fields required" });

  if (password.length < 8)
    return res.json({ success: false, message: "Password must be at least 8 characters" });

  db.query("SELECT * FROM admins WHERE username=?", [username], (err, found) => {
    if (err) return res.status(500).json({ success: false, message: "DB error" });
    if (found.length > 0) return res.json({ success: false, message: "Admin already exists" });

    db.query(
      "INSERT INTO admins (username,password) VALUES (?,?)",
      [username, password],
      (err2) => {
        if (err2) return res.status(500).json({ success: false, message: "DB error" });
        res.json({ success: true });
      }
    );
  });
});

app.delete("/api/admins/:id", (req, res) => {
  const loggedAdmin = req.headers["x-admin-username"];
  const id = req.params.id;

  if (loggedAdmin !== MAIN_ADMIN_USERNAME)
    return res.json({ success: false, message: "Only main admin can delete admins" });

  db.query("SELECT username FROM admins WHERE id=?", [id], (err, r) => {
    if (err) return res.status(500).json({ success: false, message: "DB error" });
    if (r.length === 0) return res.json({ success: false, message: "Admin not found" });

    if (r[0].username === MAIN_ADMIN_USERNAME)
      return res.json({ success: false, message: "Cannot delete main admin" });

    db.query("DELETE FROM admins WHERE id=?", [id], (err2) => {
      if (err2) return res.status(500).json({ success: false, message: "DB error" });
      res.json({ success: true });
    });
  });
});


app.get("/api/categories", (req, res) => {
  db.query("SELECT * FROM categories ORDER BY id DESC", (err, categories) => {
    if (err) return res.status(500).json({ success: false, message: "DB error" });
    if (categories.length === 0) return res.json([]);

    db.query("SELECT * FROM products ORDER BY id DESC", (err2, products) => {
      if (err2) return res.status(500).json({ success: false, message: "DB error" });

      const out = categories.map((c) => {
        const cid = Number(c.id);
        return {
          ...c,
          products: products.filter((p) => Number(p.category_id) === cid)
        };
      });

      res.json(out);
    });
  });
});

app.post("/api/categories", (req, res) => {
  const { name } = req.body;
  if (!name) return res.json({ success: false, message: "Category name required" });

  db.query("INSERT INTO categories (name) VALUES (?)", [name], (err) => {
    if (err) return res.status(500).json({ success: false, message: "DB error" });
    res.json({ success: true });
  });
});

app.post("/api/products", upload.single("image"), (req, res) => {
  const { name, price, description, category_id } = req.body;
  const image = req.file ? req.file.filename : null;

  if (!name || !price || !category_id)
    return res.json({ success: false, message: "Name, price, category required" });

  db.query(
    "INSERT INTO products (name,price,description,image,category_id) VALUES (?,?,?,?,?)",
    [name, price, description || "", image, category_id],
    (err) => {
      if (err) return res.status(500).json({ success: false, message: "DB error" });
      res.json({ success: true });
    }
  );
});

app.delete("/api/products/:id", (req, res) => {
  const id = req.params.id;

  db.query("SELECT image FROM products WHERE id=?", [id], (err, r) => {
    if (err) return res.status(500).json({ success: false, message: "DB error" });

    if (r.length > 0 && r[0].image) {
      const imagePath = path.join(__dirname, "uploads", r[0].image);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }

    db.query("DELETE FROM products WHERE id=?", [id], (err2) => {
      if (err2) return res.status(500).json({ success: false, message: "DB error" });
      res.json({ success: true });
    });
  });
});


app.get("/api/orders", (req, res) => {
  db.query("SELECT * FROM orders ORDER BY id DESC", (err, results) => {
    if (err) return res.status(500).json({ success: false, message: "DB error" });
    res.json(results);
  });
});

app.post("/api/orders", (req, res) => {
  const { name, phone, address, products, total_price } = req.body;

  if (!name || !phone || !address || !products || total_price === undefined)
    return res.json({ success: false, message: "All fields required" });

  db.query(
    "INSERT INTO orders (name,phone,address,products,total_price) VALUES (?,?,?,?,?)",
    [name, phone, address, products, total_price],
    (err) => {
      if (err) return res.status(500).json({ success: false, message: "DB error" });
      res.json({ success: true });
    }
  );
});

app.delete("/api/orders/:id", (req, res) => {
  db.query("DELETE FROM orders WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ success: false, message: "DB error" });
    res.json({ success: true });
  });
});


app.get("/api/messages", (req, res) => {
  db.query("SELECT * FROM messages ORDER BY id DESC", (err, results) => {
    if (err) return res.status(500).json({ success: false, message: "DB error" });
    res.json(results);
  });
});

app.post("/api/messages", (req, res) => {
  const { phone, message } = req.body;
  if (!phone || !message) return res.json({ success: false, message: "All fields required" });

  db.query("INSERT INTO messages (phone,message) VALUES (?,?)", [phone, message], (err) => {
    if (err) return res.status(500).json({ success: false, message: "DB error" });
    res.json({ success: true });
  });
});

app.delete("/api/messages/:id", (req, res) => {
  db.query("DELETE FROM messages WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ success: false, message: "DB error" });
    res.json({ success: true });
  });
});


app.get("/api/repairs", (req, res) => {
  db.query("SELECT * FROM repairs ORDER BY id DESC", (err, results) => {
    if (err) return res.status(500).json({ success: false, message: "DB error" });
    res.json(results);
  });
});

app.post("/api/repairs", upload.single("image"), (req, res) => {
  const { phone, description } = req.body;
  const image = req.file ? req.file.filename : null;

  if (!phone || !description)
    return res.json({ success: false, message: "All fields required" });

  db.query(
    "INSERT INTO repairs (phone,description,image) VALUES (?,?,?)",
    [phone, description, image],
    (err) => {
      if (err) return res.status(500).json({ success: false, message: "DB error" });
      res.json({ success: true });
    }
  );
});

app.delete("/api/repairs/:id", (req, res) => {
  const id = req.params.id;

  db.query("SELECT image FROM repairs WHERE id=?", [id], (err, r) => {
    if (err) return res.status(500).json({ success: false, message: "DB error" });

    if (r.length > 0 && r[0].image) {
      const imagePath = path.join(__dirname, "uploads", r[0].image);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }

    db.query("DELETE FROM repairs WHERE id=?", [id], (err2) => {
      if (err2) return res.status(500).json({ success: false, message: "DB error" });
      res.json({ success: true });
    });
  });
});

app.listen(5000, () => console.log("Server running on port 5000"));
