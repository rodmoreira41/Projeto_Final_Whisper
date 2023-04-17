import React from "react";
import axios from "axios";
import {Link} from "react-router-dom";

const genres = "http://localhost:3000/Genres";
const genre = "http://localhost:3000/Genre";

const request = axios.create({
    withCredentials: true,
  });

export default function Genres() {
    const [regs, setPosts] = React.useState(null);
    const [, setState] = React.useState(null);
  
    React.useEffect(() => {
      request.get(genres).then((response) => {
        setPosts(response.data);
      });
    }, []);
  
    function deleteGenre(event) {
      const deletedId = event.currentTarget.dataset.index;
      request.delete(`${genre}/${deletedId}`).then(() => {
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
        <Link to={`/genre/create`}><button style={{"margin-bottom": "20px"}} class="btn btn-success">Create Genre</button></Link>
        <table style={{textAlign: "center"}} class="table table-striped table-dark" border="solid 1px">
          <thead>
            <tr>
              <th width="4%">#</th>
              <th width="25%">Genre</th>
              <th width="10%" colspan="2"></th>
            </tr>
          </thead>
          <tbody>
            {regs.map((reg, i) => (
              <tr key={i}>
                <td>{reg.id}</td>
                <td>{reg.genre}</td>
                <td>
                  <Link to={`/genre/${reg.id}`}><button class="btn btn-primary">Update</button></Link>
                </td>
                <td>
                  <button class="btn btn-danger" data-index={reg.id} onClick={deleteGenre}>
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