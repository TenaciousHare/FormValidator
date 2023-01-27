// @ts-nocheck
// Import our custom CSS
import "../scss/styles.scss";

// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";

class Validator {
  constructor(form) {
    this.form = form;
    this.fields = form.querySelectorAll("[required]");
    this.errors = [];
    this.errorsList = this.form.querySelector(".alert ol");

    if (!this.fields.length) return;

    this.form.onsubmit = function (e) {
      e.preventDefault();

      let formValid = this.validate();

      if (formValid) {
        this.form.submit();
      } else {
        return false;
      }
    }.bind(this);
  }

  validate() {
    this.clearErrors();

    this.fields.forEach((field) => this.validateField(field));

    if (!this.errors.length) {
      return true;
    } else {
      this.showErrors();
      return false;
    }
  }

  validateField(field) {
    let fieldValid = field.validity.valid;

    if (fieldValid) {
      this.markAsValid(field);
    } else {
      this.errors.push(field.dataset.errorMessage);
      this.markAsInvalid(field);
    }
  }

  markAsValid(field) {
    field.classList.remove("is-invalid");
    field.classList.add("is-valid");
  }
  markAsInvalid(field) {
    field.classList.add("is-invalid");
    field.classList.remove("is-valid");
  }

  showErrors() {
    let errorsListElements = document.createDocumentFragment();

    this.errors.forEach((error) => {
      let liEl = document.createElement("li");
      liEl.textContent = error;
      errorsListElements.appendChild(liEl);
    });

    this.errorsList.appendChild(errorsListElements);
    this.errorsList.parentNode.style.display = "block";
  }

  clearErrors() {
    this.errors.length = 0;
    this.errorsList.parentNode.style.display = "none";
    this.errorsList.innerHTML = "";
  }
}

const form = document.querySelector("#form");
const validator1 = new Validator(form);
