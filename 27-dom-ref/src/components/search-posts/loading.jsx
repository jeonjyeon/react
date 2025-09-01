import Spinner from './spinner'

export default function Loading({ children }) {
  return (
    <div
      role="status"
      className="flex justify-center items-center gap-2 text-indigo-600 font-semibold"
    >
      <Spinner />
      {children}
    </div>
  )
}
