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
    <div className="mx-auto max-w-7xl space-y-10 p-6">
      <section className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground">
          Task Management Overview
        </p>
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
          <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
            Manage projects, track progress, and organize your workflow in one
            place.
          </p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <p className="text-sm text-muted-foreground">Total Projects</p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight">
            {projectsCount}
          </h2>
        </div>

        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <p className="text-sm text-muted-foreground">Total Tasks</p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight">
            {tasksCount}
          </h2>
        </div>

        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <p className="text-sm text-muted-foreground">Completed Tasks</p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight">
            {completedTasks}
          </h2>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">Projects</h2>
        </div>

        {projects.length === 0 ? (
          <div className="rounded-2xl border border-dashed p-10 text-center text-sm text-muted-foreground">
            No projects yet. Create your first project to get started.
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/dashboard/projects/${project.id}`}
                className="group rounded-2xl border bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex h-full flex-col justify-between gap-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold tracking-tight">
                      {project.name}
                    </h3>
                    <p className="line-clamp-2 text-sm text-muted-foreground">
                      {project.description || "No description provided."}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {project.tasks.length} tasks
                    </span>
                    <span className="font-medium text-foreground/80 transition group-hover:text-foreground">
                      Open project →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}