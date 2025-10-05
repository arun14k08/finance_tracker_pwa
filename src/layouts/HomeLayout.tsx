import NavBar from "@/components/custom/NavBar";
import TabSection from "@/components/custom/TabSection";
import Accounts from "@/tabs/Accounts";
import Profile from "@/tabs/Profile";
import Transactions from "@/tabs/Transactions";
import { Tabs } from "@radix-ui/react-tabs";
import { useState } from "react";
const HomeLayout = () => {
  const [activeTab, setActiveTab] = useState<string>("profile");
  function handleTabChange(value: string) {
    console.log("Tab changed to:", value);
    setActiveTab(value);
  }

    return (
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full h-screen">
            <div className="min-h-screen flex flex-col justify-between w-full items-center">
                <NavBar />
                <Transactions/>
                <Accounts/>
                <Profile/>
                <TabSection activeTab={activeTab} />
            </div>
        </Tabs>
    );
};

export default HomeLayout;
