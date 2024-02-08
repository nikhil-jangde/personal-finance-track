"use client"
import Dashboard from "./Components/Dashboard/Dashboard";

export default function Home() {
  return (
    <main  className="flex w-full min-h-screen home-br flex-col items-center justify-between lg:p-8 md:p-8">
    <Dashboard/>           
    </main>
  );
}
