// one place for reading / writing localStorage (used by the slices and Store.jsx)

// read a value from localStorage. If nothing is saved, give back the fallback
export function load(key, fallback) {
  try {
    var saved = JSON.parse(localStorage.getItem(key));
    if (saved == null) {
      return fallback;
    }
    return saved;
  } catch {
    return fallback;
  }
}

// write a value into localStorage
export function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage full or blocked, the site still works without saving
  }
}
