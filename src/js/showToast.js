import { Toast } from "bootstrap";

export function showToast(message, success = true) {
  const toast = $(".toast");
  const toastBody = $(".toast-body");

  toastBody.text(message);

  if (success) {
    toast.removeClass("bg-primary bg-danger");
    toast.addClass("bg-success");
  } else {
    toast.removeClass("bg-primary bg-success");
    toast.addClass("bg-danger");
  }

  toast.toast("show");
}
