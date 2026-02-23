import { ChevronRightIcon, Pencil, Trash2Icon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { User } from "../types/User";

type UsersProps = {
  users: User[];
  onUserClick: (id: string) => void;
  onDeleteUser: (id: string) => void;
  onEditUser: (user: User) => void;
};

function Users({ users, onUserClick, onDeleteUser, onEditUser }: UsersProps) {
  const navigate = useNavigate();

  function onSeeDetailsClick(user: User) {
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
            ${!user.isAvailable ? "line-through bg-red-400" : ""}`}
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
