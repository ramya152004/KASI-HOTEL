// shown when a dish image fails to load (no broken-image icon)
export var noImage =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect width="100%" height="100%" fill="#f1f3f5"/><text x="50%" y="50%" fill="#868e96" font-family="sans-serif" font-size="22" text-anchor="middle">No image</text></svg>',
  );

export var fixImage = (e) => {
  e.currentTarget.src = noImage;
};
