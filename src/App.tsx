import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import router from "./routes/router";

export default function App() {
    return (
        // make this div take full height and width of the screen and make everything center
        // I need a theme very similar to the one used in the tailwind website
        // add bg and text color using tailwind
        <>
            <div className="h-screen">
                <Toaster richColors position="bottom-center" />
                <RouterProvider router={router} />
            </div>
        </>
    );
}
