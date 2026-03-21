"use client";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import type { Task } from "@/generated/prisma/client";
import { GripVertical } from "lucide-react";
import { TaskActions } from "@/components/tasks/task-actions";

function getPriorityStyles(priority: Task["priority"]) {
  switch (priority) {
    case "HIGH":
      return "border-red-200 bg-red-50 text-red-600";
    case "MEDIUM":
      return "border-amber-200 bg-amber-50 text-amber-600";
    case "LOW":
      return "border-emerald-200 bg-emerald-50 text-emerald-600";
    default:
      return "border-muted bg-muted text-muted-foreground";
  }
}

export function TaskCard({ task }: { task: Task }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
    data: {
      status: task.status,
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="rounded-2xl border bg-background p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2">
          <p className="text-[15px] font-semibold leading-6">{task.title}</p>
          <p className="line-clamp-3 text-sm text-muted-foreground">
            {task.description || "No description"}
          </p>
        </div>

        <div className="flex flex-col items-end gap-2">
          <span
            className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${getPriorityStyles(
              task.priority
            )}`}
          >
            {task.priority}
          </span>

          <button
            type="button"
            {...listeners}
            {...attributes}
            className="rounded-lg border p-1.5 text-muted-foreground transition hover:bg-muted cursor-grab active:cursor-grabbing"
            aria-label="Drag task"
          >
            <GripVertical className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-4 border-t pt-4">
        <TaskActions taskId={task.id} currentStatus={task.status} />
      </div>
    </div>
  );
}