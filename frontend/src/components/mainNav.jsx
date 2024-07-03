/**
 * v0 by Vercel.
 * @see https://v0.dev/t/ZPrRUV51n0W
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function NavBar({ className, ...props }) {
  return (
    <nav
      className={cn(
        "w-full inset-x-0 top-0 z-50 bg-white shadow dark:bg-gray-950",
        className
      )}
    >
      <div className="container px-4 md:px-6">
        <div className="flex h-14 items-center">
          <Link
            href="/"
            className="mr-auto flex items-center gap-2 text-lg font-semibold"
            prefetch={false}
          >
            <PackageIcon className="w-5 h-5" />
            <span>Tritiumd</span>
          </Link>
          <nav className="ml-auto flex items-center space-x-4">
            <Link
              href="/"
              className="font-medium text-sm border-b-2 border-transparent transition-colors hover:text-gray-900 hover:border-gray-100 dark:hover:text-gray-50 dark:hover:border-gray-800"
              prefetch={false}
            >
              Home
            </Link>
            <Link
              href="/form"
              className="font-medium text-sm border-b-2 border-transparent transition-colors hover:text-gray-900 hover:border-gray-100 dark:hover:text-gray-50 dark:hover:border-gray-800"
              prefetch={false}
            >
              Form
            </Link>
            <Link
              href="https://markdown-to-cv.notion.site/"
              className="font-medium text-sm border-b-2 border-transparent transition-colors hover:text-gray-900 hover:border-gray-100 dark:hover:text-gray-50 dark:hover:border-gray-800"
              prefetch={false}
            >
              About us
            </Link>
            {/* <Link
              href="#"
              className="font-medium text-sm border-b-2 border-transparent transition-colors hover:text-gray-900 hover:border-gray-100 dark:hover:text-gray-50 dark:hover:border-gray-800"
              prefetch={false}
            >
              Contact
            </Link> */}
          </nav>
        </div>
      </div>
    </nav>
  );
}

function PackageIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}
