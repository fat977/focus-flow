import { supabase } from "../../../services/supabaseClient";

// ============================================================
// Create List  API
// ============================================================
export async function createList({ boardId, title, order = 0, type = "todo" }) {
  try {
    const { data: newList, error: listError } = await supabase
      .from("lists")
      .insert([
        {
          title,
          boardId: boardId, 
          order,
          type,
        },
      ])
      .select() 
      .single();

    if (listError) throw listError;

    return newList;
  } catch (error) {
    console.error("createList error:", error.message);
    throw new Error(error.message || "Failed to create list");
  }
}

// ============================================================
// Update List API (Title or Order or Type)
// ============================================================
export async function updateList({ listId, updates }) {
  try {
    const { data, error } = await supabase
      .from("lists")
      .update(updates) 
      .eq("id", listId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("updateList error:", error.message);
    throw new Error(error.message || "Failed to update list");
  }
}
// ============================================================
// Delete List API
// ============================================================
export async function deleteList(listId) {
  try {
    const { error } = await supabase.from("lists").delete().eq("id", listId);

    if (error) throw error;
    return { id: listId };
  } catch (error) {
    console.error("deleteList error:", error.message);
    throw new Error("Failed to delete list");
  }
}

// ============================================================
// Reorder Lists API 
// ============================================================
export async function updateListsOrder(updatedLists) {
  const { data, error } = await supabase
    .from("lists")
    .upsert(updatedLists, { onConflict: "id" }); 

  if (error) throw error;
  return data;
}