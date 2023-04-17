import React from 'react';

const CreateMovie = ({
    movies, handleCreateMovie, createLanguage, setCreateLanguage, createOriginal_Title, setCreateOriginal_Title, createRelease_Date, setCreateRelease_Date, createRuntime, setCreateRuntime, createActor_id, setCreateActor_id, createDirector_id, setCreateDirector_id
}) => {
  return (
    <main>
      <h2>Create Movie</h2>
      <form class="form-group" onSubmit={handleCreateMovie}>
        <label class="form-label">Language:</label>
        <input class="form-control" type="text" required value={createLanguage} onChange={(e) => setCreateLanguage(e.target.value)}/>

        <label class="form-label">Original_Title:</label>	
        <input class="form-control" type="text" required value={createOriginal_Title} onChange={(e) => setCreateOriginal_Title(e.target.value)}/>

        <label class="form-label">Release_Date:</label>	
        <input class="form-control" required value={createRelease_Date} onChange={(e) => setCreateRelease_Date(e.target.value)}/>

        <label class="form-label">Runtime:</label>	
        <input class="form-control" type="number" required value={createRuntime} onChange={(e) => setCreateRuntime(e.target.value)}/>

        <label class="form-label">Actor_id:</label>	
        <input class="form-control" type="number" required value={createActor_id} onChange={(e) => setCreateActor_id(e.target.value)}/>

        <label class="form-label">Director_id:</label>	
        <input class="form-control" type="number" required value={createDirector_id} onChange={(e) => setCreateDirector_id(e.target.value)}/>





        <br/>
        <button class="btn btn-primary" type="submit">Submit</button>
      </form>
    </main>
  );
};

export default CreateMovie;
