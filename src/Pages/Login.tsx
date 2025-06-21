import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heading, Text } from "../Components/Typography";
import { Button } from "../Components/Button";
import { User } from "lucide-react";


const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError("All fields are required");
      return false;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      setError("Invalid email");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    if (validateForm()) {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setLoading(false);
      } catch (error) {
        setError((error as Error).message);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

   return (
     <div className="relative flex flex-col items-center justify-center min-h-screen">
       <div className="absolute top-4 left-4">
         <Link to="/">
           {/* Logo */}
           <div className="flex-shrink-0 h-auto">
             <Link to="/" className="flex">
               <Heading
                 size="xl"
                 weight="bold"
                 color="default"
                 className="cursor-pointer text-2xl"
               >
                 Cart2
               </Heading>
               <Heading
                 size="xl"
                 weight="bold"
                 color="primary"
                 className="cursor-pointer text-2xl"
               >
                 PAY
               </Heading>
             </Link>
           </div>
         </Link>
       </div>
       <div className="w-full max-w-md p-8  space-y-8 bg-white rounded-lg shadow-md lg:w-3/8 lg:mx-auto">
         <div className="flex flex-col items-start space-y-2">
           <div className="flex gap-2 justify-start items-center">
             <Heading
               size="xl"
               weight="bold"
               color="default"
               className="text-2xl"
             >
               Welcome
             </Heading>
             <span className="text-4xl"><User /></span>
           </div>

           <Text
             size="sm"
             weight="medium"
             color="subtle"
             className="w-full "
           >
             Securely log into your account to continue
           </Text>
         </div>
         <form onSubmit={handleSubmit} className="space-y-4">
           <div className="space-y-2">
             <label
               htmlFor="email"
               className="block text-sm font-medium text-gray-700"
             >
               Email
             </label>
             <input
               type="email"
               id="email"
               name="email"
               value={formData.email}
               onChange={handleChange}
               className="block w-full p-2 border border-gray-300 rounded-md"
             />
           </div>
           <div className="space-y-2">
             <label
               htmlFor="password"
               className="block text-sm font-medium text-gray-700"
             >
               Password
             </label>
             <input
               type="password"
               id="password"
               name="password"
               value={formData.password}
               onChange={handleChange}
               className="block w-full p-2 border border-gray-300 rounded-md"
             />
           </div>
           {error && <p className="text-red-500">{error}</p>}
           <Button
             type="submit"
             variant="primary"
             size="lg"
             loading={loading}
             className="w-full"
           >
             Login
           </Button>
         </form>

         <p className="text-sm text-center">
           Already have an account?{" "}
           <Link to="/signup" className="text-primary">
             Signup
           </Link>
         </p>
       </div>
     </div>
   );
};

export default Login;
