import { supabase } from "../../../services/supabaseClient";

// ============================================================
// Register API
// ============================================================
export const registerApi = async ({ email, password, fullName }) => {
  try {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) throw authError;

    const user = authData?.user;

    if (user) {
      const { error: profileError } = await supabase
        .from("profiles")
        .insert([
          {
            id: user.id,
            fullName: fullName, 
          },
        ]);

      if (profileError) throw profileError;
    }

    return authData;
  } catch (error) {
    console.error("Signup Process Error:", error.message);
    throw error;
  }
};

// ============================================================
// Login API
// ============================================================

export const loginApi = async ({ email, password }) => {
  try {
    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (authError) throw authError;

    const user = authData.user;

    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
     .select('uid, fullName, avatar')
  .eq('uid', user.id)
      .single();

    if (profileError) {
      console.warn("Could not fetch profile name:", profileError.message);
    }

    return {
      id: user.id,
      email: user.email,
      fullName: profileData?.fullName || "User", 
    };
  } catch (error) {
    console.error("Supabase Login Error:", error.message);
    throw error;
  }
};


// ============================================================
// Social Login APIs with google and github
// ============================================================

export const loginWithProviderApi = async (providerName) => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: providerName, 
      options: {
        redirectTo: window.location.origin,
      },
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error during ${providerName} login:`, error.message);
    throw error;
  }
};

// ============================================================
// Logout API
// ============================================================

export const logoutApi = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};


export const deleteAccountApi = async (userId) => {
  if (!userId) throw new Error("User ID is required");

  const { error: dbError } = await supabase
    .from("profiles")
    .delete()
    .eq("id", userId);

  if (dbError) {
    console.error("Database Delete Error:", dbError.message);
    throw dbError;
  }

  const { error: authError } = await supabase.auth.signOut();
  if (authError) throw authError;

  return true;
};