// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useAuth } from "@/hooks/use-auth";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// const LoginForm = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('user' as 'user' | 'admin');
//   const [error, setError] = useState('');
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
  
//     try {
//       const res = await fetch("http://localhost:5000/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password })
//       });
      
//       const data = await res.json();
      
//       if (!res.ok) {
//         setError(data.message || "Login failed");
//         return;
//       }
  
//       // Save user to context
//       login({
//         name: data.user.name,
//         role: data.user.role,
//         token: data.token
//       });
  
//       // Navigate based on role
//       if (data.user.role === "admin") {
//         navigate("/admin/dashboard");
//       } else {
//         navigate("/dashboard");
//       }
  
//     } catch (err) {
//       setError("An error occurred. Please try again.");
//     }
//   };
  
  

//   return (
//     <div className="space-y-6">
//       <div>
//         <h2 className="text-3xl font-bold text-gray-900">Welcome Back!</h2>
//         <p className="text-sm text-gray-600">Log in to continue to SynergySphere.</p>
//       </div>
//       {error && (
//         <div className="p-4 text-sm text-red-700 bg-red-100 rounded-lg">
//           {error}
//         </div>
//       )}
//       <form className="space-y-4" onSubmit={handleSubmit}>
//         <div className="space-y-2">
//           <Label htmlFor="email">Email Address</Label>
//           <Input 
//             id="email" 
//             type="email" 
//             placeholder="name@example.com" 
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required 
//           />
//         </div>
//         <div className="space-y-2">
//           <div className="flex items-center justify-between">
//             <Label htmlFor="password">Password</Label>
//             <a href="#" className="text-sm font-medium text-blue-600 hover:underline">
//               Forgot password?
//             </a>
//           </div>
//           <Input 
//             id="password" 
//             type="password" 
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required 
//           />
//         </div>
//         <div className="space-y-2">
//   <Label>Account Type</Label>
//   <Select value={role} onValueChange={(value: 'user' | 'admin') => setRole(value)}>
//     <SelectTrigger>
//       <SelectValue placeholder="Select account type" />
//     </SelectTrigger>
//     <SelectContent>
//       <SelectItem value="user">Regular User</SelectItem>
//       <SelectItem value="admin">Administrator</SelectItem>
//     </SelectContent>
//   </Select>
//   <input type="hidden" name="role" value={role} />
// </div>
//         <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
//           Log In
//         </Button>
//       </form>
//     </div>
//   );
// };

// export default LoginForm;


import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user' as 'user' | 'admin');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
  
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }
  
      // Save user to context directly from the data object
      login({
        name: data.name,
        role: data.role,
        token: data.token
      });
  
      // Navigate based on role
      if (data.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }
  
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Welcome Back!</h2>
        <p className="text-sm text-gray-600">Log in to continue to SynergySphere.</p>
      </div>
      {error && (
        <div className="p-4 text-sm text-red-700 bg-red-100 rounded-lg">
          {error}
        </div>
      )}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="name@example.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <a href="#" className="text-sm font-medium text-blue-600 hover:underline">
              Forgot password?
            </a>
          </div>
          <Input 
            id="password" 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
        </div>
        <div className="space-y-2">
          <Label>Account Type</Label>
          <Select value={role} onValueChange={(value: 'user' | 'admin') => setRole(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select account type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="user">Regular User</SelectItem>
              <SelectItem value="admin">Administrator</SelectItem>
            </SelectContent>
          </Select>
          <input type="hidden" name="role" value={role} />
        </div>
        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
          Log In
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;