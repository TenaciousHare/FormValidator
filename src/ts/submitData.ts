import { showToast } from "./showToast";

export async function submitData(data: FormData): Promise<void> {
  try {
    const response = await fetch(
      "https://przeprogramowani.pl/projekt-walidacja",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (response.ok) {
      const responseText = await response.text();
      showToast(responseText);
    } else {
      throw new Error(`Status ${response.status}: Failed to send request!`);
    }
  } catch (err: any) {
    showToast(`${err}`, false);
  }
}
