import { ChevronLeft, Home, ReceiptText, User, Wallet2, type LucideProps } from "lucide-react"
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


const menuMap : { name: string, href: string, icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>> }[] = [
  { name: "Dashboard", href: "/home/dashboard", icon: Home },
  { name: "Transactions", href: "/home/transactions", icon: ReceiptText },
  { name: "Accounts", href: "/home/accounts", icon: Wallet2 },
  { name: "Profile", href: "/home/profile", icon: User },
]

const NavBar = () => {
  const location = useLocation();
  const [needBackArrow, setNeedBackArrow] = useState<boolean>(false);
  const Icon = menuMap.find((menu) => location.pathname.startsWith(menu.href))?.icon
  const navigate = useNavigate();

  useEffect(()=> {
    setNeedBackArrow(
      location.pathname.startsWith("/home/transactions/") || location.pathname.startsWith("/home/profile-edit")
    );
  }, [location.pathname]);

  return (
    <section className="fixed top-0 left-0 z-50 mr-auto space-y-4 p-4 border-b w-full bg-card text-foreground">
        <h1 className="flex items-center gap-2 text-lg font-medium">
          <div aria-label="Go back" onClick={() => {navigate(-1)}}>
          {needBackArrow && <ChevronLeft/>}
          </div>
          <Icon className="h-5 w-5 text-brand" aria-hidden="true" />
          {menuMap.find((menu) => location.pathname.startsWith(menu.href))?.name || "Dashboard"}
        </h1>
        
      </section>
  )
}

export default NavBar