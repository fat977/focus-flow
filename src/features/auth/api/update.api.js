// ============================================================
// Update Profile Name API
// ============================================================

import { supabase } from "../../../services/supabaseClient";

export async function updateProfileName(userId, newName) {
  if (!userId || userId === "undefined") {
    console.error("خطأ: userId غير موجود أو غير معرف");
    return null;
  }

  try {
    const { data, error } = await supabase
      .from("profiles")
      .update({ fullName: newName }) 
      .eq("id", userId)
      .select() 
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Supabase update name Error:", error.message);
    throw error;
  }
}
export async function uploadAvatar(userId, file) {
  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${userId}-${Math.random()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from("avatars").getPublicUrl(fileName);

    const publicUrl = data.publicUrl;

    const { error: updateError } = await supabase
      .from("profiles")
      .update({ avatar: publicUrl })
      .eq("id", userId);

    if (updateError) throw updateError;

    return publicUrl;
  } catch (error) {
    console.error("Supabase upload avatar Error:", error.message);
    throw error;
  }
}

export async function getProfile(userId) {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, fullName, avatar")
    .eq("id", userId)
    .single();

  if (error) throw error;
  return data;
}

// api/profile.api.js

export async function ensureProfileExists(user) {
  const updates = {
    id: user.id,
  };

  const metadata = user.user_metadata || {};

  if (metadata.fullName || metadata.name) {
    updates.fullName = metadata.fullName || metadata.name;
  }

  if (metadata.avatar || metadata.picture) {
    updates.avatar = metadata.avatar || metadata.picture;
  }

  const { error } = await supabase.from("profiles").upsert(updates);

  if (error) throw error;
}
