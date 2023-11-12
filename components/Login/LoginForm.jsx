"use client"

import React, { useState } from 'react'
import { AlertCircle } from "lucide-react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import {useRouter} from 'next/navigation';

export const LoginForm = () => {

// State for userName and password
const [userName, setUserName] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState();

const router = useRouter();
// Handler functions for updating state on input change
const handleUserNameChange = (e) => {
  setUserName(e.target.value);
};

const handlePasswordChange = (e) => {
  setPassword(e.target.value);
};

// Submit handler 
const handleSubmit = async(e) => {
  e.preventDefault();

  if(!userName || !password )
  {
    setError("All fields are necessary");
    return;
  }

  try {
    const response = await signIn('credentials', {
      userName,password, redirect: false,
    });


    
    if(response.error) {
      setError("Invalid Credentials")
      return;
    }
   

    router.replace("dashboard");

  } catch (error) {
    console.log(error);
    setError("Error occurred during login!");
  }
};

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Login in to your account</h2>
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userName" className="block text-sm font-medium leading-6 text-gray-900">User Name</label>
          <div className="mt-2">
            <input
              id="userName"
              name="userName"
              type="userName"
              autoComplete="userName"
              onChange={handleUserNameChange}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
            
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
             
              onChange={handlePasswordChange}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in
          </button>
        </div>
      </form>

      {
        error && (
            <Alert variant="destructive" className="mt-5">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        {error}
      </AlertDescription>
    </Alert>
        )
      }

      

    </div>
  </div>
  )
}
