const input = document.querySelector("#inputTarefa input");
const inputBtn = document.querySelector("#inputTarefa #submit");
const lista = document.querySelector(".lista");
const deleteAllBtn = document.querySelector(".footer button");
const calendarioBox = document.querySelector("#calendarioBox");
const calendario = document.querySelector("#calendario");
const voltar = document.querySelector("#voltar");
const dia = document.getElementById("dataDia");
const dt = new Date();
const day = dt.getDate();
const month = dt.getMonth();
const year = dt.getFullYear();
const diasSemana = [
  "domingo",
  "segunda-feira",
  "terça-feira",
  "quarta-feira",
  "quinta-feira",
  "sexta-feira",
  "sábado",
];
let nav = 0;
let clicked = null;

let eventos = localStorage.getItem("Nova tarefa ")
  ? JSON.parse(localStorage.getItem("Nova tarefa"))
  : [];

function load() {
  if (nav !== 0) {
    dt.setMonth(new Date().getMonth() + nav);
  }

  const primeiroDiaDoMes = new Date(year, month, 1);

  const diasNoMes = new Date(year, month + 1, 0).getDate();

  const stringData = primeiroDiaDoMes.toLocaleDateString("pt-br", {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  const diasAntes = diasSemana.indexOf(stringData.split(", ")[0]);

  dia.innerText = `${dt.toLocaleDateString("pt-br", {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  })} `;

  calendario.innerHTML = "";

  for (let i = 1; i <= diasAntes + diasNoMes; i++) {
    const quadradoDia = document.createElement("div");
    quadradoDia.classList.add("day");
    const stringDia = `${i - diasAntes}/${month + 1}/${year}`;
    quadradoDia.setAttribute("id", stringDia);

    if (i > diasAntes) {
      quadradoDia.innerText = i - diasAntes;
      const eventoDia = eventos.find((e) => e.date === stringData);

      if (i - diasAntes === day && nav === 0) {
        quadradoDia.id = "currentDay";
      }

      if (eventoDia) {
        const eventDiv = document.createElement("div");
        eventDiv.classList.add("event");
        eventDiv.innerText = eventoDia.title;
        quadradoDia.appendChild(eventDiv);
      }

      quadradoDia.addEventListener("click", () => selecionaDia(stringDia));
    } else {
      quadradoDia.classList.add("antes");
    }

    calendario.appendChild(quadradoDia);
  }
}
load();
const diaAtual = new Date(year, month, day);
selecionaDia();
function selecionaDia(dia) {
  if (dia == null) {
    dia = diaAtual.toLocaleDateString("pt-br", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  }
  let diaBase = dia;
  let getLocal = localStorage.getItem("Dia");
  if (getLocal == null) {
    listaArr = [];
  } else {
    listaArr = JSON.parse(getLocal); // transformando json em objeto
  }
  if (listaArr.find((e) => diaBase)) {
  } else {
    listaArr.push(diaBase);
  }
  localStorage.setItem("Dia", JSON.stringify(listaArr)); // transformando objeto em string
  mostraTarefas();

  //mudar o status do  calendario para display none
  //preciso armazenar setar o dia que as tarefas vao ser salvas
  calendarioBox.style.display = "none";
}
dia.onclick = () => {
  calendarioBox.style.display = "flex";
};
voltar.onclick = () => {
  calendarioBox.style.display = "none";
};
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
    listaInput.focus();
    listaInput.select();
    // console.log(listaButtonEdit);
    // listaInput.setAttribute("value", "");
    // listaButton.setAttribute("onclick", "salvarTarefa()");

    // console.log(listaButton);
    // console.log(listaB);
    //   listaEdit.classList.add("active");

    //   console.log(listaEdit);
  }
}
