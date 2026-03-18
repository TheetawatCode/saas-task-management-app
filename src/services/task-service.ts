import { prisma } from "@/lib/prisma";
import type { CreateTaskInput } from "@/lib/validations/task";

export async function createTask(data: CreateTaskInput) {
  const lastTask = await prisma.task.findFirst({
    where: {
      projectId: data.projectId,
      status: data.status,
    },
    orderBy: {
      order: "desc",
    },
  });

  const nextOrder = lastTask ? lastTask.order + 1 : 1;

  return prisma.task.create({
    data: {
      title: data.title,
      description: data.description || null,
      status: data.status,
      priority: data.priority,
      projectId: data.projectId,
      order: nextOrder,
    },
  });
}