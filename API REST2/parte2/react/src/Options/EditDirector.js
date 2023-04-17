import React from 'react';

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const EditDirector = ({
    directors, handleEditDirector, editNameDirector, setEditNameDirector
}) => {
    const { id } = useParams();
    const director = directors.find(director => (director.id).toString() === id);

    useEffect(() => {
        if (director) {
            setEditNameDirector(director.name);
        }
    }, [director, setEditNameDirector])

    return (
        <div>
            {director && <>
                <h2>Edit Director #{id}</h2>
                <form class="form-group" onSubmit={(e) => e.preventDefault()}>
                    <label class="form-label">Name:</label>
                    <input class="form-control" type="text" required value={editNameDirector} onChange={(e) => setEditNameDirector(e.target.value)} />
                    <br/>
                    <button class="btn btn-primary" type="submit" onClick={() => handleEditDirector(id)}>Submit</button>
                </form>
            </>}
            {!director && <>
                <p>Missing Director #{id}</p>
                <p>Check other <Link to='/Directors'>Directors</Link>!</p>
            </>}
        </div>
    )
}

export default EditDirector;