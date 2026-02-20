import { useState } from "react";

function EditUser({ user, onSave, onCancel }) {
  const [name, setName] = useState(user.name);
  const [description, setDescription] = useState(user.description);

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center">
      <div className="bg-slate-800 p-6 rounded-md w-[350px] space-y-4 text-white">
        <h2 className="text-xl font-bold">Editar Usuário</h2>

        <input
          className="p-2 rounded-md text-black w-full"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <input
          className="p-2 rounded-md text-black w-full"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />

        <div className="flex gap-2 justify-end">
          <button onClick={onCancel} className="bg-gray-500 p-2 rounded-md">
            Cancelar
          </button>

          <button
            onClick={() => {
              if (confirm("Deseja Efitar Usuario?")) {
                onSave({ ...user, name, description });
              }
            }}
            className="bg-green-500 p-2 rounded-md"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditUser;
