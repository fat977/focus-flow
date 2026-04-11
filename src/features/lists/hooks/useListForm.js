import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useCreateList, useUpdateList } from "./useLists";
import { listSchema } from "../schems";

export function useListForm({ list, boardId, onSuccess }) {
  const { mutate: createList, isPending: isCreating } = useCreateList(boardId);
  const { mutate: updateList, isPending: isUpdating } = useUpdateList(boardId);
  const isEdit = Boolean(list);
  const form = useForm({
    resolver: zodResolver(listSchema),
    defaultValues: { title: list?.title || "" },
  });
  const onSubmit = (data) => {
    if (isEdit && list?.id) {
      updateList(
        { updates: { title: data.title }, listId: list.id },
        { onSuccess }
      );
    } else {
      createList(
        {
          title: data.title,
          boardId,
        },
        {
          onSuccess: () => {
            form.reset();
            onSuccess?.();
          },
        }
      );
    }
  };

  return {
    form,
    onSubmit,
    isEdit,
    isPending: isCreating || isUpdating,
  };
}
