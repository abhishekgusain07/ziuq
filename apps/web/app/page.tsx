import Image, { type ImageProps } from "next/image";

import { ThemeToggle } from "./components/theme-toggle";
export default function Home() {
  return (
    <main className="mx-auto max-w-screen-md px-4 py-28 flex flex-col gap-8 bg-white dark:bg-neutral-900 min-h-screen transition-colors duration-300">
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      <h1 className="text-red-600 dark:text-red-400 text-4xl font-bold">gusain</h1>
    </main>
  );
}
