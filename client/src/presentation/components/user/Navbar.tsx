

import type React from "react"
import { useState } from "react"
import { Search, Home, User, ChevronDown } from "lucide-react"
import { useDarkMode } from "../../../domain/hooks/useDarkMode"

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isDropdown1Open, setIsDropdown1Open] = useState(false)
  const [isDropdown2Open, setIsDropdown2Open] = useState(false)
  const { theme, toggleTheme } = useDarkMode();

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold text-indigo-600">Logo</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a
                  href="#"
                  className="text-gray-600 hover:bg-indigo-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out flex items-center"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </a>
                <button
        onClick={toggleTheme}
        className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 dark:bg-yellow-500 dark:hover:bg-yellow-600 transition"
      >
        Toggle to {theme === 'dark' ? 'Light' : 'Dark'} Mode
      </button>
                <a
                  href="#"
                  className="text-gray-600 hover:bg-indigo-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out flex items-center"
                >
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </a>
                <div className="relative group">
                  <button
                    onClick={() => setIsDropdown1Open(!isDropdown1Open)}
                    className="text-gray-600 hover:bg-indigo-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out flex items-center"
                  >
                    Dropdown 1
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </button>
                  {isDropdown1Open && (
                    <div className="absolute z-10 left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-500 hover:text-white transition duration-300 ease-in-out"
                          role="menuitem"
                        >
                          Option 1
                        </a>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-500 hover:text-white transition duration-300 ease-in-out"
                          role="menuitem"
                        >
                          Option 2
                        </a>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-500 hover:text-white transition duration-300 ease-in-out"
                          role="menuitem"
                        >
                          Option 3
                        </a>
                      </div>
                    </div>
                  )}
                </div>
                <div className="relative group">
                  <button
                    onClick={() => setIsDropdown2Open(!isDropdown2Open)}
                    className="text-gray-600 hover:bg-indigo-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out flex items-center"
                  >
                    Dropdown 2
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </button>
                  {isDropdown2Open && (
                    <div className="absolute z-10 left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-500 hover:text-white transition duration-300 ease-in-out"
                          role="menuitem"
                        >
                          Option A
                        </a>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-500 hover:text-white transition duration-300 ease-in-out"
                          role="menuitem"
                        >
                          Option B
                        </a>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-500 hover:text-white transition duration-300 ease-in-out"
                          role="menuitem"
                        >
                          Option C
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-300 ease-in-out"
                  placeholder="Search"
                  type="search"
                />
              </div>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white transition duration-300 ease-in-out"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="#"
              className="text-gray-600 hover:bg-indigo-500 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out"
            >
              Home
            </a>
            <a
              href="#"
              className="text-gray-600 hover:bg-indigo-500 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out"
            >
              Profile
            </a>
            <button
              onClick={() => setIsDropdown1Open(!isDropdown1Open)}
              className="text-gray-600 hover:bg-indigo-500 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out w-full text-left"
            >
              Dropdown 1
            </button>
            {isDropdown1Open && (
              <div className="pl-4">
                <a
                  href="#"
                  className="text-gray-600 hover:bg-indigo-500 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out"
                >
                  Option 1
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:bg-indigo-500 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out"
                >
                  Option 2
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:bg-indigo-500 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out"
                >
                  Option 3
                </a>
              </div>
            )}
            <button
              onClick={() => setIsDropdown2Open(!isDropdown2Open)}
              className="text-gray-600 hover:bg-indigo-500 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out w-full text-left"
            >
              Dropdown 2
            </button>
            {isDropdown2Open && (
              <div className="pl-4">
                <a
                  href="#"
                  className="text-gray-600 hover:bg-indigo-500 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out"
                >
                  Option A
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:bg-indigo-500 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out"
                >
                  Option B
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:bg-indigo-500 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out"
                >
                  Option C
                </a>
              </div>
            )}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="px-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-300 ease-in-out"
                  placeholder="Search"
                  type="search"
                />
                
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar

