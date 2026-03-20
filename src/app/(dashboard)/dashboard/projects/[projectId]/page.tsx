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
    <main className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="space-y-2">
          <p className="text-sm text-muted-foreground">Project Detail</p>
          <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
          <p className="text-muted-foreground">
            {project.description || "No description provided."}
          </p>
        </section>

        <CreateTaskForm projectId={project.id} />

        <KanbanBoard>
          <section className="grid gap-4 lg:grid-cols-3">
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
    </main>
  );
}