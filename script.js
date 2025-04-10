document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form-inscricao");
    const campos = form.querySelectorAll("input, select");
    const erroSpans = form.querySelectorAll(".erro");
  
    function limparErros() {
      erroSpans.forEach((span) => (span.style.display = "none"));
    }
  
    function validarEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
  
    function mostrarErro(campo, mensagem) {
      const erro = campo.parentElement.querySelector(".erro");
      if (erro) {
        erro.textContent = `⚠ ${mensagem}`;
        erro.style.display = "block";
      }
    }
  
    function validarFormulario() {
      let valido = true;
      limparErros();
  
      campos.forEach((campo) => {
        const tipo = campo.getAttribute("type");
        const valor = campo.value.trim();
  
        if (campo.hasAttribute("required") && valor === "") {
          mostrarErro(campo, "Campo obrigatório");
          valido = false;
        }
  
        if (campo.id === "email" && !validarEmail(valor)) {
          mostrarErro(campo, "Insira um e-mail válido");
          valido = false;
        }
  
        if (campo.id === "data-nascimento") {
          const idade = calcularIdade(valor);
          if (isNaN(idade) || idade < 10 || idade > 120) {
            mostrarErro(campo, "Idade inválida");
            valido = false;
          }
        }
      });
  
      // Verifica se apenas uma trilha foi marcada
      const checkboxes = document.querySelectorAll(".input-checkbox");
      const selecionadas = Array.from(checkboxes).filter((cb) => cb.checked);
      if (selecionadas.length !== 1) {
        alert("⚠ Selecione apenas uma trilha.");
        valido = false;
      }
  
      return valido;
    }
  
    function calcularIdade(data) {
      const nascimento = new Date(data);
      const hoje = new Date();
      let idade = hoje.getFullYear() - nascimento.getFullYear();
      const m = hoje.getMonth() - nascimento.getMonth();
      if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
        idade--;
      }
      return idade;
    }
  
    function salvarDados() {
      const dados = {};
      campos.forEach((campo) => {
        if (campo.type !== "file" && campo.type !== "checkbox") {
          dados[campo.id] = campo.value.trim();
        }
      });
  
      // Armazena a trilha escolhida
      const trilhas = document.querySelectorAll(".input-checkbox");
      trilhas.forEach((checkbox, index) => {
        if (checkbox.checked) {
          const trilha = checkbox.parentElement.querySelector(".linguagem").textContent;
          dados["trilha"] = trilha;
        }
      });
  
      // Salva no localStorage
      localStorage.setItem("dadosInscricao", JSON.stringify(dados));
    }
  
    form.addEventListener("submit", function (e) {
        e.preventDefault();
      
        if (validarFormulario()) {
          salvarDados();
          alert("✅ Inscrição realizada com sucesso!");
          form.reset();
          window.location.href = "login.html"; // 👈 Redireciona após o reset do formulário
        }
      });

    
  });
  