var chips = [
  { key: "veg", label: "Veg" },
  { key: "nonveg", label: "Non-Veg" },
  { key: "egg", label: "Egg" },
];

// the All / Veg / Non-Veg / Egg buttons. The page keeps the selected list (types)
function VegChips({ types, setTypes }) {
  var toggleType = (key) => {
    if (types.includes(key)) {
      setTypes(types.filter((t) => t !== key));
    } else {
      setTypes([...types, key]);
    }
  };

  return (
    <div className="d-flex flex-wrap gap-2 mb-4">
      <button
        className={"chip" + (types.length === 0 ? " on" : "")}
        onClick={() => setTypes([])}
      >
        All
      </button>
      {chips.map((c) => (
        <button
          key={c.key}
          className={"chip" + (types.includes(c.key) ? " on" : "")}
          onClick={() => toggleType(c.key)}
        >
          {c.label}
        </button>
      ))}
    </div>
  );
}
export default VegChips;
