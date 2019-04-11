const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

// temp db for testing w postman
const dataBase = {
  users: [
    {
      id: "123",
      name: "Homer",
      email: "misterx@mail.com",
      password: "donuts",
      entries: 0,
      joined: new Date()
    },
    {
      id: "321",
      name: "Marge",
      email: "margie@mail.com",
      password: "snowball",
      entries: 0,
      joined: new Date()
    }
  ]
}

app.get("/", (req, res) => {
  res.json(dataBase.users);
});

app.post("/signin", (req, res) => {
  if (req.body.email === dataBase.users[0].email && req.body.password === dataBase.users[0].password ) {
    res.json('successful log-in');
  } else {
    res.status(400).json('error logging in');
  }
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  dataBase.users.push({
    id: Math.floor(Math.random() * 100).toString(),
    name,
    email,
    password,
    entries: 0,
    joined: new Date()
  })
  res.json(dataBase.users[dataBase.users.length - 1]);
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let found = false;
  dataBase.users.forEach(user => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  })
  if (!found) {
    res.status(404).json("No such luck");
  }
});

app.put("/image", (req, res) => {
  const { id } = req.body;
  let found = false;
  dataBase.users.forEach(user => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  })
  if (!found) {
    res.status(404).json("No such luck");
  }
});

app.listen(3000, () => {
  console.log('app is running on port 3000');
});