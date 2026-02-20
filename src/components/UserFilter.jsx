function UserFilter({ search, setSearch }) {
  return (
    <input
      className="p-2 rounded-md w-full text-black"
      placeholder="Buscar usuário..."
      value={search}
      onChange={(event) => setSearch(event.target.value)}
    />
  );
}

export default UserFilter;
