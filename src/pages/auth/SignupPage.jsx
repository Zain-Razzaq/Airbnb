import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { registerNewUser } from "../../api/auth";

const LoginPage = () => {
  const handelSubmit = (e) => {
    e.preventDefault();
    const userData = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    console.log(userData);
    // send api request to register user
    const x = registerNewUser(userData);
    console.log(x);
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
          <Button className="w-full">Register Now</Button>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
