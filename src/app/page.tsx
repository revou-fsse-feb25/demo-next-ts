import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
        React Custom Hooks Demo
      </h1>

      <div className="space-y-8">
        <section className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <span className="inline-flex items-center justify-center w-8 h-8 mr-2 rounded-full bg-blue-500 flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 text-white"
                aria-hidden="true"
              >
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path
                  fillRule="evenodd"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            About This Demo
          </h2>
          <p className="mb-4">
            This project demonstrates the implementation and usage of custom
            React hooks. Each page showcases a different custom hook and its
            practical application.
          </p>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <span className="inline-flex items-center justify-center w-8 h-8 mr-2 rounded-full bg-blue-500 flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 text-white"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M3.5 2A1.5 1.5 0 002 3.5V15a3 3 0 106 0V3.5A1.5 1.5 0 006.5 2h-3zm11.753 6.99L9.5 14.743V6.257l5.753 2.733a.75.75 0 010 1.346z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            Available Custom Hooks
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <Link href="/fetch-demo" className="block">
              <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-all duration-300 hover:border-blue-300 hover:shadow-md transform hover:-translate-y-1">
                <h3 className="text-xl font-medium text-blue-600 mb-2 flex items-center">
                  <span className="inline-flex items-center justify-center w-6 h-6 mr-2 rounded-full bg-blue-100 flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-4 h-4 text-blue-600"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 2a.75.75 0 01.75.75v7.5a.75.75 0 01-1.5 0v-7.5A.75.75 0 0110 2zM5.404 4.343a.75.75 0 010 1.06 6.5 6.5 0 109.192 0 .75.75 0 111.06-1.06 8 8 0 11-11.313 0 .75.75 0 011.06 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  useFetch
                </h3>
                <p className="text-gray-600 mb-2">
                  A custom hook for data fetching with loading and error states.
                </p>
                <code className="block bg-gray-100 p-2 rounded text-sm">
                  const {"{data, loading, error}"} = useFetch(url);
                </code>
              </div>
            </Link>

            <Link href="/swr-demo" className="block">
              <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-all duration-300 hover:border-blue-300 hover:shadow-md transform hover:-translate-y-1">
                <h3 className="text-xl font-medium text-blue-600 mb-2 flex items-center">
                  <span className="inline-flex items-center justify-center w-6 h-6 mr-2 rounded-full bg-blue-100 flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-4 h-4 text-blue-600"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  useSWR
                </h3>
                <p className="text-gray-600 mb-2">
                  Implements stale-while-revalidate caching strategy with
                  auto-revalidation.
                </p>
                <code className="block bg-gray-100 p-2 rounded text-sm">
                  const {"{data, loading, error, mutate}"} = useSWR(key,
                  fetcher);
                </code>
              </div>
            </Link>

            <Link href="/form-demo" className="block">
              <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-all duration-300 hover:border-blue-300 hover:shadow-md transform hover:-translate-y-1">
                <h3 className="text-xl font-medium text-blue-600 mb-2 flex items-center">
                  <span className="inline-flex items-center justify-center w-6 h-6 mr-2 rounded-full bg-blue-100 flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-4 h-4 text-blue-600"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 2a.75.75 0 01.75.75V4h7.5V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  useForm
                </h3>
                <p className="text-gray-600 mb-2">
                  Form handling with validation, touched states, and error
                  messages.
                </p>
                <code className="block bg-gray-100 p-2 rounded text-sm">
                  const {"{values, errors, handleChange, handleSubmit}"} =
                  useForm({"{initialValues, validation, onSubmit}"});
                </code>
              </div>
            </Link>

            <Link href="/debounce-demo" className="block">
              <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-all duration-300 hover:border-blue-300 hover:shadow-md transform hover:-translate-y-1">
                <h3 className="text-xl font-medium text-blue-600 mb-2 flex items-center">
                  <span className="inline-flex items-center justify-center w-6 h-6 mr-2 rounded-full bg-blue-100 flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-4 h-4 text-blue-600"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm5-2.25A.75.75 0 017.75 7h4.5a.75.75 0 01.75.75v4.5a.75.75 0 01-.75.75h-4.5a.75.75 0 01-.75-.75v-4.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  useDebounceValue
                </h3>
                <p className="text-gray-600 mb-2">
                  Debounces a value to avoid excessive renders and API calls.
                </p>
                <code className="block bg-gray-100 p-2 rounded text-sm">
                  const debouncedValue = useDebounceValue(value, delay);
                </code>
              </div>
            </Link>
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <span className="inline-flex items-center justify-center w-8 h-8 mr-2 rounded-full bg-blue-500 flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 text-white"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M14.5 10a4.5 4.5 0 10-9 0 4.5 4.5 0 009 0zm-.82 4.74a6 6 0 111.06-1.06l3.04 3.04a.75.75 0 11-1.06 1.06l-3.04-3.04z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            Implementation Details
          </h2>
          <p className="mb-4">
            Each hook is implemented with TypeScript for type safety and better
            developer experience. The demos showcase practical use cases for
            each hook in a real-world application.
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <p className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 mr-2 text-blue-500 flex-shrink-0"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
                  clipRule="evenodd"
                />
              </svg>
              Navigate through the pages using the menu to see each hook in
              action.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
