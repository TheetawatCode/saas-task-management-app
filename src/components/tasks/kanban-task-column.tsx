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
      <div className="rounded-3xl border bg-card p-4 shadow-sm">
        <div className="mb-4 flex items-center justify-between rounded-2xl bg-muted/40 px-4 py-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground">
            {title}
          </h2>
          <span className="rounded-full border bg-background px-2.5 py-1 text-xs text-muted-foreground">
            {tasks.length}
          </span>
        </div>

        <div className="space-y-3">
          {tasks.length > 0 ? (
            tasks.map((task) => <TaskCard key={task.id} task={task} />)
          ) : (
            <div className="rounded-2xl border border-dashed p-8 text-center text-sm text-muted-foreground">
              No tasks in this column
            </div>
          )}
        </div>
      </div>
    </KanbanColumn>
  );
}