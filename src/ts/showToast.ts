// @ts-ignore
import { Toast } from "bootstrap";

export function showToast(message: string, success = true): void {
  const toastEl = $(".toast");
  const toast = new Toast(toastEl[0]);
  const toastBody = $(".toast-body");

  toastBody.text(message);

  if (success) {
    toastEl.removeClass("bg-primary bg-danger");
    toastEl.addClass("bg-success");
  } else {
    toastEl.removeClass("bg-primary bg-success");
    toastEl.addClass("bg-danger");
  }

  toast.show();
}
