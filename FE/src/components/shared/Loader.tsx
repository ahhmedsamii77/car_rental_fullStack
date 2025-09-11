import { GridLoader } from "react-spinners";

export default function Loader() {
  return (
    <div className="fixed top-0 bottom-0 bg-white right-0 left-0 flex items-center justify-center">
      <GridLoader color="#2563eb" size={20} />
    </div>
  )
}
