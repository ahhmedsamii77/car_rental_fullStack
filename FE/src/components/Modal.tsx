import { useState } from "react";
import Signin from "./Signin";
import Signup from "./Signup";
import ConfirmEmail from "./ConfirmEmail";

export default function Modal({ setShowModal }: { setShowModal: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [showLogin, setShowLogin] = useState(true);
  const [showConfirmEmail, setShowConfirmEmail] = useState(false)
  function closeModal(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target == e.currentTarget) {
      setShowModal(false);
    }
  }
  return (
    <section onClick={closeModal} className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center">
      {showLogin && !showConfirmEmail && <Signin setShowLogin={setShowLogin}  />}
      {!showLogin && !showConfirmEmail && <Signup setShowLogin={setShowLogin} setShowConfirmEmail={setShowConfirmEmail} />}
      {showConfirmEmail && <ConfirmEmail setShowConfirmEmail={setShowConfirmEmail}  setShowLogin={setShowLogin} />}
    </section>
  )
}
