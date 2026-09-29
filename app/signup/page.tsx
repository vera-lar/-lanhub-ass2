'use client';
import Link from "next/link";
import { useState } from "react";


export default function Signup(){
    const[name, setName] = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState ("");
    const[error, setError] = useState("");
    const handleSignup = () => {
        setError("");
        if(!email || !password || !name ){
            setError("All field arerequired");
        }
        else if(!email.includes("@")){
            setError("Enter a valid email");
            return;
        }else if(password.length < 6){
            setError("Password must be at least 6 characters");
            return;
        }else{
            alert(`Account created for ${email}`);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">

         {error &&( <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl mb-4">{error}</div> )}
          
                
        
          <div className="w-95 p-6 " >
                <h1 className="text-3xl font-bold">create account</h1>
                <p className="text-sm text-gray-500 mt-6 mb-4">Already have account? <Link className="underline text-black"  href="/lanhub-ass2">then Login</Link></p>
                <input type="text"    value={name} 
                placeholder="Name"
                onChange={(e) => {
                   setName( e.target.value)}
                } className="w-full border px-4 py-3 rounded-xl mb-4" required
                />
                <input  type="email" value={email} 
                placeholder="Email"
                onChange={(e) => {
                   setEmail( e.target.value)}
                } className="w-full border px-4 py-3 rounded-xl mb-4"required 
                />
                <input  type="password" value={password} 
                placeholder="Password"
                onChange={(e) => {
                   setPassword( e.target.value)}
                } className="w-full border px-4 py-3 rounded-xl mb-4" 
               required />
                <button onClick={handleSignup}  className="w-full bg-black py-3 rounded-full text-white">Sign Up</button>
            </div>
        </div>
    )


}