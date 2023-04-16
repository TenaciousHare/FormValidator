import { showToast } from "./showToast";

export function addErrorClasses(errors, errorsList) {
  showToast("Try again!", false);
  let errorsListElements = document.createDocumentFragment();

  errors.forEach((error) => {
    let liEl = document.createElement("li");
    liEl.textContent = error;
    errorsListElements.appendChild(liEl);
  });

  errorsList.appendChild(errorsListElements);
  errorsList.parentNode.style.display = "block";
}

export function removeErrorClasses(errors, errorsList) {
  errors.length = 0;
  errorsList.parentNode.style.display = "none";
  errorsList.innerHTML = "";
}

export function markField(field, option) {
  switch (option) {
    case "valid":
      field.classList.remove("is-invalid");
      field.classList.add("is-valid");
      break;
    case "invalid":
      field.classList.add("is-invalid");
      field.classList.remove("is-valid");
      break;
    case "clear":
      field.classList.remove("is-valid");
      field.classList.remove("is-invalid");
      break;
  }
}
