import NavBar from "@/components/custom/NavBar";
import TabSection from "@/components/custom/TabSection";
import { Outlet } from "react-router-dom";
const HomeLayout = () => {

    return (
            <div className="min-h-screen flex flex-col w-full px-4">
                <NavBar />
                <div className="mt-13">
                <Outlet />
                </div>
                <TabSection />
            </div>
    );
};

export default HomeLayout;
