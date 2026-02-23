type UserFilterProps = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

function UserFilter({ search, setSearch }: UserFilterProps) {
  return (
    <input
      className="p-2 rounded-md w-full text-black"
      placeholder="Buscar usuário..."
      value={search}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
        setSearch(event.target.value)
      }
    />
  );
}

export default UserFilter;
