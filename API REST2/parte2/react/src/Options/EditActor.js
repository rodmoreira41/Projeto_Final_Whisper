import React from 'react';

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const EditActor = ({
    actors, handleEditActor, editName, setEditName
}) => {
    const { id } = useParams();
    const actor = actors.find(actor => (actor.id).toString() === id);

    useEffect(() => {
        if (actor) {
            setEditName(actor.name);
        }
    }, [actor, setEditName])

    return (
        <div>
            {actor && <>
                <h2>Edit Actor #{id}</h2>
                <form class="form-group" onSubmit={(e) => e.preventDefault()}>
                    <label class="form-label">Name:</label>
                    <input class="form-control" type="text" required value={editName} onChange={(e) => setEditName(e.target.value)} />
                    <br/>
                    <button class="btn btn-primary" type="submit" onClick={() => handleEditActor(id)}>Submit</button>
                </form>
            </>}
            {!actor && <>
                <p>Missing Actor #{id}</p>
                <p>Check other <Link to='/Actors'>Actors</Link>!</p>
            </>}
        </div>
    )
}

export default EditActor