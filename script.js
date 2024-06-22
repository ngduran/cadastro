var meuFormulario = document.getElementById("cadastro_professor");

//const meuFormulario = document.querySelector('.form');

meuFormulario.addEventListener("submit", function(event) {
  event.preventDefault();

  const formData = new FormData(meuFormulario);
  console.log( formData );

  capturarDados();
  
});

function capturarDados() {

    let nomeProf = document.getElementById("nomeProf").value;
    let idadeProf = Number(document.getElementById("idadeProf").value);

  // dados a serem enviados pela solicitação POST
  let _data = {
    nome: nomeProf,
    idade: idadeProf
  }

  // Verifica se os campos não estão vazios
  if (!nomeProf || isNaN(idadeProf)) {
      console.error("Nome ou idade estão inválidos");
      return;
  }

  console.log(_data);

  let jsonData = JSON.stringify(_data);
  console.log(jsonData);

  
  chamarServidor(jsonData);
}


function chamarServidor(jsonData) {
  console.log("Sending request to server with data:", jsonData);

  fetch('http://192.168.1.100:8080/professor', {
      method: "POST",
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      body: jsonData,
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
        .then(response => {
                console.log("Response status:", response.status);
                if (!response.ok) {
                    return response.text().then(text => {
                        console.error("Response error text:", text);
                        throw new Error(text);
                    });
                }
                return response.json();
            })
            .then(data => { console.log("Response data:", data); })
            .catch(error => { console.error('Fetch error:', error); });
}

/*

function createTool(token, tool) {
  return fetch(`${url}/tools`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',u
      Authorization: token,
    }, 
    body: JSON.stringify(tool),
  })
    .then(async (response) => await response.json());
}
*/