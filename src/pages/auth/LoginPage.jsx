import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { userLogin } from "../../api/auth";

const LoginPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handelSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    try {
      // send api request to login user
      const x = await userLogin(userData);
      if (x) {
        localStorage.setItem("user", JSON.stringify(x.data));
        navigate("/");
      } else {
        toast({
          title: "Error",
          description: "Failed to login user",
          type: "error",
        });
      }
    } catch (e) {
      toast({
        title: "Error Occurred",
        description: e.response.data.message,
        type: "error",
      });
    }
  };

  return (
    <>
      <div className="container flex flex-col justify-center items-center h-screen w-screen">
        <h1 className="text-3xl font-bold text-center mb-8">Login</h1>
        <form className="w-full max-w-sm space-y-3" onSubmit={handelSubmit}>
          <Input type="email" name="email" placeholder="Email" required />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          <Button className="w-full">Login</Button>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
