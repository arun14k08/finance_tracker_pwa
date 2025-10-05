import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import AuthContext from "@/context/AuthContext";
import ConfigContext from "@/context/ConfigContext";
import axios from "axios";
import {  useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function Register() {
    const config = useContext(ConfigContext);
    const auth = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [user, SetUser] = useState({
        name: "",
        email: "",
        password: "",
    });

    const registerUser = () => {
        // Implement registration logic here
        if (user.name === "" || user.email === "" || user.password === "") {
            toast.info("Please fill in all fields");
            return;
        }
        setLoading(true);
        axios
            .post(`${config?.baseUrl}/register`, user)
            .then(() => {
                setLoading(false);
                toast.success("Registration successful! Please login.");
                auth?.setUser({email: user.email, name: user.name, token: ""});
                SetUser({ name: "", email: "", password: "" });
                setTimeout(() => navigate("/login"), 200);
            })
            .catch((error) => {
                setLoading(false);
                toast.error(
                    error.response?.data?.message || "Registration failed"
                );
            });
    };

    return (
        <>
           <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
    <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
    <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">
    Login
    </h1>

    <form className="space-y-4">
    <div className="w-full max-w-md">
      <FieldSet>
        <FieldGroup>
            <Field>
            <FieldLabel htmlFor="name">Name</FieldLabel>
            <Input id="name" type="text" placeholder="John Doe" value={user.name} onChange={(e) => SetUser({ ...user, name: e.target.value })} />
          </Field>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input id="email" type="text" placeholder="you@example.com" value={user.email} onChange={(e) => SetUser({ ...user, email: e.target.value })} />
            <FieldDescription>
              Choose a unique email for your account.
            </FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <FieldDescription>
              Must be at least 8 characters long.
            </FieldDescription>
            <Input id="password" type="password" placeholder="********" value={user.password} onChange={(e) => SetUser({ ...user, password: e.target.value })} />
          </Field>
        </FieldGroup>
      </FieldSet>
    </div>
    <Button onClick={()=> registerUser()} disabled={loading} className="w-full">
        {loading ? <Spinner /> : "Register"}
    </Button>
    </form>

    <p className="mt-4 text-center text-sm text-gray-500">
    Already have an account?
    <Button variant="link" onClick={() => navigate("/login")} >
    Login
    </Button>
    </p>
    </div>
    </div>
        </>
    );
}

export default Register;
