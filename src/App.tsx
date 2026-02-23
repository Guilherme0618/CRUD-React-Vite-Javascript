import { useEffect, useState } from "react";
import AddUsers from "./components/AddUsers";
import Users from "./components/Users";
import UserFilter from "./components/UserFilter";
import UserLog from "./components/UserLog";
import EditUser from "./components/EditUser";
import { v4 } from "uuid";
import type { User } from "./types/User";
import type { Log } from "./types/Log";

function App() {
  const [users, setUsers] = useState<User[]>(() => {
    const stored = localStorage.getItem("users");
    return stored ? JSON.parse(stored) : [];
  });

  const [logs, setLogs] = useState<Log[]>(() => {
    const stored = localStorage.getItem("logs");
    return stored ? JSON.parse(stored) : [];
  });

  const [search, setSearch] = useState<string>("");
  const [userBeingEdited, setUserBeingEdited] = useState<User | null>(null);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()),
  );

  const addLog = (action: string, name: string) => {
    const newLog: Log = {
      id: v4(),
      action,
      name,
      date: new Date().toLocaleString("pt-BR"),
    };

    setLogs((prev) => [newLog, ...prev]);
  };

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem("logs", JSON.stringify(logs));
  }, [logs]);

  function onUserClick(userId: string) {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, isAvailable: !user.isAvailable } : user,
      ),
    );
  }

  function onDeleteUser(userId: string) {
    const userToDelete = users.find((user) => user.id === userId);
    if (!userToDelete) return;

    if (confirm("Excluir usuário?")) {
      setUsers((prev) => prev.filter((user) => user.id !== userId));
      addLog("EXCLUIDO", userToDelete.name);
    }
  }

  function onAddUserSubmit(name: string, description: string) {
    const newUser: User = {
      id: v4(),
      name,
      description,
      isAvailable: true,
    };

    setUsers((prev) => [...prev, newUser]);
    addLog("CRIADO", name);
  }

  function onEditUser(user: User) {
    setUserBeingEdited(user);
  }

  function onUpdateUser(updatedUser: User) {
    setUsers((prev) =>
      prev.map((user) => (user.id === updatedUser.id ? updatedUser : user)),
    );

    setUserBeingEdited(null);
    addLog("EDITADO", updatedUser.name);
  }

  return (
    <div className="grid grid-cols-5 grid-rows-5 gap-2 min-h-screen bg-slate-500 p-4">
      {/* LATERAL ESQUERDO */}
      <div className="row-span-3 bg-slate-800 p-4 rounded-md text-white space-y-6">
        <h2 className="text-xl font-bold">Filtrar Usuário</h2>
        <UserFilter search={search} setSearch={setSearch} />

        <h2 className="text-xl font-bold">Adicionar Usuário</h2>
        <AddUsers onAddUserSubmit={onAddUserSubmit} />
      </div>

      {/* TOPO */}
      <div className="col-span-4 bg-slate-700 p-4 rounded-md flex items-center">
        <h1 className="text-2xl text-white font-bold">
          Gerenciador de Usuários
        </h1>
      </div>

      {/* CENTRO */}
      <div className="col-span-4 row-span-4 col-start-2 row-start-2 bg-slate-300 p-4 rounded-md overflow-y-auto">
        <Users
          users={filteredUsers}
          onUserClick={onUserClick}
          onDeleteUser={onDeleteUser}
          onEditUser={onEditUser}
        />
      </div>

      {/* LOGS */}
      <div className="row-span-2 row-start-4 bg-slate-800 p-4 rounded-md text-white">
        <UserLog logs={logs} />
      </div>

      {/* MODAL */}
      {userBeingEdited && (
        <EditUser
          user={userBeingEdited}
          onSave={onUpdateUser}
          onCancel={() => setUserBeingEdited(null)}
        />
      )}
    </div>
  );
}

export default App;
