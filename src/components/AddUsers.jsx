import { useState } from "react";

function AddUsers({ onAddUserSubmit }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="space-y-4 flex flex-col">
      <input
        type="text"
        placeholder="Nome do usuário"
        className="p-2 rounded-md text-black"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <input
        type="text"
        placeholder="Conhecimento"
        className="p-2 rounded-md text-black"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />

      <button
        className="bg-slate-600 hover:bg-slate-700 text-white p-2 rounded-md"
        onClick={() => {
          if (!name || !description) {
            return alert("Preencha todos os campos!");
          }
          onAddUserSubmit(name, description);
          setName("");
          setDescription("");
        }}
      >
        Adicionar
      </button>
    </div>
  );
}

export default AddUsers;
