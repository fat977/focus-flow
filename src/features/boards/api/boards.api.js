import { boardSchema } from "../schema";
import { supabase } from "../../../services/supabaseClient";

// ============================================================
// Create Board  API
// ============================================================
export async function createBoard(data) {
  const validation = boardSchema.safeParse(data);
  if (!validation.success) {
    throw new Error(validation.error.errors[0].message);
  }

  try {
    const { data: newBoard, error: boardError } = await supabase
      .from("boards")
      .insert([
        {
          ...validation.data,
        },
      ])
      .select() 
      .single();

    if (boardError) throw boardError;

    const boardId = newBoard.id;

    const defaultLists = [
      { title: "To Do", boardId: boardId, order: 0, type: "todo" },
      { title: "In Progress", boardId: boardId, order: 1, type: "in-progress" },
      { title: "Done", boardId: boardId, order: 2, type: "done" },
    ];

    const { error: listsError } = await supabase
      .from("lists")
      .insert(defaultLists);

    if (listsError) throw listsError;

    return newBoard;
  } catch (error) {
    console.error("createBoard error:", error.message);
    throw new Error(
      error.message || "Failed to create board and default lists"
    );
  }
}

// ============================================================
// Get All Boards API
// ============================================================
export async function getBoards(userId) {
  if (!userId) throw new Error("User ID is required");

  try {
    const { data, error } = await supabase
      .from("boards") 
      .select(
        `
      *,
      lists (
        *,
        tasks (*) 
      )
    `
      )
      .eq("userId", userId)
      .order("created_at", { ascending: false }); 

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("getBoards error:", error.message);
    throw new Error("Failed to fetch boards");
  }
}

// ============================================================
// Get Board Details API
// ============================================================
export const getBoard = async (boardId) => {
  const { data, error } = await supabase
    .from("boards")
    .select(
      `
      *,
      lists (
        *,
        tasks (*) 
      )
    `
    )
    .eq("id", boardId)
    .order("order", { referencedTable: "lists", ascending: true }) 
    .order("orderIndex", { referencedTable: "lists.tasks", ascending: true }) 
    .single();

  if (error) throw error;
  return data;
};

// ============================================================
// Update Board API
// ============================================================
export async function updateBoard({ boardId, updatedData }) {
  if (!boardId) throw new Error("Board ID is required");

  const validation = boardSchema.safeParse(updatedData);
  if (!validation.success) {
    throw new Error(validation.error.errors[0].message);
  }

  try {
    const { data, error } = await supabase
      .from("boards")
      .update(updatedData)
      .eq("id", boardId) 
      .select() 
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("updateBoard error:", error.message);
    throw new Error(error.message || "Failed to update board");
  }
}

// ============================================================
// Delete Board API
// ============================================================
export async function deleteBoard(boardId) {
  if (!boardId) throw new Error("Board ID is required");

  try {
    
    const { error } = await supabase.from("boards").delete().eq("id", boardId);

    if (error) throw error;

    return { id: boardId };
  } catch (error) {
    console.error("deleteBoard error:", error.message);
    throw new Error("Failed to delete board and its associated content");
  }
}
