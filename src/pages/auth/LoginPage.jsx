import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { userLogin } from "../../api/auth";

const LoginPage = () => {
  const handelSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    console.log(userData);

    // send api request to login user
    const x = userLogin(userData);
    console.log(x);
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
