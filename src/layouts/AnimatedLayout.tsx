// src/layouts/AnimatedLayout.tsx
import { Outlet, useLocation, useNavigationType } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

export default function AnimatedLayout() {
  const location = useLocation();
  const navigationType = useNavigationType(); 
  // "PUSH" when going forward, "POP" when going back

  const isBack = navigationType === "POP";

  return (
    <div className="relative overflow-hidden w-full h-full">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          initial={{ x: isBack ? -100 : 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: isBack ? 100 : -100, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="absolute w-full h-full"
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
