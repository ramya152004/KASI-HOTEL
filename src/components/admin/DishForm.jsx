import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import categories from "../../data/categories";
import { validateDish } from "../../utils/validators";

// shows an empty box when the value is not there (0 is a real value, so we test undefined)
function val(x) {
  return x === undefined ? "" : x;
}

// one entry for each simple input box. wide = the box takes the full width
var inputs = [
  { name: "productName", label: "Dish name", type: "text", wide: false },
  { name: "productPrice", label: "Price (₹)", type: "number", wide: false },
  {
    name: "productDescription",
    label: "Short description",
    type: "text",
    wide: true,
  },
  {
    name: "productImage",
    label: "Image link (https://... or /images/...)",
    type: "text",
    wide: true,
  },
  { name: "cuisine", label: "Cuisine", type: "text", wide: false },
  { name: "rating", label: "Rating (0 to 5)", type: "number", wide: false },
  {
    name: "prepTime",
    label: "Preparation time (minutes)",
    type: "number",
    wide: false,
  },
  { name: "calories", label: "Calories", type: "number", wide: false },
  {
    name: "ingredients",
    label: "Ingredients (separate with commas)",
    type: "text",
    wide: true,
  },
];

// The same form is used to add a dish and to update a dish.
// initial = the dish to start with, onSave = what to do with the finished dish
function DishForm({ title, buttonText, initial, onSave }) {
  var navigate = useNavigate();
  var Rlist = useSelector((state) => state.Restaurant.restaurantList);

  var [form, setForm] = useState({
    restaurantId: val(initial.restaurantId),
    productName: val(initial.productName),
    productPrice: val(initial.productPrice),
    productDescription: val(initial.productDescription),
    productImage: val(initial.productImage),
    cuisine: val(initial.cuisine),
    rating: val(initial.rating),
    prepTime: val(initial.prepTime),
    calories: val(initial.calories),
    ingredients: initial.ingredients ? initial.ingredients.join(", ") : "",
    foodType: initial.foodType || "veg",
    categories: initial.categories || [],
  });
  var [errors, setErrors] = useState({});

  // the name of the input is the key to change in the form
  var handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // tick or untick a category
  var toggleCategory = (name) => {
    if (form.categories.includes(name)) {
      setForm({
        ...form,
        categories: form.categories.filter((c) => c !== name),
      });
    } else {
      setForm({ ...form, categories: [...form.categories, name] });
    }
  };

  var handleSubmit = (e) => {
    e.preventDefault();
    var errs = validateDish(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    // build the dish object (like newobj in AddProducts)
    var newobj = {
      ...initial,
      restaurantId: Number(form.restaurantId),
      productName: form.productName.trim(),
      productDescription: form.productDescription.trim(),
      productPrice: Number(form.productPrice),
      productImage: form.productImage.trim(),
      foodType: form.foodType,
      ingredients: form.ingredients
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s !== ""),
      cuisine: form.cuisine.trim(),
      prepTime: Number(form.prepTime),
      calories: Number(form.calories),
      rating: Number(form.rating),
      categories: form.categories,
    };
    onSave(newobj);
  };

  return (
    <div className="container py-4" style={{ maxWidth: "820px" }}>
      <h3 className="fw-bold mb-4">{title}</h3>

      <form className="summary" onSubmit={handleSubmit} noValidate>
        <div className="row g-3">
          <div className="col-md-6">
            <label htmlFor="restaurantId" className="form-label">
              Restaurant
            </label>
            <select
              id="restaurantId"
              name="restaurantId"
              className={
                "form-select" + (errors.restaurantId ? " is-invalid" : "")
              }
              value={form.restaurantId}
              onChange={handleChange}
            >
              <option value="">Choose a restaurant</option>
              {Rlist.map((r) => (
                <option key={r.restaurantId} value={r.restaurantId}>
                  {r.name}
                </option>
              ))}
            </select>
            {errors.restaurantId && (
              <div className="text-danger small">{errors.restaurantId}</div>
            )}
          </div>

          <div className="col-md-6">
            <label htmlFor="foodType" className="form-label">
              Food type
            </label>
            <select
              id="foodType"
              name="foodType"
              className="form-select"
              value={form.foodType}
              onChange={handleChange}
            >
              <option value="veg">Veg</option>
              <option value="egg">Egg</option>
              <option value="nonveg">Non-Veg</option>
            </select>
          </div>

          {inputs.map((f) => (
            <div className={f.wide ? "col-12" : "col-md-6"} key={f.name}>
              <label htmlFor={f.name} className="form-label">
                {f.label}
              </label>
              <input
                id={f.name}
                name={f.name}
                type={f.type}
                step={f.name === "rating" ? "0.1" : undefined}
                className={
                  "form-control" + (errors[f.name] ? " is-invalid" : "")
                }
                value={form[f.name]}
                onChange={handleChange}
              />
              {errors[f.name] && (
                <div className="text-danger small">{errors[f.name]}</div>
              )}
            </div>
          ))}

          <div className="col-12">
            <label className="form-label d-block">Categories</label>
            <div className="d-flex flex-wrap gap-3">
              {categories.map((c) => (
                <div className="form-check" key={c.name}>
                  <input
                    id={"cat-" + c.name}
                    type="checkbox"
                    className="form-check-input"
                    checked={form.categories.includes(c.name)}
                    onChange={() => toggleCategory(c.name)}
                  />
                  <label htmlFor={"cat-" + c.name} className="form-check-label">
                    {c.name}
                  </label>
                </div>
              ))}
            </div>
            {errors.categories && (
              <div className="text-danger small">{errors.categories}</div>
            )}
          </div>
        </div>

        <div className="d-flex gap-2 mt-4">
          <button className="btn btn-brand px-4" type="submit">
            {buttonText}
          </button>
          <button
            className="btn btn-light border px-4"
            type="button"
            onClick={() => navigate("/admin")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
export default DishForm;
