import { NextRequest, NextResponse } from "next/server";
import { createTaskSchema } from "@/lib/validations/task";
import { createTask } from "@/services/task-service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = createTaskSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: parsed.error.flatten(),
        },
        { status: 400 }
      );
    }

    const task = await createTask(parsed.data);

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error("[TASKS_POST]", error);

    return NextResponse.json(
      { message: "Failed to create task" },
      { status: 500 }
    );
  }
}