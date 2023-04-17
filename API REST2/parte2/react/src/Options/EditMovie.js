import React from 'react';

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const EditMovie = ({
    movies, handleEditMovie, editLanguage, setEditLanguage, editOriginal_Title, setEditOriginal_Title, editRelease_Date, setEditRelease_Date, editRuntime, setEditRuntime, editActor_id, setEditActor_id, editDirector_id, setEditDirector_id
}) => {
    const { id } = useParams();
    const movie = movies.find(movie => (movie.id).toString() === id);

    useEffect(() => {
        if (movie) {
            setEditLanguage(movie.language);
            setEditOriginal_Title(movie.original_title);
            setEditRelease_Date(movie.release_date);
            setEditRuntime(movie.runtime);
            setEditActor_id(movie.actor_id);
            setEditDirector_id(movie.director_id);
        }
    }, [movie, setEditLanguage, setEditOriginal_Title, setEditRelease_Date, setEditRuntime, setEditActor_id, setEditDirector_id])

    return (
        <div>
            {movie && <>
                <h2>Edit Movie #{id}</h2>
                <form class="form-group" onSubmit={(e) => e.preventDefault()}>
                    <label class="form-label">Language:</label>
                    <input class="form-control" type="text" required value={editLanguage} onChange={(e) => setEditLanguage(e.target.value)} />

                    <label class="form-label">Original_Title:</label>
                    <input class="form-control" type="text" min="18" max="150" required value={editOriginal_Title} onChange={(e) => setEditOriginal_Title(e.target.value)} />

                    <label class="form-label">Release_Date:</label>
                    <input class="form-control form-control" required value={editRelease_Date} onChange={(e) => setEditRelease_Date(e.target.value)}/>

                    <label class="form-label">Runtime:</label>
                    <input class="form-control form-control" type="number" required value={editRuntime} onChange={(e) => setEditRuntime(e.target.value)}/>

                    <label class="form-label">Actor_id:</label>
                    <input class="form-control form-control" type="number" required value={editActor_id} onChange={(e) => setEditActor_id(e.target.value)}/>

                    <label class="form-label">Director_id:</label>
                    <input class="form-control form-control" type="number" required value={editDirector_id} onChange={(e) => setEditDirector_id(e.target.value)}/>


                    <br/>
                    <button class="btn btn-primary" type="submit" onClick={() => handleEditMovie(id)}>Submit</button>
                </form>
            </>}
            {!movie && <>
                <p>Missing Movie #{id}</p>
                <p>Check other <Link to='/Movies'>Movies</Link>!</p>
            </>}
        </div>
    )
}

export default EditMovie;