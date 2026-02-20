function UserLog({ logs }) {
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-bold text-white">Logs do Sistema</h2>

      <div className="max-h-48 overflow-y-auto space-y-2">
        {logs.length === 0 && (
          <p className="text-slate-300">Nenhuma ação registrada.</p>
        )}

        {logs.map((log) => (
          <div
            key={log.id}
            className="bg-slate-700 p-2 rounded text-sm flex justify-between"
          >
            <span>
              <strong>{log.action}</strong> - {log.name}
            </span>

            <span className="text-slate-400">{log.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserLog;
