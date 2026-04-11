import { ensureProfileExists } from "../features/auth/api/update.api";
import { clearUser, setUser } from "../features/auth/authSlice";
import { supabase } from "./supabaseClient";

export function initAuthListener(store) {
  supabase.auth.onAuthStateChange((event, session) => {
    if (session?.user) {
      const user = session.user;

      store.dispatch(
        setUser({
          uid: user.id,
          email: user.email,
        }),
      );
      ensureProfileExists(user);
    } else {
      store.dispatch(clearUser());
    }
  });
}
