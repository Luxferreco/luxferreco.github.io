const modal = document.querySelector(".entry-modal");
const openButton = document.querySelector("[data-open-modal]");
const modalContent = document.querySelector("[data-modal-content]");
const form = document.querySelector("[data-formspree-form]");

const openModal = () => {
  modal.hidden = false;
  document.body.style.overflow = "hidden";
  modal.querySelector("input")?.focus();
};

const closeModal = () => {
  modal.hidden = true;
  document.body.style.overflow = "";
  openButton?.focus();
};

openButton?.addEventListener("click", openModal);

modal?.addEventListener("click", (event) => {
  if (event.target.matches("[data-close-modal]")) {
    closeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modal.hidden) {
    closeModal();
  }
});

const showSuccess = () => {
  modalContent.innerHTML = `
    <div class="modal-success">
      <h2>You\u2019ve been seen.</h2>
      <p>
        Your request has been received.<br />
        The House will open in time.
      </p>
      <button type="button" data-close-modal>Close</button>
    </div>
  `;
};

form?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const action = form.getAttribute("action");
  const submitButton = form.querySelector("button");
  submitButton.disabled = true;

  try {
    if (action && action.includes("formspree.io")) {
      const response = await fetch(action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        throw new Error("Form submission failed.");
      }
    }

    showSuccess();
  } catch (error) {
    submitButton.disabled = false;
    submitButton.textContent = "Try Again";
  }
});
