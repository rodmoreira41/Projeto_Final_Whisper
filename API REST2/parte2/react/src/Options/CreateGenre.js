import React from 'react';

const CreateGenre = ({
    genres, handleCreateGenre, createNameGenre, setCreateNameGenre
}) => {
  return (
    <main>
      <h2>Create Genre</h2>
      <form class="form-group" onSubmit={handleCreateGenre}>
        <label class="form-label">Genre:</label>
        <input class="form-control" type="text" required value={createNameGenre} onChange={(e) => setCreateNameGenre(e.target.value)}/>
      </form>
    </main>
  );
};

export default CreateGenre;
