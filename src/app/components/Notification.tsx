"use client";

import { Clock, CheckCircle2, AlertTriangle, Trash2, Bell } from "lucide-react";

interface TrashItem {
  id: number;
  name: string;
  dateThrowOut: string;
  isPending: boolean;
}

interface NotificationProps {
  data: TrashItem[];
}

export default function Notification({ data }: NotificationProps) {
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-sm p-6 mt-10 border border-gray-200">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Notifications</h2>
      </div>

      {/* Timeline */}
      <ul role="list" className="space-y-6">
        {data.map((item, index) => {
          const Icon = item.isPending ? AlertTriangle : CheckCircle2;
          const iconColor = item.isPending
            ? "text-amber-600 bg-amber-50 ring-amber-100"
            : "text-emerald-600 bg-emerald-50 ring-emerald-100";

          return (
            <li key={item.id} className="relative flex items-start">
              {/* Linha de timeline */}
              {index !== data.length - 1 && (
                <span
                  className="absolute left-5 top-6 h-full w-px bg-gray-200"
                  aria-hidden="true"
                />
              )}

              {/* Ícone principal */}
              <span
                className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full ring-2 ${iconColor}`}
              >
                <Icon className="h-5 w-5" />
              </span>

              {/* Conteúdo */}
              <div className="ml-6 flex justify-between w-full">
                <div>
                  <p className="text-sm text-gray-700 font-medium">
                    {item.isPending ? (
                      <>
                        <span className="text-amber-700 font-semibold">
                          {item.name}
                        </span>{" "}
                        ainda não jogou o lixo.
                      </>
                    ) : (
                      <>
                        <span className="text-emerald-700 font-semibold">
                          {item.name}
                        </span>{" "}
                        completou a tarefa de lixo.
                      </>
                    )}
                  </p>

                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    {new Date(item.dateThrowOut).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>

                {/* Ícone lateral */}
                {/* <Trash2
                  className={`h-5 w-5 transition-colors ${
                    item.isPending ? "text-amber-500" : "text-gray-400"
                  }`}
                /> */}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
