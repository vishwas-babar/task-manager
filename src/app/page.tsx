'use client'
import AddTodo from "@/components/AddTodo";
import Nav from "@/components/Nav";
import TodoList from "@/components/TodoList";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const session =  useSession();
  const router = useRouter();

  console.log(session);

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gray-50">
      <Nav />

      {session?.status === "authenticated" ? (
        <div className="w-full flex flex-col items-center gap-8">
          <TodoList />
          <AddTodo />
        </div>
      ) : (
          <div className="flex flex-col items-center justify-center text-center gap-6 bg-white p-10 rounded-lg shadow-lg max-w-lg">
            <h1 className="text-3xl font-bold text-gray-800">Welcome to Task Manager</h1>
            <p className="text-gray-600">Manage your tasks efficiently and stay organized.</p>
            <Button
              onClick={() => router.push('/signin')}
              className="bg-blue-500 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-blue-600 transition-all" >
              Sign In to Get Started
            </Button>
          </div>
      )}
    </div>
  );
}
