import toast from "react-hot-toast";

// Accept 'toastId' as an optional second parameter
export const handleFirebaseError = (code, toastId = null) => {
  let message = "An error occurred. Please try again.";

  if (code === "auth/invalid-email") {
    message = "Invalid email address. Please check your input.";
  } else if (code === "auth/user-disabled") {
    message = "This account has been disabled. Contact support.";
  } else if (code === "auth/invalid-credential") {
    message = "Invalid email or password.";
  } else if (code === "auth/wrong-password") {
    message = "Incorrect password.";
  } else if (code === "auth/email-already-in-use") {
    message = "Email already in use. Try logging in instead.";
  } else if (code === "auth/weak-password") {
    message = "Password is too weak. Use at least 6 characters.";
  } else if (code === "auth/network-request-failed") {
    message = "Network error. Check your connection.";
  } else if (code === "auth/too-many-requests") {
    message = "Too many attempts. Try again later.";
  }

  // LOGIC: If a toastId is provided, UPDATE it. Otherwise, create NEW.
  if (toastId) {
    toast.error(message, { id: toastId });
  } else {
    toast.error(message);
  }
};