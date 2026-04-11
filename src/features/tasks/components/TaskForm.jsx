import {Button} from "@/components/ui/Buttons";
import Input from "@/components/ui/Input";
import { useTaskForm } from "../hooks/useTaskForm";

function TaskForm({ boardId,listId, task, onSuccess }) {
  const {
    form: { register },
    onSubmit,
    isEdit,
    isPending,
    errors,
  } = useTaskForm({ boardId,listId, task, onSuccess });
  return (
    <div className="max-w-md mx-auto mt-8 p-4">
      {/* Form */}
      <form onSubmit={onSubmit} className="flex flex-col gap-2">
        <Input
          type="text"
          placeholder="Task Title"
          name="title"
          register={register}
          error={errors.title?.message}
        />
        <textarea
          {...register("description")}
          placeholder="Description (optional)"
          rows={3}
          className="px-4 py-2 mb-4 border rounded-lg border-(--grey-300) focus:border-(--brand-500) focus:ring-4 focus:ring-(--brand-500)/10 border-(grey-300) focus:outline-(--brand-500) bg-(--grey-0) text-(--grey-900) placeholder:text-(--grey-400)"
        />

        <select
          {...register("priority")}
          className="px-4 py-2 mb-4 border rounded-lg border-(--grey-300) focus:border-(--brand-500) focus:ring-4 focus:ring-(--brand-500)/10 border-(grey-300) focus:outline-(--brand-500) bg-(--grey-0) text-(--grey-900)"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        {errors.priority && (
          <span className="text-(--danger-600) text-xs">
            {errors.priority.message}
          </span>
        )}
        <Input
          type="date"
          name="dueDate"
          register={register}
          error={errors.dueDate?.message}
        />
        <Button type="submit" className="justify-center " isPending={isPending}>
          {isPending
            ? isEdit
              ? "Updating..."
              : "Creating..."
            : isEdit
              ? "Update Task"
              : "Add Task"}
        </Button>
      </form>
    </div>
  );
}

export default TaskForm;
