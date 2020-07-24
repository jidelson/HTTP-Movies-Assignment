import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useHistory } from "react-router-dom";

const initialMovieValues = {
    title:'',
    director:'',
    metascore:'',
    stars:[]
}

function UpdateMovie({movieList, updateMovie}){
    const {id} = useParams();
    const movieToUpdate = movieList.find(
      movie => movie.id === Number(id)
    );
    const [formValue, setFormValue] = useState(movieToUpdate ||initialMovieValues);
    const history = useHistory();
    const handleChange = e => {
        setFormValue({...formValue, [e.target.name]:e.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios
          .put(`http://localhost:5000/api/movies/${id}`, formValue)
          .then(resp => {
            updateMovie(resp.data);
            history.push('/')
          })
          .catch(err => {
              console.log('Error:', err);
          })
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label>Title:
                    <input 
                    id='title'
                    name='title'
                    type='text'
                    value={formValue.title}
                    onChange={handleChange}
                    />
                </label>
                <label>Director:
                    <input 
                    id='director'
                    name='director'
                    type='text'
                    value={formValue.director}
                    onChange={handleChange}
                    />
                </label>
                <label>Metascore:
                    <input 
                    id='metascore'
                    name='metascore'
                    type='number'
                    value={formValue.metascore}
                    onChange={handleChange}
                    />
                </label>
            <button type='submit'>Update</button>
            </form>
        </div>
    )
}

export default UpdateMovie;