    import { Button } from "@/components/ui/button";
    import { Card } from "@/components/ui/card";
    import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet } from "@/components/ui/field";
    import { Input } from "@/components/ui/input";
    import { Spinner } from "@/components/ui/spinner";
    import AuthContext from "@/context/AuthContext";
    import ConfigContext from "@/context/ConfigContext";
    import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select";
    import axios from "axios";
    import { useContext, useEffect, useState } from "react";
    import { useNavigate } from "react-router-dom";
    import { toast } from "sonner";

    function Login() {
    const config = useContext(ConfigContext);
    const [user, SetUser] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const loginUser = () => {
    // Implement login logic here
    if (user.email === "" || user.password === "") {
    toast.info("Please fill in all fields");
    return;
    }
    setLoading(true);
    axios
    .post(`${config?.baseUrl}/login`, user)
    .then((response) => {
        setLoading(false);
        // Handle successful login, e.g., redirect to dashboard
        const userResponse = response.data;
        auth?.login({
            token: userResponse.data.token,
            name: userResponse.data.name,
            email: userResponse.data.email
        });
        // SetUser({ email: "", password: "" });
        toast.success("Login successful!");
        navigate("/home");
    })
    .catch((error) => {
        setLoading(false);
        // Handle login error, e.g., show error message
        toast.error(error.response?.data?.message || "Login failed");
    });
    };


    useEffect(() => {
    SetUser({...user, email: auth?.user?.email || ""})
    }, [])

    return (
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
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input id="email" type="text" placeholder="you@example.com" value={user.email} onChange={(e) => SetUser({ ...user, email: e.target.value })} />
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input id="password" type="password" placeholder="********" value={user.password} onChange={(e) => SetUser({ ...user, password: e.target.value })} />
          </Field>
        </FieldGroup>
      </FieldSet>
    </div>
    <Button onClick={()=> loginUser()} disabled={loading} className="w-full">
        {loading ? <Spinner /> : "Login"}
    </Button>
    </form>

    <p className="mt-4 text-center text-sm text-gray-500">
    Don’t have an account?
    <Button variant="link" onClick={() => navigate("/register")} >
    Register
    </Button>
    </p>
    </div>
    </div>
    );
    }

    export default Login;
