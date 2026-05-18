import { useState } from "react"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Modal({
  setShowModal,
}: {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const [showConfirmEmail, setShowConfirmEmail] = useState(false)
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin")

  return (
    <Dialog open onOpenChange={(o) => !o && setShowModal(false)}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden rounded-2xl border-border/60 shadow-violet-lg">
        {/* Gradient header */}
        <div className="gradient-primary px-6 pt-7 pb-5 text-white">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <FaCar className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg font-[family-name:var(--font-display)]">DriveEase</span>
          </div>
          <DialogHeader>
            <DialogTitle className="text-white text-2xl font-[family-name:var(--font-display)]">
              {showConfirmEmail ? "Verify Email" : activeTab === "signin" ? "Welcome Back" : "Create Account"}
            </DialogTitle>
            <DialogDescription className="text-white/70 text-sm mt-1">
              {showConfirmEmail
                ? "Enter the 4-digit OTP sent to your inbox."
                : activeTab === "signin"
                ? "Sign in to your DriveEase account"
                : "Join thousands of happy renters"}
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Body */}
        <div className="px-6 pb-6 pt-5">
          <AnimatePresence mode="wait">
            {showConfirmEmail ? (
              <motion.div
                key="confirm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <ConfirmEmail
                  setShowConfirmEmail={setShowConfirmEmail}
                  setShowLogin={(v) => setActiveTab(v ? "signin" : "signup")}
                />
              </motion.div>
            ) : (
              <motion.div
                key="auth"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <Tabs
                  value={activeTab}
                  onValueChange={(v) => setActiveTab(v as "signin" | "signup")}
                  className="w-full"
                >
                  <TabsList className="w-full mb-5 rounded-xl bg-muted h-10">
                    <TabsTrigger value="signin" className="flex-1 rounded-lg text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-[#7C3AED] data-[state=active]:shadow-sm cursor-pointer">
                      Sign In
                    </TabsTrigger>
                    <TabsTrigger value="signup" className="flex-1 rounded-lg text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-[#7C3AED] data-[state=active]:shadow-sm cursor-pointer">
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
