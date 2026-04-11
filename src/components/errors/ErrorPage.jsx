// src/components/ErrorPage.jsx
import { useRouteError, Link } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4 text-center">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Oops! Something went wrong</h1>
      <p className="text-gray-600 mb-6">
        <i>{error.statusText || error.message}</i>
      </p>
      <Link 
        to="/" 
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
      >
        Back to Home 
      </Link>
    </div>
  );
}