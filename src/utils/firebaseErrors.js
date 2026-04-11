export const formatFirebaseError = (error) => {
  if (!error) return null;

  switch (error.code) {
    // ============================================================
    // Social Login errors
    // ============================================================
    case "auth/popup-closed-by-user":
      return "User closed the popup before completing the sign-in";

    case "auth/cancelled-popup-request":
      return "Canceled popup request. Please try again.";

    case "auth/account-exists-with-different-credential":
      return "An account already exists with the same email but different sign-in credentials.";

    case "auth/popup-blocked":
      return "Popup blocked by the browser. Please allow popups.";

    // ============================================================
    //  Login errors
    // ============================================================
    case "auth/invalid-credential":
    case "auth/user-not-found":
    case "auth/wrong-password":
      return "Invalid email or password. Please try again.";

    // ============================================================
    // Register errors
    // ============================================================
    case "auth/email-already-in-use":
      return "The email address is already in use by another account.";

    case "auth/invalid-email":
      return "The email address is not valid.";

    // ============================================================
    // Public errors
    // ============================================================

    case "auth/too-many-requests":
      return "Too many requests. Please try again later.";

    case "auth/network-request-failed":
      return "Failed to connect to the network. Please check your internet connection.";

    default:
      // for debugging purposes
      console.error("Firebase Auth Error Code:", error.code);
      return "An unexpected error occurred. Please try again.";
  }
};
