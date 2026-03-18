import "dotenv/config";
import { PrismaClient, TaskPriority, TaskStatus } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const existingUser = await prisma.user.findUnique({
    where: { email: "demo@example.com" },
  });

  let user = existingUser;

  if (!user) {
    user = await prisma.user.create({
      data: {
        name: "Demo User",
        email: "demo@example.com",
      },
    });
  }

  const project = await prisma.project.create({
    data: {
      name: "SaaS Task Management",
      description: "Portfolio project demo",
      color: "#6366f1",
      userId: user.id,
    },
  });

  await prisma.task.createMany({
    data: [
      {
        title: "Setup project",
        status: TaskStatus.TODO,
        priority: TaskPriority.HIGH,
        projectId: project.id,
        order: 1,
      },
      {
        title: "Build Prisma schema",
        status: TaskStatus.IN_PROGRESS,
        priority: TaskPriority.HIGH,
        projectId: project.id,
        order: 2,
      },
      {
        title: "Design Kanban board",
        status: TaskStatus.DONE,
        priority: TaskPriority.MEDIUM,
        projectId: project.id,
        order: 3,
      },
    ],
  });

  console.log("🌱 Seed completed");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });