"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ITEMS_PER_PAGE = 6;

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: "admin" | "user";
  blocked: boolean;
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const token =
    typeof window !== "undefined"
      ? document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="))
          ?.split("=")[1]
      : null;

  // ================= FETCH USERS =================
  const fetchUsers = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/auth/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ================= PAGINATION =================
  const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);

  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return users.slice(start, start + ITEMS_PER_PAGE);
  }, [users, currentPage]);

  // ================= BLOCK / UNBLOCK =================
  const handleToggleBlock = async (user: User) => {
    await fetch(process.env.NEXT_PUBLIC_API_URL + `/auth/users/${user._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ blocked: !user.blocked }),
    });

    fetchUsers();
  };

  // ================= DELETE =================
  const handleDeleteUser = async (id: string) => {
    if (!window.confirm("Delete this user?")) return;

    await fetch(process.env.NEXT_PUBLIC_API_URL + `/auth/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchUsers();
  };

  return (
    <div className="space-y-12 animate-fade-up">
      <header className="flex justify-between items-end">
        <div className="space-y-4">
          <span className="text-gold font-bold text-[10px] uppercase tracking-[0.6em]">
            Registry
          </span>
          <h1 className="text-5xl font-heading tracking-tight">
            The Client Base
          </h1>
        </div>
      </header>

      <div className="bg-white rounded-[3rem] border border-black/5 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50/30">
              <th className="px-10 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-[0.4em]">
                Patron
              </th>
              <th className="px-10 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-[0.4em]">
                Digital Line
              </th>
              <th className="px-10 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-[0.4em]">
                Status
              </th>
              <th className="px-10 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-[0.4em] text-right">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-black/5">
            {paginatedUsers.map((user) => (
              <tr
                key={user._id}
                className="group hover:bg-gray-50 transition-colors"
              >
                <td className="px-10 py-8">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-gold font-bold">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 tracking-tight">
                        {user.name}
                      </p>
                      <p className="text-[9px] text-gray-400 uppercase tracking-widest mt-1">
                        ID: {user._id.slice(-6)}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-10 py-8">
                  <p className="text-xs font-medium text-gray-500">
                    {user.email}
                  </p>
                  <p className="text-[9px] font-bold text-black mt-1">
                    {user.phone}
                  </p>
                </td>

                <td className="px-10 py-8">
                  <span
                    className={`text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-full ${
                      user.blocked
                        ? "text-red-600 bg-red-50"
                        : "text-green-600 bg-green-50"
                    }`}
                  >
                    {user.blocked ? "Blocked" : "Active"}
                  </span>
                </td>

                <td className="px-10 py-8 text-right space-x-6">
                  <button
                    onClick={() => handleToggleBlock(user)}
                    className={`text-[9px] font-bold uppercase tracking-widest transition-all ${
                      user.blocked
                        ? "text-green-500 hover:text-green-700"
                        : "text-red-400 hover:text-red-600"
                    }`}
                  >
                    {user.blocked ? "Unblock" : "Block Session"}
                  </button>

                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="text-[9px] font-bold uppercase tracking-widest text-red-500 hover:text-red-700 transition-all"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-8 border-t border-black/5 flex justify-between items-center bg-gray-50/50">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="p-3 rounded-full border hover:border-gold"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex gap-3">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold ${
                    currentPage === i + 1
                      ? "bg-black text-gold"
                      : "bg-white border border-gray-200"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="p-3 rounded-full border hover:border-gold"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
