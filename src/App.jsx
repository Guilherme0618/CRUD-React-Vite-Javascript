import { useEffect, useState } from "react";
import AddUsers from "./components/AddUsers";
import Users from "./components/Users";
import UserFilter from "./components/UserFilter";
import UserLog from "./components/UserLog";
import { v4 } from "uuid";
import EditUser from "./components/EditUser";

function App() {
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users")) || [],
  );
  const [logs, setLogs] = useState(
    JSON.parse(localStorage.getItem("logs")) || [],
  );

  const [search, setSearch] = useState("");
  const [userBeingEdited, setUserBeingEdited] = useState(null);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()),
  );

  function addLog(action, name) {
    const newLog = {
      id: v4(),
      action,
      name,
      date: new Date().toLocaleString("pt-BR"),
    };

    setLogs((prev) => [newLog, ...prev]);
  }

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);
  useEffect(() => {
    localStorage.setItem("logs", JSON.stringify(logs));
  }, [logs]);

  function onUserClick(userId) {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, isAvailable: !user.isAvailable } : user,
      ),
    );
  }

  function onDeleteUser(userId) {
    if (confirm("Excluir usuário?")) {
      setUsers(users.filter((user) => user.id !== userId));

      addLog("EXCLUIDO", user.name);
    }
  }

  function onAddUserSubmit(name, description) {
    const newUser = {
      id: v4(),
      name,
      description,
      isAvailable: true,
    };

    setUsers([...users, newUser]);

    addLog("CRIADO", name);
  }

  function onEditUser(user) {
    setUserBeingEdited(user);
  }

  function onUpdateUser(updatedUser) {
    setUsers(
      users.map((user) => (user.id === updatedUser.id ? updatedUser : user)),
    );
    setUserBeingEdited(null);

    addLog("EDITADO", updatedUser.name);
  }

  return (
    <div className="grid grid-cols-5 grid-rows-5 gap-2 min-h-screen bg-slate-500 p-4">
      {/* DIV lateral esquerdo */}
      <div className="row-span-3 bg-slate-800 p-4 rounded-md text-white space-y-6">
        <h2 className="text-xl font-bold">Filtrar Usuário</h2>
        <UserFilter search={search} setSearch={setSearch} />

        <h2 className="text-xl font-bold">Adicionar Usuário</h2>
        <AddUsers onAddUserSubmit={onAddUserSubmit} />
      </div>

      {/* DIV topo*/}
      <div className="col-span-4 bg-slate-700 p-4 rounded-md flex items-center">
        <h1 className="text-2xl text-white font-bold">
          Gerenciador de Usuários
        </h1>
      </div>

      {/* DIV centro informacoes*/}
      <div className="col-span-4 row-span-4 col-start-2 row-start-2 bg-slate-300 p-4 rounded-md overflow-y-auto">
        <Users
          users={filteredUsers}
          onUserClick={onUserClick}
          onDeleteUser={onDeleteUser}
          onEditUser={onEditUser}
        />
      </div>

      {/* DIV baixo esquerdo */}
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
