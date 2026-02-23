import { useState } from "react";

type AddUsersProps = {
  onAddUserSubmit: (name: string, description: string) => void;
};

function AddUsers({ onAddUserSubmit }: AddUsersProps) {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  return (
    <div className="space-y-4 flex flex-col">
      <input
        type="text"
        placeholder="Nome do usuário"
        className="p-2 rounded-md text-black"
        value={name}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setName(event.target.value)
        }
      />

      <input
        type="text"
        placeholder="Conhecimento"
        className="p-2 rounded-md text-black"
        value={description}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setDescription(event.target.value)
        }
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
