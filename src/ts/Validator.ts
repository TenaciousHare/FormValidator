import { addErrorClasses, removeErrorClasses, markField } from "./errorClasses";
import { submitData } from "./submitData";
import { Input, Form, OlList, Boolean } from "./types";

export class Validator {
  private form: Form;
  private fields: NodeListOf<Input>;
  private errors: string[];
  private errorsList: OlList;

  constructor(form: Form) {
    this.form = form;
    this.fields = form.querySelectorAll("[required]");
    this.errors = [];
    this.errorsList = this.form.querySelector(".alert ol") as OlList;
    if (!this.fields.length) return;

    this.form.onsubmit = (event: Event): Boolean | void => {
      event.preventDefault();

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

  private validate(): Boolean {
    removeErrorClasses(this.errors, this.errorsList);
    const password = (this.form.querySelector("#password") as Input).value;
    const confirm = (this.form.querySelector("#confirm") as Input).value;
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

  private validateField(field: Input, passwordMatch: Boolean): void {
    const fieldValid = field.validity.valid;

    if (
      (field.name === "confirm" && fieldValid && passwordMatch) ||
      (fieldValid && field.name !== "confirm")
    ) {
      markField(field, "valid");
    } else {
      const errorMessage = field.dataset.errorMessage;
      if (errorMessage) {
        this.errors.push(errorMessage);
      }
      markField(field, "invalid");
    }
  }
}
