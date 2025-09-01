export default function Status({ children }) {
  return (
    <div
      role="status"
      className="bg-slate-50 border border-slate-200 text-slate-700 p-4 rounded text-center"
    >
      {children}
    </div>
  )
}
