const express = require("express");

const app = express();
app.use(express.json());

const port = 5000;
app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});

const welcome = (req, res) => {
  res.send("Welcome to the list");
};
app.get("/", welcome);


const userHandlers = require("./userHandlers");
const movieHandlers = require("./movieHandlers");
const { validateUser } = require("./validators.js");
const { validateMovie } = require("./validators.js");
const { hashPassword, verifyPassword, verifyToken } = require("./auth");

app.post(
  "/api/login",
  userHandlers.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
);

app.post("/api/users", hashPassword, validateUser, userHandlers.postUser);
app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUsersById);

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);

app.use(verifyToken);

app.put("/api/users/:id", hashPassword, validateUser, userHandlers.updateUser);
app.delete("/api/users/:id", userHandlers.deleteUser);

app.post("/api/movies", validateMovie, movieHandlers.postMovie);
app.put("/api/movies/:id", validateMovie, movieHandlers.updateMovie);
app.delete("/api/movies/:id", movieHandlers.deleteMovie);






