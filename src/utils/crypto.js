// Turns a password into a long text (SHA-256 hash), so the real password is never saved.
// It is async, so the callers use await.
// The email is added in front, so two users with the same password get different hashes.
export async function hashPassword(email, password) {
  if (!window.crypto || !window.crypto.subtle) {
    throw new Error("Open the site on localhost or https to login");
  }
  var text = email.toLowerCase() + ":" + password;
  var bytes = new TextEncoder().encode(text);
  var buffer = await window.crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
