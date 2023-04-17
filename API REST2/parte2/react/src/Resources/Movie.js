import React from "react";
import axios from "axios";
import {Link} from "react-router-dom";

const movies = "http://localhost:3000/Movies";
const movie = "http://localhost:3000/Movie";

const request = axios.create({
    withCredentials: true,
  });

export default function Movies() {
    const [regs, setPosts] = React.useState(null);
    const [, setState] = React.useState(null);
  
    React.useEffect(() => {
      request.get(movies).then((response) => {
        setPosts(response.data);
      });
    }, []);
  
    function deleteMovie(event) {
      const deletedId = event.currentTarget.dataset.index;
      request.delete(`${movie}/${deletedId}`).then(() => {
        regs.splice(
          regs.findIndex((el) => String(el.id) === String(deletedId)),
          1
        );
        setPosts(regs);
        setState({});
      });
    }
  
    if (!regs) return null;
    return (
      <div>
        <Link to={`/movie/create`}><button style={{"margin-bottom": "20px"}} class="btn btn-success">Create Movie</button></Link>
        <table style={{textAlign: "center"}} class="table table-striped table-dark" border="solid 1px">
          <thead>
            <tr>
              <th width="4%">#</th>
              <th width="25%">Language</th>
              <th width="25%">Original_Title</th>
              <th width="25%">Release_Date</th>
              <th width="25%">Runtime</th>
              <th width="25%">Actor_id</th>
              <th width="25%">Director_id</th>
              <th width="10%" colspan="2"></th>
            </tr>
          </thead>
          <tbody>
            {regs.map((reg, i) => (
              <tr key={i}>
                <td>{reg.id}</td>
                <td>{reg.language}</td>
                <td>{reg.original_title}</td>
                <td>{reg.release_date}</td>
                <td>{reg.runtime}</td>
                <td>{reg.actor_id}</td>
                <td>{reg.director_id}</td>
                <td>
                  <Link to={`/movie/${reg.id}`}><button class="btn btn-primary">Update</button></Link>
                </td>
                <td>
                  <button class="btn btn-danger" data-index={reg.id} onClick={deleteMovie}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }