import { useState, useContext, useEffect } from "react"
import Signin from "./Signin"
import Signup from "./Signup"
import ConfirmEmail from "./ConfirmEmail"
import { motion, AnimatePresence } from "motion/react"
import { FaCar } from "react-icons/fa6"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs"
import { authContext } from "../context/authContext"

type Tab = "signin" | "signup"

export default function Modal({
  setShowModal,
}: {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const [showConfirmEmail, setShowConfirmEmail] = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>("signin")
  const { accessToken } = useContext(authContext)!

  // Auto-close when user logs in successfully
  useEffect(() => {
    if (accessToken) setShowModal(false)
  }, [accessToken])

  return (
    <Dialog open onOpenChange={(o) => !o && setShowModal(false)}>
      <DialogContent
        className="sm:max-w-md p-0 overflow-hidden rounded-2xl border-0 shadow-2xl"
        showCloseButton={false}
      >
        {/* ── Gradient header ── */}
        <div className="bg-gradient-to-br from-[#7C3AED] via-[#6366F1] to-[#06B6D4] px-6 pt-7 pb-6 text-white relative">
          <button
            onClick={() => setShowModal(false)}
            className="absolute top-4 right-4 w-8 h-8 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all cursor-pointer text-white font-medium text-base leading-none"
            aria-label="Close"
          >
            ✕
          </button>

          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <FaCar className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl font-[family-name:var(--font-display)]">DriveEase</span>
          </div>

          <DialogHeader>
            <DialogTitle className="text-white text-2xl font-[family-name:var(--font-display)]">
              {showConfirmEmail
                ? "Verify Your Email"
                : activeTab === "signin"
                ? "Welcome Back 👋"
                : "Create Account"}
            </DialogTitle>
            <DialogDescription className="text-white/75 text-sm mt-1">
              {showConfirmEmail
                ? "Enter the 4-digit code sent to your inbox."
                : activeTab === "signin"
                ? "Sign in to continue your DriveEase journey"
                : "Join thousands of happy renters today"}
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* ── Body ── */}
        <div className="px-6 pb-7 pt-5 bg-background">
          <AnimatePresence mode="wait">
            {showConfirmEmail ? (
              <motion.div
                key="confirm"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
              >
                <ConfirmEmail
                  setShowConfirmEmail={setShowConfirmEmail}
                  setShowLogin={(v) => setActiveTab(v ? "signin" : "signup")}
                />
              </motion.div>
            ) : (
              <motion.div
                key="auth-tabs"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
              >
                <Tabs
                  value={activeTab}
                  onValueChange={(v) => v && setActiveTab(v as Tab)}
                  className="w-full"
                >
                  {/* Tab switcher */}
                  <TabsList className="w-full mb-5 h-11 rounded-xl bg-muted p-1">
                    <TabsTrigger
                      value="signin"
                      className="flex-1 h-full rounded-lg text-sm font-semibold cursor-pointer transition-all
                        text-muted-foreground hover:text-foreground
                        data-active:bg-white data-active:text-[#7C3AED] data-active:shadow-sm"
                    >
                      Sign In
                    </TabsTrigger>
                    <TabsTrigger
                      value="signup"
                      className="flex-1 h-full rounded-lg text-sm font-semibold cursor-pointer transition-all
                        text-muted-foreground hover:text-foreground
                        data-active:bg-white data-active:text-[#7C3AED] data-active:shadow-sm"
                    >
                      Sign Up
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="signin">
                    <Signin setShowLogin={(v) => setActiveTab(v ? "signin" : "signup")} />
                  </TabsContent>

                  <TabsContent value="signup">
                    <Signup
                      setShowLogin={(v) => setActiveTab(v ? "signin" : "signup")}
                      setShowConfirmEmail={setShowConfirmEmail}
                    />
                  </TabsContent>
                </Tabs>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  )
}
