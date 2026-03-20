"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  projectId: string;
};

export function CreateTaskForm({ projectId }: Props) {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"LOW" | "MEDIUM" | "HIGH">("MEDIUM");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim()) {
      setError("Title is required");
      setSuccessMessage(null);
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      setSuccessMessage(null);

      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          priority,
          projectId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create task");
      }

      setTitle("");
      setDescription("");
      setPriority("MEDIUM");
      setSuccessMessage("Task created successfully.");

      router.refresh();
    } catch (err) {
      console.error("[CREATE_TASK]", err);
      setError("Something went wrong. Please try again.");
      setSuccessMessage(null);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">Create New Task</h2>
        <p className="text-sm text-muted-foreground">
          Add a new task to this project board.
        </p>
      </div>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Task title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-xl border px-3 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-primary"
        />

        <textarea
          placeholder="Description (optional)..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="w-full rounded-xl border px-3 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-primary"
        />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Priority</span>

            <select
              title="Priority"
              value={priority}
              onChange={(e) =>
                setPriority(e.target.value as "LOW" | "MEDIUM" | "HIGH")
              }
              className="rounded-xl border px-3 py-2 text-sm outline-none"
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center rounded-xl bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-50"
          >
            {isSubmitting ? "Creating..." : "Create Task"}
          </button>
        </div>

        {error ? <p className="text-sm text-red-500">{error}</p> : null}
        {successMessage ? (
          <p className="text-sm text-emerald-600">{successMessage}</p>
        ) : null}
      </div>
    </form>
  );
}