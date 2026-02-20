import { ChevronRightIcon, Pencil, Trash2Icon } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Users({ users, onUserClick, onDeleteUser, onEditUser }) {
  const navigate = useNavigate();

  function onSeeDetailsClick(user) {
    const query = new URLSearchParams();
    query.set("name", user.name);
    query.set("description", user.description);

    navigate(`/user?${query.toString()}`);
  }

  return (
    <ul className="space-y-3">
      {users.map((user) => (
        <li key={user.id} className="flex gap-2">
          <button
            onClick={() => onUserClick(user.id)}
            className={`flex-1 p-2 rounded-md text-white text-left bg-slate-500
            ${!user.isAvailable && "line-through bg-red-500"}`}
          >
            {user.name}
          </button>

          <button
            onClick={() => onEditUser(user)}
            className="bg-blue-500 p-2 rounded-md text-white"
          >
            <Pencil />
          </button>

          <button
            onClick={() => onSeeDetailsClick(user)}
            className="bg-slate-500 p-2 rounded-md text-white"
          >
            <ChevronRightIcon />
          </button>

          <button
            onClick={() => onDeleteUser(user.id)}
            className="bg-slate-500 p-2 rounded-md text-white"
          >
            <Trash2Icon />
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Users;
