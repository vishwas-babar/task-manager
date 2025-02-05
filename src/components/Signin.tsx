'use client'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import React from 'react'
import { signinUser } from '@/actions/action'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const Signin = () => {

    const { register, handleSubmit, reset, formState: {
        isSubmitting
    } } = useForm()

    const submitForm = async (data: any) => {
        try {
            const res = await signinUser(data);

            if (res.success) {
                console.log(res.message)
                reset()
                window.location.href = '/'
            } else {
                toast(res.message)
                console.log(res.message)
            }
        } catch (error: any) {
            toast(error.message)
        }
    }

  return (
      <div className="flex border h-screen min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                  Sign in to your account
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
                              id="email"
                              autoComplete="email"
                              required
                            {...register('email')}
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
                              id="password"
                                {...register('password')}
                              autoComplete="current-password"
                              required
                              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                          />
                      </div>
                  </div>
                  <div>
                      <button
                          type="submit"
                          disabled={isSubmitting}
                          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                          {isSubmitting ? (
                              <>
                                    <svg
                                        className="animate-spin h-5 w-5 mr-3 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8z"
                                        ></path>
                                    </svg>
                                    Processing...
                              </>
                            ) : 'Sign in'}
                      </button>
                  </div>
              </form>
              <p className="mt-10 text-center text-sm/6 text-gray-500">
                  Don't have an Account? {" "}
                  <Link
                      href="/signup"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                      {" "} sign up
                    
                  </Link>
              </p>
          </div>
      </div>
  )
}

export default Signin