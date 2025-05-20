import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Custom Hooks Demo",
  description: "A demonstration of custom React hooks",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col">
          <header className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-4 shadow-lg">
            <div className="container mx-auto">
              <h1 className="text-2xl font-bold mb-4 flex items-center">
                <span className="inline-flex items-center justify-center mr-2 text-blue-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 007.5 12.174v-.224c0-.131.067-.248.172-.311a54.614 54.614 0 014.653-2.52.75.75 0 00-.65-1.352 56.129 56.129 0 00-4.78 2.589 1.858 1.858 0 00-.859 1.228 49.803 49.803 0 00-4.634-1.527.75.75 0 01-.231-1.337A60.653 60.653 0 0111.7 2.805z" />
                    <path d="M13.06 15.473a48.45 48.45 0 017.666-3.282c.134 1.414.22 2.843.255 4.285a.75.75 0 01-.46.71 47.878 47.878 0 00-8.105 4.342.75.75 0 01-.832 0 47.877 47.877 0 00-8.104-4.342.75.75 0 01-.461-.71c.035-1.442.121-2.87.255-4.286A48.4 48.4 0 016 13.18v1.27a1.5 1.5 0 00-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.661a6.729 6.729 0 00.551-1.608 1.5 1.5 0 00.14-2.67v-.645a48.549 48.549 0 013.44 1.668 2.25 2.25 0 002.12 0z" />
                    <path d="M4.462 19.462c.42-.419.753-.89 1-1.394.453.213.902.434 1.347.661a6.743 6.743 0 01-1.286 1.794.75.75 0 11-1.06-1.06z" />
                  </svg>
                </span>
                <span>Custom Hooks Demo</span>
              </h1>
              <nav className="flex flex-wrap gap-4">
                <NavLink href="/">Home</NavLink>
                <NavLink href="/fetch-demo">useFetch</NavLink>
                <NavLink href="/swr-demo">useSWR</NavLink>
                <NavLink href="/form-demo">useForm</NavLink>
                <NavLink href="/debounce-demo">useDebounceValue</NavLink>
              </nav>
            </div>
          </header>
          <main className="flex-1 p-4 container mx-auto">{children}</main>
          <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-4 text-center">
            <div className="container mx-auto">
              <p className="flex items-center justify-center">
                <span className="inline-flex items-center justify-center mr-2 text-blue-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <span>Custom Hooks Demo - Next.js with TypeScript</span>
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="relative px-3 py-2 rounded-md hover:text-blue-300 transition-colors overflow-hidden group"
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
    </Link>
  );
}
