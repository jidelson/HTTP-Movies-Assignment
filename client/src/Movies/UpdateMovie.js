import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

const initialMovieValues = {
    title:'',
    director:'',
    metascore:'',
    stars:[]
}

function UpdateMovie(props){
    const [formValue, setFormValue] = useState(initialMovieValues);
    const {id} = useParams();
    const {movie} = props
    const handleChange = e => {
        setFormValue({...formValue, [e.target.name]:e.target.value})
    }


    const handleSubmit = e => {
        e.preventDefault();
        handleEditMovie()
    }

    useEffect(() => {
        const movieToUpdate = props.movieList.find(formValue => `${formValue.id}` === id)
        if(movieToUpdate){
            setFormValue(movieToUpdate)
        }
        
    })

    const handleEditMovie = e => {
        const updatedMovie = {
            title: formValue.title,
            director: formValue.director,
            metascore: formValue.metascore
        }
        axios.put(`http://localhost:5000/api/movies/${movie.id}`, formValue)
        .then(res => {
            setFormValue(updatedMovie);
        })
        .catch(err => console.log(err))
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
            <button>Edit</button>
            </form>
        </div>
    )
}

export default UpdateMovie;