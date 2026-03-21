"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  taskId: string;
  currentStatus: "TODO" | "IN_PROGRESS" | "DONE";
};

export function TaskActions({ taskId, currentStatus }: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function updateStatus(status: "TODO" | "IN_PROGRESS" | "DONE") {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      router.refresh();
    } catch (error) {
      console.error("[TASK_ACTIONS_UPDATE]", error);
      setError("Could not update task.");
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteTask() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmed) return;

    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      router.refresh();
    } catch (error) {
      console.error("[TASK_ACTIONS_DELETE]", error);
      setError("Could not delete task.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {currentStatus !== "TODO" && (
          <button
            onClick={() => updateStatus("TODO")}
            disabled={isLoading}
            className="rounded-full border px-3 py-1.5 text-xs text-muted-foreground transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
          >
            Todo
          </button>
        )}

        {currentStatus !== "IN_PROGRESS" && (
          <button
            onClick={() => updateStatus("IN_PROGRESS")}
            disabled={isLoading}
            className="rounded-full border px-3 py-1.5 text-xs text-muted-foreground transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
          >
            In Progress
          </button>
        )}

        {currentStatus !== "DONE" && (
          <button
            onClick={() => updateStatus("DONE")}
            disabled={isLoading}
            className="rounded-full border px-3 py-1.5 text-xs text-muted-foreground transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
          >
            Done
          </button>
        )}

        <button
          onClick={deleteTask}
          disabled={isLoading}
          className="rounded-full border border-red-200 px-3 py-1.5 text-xs text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? "Processing..." : "Delete"}
        </button>
      </div>

      {error ? <p className="text-xs text-red-500">{error}</p> : null}
    </div>
  );
}