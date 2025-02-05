'use client'
import { createUser } from '@/actions/action';
import Link from 'next/link'
import React from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const Signup = () => {

    const { register, handleSubmit } = useForm();

    const submitForm = async (data: any) => {
        try {
            console.log(data)
            const res = await createUser(data);

            if (res.success) {
                console.log(res.message)
                window.location.href = '/'
            }

            toast(res.message, { 
            })

            console.log(res.message);
        } catch (error: any) {
            console.log(error.message)
            toast(error.message, { 
            })
        }
    }


  return (
      <div className="flex border h-screen min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                  Create an account
              </h2>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" onSubmit={handleSubmit(submitForm)}>
                  <div>
                      <label
                          htmlFor="email"
                          className="block text-sm/6 font-medium text-gray-900"
                      >
                          Email address
                      </label>
                      <div className="mt-2">
                          <input
                              type="email"
                              {...register('email')}
                              id="email"
                              autoComplete="email"
                              required
                              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                          />
                      </div>
                  </div>
                  <div>
                      <div className="flex items-center justify-between">
                          <label
                              htmlFor="password"
                              className="block text-sm/6 font-medium text-gray-900"
                          >
                              Password
                          </label>
                      </div>
                      <div className="mt-2">
                          <input
                              type="password"
                                {...register('password')}
                              id="password"
                              autoComplete="current-password"
                              required
                              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                          />
                      </div>
                  </div>
                  <div>
                      <button
                          type="submit"
                          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                          Create
                      </button>
                  </div>
              </form>
              <p className="mt-10 text-center text-sm/6 text-gray-500">
                  Already have an Account {" "}y 
                  <Link
                      href="/signin"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                     {" "} sign in
                  </Link>
              </p>
          </div>
      </div>

  )
}

export default Signup