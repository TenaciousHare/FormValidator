import "./scss/styles.scss";
//@ts-ignore
import * as bootstrap from "bootstrap";
import { Validator } from "./ts/Validator";

const form: HTMLFormElement | null = document.querySelector("#form");
if (form) {
  // @ts-ignore
  const validator = new Validator(form);
}
