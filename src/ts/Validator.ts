import { addErrorClasses, removeErrorClasses, markField } from "./errorClasses";
import { submitData } from "./submitData";

export class Validator {
  private form: HTMLFormElement;
  private fields: NodeListOf<HTMLInputElement>;
  private errors: string[];
  private errorsList: HTMLOListElement;

  constructor(form: HTMLFormElement) {
    this.form = form;
    this.fields = form.querySelectorAll("[required]");
    this.errors = [];
    this.errorsList = this.form.querySelector(".alert ol") as HTMLOListElement;
    if (!this.fields.length) return;

    this.form.onsubmit = (event: Event): boolean | void => {
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

  private validate(): boolean {
    removeErrorClasses(this.errors, this.errorsList);
    const password = (this.form.querySelector("#password") as HTMLInputElement)
      .value;
    const confirm = (this.form.querySelector("#confirm") as HTMLInputElement)
      .value;
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

  private validateField(field: HTMLInputElement, passwordMatch: boolean): void {
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
