import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { CreateTaskForm } from "@/components/tasks/create-task-form";
import { KanbanBoard } from "@/components/kanban/kanban-board";
import { KanbanTaskColumn } from "@/components/tasks/kanban-task-column";

type PageProps = {
  params: Promise<{
    projectId: string;
  }>;
};

export default async function ProjectDetailPage({ params }: PageProps) {
  const { projectId } = await params;

  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: {
      tasks: {
        orderBy: {
          order: "asc",
        },
      },
    },
  });

  if (!project) {
    notFound();
  }

  const todoTasks = project.tasks.filter((task) => task.status === "TODO");
  const inProgressTasks = project.tasks.filter(
    (task) => task.status === "IN_PROGRESS"
  );
  const doneTasks = project.tasks.filter((task) => task.status === "DONE");

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-6">
      <section className="space-y-4">
        <div className="inline-flex rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground">
          Project Board
        </div>

        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {project.name}
          </h1>
          <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
            {project.description || "No description provided."}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="rounded-xl border bg-card px-4 py-3 shadow-sm">
            <p className="text-xs text-muted-foreground">Total Tasks</p>
            <p className="mt-1 text-lg font-semibold">{project.tasks.length}</p>
          </div>
          <div className="rounded-xl border bg-card px-4 py-3 shadow-sm">
            <p className="text-xs text-muted-foreground">Todo</p>
            <p className="mt-1 text-lg font-semibold">{todoTasks.length}</p>
          </div>
          <div className="rounded-xl border bg-card px-4 py-3 shadow-sm">
            <p className="text-xs text-muted-foreground">In Progress</p>
            <p className="mt-1 text-lg font-semibold">{inProgressTasks.length}</p>
          </div>
          <div className="rounded-xl border bg-card px-4 py-3 shadow-sm">
            <p className="text-xs text-muted-foreground">Done</p>
            <p className="mt-1 text-lg font-semibold">{doneTasks.length}</p>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border bg-card p-6 shadow-sm">
        <CreateTaskForm projectId={project.id} />
      </section>

      <KanbanBoard>
        <section className="grid gap-5 xl:grid-cols-3">
          <KanbanTaskColumn id="TODO" title="Todo" tasks={todoTasks} />
          <KanbanTaskColumn
            id="IN_PROGRESS"
            title="In Progress"
            tasks={inProgressTasks}
          />
          <KanbanTaskColumn id="DONE" title="Done" tasks={doneTasks} />
        </section>
      </KanbanBoard>
    </div>
  );
}