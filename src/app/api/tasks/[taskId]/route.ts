import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = Promise<{ taskId: string }>;

export async function PATCH(
  req: NextRequest,
  context: { params: Params }
) {
  try {
    const { taskId } = await context.params;
    const body = await req.json();

    const updated = await prisma.task.update({
      where: { id: taskId },
      data: {
        status: body.status,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("[TASK_PATCH]", error);

    return NextResponse.json(
      { message: "Failed to update task" },
      { status: 500 }
    );
  }
} 

export async function DELETE(
    _: NextRequest,
    context: { params: Params }
  ) {
    try {
      const { taskId } = await context.params;
  
      await prisma.task.delete({
        where: { id: taskId },
      });
  
      return NextResponse.json({ success: true });
    } catch (error) {
      console.error("[TASK_DELETE]", error);
  
      return NextResponse.json(
        { message: "Failed to delete task" },
        { status: 500 }
      );
    }
  }