const express = require("express");

const app = express();
app.use(express.json());

const port = 5000;

const welcome = (req, res) => {
  res.send("Welcome to the list");
};

app.get("/", welcome);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});

const userHandlers = require("./userHandlers");
const { validateUser } = require("./validators.js");

app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUsersById);

app.post("/api/users", validateUser, userHandlers.postUser);

app.put("/api/users/:id", validateUser, userHandlers.updateUser);

app.delete("/api/users/:id", userHandlers.deleteUser);


const movieHandlers = require("./movieHandlers");
const { validateMovie } = require("./validators.js");

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);

app.post("/api/movies", validateMovie, movieHandlers.postMovie);

app.put("/api/movies/:id", validateMovie, movieHandlers.updateMovie);

app.delete("/api/movies/:id", movieHandlers.deleteMovie);


