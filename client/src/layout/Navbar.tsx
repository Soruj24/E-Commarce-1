import { NavLink } from "react-router-dom"; // For Next.js, use a custom solution
import { Menu, ShoppingCart, User, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import Profile from "@/page/Profile";
import { Input } from "@/components/ui/input";

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [theme, setTheme] = useState("light");

    const categories = ["Electronics", "Fashion", "Home & Garden", "Toys", "Sports"];

    // Toggle Theme
    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        document.documentElement.classList.toggle("dark", newTheme === "dark");
    };

    // Initialize Theme from Local Storage
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "light";
        setTheme(savedTheme);
        document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }, []);

    return (
        <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
            <nav className="container mx-auto flex items-center justify-between px-4 py-3 lg:px-8">
                {/* Logo */}
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    <NavLink to="/" className="hover:underline">
                        E-Shop
                    </NavLink>
                </div>

                {/* Desktop Links */}
                <div className="hidden lg:flex items-center space-x-8">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive
                                ? "text-blue-600 dark:text-blue-400 font-semibold"
                                : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition"
                        }
                    >
                        Home
                    </NavLink>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">
                                Categories
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {categories.map((category) => (
                                <DropdownMenuItem key={category}>
                                    <NavLink
                                        to={`/category/${category.toLowerCase()}`}
                                        className={({ isActive }) =>
                                            isActive
                                                ? "text-blue-600 dark:text-blue-400 font-semibold"
                                                : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
                                        }
                                    >
                                        {category}
                                    </NavLink>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <NavLink
                        to="/about"
                        className={({ isActive }) =>
                            isActive
                                ? "text-blue-600 dark:text-blue-400 font-semibold"
                                : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition"
                        }
                    >
                        About
                    </NavLink>
                    <NavLink
                        to="/contact"
                        className={({ isActive }) =>
                            isActive
                                ? "text-blue-600 dark:text-blue-400 font-semibold"
                                : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition"
                        }
                    >
                        Contact
                    </NavLink>
                </div>

                {/* Search Bar */}
                <div className="hidden lg:flex items-center space-x-2">
                    <Input
                        placeholder="Search products..."
                        className="w-72 border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500"
                    />
                    <Button>Search</Button>
                </div>

                {/* Icons Section */}
                <div className="flex items-center space-x-4">
                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700"
                    >
                        {theme === "light" ? (
                            <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                        ) : (
                            <Sun className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                        )}
                    </button>

                    {/* Cart */}

                    <Profile />
                    <NavLink
                        to="/cart"
                        className={({ isActive }) =>
                            isActive
                                ? "relative text-blue-600 dark:text-blue-400 font-semibold"
                                : "relative text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition"
                        }
                    >
                        <ShoppingCart className="w-6 h-6" />
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            3
                        </span>
                    </NavLink>



                    {/* Mobile Menu Toggle */}
                    <button
                        className="lg:hidden"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition" />
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="bg-gray-50 dark:bg-gray-800 shadow-md lg:hidden">
                    <div className="flex flex-col space-y-4 p-4">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-blue-600 dark:text-blue-400 font-semibold"
                                    : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
                            }
                        >
                            Home
                        </NavLink>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost">Categories</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                {categories.map((category) => (
                                    <DropdownMenuItem key={category}>
                                        <NavLink
                                            to={`/category/${category.toLowerCase()}`}
                                            className={({ isActive }) =>
                                                isActive
                                                    ? "text-blue-600 dark:text-blue-400 font-semibold"
                                                    : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
                                            }
                                        >
                                            {category}
                                        </NavLink>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <NavLink
                            to="/about"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-blue-600 dark:text-blue-400 font-semibold"
                                    : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
                            }
                        >
                            About
                        </NavLink>
                        <NavLink
                            to="/contact"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-blue-600 dark:text-blue-400 font-semibold"
                                    : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
                            }
                        >
                            Contact
                        </NavLink>
                        {/* Mobile Search */}
                        <div className="flex items-center space-x-2">
                            <Input placeholder="Search products..." />
                            <Button>Search</Button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
