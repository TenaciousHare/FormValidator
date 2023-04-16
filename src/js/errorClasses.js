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
