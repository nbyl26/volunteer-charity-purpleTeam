import { motion, AnimatePresence } from "framer-motion";
import AuthHero from "../components/auth/AuthHero";
import RegisterForm from "../components/auth/RegisterForm";

export default function Register() {
    return (
        <div className="min-h-screen flex bg-[#120E24]">
            <AnimatePresence mode="wait">
                <motion.div
                    key="register"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex w-full"
                >
                    <AuthHero isLogin={false} />

                    <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
                        <RegisterForm />
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}