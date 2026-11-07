// Every function gives back an object with one message for each wrong field.
// An empty object {} means everything is fine.

var emailpattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function checkEmail(email) {
  if (email.trim() === "") return "Enter Email Address";
  if (!emailpattern.test(email.trim())) return "Enter Valid Email";
  return "";
}

function checkPassword(password) {
  if (password === "") return "Enter Password";
  if (password.length < 8) return "Password is minimum 8 characters";
  return "";
}

// 10 digits, and the first digit is 6, 7, 8 or 9
function checkPhone(phone) {
  var p = phone.trim();
  if (p === "") return "Enter Mobile Number";
  var onlyDigits = p.split("").every((ch) => "0123456789".includes(ch));
  if (p.length !== 10 || !onlyDigits || !"6789".includes(p[0])) {
    return "Enter a valid 10 digit mobile number";
  }
  return "";
}

export function validateLogin(form) {
  var errors = {};
  var emailError = checkEmail(form.email);
  var passwordError = checkPassword(form.password);
  if (emailError) errors.email = emailError;
  if (passwordError) errors.password = passwordError;
  return errors;
}

export function validateRegister(form) {
  var errors = {};
  if (form.name.trim().length < 2) errors.name = "Enter your name";

  var emailError = checkEmail(form.email);
  if (emailError) errors.email = emailError;

  var phoneError = checkPhone(form.phone);
  if (phoneError) errors.phone = phoneError;

  var passwordError = checkPassword(form.password);
  if (passwordError) errors.password = passwordError;

  if (form.confirm !== form.password) errors.confirm = "Passwords do not match";
  return errors;
}

// true if the value is a number and not smaller than min
function checkNumber(value, min) {
  if (String(value).trim() === "" || isNaN(value)) return false;
  return Number(value) >= min;
}

// admin: the add dish / update dish form
export function validateDish(form) {
  var errors = {};
  if (form.restaurantId === "") errors.restaurantId = "Choose a restaurant";
  if (form.productName.trim().length < 2)
    errors.productName = "Enter the dish name";
  if (form.productDescription.trim() === "")
    errors.productDescription = "Enter a short description";
  if (!checkNumber(form.productPrice, 1))
    errors.productPrice = "Enter a price of 1 or more";
  if (form.productImage.trim() === "")
    errors.productImage = "Enter an image link";
  if (form.cuisine.trim() === "") errors.cuisine = "Enter the cuisine";
  if (!checkNumber(form.prepTime, 0)) errors.prepTime = "Enter the minutes";
  if (!checkNumber(form.calories, 0)) errors.calories = "Enter the calories";
  if (!checkNumber(form.rating, 0) || Number(form.rating) > 5)
    errors.rating = "Rating is from 0 to 5";
  var items = form.ingredients.split(",").filter((s) => s.trim() !== "");
  if (items.length === 0) errors.ingredients = "Enter at least one ingredient";
  if (form.categories.length === 0)
    errors.categories = "Choose at least one category";
  return errors;
}
