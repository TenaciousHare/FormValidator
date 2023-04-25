import "./scss/styles.scss";
//@ts-ignore
import * as bootstrap from "bootstrap";
//@ts-ignore
import { Validator } from "./ts/Validator";
import { Form } from "./ts/types";

const form: Form | null = document.querySelector("#form");
if (form) {
  // @ts-ignore
  const validator = new Validator(form);
}
