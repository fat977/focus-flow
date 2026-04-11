import {Button} from "@/components/ui/Buttons";
import Input from "@/components/ui/Input";
import { useBoardForm } from "../hooks/useBoardForm";

function BoardForm({ board, onSuccess }) {
  const {
    form: {
      register,
      handleSubmit,
      formState: { errors },
    },
    onSubmit,
    isEdit,
    isPending,
  } = useBoardForm({ board, onSuccess });
  return (
    <div className="max-w-md mx-auto mt-8 p-4">
      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <Input
          type="text"
          placeholder="Project name"
          name="title"
          register={register}
          error={errors.title?.message}
        />
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
            ? "Update Project"
            : "Add Project"}
        </Button>
      </form>
    </div>
  );
}

export default BoardForm;
