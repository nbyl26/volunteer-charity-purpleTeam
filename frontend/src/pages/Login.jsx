import { motion, AnimatePresence } from "framer-motion";
import AuthHero from "../components/auth/AuthHero";
import LoginForm from "../components/auth/LoginForm";

export default function Login() {
    return (
        <div className="min-h-screen flex bg-[#120E24]">
            <AnimatePresence mode="wait">
                <motion.div
                    key="login"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex w-full"
                >
                    <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
                        <LoginForm />
                    </div>

                    <AuthHero isLogin={true} />
                </motion.div>
            </AnimatePresence>
        </div>
    );
}