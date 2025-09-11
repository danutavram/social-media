import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { signInWithGitHub, signOut, user } = useAuth();

  const displayName = user?.user_metadata.user_name || user?.email;

  return (
    <nav className="fixed top-0 w-full z-40 bg-[rgba(10,10,10,0.8)] backdrop-blur-lg border-b border-white/10 shadow-lg">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to={"/"} className="font-mono text-xl font-bold text-white">
            forum<span className="text-purple-500">.app</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to={"/"}
              className="text-gray-300 hover:text-white  transition-colors"
            >
              {" "}
              Home{" "}
            </Link>
            <Link
              to={"/create"}
              className="text-gray-300 hover:text-white transition-colors"
            >
              {" "}
              Create Post{" "}
            </Link>
            <Link
              to={"/communities"}
              className="text-gray-300 hover:text-white transition-colors"
            >
              {" "}
              Communities{" "}
            </Link>
            <Link
              to={"/community/create"}
              className="text-gray-300 hover:text-white transition-colors"
            >
              {" "}
              Create Community{" "}
            </Link>
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                {user.user_metadata.avatar_url && (
                  <img
                    className="w-8 h-8 rounded-full object-cover"
                    src={user.user_metadata.avatar_url}
                    alt="User Avatar"
                  />
                )}
                <span className="text-gray-300"> {displayName}</span>
                <button
                  onClick={signOut}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg transition duration-200 cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 
         5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 
         0 002.25-2.25V15M9 12h12m0 0l-3-3m3 3l-3 3"
                    />
                  </svg>
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={signInWithGitHub}
                className="flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white font-medium px-4 py-2 rounded-lg transition duration-200 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 0C5.37 0 0 5.373 0 12c0 5.303 
         3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 
         0-.285-.011-1.04-.017-2.04-3.338.726-4.042-1.61-4.042-1.61 
         -.546-1.387-1.333-1.757-1.333-1.757 
         -1.09-.744.083-.729.083-.729 
         1.205.085 1.84 1.236 1.84 1.236 
         1.07 1.834 2.809 1.304 3.495.997 
         .107-.775.418-1.304.76-1.605 
         -2.665-.305-5.467-1.334-5.467-5.933 
         0-1.31.467-2.381 1.235-3.221 
         -.124-.303-.536-1.527.117-3.176 0 0 
         1.008-.322 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.552 
         3.297-1.23 3.297-1.23.655 1.649.243 2.873.119 3.176 
         .77.84 1.233 1.911 1.233 3.221 
         0 4.61-2.807 5.625-5.479 5.922 
         .43.372.814 1.102.814 2.222 
         0 1.606-.014 2.898-.014 3.293 
         0 .322.217.694.825.576C20.565 21.797 
         24 17.3 24 12c0-6.627-5.373-12-12-12z"
                    clipRule="evenodd"
                  />
                </svg>
                Sign in with GitHub
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="text-gray-300 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[rgba(10,10,10,0.9)]">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to={"/"}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
            >
              {" "}
              Home{" "}
            </Link>
            <Link
              to={"/create"}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
            >
              {" "}
              Create Post{" "}
            </Link>
            <Link
              to={"/communities"}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
            >
              {" "}
              Communities{" "}
            </Link>
            <Link
              to={"/community/create"}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
            >
              {" "}
              Create Community{" "}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
