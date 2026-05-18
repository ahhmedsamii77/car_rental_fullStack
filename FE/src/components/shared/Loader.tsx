import { ClipLoader } from "react-spinners"

export default function Loader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <ClipLoader color="#7C3AED" size={48} />
        <p className="text-muted-foreground text-sm animate-pulse">Loading…</p>
      </div>
    </div>
  )
}
