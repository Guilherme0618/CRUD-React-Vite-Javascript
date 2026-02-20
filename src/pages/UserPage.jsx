import { ChevronLeftIcon } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

function UserPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const name = searchParams.get("name");
  const description = searchParams.get("description");

  return (
    <div className="min-h-screen bg-slate-600 flex justify-center items-center">
      <div className="bg-slate-800 text-white p-6 rounded-md w-[400px] space-y-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(-1)}
            className="bg-slate-600 p-2 rounded-md"
          >
            <ChevronLeftIcon />
          </button>

          <h1 className="text-xl font-bold">Detalhes do Usuário</h1>
        </div>

        <div className="bg-slate-700 p-4 rounded-md">
          <h2 className="text-lg font-bold">{name}</h2>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
