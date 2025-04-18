'use client'

import Link from 'next/link'
import Image from 'next/image'
import React, { useState } from 'react'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {z} from 'zod'
import { Button } from "@/components/ui/button"
import {
  Form
} from "@/components/ui/form"
import { Loader2 } from 'lucide-react'
import { signIn, signUp } from '@/lib/action/user.action'
import CustomInput from './CustomInput'
import { authFormSchema } from '@/lib/utils'
import { useRouter } from 'next/navigation';



function AuthForm({type}:{type:string}) {
    const [user,setUser] = useState(null);
    const [IsLoading,setIsLoading] = useState(false);

    const router = useRouter();


    const formSchema = authFormSchema(type);
    //1.Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })
    //Define a submit handler.
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsLoading(true);

        try{
            if(type === 'SignUp'){
                const userData = {
                    firstName: data.firstName!,
                    lastName: data.lastName!,
                    email: data.email,
                    password: data.password
                }

                const newUser = await signUp(userData);
                setUser(newUser);
            }

            if(type === 'SignIn'){
                const response = await signIn({
                    email: data.email,
                    password: data.password
                });

                if(response) router.push('/');

            }
        }
        catch (error){
            console.error(error);
        }
        finally{
            setIsLoading(false);
        }
    }


  return (
    <section className='auth-form'>
        <header className='flex flex-col gap-5 md:gap-8'>
            <Link href='/' className='cursor-pointer flex items-center gap-1'>
                <Image 
                    src='icon/logo.svg'
                    width={34}
                    height={34}
                    alt="HomeWork Logo"
                    />
                <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>
                HomeWork
                </h1>
            </Link>

            <div className='flex flex-col gap-1 md:gap-3'>
                <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
                    {user 
                    ? 'Link Account' 
                    : type === 'SignIn'
                        ?   'Sign In'
                        : 'Sign Up'
                    }
                </h1>
                <p className='text-16 font-normal text-gray-600'>
                    {user 
                    ? 'Link you account to get started'
                    : 'Please enter your details'
                    }
                </p>
            </div>
        </header>
        {user ?
            <div className='flex flex-col gap-4'>
            </div>
         :  
            <>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                {type === 'SignUp' && (
                    <>
                    <div className='flex gap-4'>
                        <CustomInput 
                            control={form.control}
                            name="firstName"
                            label="First Name"
                            type="text"
                            placeholder="Enter your First Name"
                        />
                        <CustomInput 
                            control={form.control}
                            name="lastName"
                            label="Last Name"
                            type="text"
                            placeholder="Enter your Last Name"
                        />
                    </div>
                    </>
                )}
                <CustomInput 
                    control={form.control}
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                />
                <CustomInput 
                    control={form.control}
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                />
                <div className='flex flex-col gap-4'>
                    <Button type="submit" disabled={IsLoading} className='form-btn'>
                        {IsLoading ? 
                            <>
                                <Loader2 
                                    size={20}
                                    className='animate-spin'
                                /> &nbsp;
                                Loading...
                            </>
                        : type ==='SignIn'?
                            'Sign In'
                            : 'Sign Up'
                    }
                    </Button>
                </div>
            </form>
            </Form>
            <footer className='flex justify-center gap-1'>
                <p className='text-14 font-normal text-gray-600'>
                    {type ==='SignIn' ?
                    'Don\'t have an account?'
                    : 'Already have an account?'
                    }
                </p>
                <Link href={type ==='SignIn' ? '/sign-up' : '/sign-in'} className='form-link'>
                    {type ==='SignIn' ?
                    'Sign Up'
                    : 'Sign In'
                    }
                </Link>
            </footer>

            </>
        } 
    </section>
  )
}

export default AuthForm