import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  Search,
  User,
  BookOpen,
  Calendar,
  ShoppingCart,
  X,
} from "lucide-react";
import { getUsers } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { toggleFollowUser } from "../../features/followSlice";

const Navbar: React.FC = () => {
  const searchRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { followingIds, followLoading } = useSelector(
    (state: RootState) => state.follow
  );
  const handleToggleFollow = (targetUserId: string, isFollowing: boolean) => {
    dispatch(toggleFollowUser({ targetUserId, isFollowing }));
  };

  const dispatch = useDispatch<AppDispatch>();
  const [searchTerm, setSearchTerm] = useState("");
  const { users, user, isLoading, error } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const filteredUsers =
    searchTerm.trim() === ""
      ? []
      : users?.filter(
          (u) =>
            u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            u.email.toLowerCase().includes(searchTerm.toLowerCase())
        );

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    {
      name: "Recipes",
      path: "/recipes",
      icon: <BookOpen className="w-5 h-5" />,
    },
    {
      name: "Meal Planner",
      path: "/meal-planner",
      icon: <Calendar className="w-5 h-5" />,
    },
    {
      name: "Grocery List",
      path: "/grocery-list",
      icon: <ShoppingCart className="w-5 h-5" />,
    },
    {
      name: "Profile",
      path: "/profile?isedit=true",
      icon: <User className="w-5 h-5" />,
    },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container-custom">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/homepage" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white">
              <span className="text-xl font-display font-bold">C</span>
            </div>
            <span className="font-display text-xl font-bold text-primary-800">
              Culina
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="relative" ref={searchRef}>
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.stopPropagation()}
                className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none w-64"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />

              {searchTerm && (
                <div className="absolute z-10 mt-1 w-64 bg-white border border-gray-200 rounded-md shadow-md max-h-60 overflow-y-auto">
                  {isLoading ? (
                    <p className="p-3 text-gray-500">Loading...</p>
                  ) : filteredUsers.length > 0 ? (
                    filteredUsers.map((u) => (
                      <div
                        key={u._id}
                        className="p-3 hover:bg-gray-100 cursor-pointer flex items-center justify-between"
                      >
                        <Link
                          to={`/profile/${u._id}`}
                          className="flex-1"
                          onClick={() => setSearchTerm("")}
                        >
                          <p className="font-medium">{u.name}</p>
                          <p className="text-sm text-gray-500">{u.email}</p>
                        </Link>

                        {u._id !== user._id && (
                          <button
                            className="bg-primary-500 text-white text-xs px-3 py-1 rounded-full hover:bg-primary-600 transition whitespace-nowrap"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleFollow(
                                u._id,
                                followingIds.includes(u._id)
                              );
                            }}
                            disabled={followLoading}
                          >
                            {followingIds.includes(u._id)
                              ? "Unfollow"
                              : "Follow"}
                          </button>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="p-3 text-gray-500">No users found</p>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? "text-primary-700 bg-primary-50"
                      : "text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                  }`}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-700 hover:text-primary-600 focus:outline-none"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-white">
          <div className="container-custom py-4">
            <div className="flex justify-between items-center">
              <Link
                to="/"
                className="flex items-center space-x-2"
                onClick={() => setIsOpen(false)}
              >
                <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white">
                  <span className="text-xl font-display font-bold">C</span>
                </div>
                <span className="font-display text-xl font-bold text-primary-800">
                  Culina
                </span>
              </Link>
              <button
                onClick={toggleMenu}
                className="text-gray-700 hover:text-primary-600 focus:outline-none"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="mt-6">
              <div className="relative mb-6">
                <input
                  type="text"
                  placeholder="Search recipes..."
                  className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none w-full"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>

              <div className="space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-md text-base font-medium transition-colors ${
                      isActive(link.path)
                        ? "text-primary-700 bg-primary-50"
                        : "text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                    }`}
                  >
                    {link.icon}
                    <span>{link.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
