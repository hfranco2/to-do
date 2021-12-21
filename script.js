const input = document.querySelector("#inputTarefa input");
const inputBtn = document.querySelector("#inputTarefa #submit");
const lista = document.querySelector(".lista");
const deleteAllBtn = document.querySelector(".footer button");

//aqui eu pego o valor colocado no input pelo usuario
input.onkeyup = () => {
  let dadoBase = input.value;
  //uso o metodo trim para tirar espaços em branco do começo e final do input
  if (dadoBase.trim() != 0) {
    inputBtn.classList.add("active"); // ativação do botão
  } else {
    inputBtn.classList.remove("active");
  }
};
mostraTarefas();
inputBtn.onclick = () => {
  let dadoBase = input.value;
  let getLocal = localStorage.getItem("Nova tarefa");
  if (getLocal == null) {
    listaArr = []; // aqui é criado um array para armazenar o json do input
  } else {
    listaArr = JSON.parse(getLocal); // transformando json em objeto
  }
  listaArr.push(dadoBase);
  localStorage.setItem("Nova tarefa", JSON.stringify(listaArr)); // transformando objeto em string
  mostraTarefas();
};

function mostraTarefas() {
  let getLocal = localStorage.getItem("Nova tarefa");
  if (getLocal == null) {
    listaArr = [];
  } else {
    listaArr = JSON.parse(getLocal);
  }
  const totalTarefaDia = document.querySelector(".tarefasDoDia");
  totalTarefaDia.textContent = listaArr.length; // tarefas pendentes
  if (listaArr.length > 0) {
    // definindo se o buttão de deletar todos esta ativo
    deleteAllBtn.classList.add("active");
  } else {
    deleteAllBtn.classList.remove("active");
  }
  let novoItemLista = "";

  listaArr.forEach((element, index) => {
    novoItemLista += `<div id="a${index}" ><input type="text" class="text" readonly id="id${index}" value="${element}"/>
  <span id="con${index}" onclick="confirmarTarefa(${index})" class="confirmar"><i class="far fa-check-circle"></i></span>

 <span id="edit${index}" onclick="editTarefa(${index})" class="edit" ><i class="fas fa-edit"></i></span>

 <span id="save${index}" onclick="salvarTarefa(${index})" class="salvar"><i class="fas fa-upload"></i></span>
 <span onclick="deleteTarefa(${index})" id="delete"><i class="fas fa-trash"></i></span>
</div>`;
  });
  lista.innerHTML = novoItemLista; // adicionando os li na ul
  input.value = "";
}
function deleteTarefa(index) {
  let getLocal = localStorage.getItem("Nova tarefa");
  listaArr = JSON.parse(getLocal);
  listaArr.splice(index, 1); // deletando o item pelo index
  localStorage.setItem("Nova tarefa", JSON.stringify(listaArr));
  mostraTarefas();
}
{
  //deletar todos os itens
  deleteAllBtn.onclick = () => {
    listaArr = [];
    localStorage.setItem("Nova tarefa", JSON.stringify(listaArr));
    mostraTarefas();
  };
  function salvarTarefa(index) {
    let getLocal = localStorage.getItem("Nova tarefa");
    listaArr = JSON.parse(getLocal);
    let input = document.querySelector(`#id${index}`);
    let dadoAtt = input.value;
    listaArr[index] = dadoAtt;
    localStorage.setItem("Nova tarefa", JSON.stringify(listaArr));

    const listaButtonEdit = document.getElementById(`edit${index}`);
    const listaButtonSave = document.getElementById(`save${index}`);
    const listaButtonCon = document.getElementById(`con${index}`);
    listaButtonEdit.classList.remove("active");
    listaButtonCon.classList.remove("active");
    listaButtonSave.classList.remove("active");
    // let a = listaArr.map((i) => index);

    mostraTarefas();
    // localStorage.setItem("item", JSON.stringify());
  }
  function confirmarTarefa(index) {
    const listaButtonEdit = document.getElementById(`edit${index}`);

    let input = document.querySelector(`#id${index}`);
    if (input.classList != "text active") {
      input.classList.add("active");
      listaButtonEdit.classList.add("active");
    } else {
      input.classList.remove("active");
      listaButtonEdit.classList.remove("active");
    }
  }
  function editTarefa(index) {
    //   console.log(document.getElementsByClassName("edit"));
    const listaInput = document.getElementById(`id${index}`);
    const listaButtonEdit = document.getElementById(`edit${index}`);
    const listaButtonSave = document.getElementById(`save${index}`);
    const listaButtonCon = document.getElementById(`con${index}`);

    // const listaB = document.getElementById(`delete`);

    //   const listaEdit = document.getElementById(`a${index}`);

    listaInput.removeAttribute("readonly");
    listaButtonEdit.classList.add("active");
    listaButtonCon.classList.add("active");
    listaButtonSave.classList.add("active");
    console.log(listaButtonEdit);
    // listaInput.setAttribute("value", "");
    // listaButton.setAttribute("onclick", "salvarTarefa()");

    // console.log(listaButton);
    // console.log(listaB);
    //   listaEdit.classList.add("active");

    //   console.log(listaEdit);
  }
}
