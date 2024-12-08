"use client";

import { useState } from "react";
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
import { TimezonesSelect } from "@/components/timezone";
import { motion } from "motion/react";
import { register } from "@/actions/auth.action";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profession, setProfession] = useState("");
  const [timezone, setTimezone] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    toast.loading("Signing up...");
    // Handle login logic here
    const data = await register({
      name,
      timezone,
      email,
      password,
      profession,
    });
    if (data.error) {
      toast.dismiss();
      toast.error(data.error);
    } else {
      toast.dismiss();
      toast.success("Signed up successfully. Now login to continue");
      router.push("/login");
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
            <CardTitle className='text-2xl font-bold'>
              <Image
                src={"/images/logo.png"}
                width={150}
                height={150}
                alt='logo'
                className='mb-5 mx-auto'
              />
              Sign Up
            </CardTitle>
            <CardDescription>
              Create your account to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='name'>Name</Label>
                  <Input
                    id='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Enter your name'
                    required
                    autoFocus
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='email'>Email</Label>
                  <Input
                    id='email'
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Enter your email'
                    required
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='password'>Password</Label>
                  <Input
                    id='password'
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Enter your password'
                    required
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='profession'>Profession</Label>
                  <Input
                    id='profession'
                    type='profession'
                    value={profession}
                    onChange={(e) => setProfession(e.target.value)}
                    placeholder='Enter your profession'
                    required
                  />
                </div>
                <div className='space-y-2 w-full'>
                  <Label htmlFor='timezone block'>Timezone</Label>
                  <TimezonesSelect value={timezone} setValue={setTimezone} />
                </div>
              </div>
              <Button type='submit' className='w-full mt-6'>
                {loading ? "Signing up..." : "Sign Up"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className='flex justify-center'>
            <p className='text-sm text-muted-foreground'>
              Already have an account?{" "}
              <Link href='/login' className='text-primary hover:underline'>
                Log in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
