"use client";

import { useState } from "react";

interface TrashItem {
  id: number;
  name: string;
  dateThrowOut: string;
  isPending: boolean;
  color?: string; // cor personalizada
}

export default function Roommates() {
  const [data] = useState<TrashItem[]>([
    { id: 1, name: "Marcus", dateThrowOut: "2025-10-10", isPending: true, color: "F59E0B" }, // amber
    { id: 2, name: "Alonso", dateThrowOut: "2025-10-12", isPending: false, color: "3B82F6" }, // blue
    { id: 3, name: "Hanna", dateThrowOut: "2025-10-13", isPending: false, color: "10B981" }, // green
    { id: 4, name: "Jidenna", dateThrowOut: "2025-10-13", isPending: false, color: "8B5CF6" }, // purple
    { id: 5, name: "Kristina", dateThrowOut: "2025-10-13", isPending: false, color: "EC4899" }, // pink
  ]);

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-sm rounded-2xl p-6 mt-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Roommates</h2>

      <ul role="list" className="divide-y divide-gray-100">
        {data.map((person) => (
          <li key={person.id} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              {/* Avatar com cor única */}
              <img
                src={`https://ui-avatars.com/api/?name=${person.name}&background=${person.color}&color=ffffff`}
                alt={person.name}
                className="h-12 w-12 flex-none rounded-full bg-gray-50 shadow-sm"
              />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold text-gray-900">
                  {person.name}
                </p>
                <p className="mt-1 truncate text-xs text-gray-500">
                  {person.isPending ? "Pending task" : "Completed task"}
                </p>
              </div>
            </div>

            {/* Lado direito com status e data */}
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <p className="text-sm text-gray-900">Trash Date</p>
              <div className="mt-1 flex items-center gap-x-1.5">
                <div
                  className={`flex-none rounded-full p-1 ${
                    person.isPending
                      ? "bg-red-500/20"
                      : "bg-emerald-500/20"
                  }`}
                >
                  <div
                    className={`h-1.5 w-1.5 rounded-full ${
                      person.isPending ? "bg-red-500" : "bg-emerald-500"
                    }`}
                  />
                </div>
                <p className="text-xs text-gray-500">
                  {new Date(person.dateThrowOut).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
