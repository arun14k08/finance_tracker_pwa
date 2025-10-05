import LogoutButton from "@/components/custom/LogoutButton";
import { TabsContent } from "@radix-ui/react-tabs";

const Profile = () => {
    return (
        <>
            <TabsContent
                value="profile"
                className="w-full flex flex-col justify-center items-center flex-1"
            >
                <div>Profile</div>
                <LogoutButton />
            </TabsContent>
        </>
    );
};

export default Profile;
