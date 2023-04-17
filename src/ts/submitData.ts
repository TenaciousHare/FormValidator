import { showToast } from "./showToast";

export function submitData(data: FormData): void {
  fetch("https://przeprogramowani.pl/projekt-walidacja", {
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
      throw new Error(`Status ${response.status}: Failed to send request!`);
    })
    .then((responseText) => {
      showToast(responseText);
    })
    .catch((err: Error) => {
      showToast(`${err}`, false);
    });
}
