const inputs = document.querySelectorAll(".controls input");

function handleUpdate() {
  const suffix = this.dataset.size || "";
  document.documentElement.style.setProperty(
    `--${this.name}`,
    this.value + suffix
  );
}

inputs.forEach((input) => input.addEventListener("change", handleUpdate));
inputs.forEach((input) => input.addEventListener("mousemove", handleUpdate));

// document.documentElement: This selects the <html> element, which is the root element of the document.
