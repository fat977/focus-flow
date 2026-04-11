import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { taskSchema } from "../schema";
import { useCreateTask, useUpdateTask } from "./useTasks";
import { format } from "date-fns";

export function useTaskForm({ task, boardId,listId, onSuccess }) {
  const { mutate: createTask, isPending: isCreating } = useCreateTask(boardId,listId);
  const { mutate: updateTask, isPending: isUpdating } = useUpdateTask(boardId);
  const isEdit = Boolean(task);
  const form = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: task?.title || "",
      description: task?.description || "",
      priority: task?.priority || "medium",
      dueDate: task?.dueDate
              ? format(new Date(task.dueDate), "yyyy-MM-dd")
              : "",
    },
  });
  const onSubmit = (data) => {
    
    if (isEdit && task?.id) {
      updateTask(
        { updatedData: data, taskId: task.id },
        {
          onSuccess: () => {
            onSuccess?.();
          },
        }
      );
    } else {
      createTask(data, {
        onSuccess: () => {
          form.reset();
          onSuccess?.();
        },
      });
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isEdit,
    isPending: isCreating || isUpdating,
    errors: form.formState.errors,
  };
}
