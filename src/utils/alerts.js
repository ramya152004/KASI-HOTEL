import Swal from "sweetalert2";

// every popup slides up / down (animate.css)
export var Alert = Swal.mixin({
  confirmButtonColor: "#d9381e",
  showClass: {
    popup: "animate__animated animate__fadeInUp animate__faster",
  },
  hideClass: {
    popup: "animate__animated animate__fadeOutDown animate__faster",
  },
});

// small message in the corner
export var Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 1800,
  timerProgressBar: true,
});

// dish data comes from an API, so never put it into html without escaping
function esc(text) {
  return String(text).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
}

// 1. image modal
export function showImage(Pro) {
  return Alert.fire({
    title: Pro.productName,
    imageUrl: Pro.productImage,
    imageHeight: 280,
    imageAlt: Pro.productName,
    showCloseButton: true,
    showConfirmButton: false,
  });
}

// 2. html modal (draggable) with close button + confirm / cancel
export function showDetails(Pro) {
  var items = Pro.ingredients
    .slice(0, 6)
    .map((i) => "<li>" + esc(i) + "</li>")
    .join("");
  return Alert.fire({
    title: "<strong>" + esc(Pro.productName) + "</strong>",
    icon: "info",
    html:
      "<p>₹<b>" +
      Pro.productPrice +
      "</b> &middot; " +
      esc(Pro.cuisine) +
      " &middot; " +
      Pro.prepTime +
      " min &middot; " +
      Pro.calories +
      " kcal</p>" +
      "<p class='mb-1'><b>Ingredients</b></p>" +
      "<ul style='text-align:left'>" +
      items +
      "</ul>",
    showCloseButton: true,
    showCancelButton: true,
    focusConfirm: false,
    draggable: true,
    confirmButtonText: "<i class='fa-solid fa-cart-plus'></i> Add to cart",
    confirmButtonAriaLabel: "Add to cart",
    cancelButtonText: "Close",
  });
}

// 3. dialog with three buttons (after login)
export function askSaveLogin() {
  return Alert.fire({
    title: "Save your login on this device?",
    text: "Only your email is saved, never your password.",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Save",
    denyButtonText: "Don't save",
  });
}

// 4. confirm dialog, the code after .then() decides what Confirm / Cancel do
export function confirmRemove(name) {
  return Alert.fire({
    title: "Are you sure?",
    text: name + " will be removed from your cart.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#6c757d",
    confirmButtonText: "Yes, remove it!",
  });
}

export function confirmOrder(total) {
  return Alert.fire({
    title: "Place your order?",
    text: "Total to pay: ₹" + total,
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Place order",
  });
}

export function confirmLogout() {
  return Alert.fire({
    title: "Logout?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Yes, logout",
  });
}

// dialog with three buttons: Login / Create account / Cancel.
// "from" is the page to come back to after the login (for example "/cart")
export function askLoginOrSignup(navigate, from) {
  Alert.fire({
    title: "Login to continue",
    text: "Please login or create an account to place your order.",
    icon: "info",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Login",
    denyButtonText: "Create account",
  }).then((result) => {
    var state = { from: from, message: "Please login to continue ordering" };
    if (result.isConfirmed) {
      navigate("/login", { state: state });
    } else if (result.isDenied) {
      navigate("/register", { state: state });
    }
  });
}

// admin: confirm before a dish is deleted
export function confirmDelete(name) {
  return Alert.fire({
    title: "Delete this dish?",
    text: name + " will be removed from the menu.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#6c757d",
    confirmButtonText: "Yes, delete it!",
  });
}

// admin: confirm before all changes are thrown away
export function confirmReset() {
  return Alert.fire({
    title: "Reset the menu?",
    text: "Added, edited and deleted dishes are lost. menu.json is used again.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    confirmButtonText: "Yes, reset",
  });
}
