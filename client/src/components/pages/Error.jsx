import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-center px-4">
      {/* Glitchy 404 Text */}
      <h1 className="text-[120px] font-extrabold text-red-600 glitch">
        404
      </h1>

      {/* Error Message */}
      <p className="text-2xl text-gray-400 mt-4 glitch">
        Oops! This page does not exist.
      </p>

      {/* Subtext */}
      <p className="text-gray-500 mt-2 max-w-md glitch">
        The darkness has swallowed this page. Maybe it never existed in the first place?
      </p>

      {/* Go Home Button */}
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-red-600 text-white rounded-lg shadow-lg transition duration-300 transform hover:scale-110 hover:bg-red-700 neon-glow"
      >
        Return to Safety
      </Link>

      {/* Glitch Effect CSS */}
      <style>
        {`
          .glitch {
            position: relative;
            display: inline-block;
            animation: glitch 1s infinite;
          }

          @keyframes glitch {
            0% { text-shadow: 2px 2px red, -2px -2px blue; }
            25% { text-shadow: -2px -2px red, 2px 2px blue; }
            50% { text-shadow: 2px -2px red, -2px 2px blue; }
            75% { text-shadow: -2px 2px red, 2px -2px blue; }
            100% { text-shadow: 2px 2px red, -2px -2px blue; }
          }

          .neon-glow {
            box-shadow: 0 0 10px rgba(255, 0, 0, 0.8);
          }
        `}
      </style>
    </div>
  );
}

export default ErrorPage;
