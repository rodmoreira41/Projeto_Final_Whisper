import React from "react";
import { useState } from "react";
import "./App.css";
import axios from "axios";
import { NavLink, Routes, Route, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import Actor from "./Resources/Actor";
import EditActor from "./Options/EditActor";
import CreateActor from "./Options/CreateActor";

import Director from "./Resources/Director";
import EditDirector from "./Options/EditDirector";
import CreateDirector from "./Options/CreateDirector";

import Movie from "./Resources/Movie";
import EditMovie from "./Options/EditMovie";
import CreateMovie from "./Options/CreateMovie";

import Genre from "./Resources/Genre";
import EditGenre from "./Options/EditGenre";
import CreateGenre from "./Options/CreateGenre";

const request = axios.create({
  withCredentials: true,
});

const api = request.create({
  baseURL: "http://localhost:3000/",
});



const App = () => {

  const navigate = useNavigate();
  // ----------------------------------------------------- HandleEditActor -----------------------------------------------------
  //Definição de estados para props para a Ediçao do actor

  const [editName, setEditName] = useState("");

  const [actors, setPosts] = React.useState([]);

  //fetchActors para popular array de actor
  React.useEffect(() => {
    const fetchActors = async () => {
      const response = await api.get("/Actors");
      setPosts(response.data);
    };
    fetchActors();
  }, []);

  //função handleEditActor
  const handleEditActor = async (id) => {
    const updatedActor = {
      id,
      name: editName,
    };
    try {
      const response = await api.put(`Actor/${id}`, updatedActor);
      setPosts(actors.map((actor) => (actor.id === id ? { ...response.data } : actor)));
      setEditName("");
      navigate("/Actors");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };
  // ----------------------------------------------------- Fim HandleEditActor -----------------------------------------------------
  // -----------------------------------------------------  HandleCreateActor -----------------------------------------------------
  const [createName, setCreateName] = useState("");

  const handleCreateActor = async (e) => {
    e.preventDefault();
    const createActor = {
      name: createName,
    };
    try {
      const response = await api.post("/Actors", createActor);
      const allActors = [...actors, response.data];
      setPosts(allActors);
      setCreateName("");
      navigate("/Actors");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  // ----------------------------------------------------- Fim HandleCreateActor -----------------------------------------------------
 
  // ----------------------------------------------------- HandleEditDirector -----------------------------------------------------
  const [editNameDirector, setEditNameDirector] = useState("");

  const [directors, setDirectors] = React.useState([]);

  //fetchActors para popular array de actorros
  React.useEffect(() => {
    const fetchDirectors = async () => {
      const response = await api.get("/Directors");
      setDirectors(response.data);
    };
    fetchDirectors();
  }, []);

  //função handleEditActor
  const handleEditDirector = async (id) => {
    const updatedDirector = {
      id,
      name: editNameDirector,
    };
    try {
      const response = await api.put(`Director/${id}`, updatedDirector);
      setPosts(
        directors.map((director) =>
          director.id === id ? { ...response.data } : director
        )
      );
      setEditNameDirector("");
      navigate("/Directors");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };
  // ----------------------------------------------------- Fim HandleEditDirector -----------------------------------------------------
  // -----------------------------------------------------  HandleCreateDirector -----------------------------------------------------
  const [createNameDirector, setCreateNameDirector] = useState("");


  const handleCreateDirector = async (e) => {
    e.preventDefault();
    const createActor = {
      name: createNameDirector,
    };
    try {
      const response = await api.post("/Directors", createActor);
      const allDirectors = [...directors, response.data];
      setPosts(allDirectors);
      setCreateNameDirector("");
      navigate("/Directors");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  // ----------------------------------------------------- Fim HandleCreateActor -----------------------------------------------------
  // ----------------------------------------------------- HandleEditGenre -----------------------------------------------------
  const [editNameGenre, setEditNameGenre] = useState("");

  const [genres, setGenres] = React.useState([]);

  React.useEffect(() => {
    const fetchGenres = async () => {
      const response = await api.get("/Genres");
      setGenres(response.data);
    };
    fetchGenres();
  }, []);

  const handleEditGenre = async (id) => {
    const updatedGenre = {
      id,
      genre: editNameGenre,
    };
    try {
      const response = await api.put(`Genre/${id}`, updatedGenre);
      setPosts(
        genres.map((genre) => 
        (genre.id === id ? { ...response.data } : genre))
      );
      setEditNameGenre("");
      navigate("/Genres");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };
  // ----------------------------------------------------- Fim HandleEditGenre -----------------------------------------------------
  // ----------------------------------------------------- HandleCreateGenre -----------------------------------------------------
  const [createNameGenre, setCreateNameGenre] = useState("");

  const handleCreateGenre = async (e) => {
    e.preventDefault();
    const createGenre = {
      genre: createNameGenre,
    };
    try {
      const response = await api.post("/Genres", createGenre);
      const allGenres = [...genres, response.data];
      setGenres(allGenres);
      setCreateNameGenre("");
      navigate("/Genres");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };
  // ----------------------------------------------------- Fim HandleCreateGenre -----------------------------------------------------
  // ----------------------------------------------------- HandleEditMovie -----------------------------------------------------
  const [editLanguage, setEditLanguage] = useState("");
  const [editOriginal_Title, setEditOriginal_Title] = useState("");
  const [editRelease_Date, setEditRelease_Date] = useState("");
  const [editRuntime, setEditRuntime] = useState("");
  const [editActor_id, setEditActor_id] = useState("");
  const [editDirector_id, setEditDirector_id] = useState("");


  const [movies, setMovies] = React.useState([]);

  React.useEffect(() => {
    const fetchMovies = async () => {
      const response = await api.get("/Movies");
      setMovies(response.data);
    };
    fetchMovies();
  }, []);

  const handleEditMovie = async (id) => {
    const updatedMovie = {
      id,
      language: editLanguage,
      original_title: editOriginal_Title,
      release_date: editRelease_Date,
      runtime: editRuntime,
      actor_id: editActor_id,
      director_id: editDirector_id,
    };
    try {
      const response = await api.put(`Movie/${id}`, updatedMovie);
      setMovies(
        movies.map((movie) =>
          movie.id === id ? { ...response.data } : movie
        )
      );
      setEditLanguage("");
      setEditOriginal_Title("");
      setEditRelease_Date("");
      setEditRuntime("");
      setEditActor_id("");
      setEditDirector_id("");
      navigate("/Movies");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };
  // ----------------------------------------------------- Fim HandleEditMovie -----------------------------------------------------
  // ----------------------------------------------------- HandleCreateMovie -----------------------------------------------------
  const [createLanguage, setCreateLanguage] = useState("");
  const [createOriginal_Title, setCreateOriginal_Title] = useState("");
  const [createRelease_Date, setCreateRelease_Date] = useState("");
  const [createRuntime, setCreateRuntime] = useState("");
  const [createActor_id, setCreateActor_id] = useState("");
  const [createDirector_id, setCreateDirector_id] = useState("");

  const handleCreateMovie = async (e) => {
    e.preventDefault();
    const createMovie = {
      language: createLanguage,
      original_title: createOriginal_Title,
      release_date: createRelease_Date,
      runtime: createRuntime,
      actor_id: createActor_id,
      director_id: createDirector_id,
    };
    try {
      const response = await api.post("/Movies", createMovie);
      const allMovies = [...movies, response.data];
      setMovies(allMovies);
      setCreateLanguage("");
      setCreateOriginal_Title("");
      setCreateRelease_Date("");
      setCreateRuntime("");
      setCreateActor_id("");
      setCreateDirector_id("");
      navigate("/Movies");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };
  // ----------------------------------------------------- Fim HandleCreateMovie -----------------------------------------------------

  return (
    <div className="app">
      <h1>Movies</h1>
      <Navigation />
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/directors" element={<Director />}></Route>
        <Route exact path="/actors" element={<Actor />}></Route>
        <Route exact path="/movies" element={<Movie />}></Route>
        <Route exact path="/genres" element={<Genre />}></Route>
        <Route
          path="/actor/:id"
          element={
            <EditActor
              actors={actors}
              handleEditActor={handleEditActor}
              editName={editName}
              setEditName={setEditName}
            />
          }
        ></Route>
        <Route
          exact
          path="/actor/create"
          element={
            <CreateActor
              actors={actors}
              handleCreateActor={handleCreateActor}
              createName={createName}
              setCreateName={setCreateName}
            />
          }
        ></Route>
        <Route
          path="/director/:id"
          element={
            <EditDirector
              directors={directors}
              handleEditDirector={handleEditDirector}
              editNameDirector={editNameDirector}
              setEditNameDirector={setEditNameDirector}
            />
          }
        ></Route>
        <Route
          exact
          path="/director/create"
          element={
            <CreateDirector
              directors={directors}
              handleCreateDirector={handleCreateDirector}
              createNameDirector={createNameDirector}
              setCreateNameDirector={setCreateNameDirector}
            />
          }
        ></Route>
        <Route
          path="/genre/:id"
          element={
            <EditGenre
              genres={genres}
              handleEditGenre={handleEditGenre}
              editNameGenre={editNameGenre}
              setEditNameGenre={setEditNameGenre}
            />
          }
        ></Route>
        <Route
          exact
          path="/genre/create"
          element={
            <CreateGenre
              genres={genres}
              handleCreateGenre={handleCreateGenre}
              createNameGenre={createNameGenre}
              setCreateNameGenre={setCreateNameGenre}
            />
          }
        ></Route>
        <Route
          path="/movie/:id"
          element={
            <EditMovie
              movies={movies}
              handleEditMovie={handleEditMovie}
              editLanguage={editLanguage}
              setEditLanguage={setEditLanguage}
              editOriginal_Title={editOriginal_Title}
              setEditOriginal_Title={setEditOriginal_Title}
              editRelease_Date={editRelease_Date}
              setEditRelease_Date={setEditRelease_Date}
              editRuntime={editRuntime}
              setEditRuntime={setEditRuntime}
              editActor_id={editActor_id}
              setEditActor_id={setEditActor_id}
              editDirector_id={editDirector_id}
              setEditDirector_id={setEditDirector_id}
            />
          }
        ></Route>
        <Route
          exact
          path="/movie/create"
          element={
            <CreateMovie
              movies={movies}
              handleCreateMovie={handleCreateMovie}
              createLanguage={createLanguage}
              setCreateLanguage={setCreateLanguage}
              createOriginal_Title={createOriginal_Title}
              setCreateOriginal_Title={setCreateOriginal_Title}
              createRelease_Date={createRelease_Date}
              setCreateRelease_Date={setCreateRelease_Date}
              createRuntime={createRuntime}
              setCreateRuntime={setCreateRuntime}
              createActor_id={createActor_id}
              setCreateActor_id={setCreateActor_id}
              createDirector_id={createDirector_id}
              setCreateDirector_id={setCreateDirector_id}
            />
          }
        ></Route>
      </Routes>
    </div>
  );
};

const Navigation = () => (
  <nav>
    <ul>
      <li>
        <a href="http://localhost:3000/"><i class="bi bi-arrow-return-left"></i></a>
      </li>
      <li>
        <NavLink to="/"><i class="bi bi-house-door-fill"></i></NavLink>
      </li>
      <li>
        <NavLink to="/directors">Directors</NavLink>
      </li>
      <li>
        <NavLink to="/actors">Actors</NavLink>
      </li>
      <li>
        <NavLink to="/movies">Movies</NavLink>
      </li>
      <li>
        <NavLink to="/genres">Genres</NavLink>
      </li>
    </ul>
  </nav>
);

// ------------------------------- VISTAS -------------------------------

const Home = () => (
  <div className="home">
    <h1>Interface Desenvolvida em React para a API Movies</h1>
    <div>
     Ana Azevedo A039600
    </div>
    <div>
     Mariana Pereira A038553
    </div>
    <div>
     Mário Rofrigues A039139
    </div>
    <div>
     Rodrigo Moreira A039291
    </div>
  </div>
);

// ----------------------------- FIM VISTAS -----------------------------

export default App;
