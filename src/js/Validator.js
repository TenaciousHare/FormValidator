import { addErrorClasses, removeErrorClasses, markField } from "./errorClasses";
import { submitData } from "./submitData";

export class Validator {
  constructor(form) {
    this.form = form;
    this.fields = form.querySelectorAll("[required]");
    this.errors = [];
    this.errorsList = this.form.querySelector(".alert ol");
    if (!this.fields.length) return;
    removeErrorClasses(this.errors, this.errorsList);

    this.form.onsubmit = (e) => {
      e.preventDefault();

      let formValid = this.validate();

      if (formValid) {
        const data = new FormData(this.form);
        submitData(data);
        this.form.reset();
        this.fields.forEach((field) => markField(field, "clear"));
      } else {
        return false;
      }
    };
  }

  validate() {
    const password = this.form.querySelector("#password").value;
    const confirm = this.form.querySelector("#confirm").value;
    let passwordMatch = false;

    if (password === confirm) {
      passwordMatch = true;
    }

    this.fields.forEach((field) => this.validateField(field, passwordMatch));

    if (!this.errors.length) {
      return true;
    } else {
      addErrorClasses(this.errors, this.errorsList);
      return false;
    }
  }

  validateField(field, passwordMatch) {
    const fieldValid = field.validity.valid;

    if (
      (field.name === "confirm" && fieldValid && passwordMatch) ||
      (fieldValid && field.name !== "confirm")
    ) {
      markField(field, "valid");
    } else {
      this.errors.push(field.dataset.errorMessage);
      markField(field, "invalid");
    }
  }
}
