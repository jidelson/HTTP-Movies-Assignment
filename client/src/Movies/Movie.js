import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, deleteMovie }) {
  const [movie, setMovie] = useState(null);
  const {id} = useParams();
  const history = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(id);
  }, [id]);

  const handleDelete = e => {
    e.preventDefault();
    axios
    .delete (`http://localhost:5000/api/movies/${movie.id}`)
    .then((res) => {
      deleteMovie(res.data);
      history.push('/');
    })
    .catch(err => console.log('delete err', err))
  }

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const handleEdit = e => {
    history.push(`/update-movie/${id}`)
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={handleEdit}>Edit</button>
    </div>
  );
}

export default Movie;
