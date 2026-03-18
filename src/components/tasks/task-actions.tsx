"use client";

import { useRouter } from "next/navigation";

type Props = {
  taskId: string;
  currentStatus: "TODO" | "IN_PROGRESS" | "DONE";
};

export function TaskActions({ taskId, currentStatus }: Props) {
  const router = useRouter();

  async function updateStatus(status: string) {
    await fetch(`/api/tasks/${taskId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    router.refresh();
  }

  async function deleteTask() {
    await fetch(`/api/tasks/${taskId}`, {
      method: "DELETE",
    });

    router.refresh();
  }

  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {currentStatus !== "TODO" && (
        <button
          onClick={() => updateStatus("TODO")}
          className="text-xs border px-2 py-1 rounded"
        >
          Todo
        </button>
      )}

      {currentStatus !== "IN_PROGRESS" && (
        <button
          onClick={() => updateStatus("IN_PROGRESS")}
          className="text-xs border px-2 py-1 rounded"
        >
          In Progress
        </button>
      )}

      {currentStatus !== "DONE" && (
        <button
          onClick={() => updateStatus("DONE")}
          className="text-xs border px-2 py-1 rounded"
        >
          Done
        </button>
      )}

      <button
        onClick={deleteTask}
        className="text-xs border px-2 py-1 rounded text-red-500"
      >
        Delete
      </button>
    </div>
  );
}