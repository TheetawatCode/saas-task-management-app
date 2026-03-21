import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    include: {
      tasks: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-6">
      <section className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground">
          Projects Directory
        </p>
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Projects</h1>
          <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
            Browse all projects and open a specific board to manage tasks.
          </p>
        </div>
      </section>

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
                  <h2 className="text-lg font-semibold tracking-tight">
                    {project.name}
                  </h2>
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
    </div>
  );
}