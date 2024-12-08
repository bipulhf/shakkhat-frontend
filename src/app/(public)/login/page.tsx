"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import { login } from "@/actions/auth.action";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    toast.loading("Logging in...");
    // Handle login logic here
    const data = await login(email, password);
    if (data.error) {
      toast.dismiss();
      toast.error(data.error);
    } else {
      toast.dismiss();
      toast.success("Logged in successfully");
      router.push("/dashboard");
    }
    setLoading(false);
  };

  return (
    <div className='min-h-screen flex items-center justify-center magicpattern'>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className='w-[350px]'>
          <CardHeader>
            <CardTitle className='text-2xl font-bold text-center'>
              <Image
                src={"/images/logo.jpeg"}
                width={150}
                height={150}
                alt='logo'
                className='mb-5 mx-auto'
              />
              Login
            </CardTitle>
            <CardDescription className='text-center'>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='email' className=''>
                    Email
                  </Label>
                  <Input
                    id='email'
                    type='email'
                    placeholder='m@example.com'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className=''
                    autoFocus
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='password' className=''>
                    Password
                  </Label>
                  <Input
                    id='password'
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className=''
                    placeholder='Type your password'
                  />
                </div>
              </div>
              <Button type='submit' className='w-full mt-6 '>
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className='flex justify-center text-sm'>
            Dont&apos;t have an account?{" "}
            <Link href='/signup' className='font-semibold'>
              Sign Up.
            </Link>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
