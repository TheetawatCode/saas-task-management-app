import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const [projectsCount, tasksCount, completedTasks, projects] = await Promise.all([
    prisma.project.count(),
    prisma.task.count(),
    prisma.task.count({
      where: { status: "DONE" },
    }),
    prisma.project.findMany({
      include: {
        tasks: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
  ]);

  return (
    <main className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="space-y-2">
          <p className="text-sm text-muted-foreground">Task Management Overview</p>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage projects, tasks, and workflow in one place.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border bg-card p-5 shadow-sm">
            <p className="text-sm text-muted-foreground">Total Projects</p>
            <h2 className="mt-2 text-3xl font-bold">{projectsCount}</h2>
          </div>

          <div className="rounded-2xl border bg-card p-5 shadow-sm">
            <p className="text-sm text-muted-foreground">Total Tasks</p>
            <h2 className="mt-2 text-3xl font-bold">{tasksCount}</h2>
          </div>

          <div className="rounded-2xl border bg-card p-5 shadow-sm">
            <p className="text-sm text-muted-foreground">Completed Tasks</p>
            <h2 className="mt-2 text-3xl font-bold">{completedTasks}</h2>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Projects</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/dashboard/projects/${project.id}`}
                className="rounded-2xl border bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="space-y-3">
                  <div>
                    <h3 className="text-lg font-semibold">{project.name}</h3>
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                      {project.description || "No description provided."}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{project.tasks.length} tasks</span>
                    <span>Open project</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}