import {Button} from "@/components/ui/Buttons";
import Input from "@/components/ui/Input";
import { useListForm } from "../hooks/useListForm";

function ListForm({ list, boardId, onSuccess }) {
  const {
    form: {
      register,
      handleSubmit,
      formState: { errors },
    },
    onSubmit,
    isEdit,
    isPending,
  } = useListForm({ boardId, list, onSuccess });

  return (
    <div className="max-w-md mx-auto mt-8 p-4">
      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <Input
          type="text"
          placeholder="List name"
          name="title"
          register={register}
          error={errors.title?.message}
        />

        <Button type="submit" className="justify-center " isPending={isPending}>
          {isPending
            ? isEdit
              ? "Updating..."
              : "Creating..."
            : isEdit
            ? "Update List"
            : "Add List"}
        </Button>
      </form>
    </div>
  );
}

export default ListForm;
