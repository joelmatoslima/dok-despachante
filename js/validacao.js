let nameOk = false;
let emailOk = false;
function validate(event) {
  event.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email");
  const erroEmail = document.querySelector(".fa-exclamation-circle");

  //funçao abaixo VALIDA O NOME
  validateName(name);
  //funçao abaixo VALIDA O EMAIL
  validateEmail(email, erroEmail);
  //funçao abaixo ENVIA O FORMULARIO
  sendForm(name, email);
}

function validateName(name) {
  const nomeArray = name.split(" ");
  if (name == "" || nomeArray.length == 1) {
    alert("Digite seu NOME e SOBRENOME");
    document.getElementById("name").focus();
    nameOk = false;
  } else {
    nameOk = true;
  }
}

function validateEmail(email, erroEmail) {
  const re = /\S+@\S+\.\S+/;
  if (re.test(email.value) == true) {
    erroEmail.style = "display: none";
    emailOk = true;
  } else {
    email.placeholder = "Por favor informe um e-mail válido";
    email.value = "";
    email.classList.add("red");
    erroEmail.style = "display: block !important;";
    nameOk = false;
  }
}

function sendForm(name, email) {
  if (nameOk && emailOk) {
    axios
      .post("https://jsonplaceholder.typicode.com/posts", {
        name: name,
        email: email,
      })
      .then(
        (response) => {
          console.log(response);
          alert("Email enviado, em breve entraremos em contato");
          document.getElementById("name").value = "";
          document.getElementById("email").value = "";
        },
        (error) => {
          console.log(error);
        }
      );
  }
}


//funçao abaixo esta sendo chamada pelo *onfocus*, direto do HTML
function removeErro() {
  const email = document.getElementById("email");
  const erroEmail = document.querySelector(".fa-exclamation-circle");
  email.classList.remove("red");
  email.placeholder = "Informe seu email";
  erroEmail.style = "display: none";
}
