"use client";

import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useRouter } from "next/navigation";

export function KanbanBoard({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    const taskId = String(active.id);
    const newStatus = String(over.id);

    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update task status");
      }

      router.refresh();
    } catch (error) {
      console.error("[KANBAN_DRAG_END]", error);
    }
  }

  return <DndContext onDragEnd={handleDragEnd}>{children}</DndContext>;
}