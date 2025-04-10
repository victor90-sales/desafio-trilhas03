document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form-login");
    const emailInput = document.getElementById("email-login"); // 👈 Corrigido
    const senhaInput = document.getElementById("senha-login"); // 👈 Corrigido
  
    form.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const emailDigitado = emailInput.value.trim();
      const senhaDigitada = senhaInput.value.trim();
  
      const dadosSalvos = localStorage.getItem("dadosInscricao");
  
      if (!dadosSalvos) {
        alert("⚠ Nenhum usuário cadastrado.");
        return;
      }
  
      const usuario = JSON.parse(dadosSalvos);
  
      if (usuario.email === emailDigitado && usuario.senha === senhaDigitada) {
        alert("✅ Login realizado com sucesso!");
        // window.location.href = "dashboard.html"; // Se quiser redirecionar depois
      } else {
        alert("❌ E-mail ou senha incorretos.");
      }
    });
  });
  