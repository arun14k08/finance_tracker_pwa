import { ProfileSettings } from "./ProfileSettings";
import { ProfileHeader } from "./Profileheader";

const Profile = () => {
    return (
        <>
            <div
                className="w-full flex flex-col flex-1"
            >
                <main className="pb-24">
                    <section className="mx-auto max-w-md space-y-4 p-4">
                        <ProfileHeader name="Your Name" email="you@example.com" />
                        <ProfileSettings />
                    </section>
                </main>
            </div>
        </>
    );
};

export default Profile;
