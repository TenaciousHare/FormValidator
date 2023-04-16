import { showToast } from "./showToast";

export function submitData(data) {
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
      showToast(responseText);
    })
    .catch((err) => {
      showToast(`${err}`, false);
    });
}
