import { showToast } from "./showToast";

export function addErrorClasses(
  errors: string[],
  errorsList: HTMLOListElement
): void {
  showToast("Try again!", false);
  let errorsListElements = document.createDocumentFragment();

  errors.forEach((error) => {
    let liEl = document.createElement("li");
    liEl.textContent = error;
    errorsListElements.appendChild(liEl);
  });

  errorsList.appendChild(errorsListElements);
  (errorsList.parentNode! as HTMLElement).style.display = "block";
}

export function removeErrorClasses(
  errors: string[],
  errorsList: HTMLOListElement
) {
  errors.length = 0;
  (errorsList.parentNode! as HTMLElement).style.display = "none";
  errorsList.innerHTML = "";
}

type Option = "valid" | "invalid" | "clear";
export function markField(field: HTMLInputElement, option: Option): void {
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
