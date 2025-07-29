const STORAGE_KEY = "feedback-form-state";
let formData = {
  email: "",
  message: "",
};

const form = document.querySelector(".feedback-form");
const emailInput = form.elements.email;
const messageTextarea = form.elements.message;

loadFormData();

form.addEventListener("input", (event) => {
  const field = event.target;
  const name = field.name;
  const value = field.value.trimStart();

  if (!["email", "message"].includes(name)) return;

  formData[name] = value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));

  if (value.trim() !== "") {
      field.classList.add("valid");

} else {
  field.classList.remove("valid");
}
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const trimmedEmail = emailInput.value.trim();
  const trimmedMessage = messageTextarea.value.trim();

  if (!trimmedEmail || !trimmedMessage) {
    alert("Fill please all fields");
    return;
  }

  console.log("Submitted data:", formData);

  form.reset();
  localStorage.removeItem(STORAGE_KEY);
  formData = { email: "", message: "" };
});

function loadFormData() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return;

  try {
    const parsed = JSON.parse(saved);
    formData = parsed;

    if (parsed.email) emailInput.value = parsed.email;
    if (parsed.message) messageTextarea.value = parsed.message;
  } catch (error) {
    console.error("Failed to parse saved form data:", error);
  }
}
