"use client";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import type { Task } from "@/generated/prisma/client";
import { TaskActions } from "@/components/tasks/task-actions";

export function TaskCard({ task }: { task: Task }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="rounded-xl border bg-background p-4 shadow-sm transition hover:shadow-md"
    >
      <p className="font-medium">{task.title}</p>

      <p className="mt-1 text-sm text-muted-foreground">
        {task.description || "No description"}
      </p>

      <div className="mt-3">
        <TaskActions taskId={task.id} currentStatus={task.status} />
      </div>
    </div>
  );
}