import React from 'react';

const CreateDirector = ({
    directors, handleCreateDirector, createNameDirector, setCreateNameDirector
}) => {
  return (
    <main>
      <h2>Create Director</h2>
      <form class="form-group" onSubmit={handleCreateDirector}>
        <label class="form-label">Name:</label>
        <input class="form-control" type="text" required value={createNameDirector} onChange={(e) => setCreateNameDirector(e.target.value)}/>
      </form>
    </main>
  );
};

export default CreateDirector;
