import type { Task } from "@/generated/prisma/client";
import { KanbanColumn } from "@/components/kanban/kanban-column";
import { TaskCard } from "@/components/tasks/task-card";

type KanbanTaskColumnProps = {
  id: "TODO" | "IN_PROGRESS" | "DONE";
  title: string;
  tasks: Task[];
};

export function KanbanTaskColumn({
  id,
  title,
  tasks,
}: KanbanTaskColumnProps) {
  return (
    <KanbanColumn id={id}>
      <div className="rounded-2xl border bg-card p-4 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold">{title}</h2>
          <span className="text-sm text-muted-foreground">{tasks.length}</span>
        </div>

        <div className="space-y-3">
          {tasks.length > 0 ? (
            tasks.map((task) => <TaskCard key={task.id} task={task} />)
          ) : (
            <div className="rounded-xl border border-dashed p-6 text-center text-sm text-muted-foreground">
              No tasks in this column
            </div>
          )}
        </div>
      </div>
    </KanbanColumn>
  );
}