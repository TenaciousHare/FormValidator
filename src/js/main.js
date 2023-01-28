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
        const data = new FormData(document.forms[0]);
        this.submitData(data);
        this.form.reset();
        this.fields.forEach((field) => this.clearValidity(field));
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
    const fieldValid = field.validity.valid;
    const password = this.form.querySelector("#password").value;
    const confirm = this.form.querySelector("#confirm").value;
    let passwordMatch = true;

    if (password !== confirm) {
      passwordMatch = false;
    }

    if (field.name === "confirm" && fieldValid && passwordMatch) {
      this.markAsValid(field);
    } else if (fieldValid) {
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

  clearValidity(field) {
    field.classList.remove("is-valid");
    field.classList.remove("is-invalid");
  }

  showErrors() {
    $(".toast-body").text("Try again!");
    $(".toast").removeClass("bg-success bg-danger");
    $(".toast").addClass("bg-primary");
    $(".toast").toast("show");
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

  submitData(data) {
    fetch("http://localhost:3000/form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          return response.text();
        }
        throw `Status ${response.status}: Failed to send request!`;
      })
      .then((responseText) => {
        $(".toast-body").text(responseText);
        $(".toast").removeClass("bg-primary bg-danger");
        $(".toast").addClass("bg-success");
        $(".toast").toast("show");
      })
      .catch((err) => {
        $(".toast-body").text(`${err}`);
        $(".toast").removeClass("bg-primary bg-success");
        $(".toast").addClass("bg-danger");
        $(".toast").toast("show");
      });
  }
}

const form = document.querySelector("#form");
const validator1 = new Validator(form);
