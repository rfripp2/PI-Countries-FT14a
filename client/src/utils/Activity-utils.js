export function validate(input) {
  let errors = {};
  if (!input.name || input.name === "" || typeof input.name === "number") {
    errors.name = "Name is required and must be characters";
  } else if (
    !input.dificulty ||
    input.dificulty === "" ||
    input.dificulty > 5 ||
    input.dificulty < 1
  ) {
    errors.dificulty =
      "Dificulty is required and must be a number between 1 and 5";
  } else if (!input.duration || input.duration === "") {
    errors.duration = "Duration is required and must be a number";
  } else if (!input.season || input.season === "") {
    errors.season = "Season is required";
  }
  return errors;
}
