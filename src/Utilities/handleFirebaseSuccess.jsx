import toast from "react-hot-toast";

export const handleFirebaseSuccess = (type, toastId = null) => {
  let message = "Operation completed successfully! ✅";

  // Determine the message based on the type
  if (type === "login") {
    message = "Login successful! 👋";
  } 
  else if (type === "google-login") {
    message = "Logged in with Google! 🌐";
  } 
  else if (type === "logout") {
    message = "You have logged out successfully.";
  } 
  else if (type === "password-reset") {
    message = "Password reset email sent! Check your inbox. 📩";
  } 
  else if (type === "email-update") {
    message = "Email updated successfully! ✅";
  } 
  else if (type === "profile-update") {
    message = "Profile updated successfully! ✨";
  } 
  else if (type === "delete-account") {
    message = "Account deleted successfully.";
  }

  // Trigger the toast
  if (toastId) {
    // If an ID is passed (e.g., from a loading state), update that existing toast
    toast.success(message, { id: toastId });
  } else {
    // Otherwise, create a fresh new toast
    toast.success(message);
  }
};