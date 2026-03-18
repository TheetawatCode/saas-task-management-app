import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { CreateTaskForm } from "@/components/tasks/create-task-form";
import { TaskActions } from "@/components/tasks/task-actions";
import { KanbanBoard } from "@/components/tasks/kanban-board";
import { KanbanColumn } from "@/components/tasks/kanban-column";
import { TaskCard } from "@/components/tasks/task-card";

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

                        {/* TODO */}
                        <KanbanColumn id="TODO">
                            <div className="rounded-2xl border bg-card p-4 shadow-sm">
                                <div className="mb-4 flex items-center justify-between">
                                    <h2 className="font-semibold">Todo</h2>
                                    <span className="text-sm text-muted-foreground">
                                        {todoTasks.length}
                                    </span>
                                </div>

                                <div className="space-y-3">
                                    {todoTasks.map((task) => (
                                        <div key={task.id}>
                                            <TaskCard task={task} />

                                            <TaskActions
                                                taskId={task.id}
                                                currentStatus={task.status}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </KanbanColumn>

                        {/* IN PROGRESS */}
                        <KanbanColumn id="IN_PROGRESS">
                            <div className="rounded-2xl border bg-card p-4 shadow-sm">
                                <div className="mb-4 flex items-center justify-between">
                                    <h2 className="font-semibold">In Progress</h2>
                                    <span className="text-sm text-muted-foreground">
                                        {inProgressTasks.length}
                                    </span>
                                </div>

                                <div className="space-y-3">
                                    {inProgressTasks.map((task) => (
                                        <div key={task.id}>
                                            <TaskCard task={task} />

                                            <TaskActions
                                                taskId={task.id}
                                                currentStatus={task.status}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </KanbanColumn>

                        {/* DONE */}
                        <KanbanColumn id="DONE">
                            <div className="rounded-2xl border bg-card p-4 shadow-sm">
                                <div className="mb-4 flex items-center justify-between">
                                    <h2 className="font-semibold">Done</h2>
                                    <span className="text-sm text-muted-foreground">
                                        {doneTasks.length}
                                    </span>
                                </div>

                                <div className="space-y-3">
                                    {doneTasks.map((task) => (
                                        <div key={task.id}>
                                            <TaskCard task={task} />

                                            <TaskActions
                                                taskId={task.id}
                                                currentStatus={task.status}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </KanbanColumn>

                    </section>
                </KanbanBoard>
            </div>
        </main>
    );
}