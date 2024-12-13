import { useToast } from "@/hooks/use-toast";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { registerNewUser } from "../../api/auth";

const LoginPage = () => {
  const { toast } = useToast();

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        name: e.target.name.value,
        email: e.target.email.value,
        password: e.target.password.value,
        host: e.target.host.checked,
      };

      // Send API request to register user
      const x = await registerNewUser(userData);
      if (x) {
        toast({
          title: "Success",
          description: "User registered successfully",
          type: "success",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to register user",
          type: "error",
        });
      }
    } catch (e) {
      console.log(e);
      toast({
        title: "Error",
        description: e.response?.data?.message || "An error occurred",
        type: "error",
      });
    }
  };

  return (
    <>
      <div className="container flex flex-col justify-center items-center h-screen w-screen">
        <h1 className="text-3xl font-bold text-center mb-8">Sign Up</h1>
        <form className="w-full max-w-sm space-y-3" onSubmit={handelSubmit}>
          <Input type="text" name="name" placeholder="Name" required />
          <Input type="email" name="email" placeholder="Email" required />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="host"
              name="host"
              className="form-checkbox h-5 w-5"
            />
            <label htmlFor="host" className="text-sm">
              Register as a host
            </label>
          </div>
          <Button className="w-full">Register Now</Button>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
