import React from 'react';

const CreateActor = ({
    actors, handleCreateActor, createName, setCreateName
}) => {
  return (
    <main>
      <h2>Create Actor</h2>
      <form class="form-group" onSubmit={handleCreateActor}>
        <label class="form-label">Name:</label>
        <input class="form-control" type="text" required value={createName} onChange={(e) => setCreateName(e.target.value)}/>

      </form>
    </main>
  );
};

export default CreateActor;
