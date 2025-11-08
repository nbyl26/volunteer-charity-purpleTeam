import { motion, AnimatePresence } from "framer-motion";
import AuthHero from "../components/auth/AuthHero";
import ForgotPasswordForm from "../components/auth/ForgotPasswordForm";

export default function ForgotPassword() {
    return (
        <div className="min-h-screen flex bg-[#120E24]">
            <AnimatePresence mode="wait">
                <motion.div
                    key="forgot-password"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex w-full"
                >
                    <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
                        <ForgotPasswordForm />
                    </div>

                    <AuthHero isForgotPassword={true} />
                </motion.div>
            </AnimatePresence>
        </div>
    );
}