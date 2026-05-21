import { useState, useContext, useEffect } from "react"
import Signin from "./Signin"
import Signup from "./Signup"
import ConfirmEmail from "./ConfirmEmail"
import ForgotPassword from "./ForgotPassword"
import { motion, AnimatePresence } from "motion/react"
import { FaCar } from "react-icons/fa6"
import { IoCloseOutline } from "react-icons/io5"
import { authContext } from "../context/authContext"

type Tab = "signin" | "signup"

export default function Modal({
  setShowModal,
}: {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const [showConfirmEmail,   setShowConfirmEmail]   = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [activeTab,          setActiveTab]          = useState<Tab>("signin")
  const { accessToken } = useContext(authContext)!

  // Auto-close when user logs in successfully
  useEffect(() => {
    if (accessToken) setShowModal(false)
  }, [accessToken])

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = "" }
  }, [])

  // ── Derive header text ──
  const headerTitle = showForgotPassword
    ? "Forgot Password 🔑"
    : showConfirmEmail
    ? "Verify Your Email"
    : activeTab === "signin"
    ? "Welcome Back 👋"
    : "Create Account"

  const headerSubtitle = showForgotPassword
    ? "We'll send a code to reset your password."
    : showConfirmEmail
    ? "Enter the 4-digit code sent to your inbox."
    : activeTab === "signin"
    ? "Sign in to continue your DriveEase journey"
    : "Join thousands of happy renters today"

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={() => setShowModal(false)}
        className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      >
        {/* Panel */}
        <motion.div
          key="modal-panel"
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-md rounded-2xl overflow-hidden shadow-2xl bg-background max-h-[90vh] overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Authentication"
        >
          {/* ── Gradient header ── */}
          <div className="bg-gradient-to-br from-[#7C3AED] via-[#6366F1] to-[#06B6D4] px-6 pt-7 pb-6 text-white relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all cursor-pointer text-white"
              aria-label="Close"
            >
              <IoCloseOutline className="w-5 h-5" />
            </button>

            {/* Brand */}
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 rounded-xl bg-white/25 flex items-center justify-center">
                <FaCar className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl" style={{ fontFamily: "var(--font-display)" }}>
                DriveEase
              </span>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-white leading-tight" style={{ fontFamily: "var(--font-display)" }}>
              {headerTitle}
            </h2>
            <p className="text-white/70 text-sm mt-1.5">{headerSubtitle}</p>
          </div>

          {/* ── Body ── */}
          <div className="px-6 pb-7 pt-5 bg-background">

            {/* Tab switcher — only on signin/signup */}
            {!showConfirmEmail && !showForgotPassword && (
              <div className="flex rounded-xl bg-muted p-1 mb-5">
                {(["signin", "signup"] as Tab[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                      activeTab === tab
                        ? "bg-white text-[#7C3AED] shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab === "signin" ? "Sign In" : "Sign Up"}
                  </button>
                ))}
              </div>
            )}

            {/* Animated form */}
            <AnimatePresence mode="wait">
              {showForgotPassword ? (
                <motion.div
                  key="forgot"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.18 }}
                >
                  <ForgotPassword
                    setShowForgotPassword={setShowForgotPassword}
                    setShowLogin={(v) => {
                      setShowForgotPassword(false)
                      setActiveTab(v ? "signin" : "signup")
                    }}
                  />
                </motion.div>
              ) : showConfirmEmail ? (
                <motion.div
                  key="confirm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.18 }}
                >
                  <ConfirmEmail
                    setShowConfirmEmail={setShowConfirmEmail}
                    setShowLogin={(v) => setActiveTab(v ? "signin" : "signup")}
                  />
                </motion.div>
              ) : activeTab === "signin" ? (
                <motion.div
                  key="signin"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.18 }}
                >
                  <Signin
                    setShowLogin={(v) => setActiveTab(v ? "signin" : "signup")}
                    setShowForgotPassword={() => setShowForgotPassword(true)}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="signup"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.18 }}
                >
                  <Signup
                    setShowLogin={(v) => setActiveTab(v ? "signin" : "signup")}
                    setShowConfirmEmail={setShowConfirmEmail}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
