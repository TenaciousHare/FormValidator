import { showToast } from "./showToast";
import { OlList, Input, Element } from "./types";

export function addErrorClasses(errors: string[], errorsList: OlList): void {
  showToast("Try again!", false);
  let errorsListElements = document.createDocumentFragment();

  errors.forEach((error) => {
    let liEl = document.createElement("li");
    liEl.textContent = error;
    errorsListElements.appendChild(liEl);
  });

  errorsList.appendChild(errorsListElements);
  (errorsList.parentNode! as Element).style.display = "block";
}

export function removeErrorClasses(errors: string[], errorsList: OlList) {
  errors.length = 0;
  (errorsList.parentNode! as Element).style.display = "none";
  errorsList.innerHTML = "";
}

type Option = "valid" | "invalid" | "clear";
export function markField(field: Input, option: Option): void {
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
