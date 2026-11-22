// Recursos de acessibilidade e navegação do site.
document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const fontButtons = document.querySelectorAll("[data-font]");
  const contrastButton = document.querySelector("[data-contrast]");
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#menu-principal");

  // Mantém a preferência de contraste entre as páginas durante a sessão.
  try {
    if (sessionStorage.getItem("altoContraste") === "true") {
      body.classList.add("high-contrast");
      if (contrastButton) contrastButton.setAttribute("aria-pressed", "true");
    }
  } catch (error) {
    // O site continua funcional mesmo se o navegador bloquear armazenamento.
  }

  if (contrastButton) {
    contrastButton.addEventListener("click", () => {
      const enabled = body.classList.toggle("high-contrast");
      contrastButton.setAttribute("aria-pressed", String(enabled));
      try { sessionStorage.setItem("altoContraste", String(enabled)); } catch (error) {}
    });
  }

  // A escala é limitada para preservar a leitura e a organização da página.
  let fontScale = 1;
  fontButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.dataset.font;
      if (action === "increase") fontScale = Math.min(1.3, fontScale + 0.1);
      if (action === "decrease") fontScale = Math.max(0.9, fontScale - 0.1);
      if (action === "reset") fontScale = 1;
      document.documentElement.style.setProperty("--font-scale", fontScale.toFixed(1));
    });
  });

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isOpen));
      nav.classList.toggle("is-open", !isOpen);
    });
  }
});
