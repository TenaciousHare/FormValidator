// @ts-nocheck
// Import our custom CSS
import "../scss/styles.scss";

import { Validator } from "./Validator";

const form = document.querySelector("#form");
const validator = new Validator(form);
