const input = document.querySelector("#inputTarefa input");
const inputBtn = document.querySelector("#inputTarefa #submit");
const lista = document.querySelector("#lista1");
const lista2 = document.querySelector("#lista2");
const lista3 = document.querySelector("#lista3");
const deleteAllBtn = document.querySelector(".footer button");
const calendarioBox = document.querySelector("#calendarioBox");
const calendario = document.querySelector("#calendario");
const container1 = document.querySelector("#container1");
const container2 = document.querySelector("#container2");
const container3 = document.querySelector("#container3");
const navDo1 = document.querySelector("#navDo1");
const navDone1 = document.querySelector("#navDone1");
const navDo2 = document.querySelector("#navDo2");
const navDone2 = document.querySelector("#navDone2");
const navDo3 = document.querySelector("#navDo3");
const navDone4 = document.querySelector("#navDone3");
const voltar = document.querySelector("#voltar");
const dia = document.querySelector(".dataDia");
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
let a = []
localStorage.setItem("diaAtual",JSON.stringify(a));
const diaAtual = new Date(year, month, day);
function primeiroLoad(){
 let pLoad= localStorage.getItem("diaAtual")
  if (pLoad==null | pLoad== "" | pLoad== undefined)
localStorage.setItem("diaAtual",JSON.stringify(diaAtual.toLocaleDateString("pt-br", {
  year: "numeric",
  month: "numeric",
  day: "numeric",
})
));}
primeiroLoad()



  load()
  selecionaDia()
  function diaSelecionado(selecionado){
    
    let getLocalDay = localStorage.getItem("diaAtual");
  listaArrDay = JSON.parse(getLocalDay); 
  // console.log(listaArrDay)
    dia.innerText = listaArrDay;
    // dia.innerText = selecionado;
   }
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

  calendario.innerHTML = "";

  for (let i = 1; i <= diasAntes + diasNoMes; i++) {
    const quadradoDia = document.createElement("div");
    quadradoDia.classList.add("day");
    const stringDia = `${i - diasAntes}/${month + 1}/${year}`;
    quadradoDia.setAttribute("id", stringDia);

    if (i > diasAntes) {
      quadradoDia.innerText = i - diasAntes;
      

      if (i - diasAntes === day && nav === 0) {
        quadradoDia.id = "currentDay";
      }

      

      quadradoDia.addEventListener("click", () => selecionaDia(stringDia));
    } else {
      quadradoDia.classList.add("antes");
    }

    calendario.appendChild(quadradoDia);
  }
}

load();


function selecionaDia(dia) {
  if ((dia == undefined) | (dia == null)) {
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
  if (listaArr.find(e => e == diaBase)) {
  //  console.log("ja tem")
  } else {
    listaArr.push(diaBase);
  }
  localStorage.setItem("Dia", JSON.stringify(listaArr)); // transformando objeto em string
 
  limpandoArrayDiaAtual = []
  
    localStorage.setItem("diaAtual", JSON.stringify(limpandoArrayDiaAtual));
    // console.log(diaBase)
    localStorage.setItem("diaAtual", JSON.stringify(diaBase));

  
  
  diaSelecionado(diaBase)
  
  mostraTarefas();
  diasArr()
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

// console.log()
inputBtn.onclick = () => { 
  let getLocalDay = localStorage.getItem("diaAtual");
  listaArrDay = JSON.parse(getLocalDay); 
 
  
  
  
 
  //criar o array do dia que ta selecionado
  //o valor do input seja colocado no array do dia que ta selecionado
  
  let dadoBase = input.value;
  let getLocal = localStorage.getItem(listaArrDay);
  if (getLocal == null) {
    listaArr = []; // aqui é criado um array para armazenar o json do input
  } else {
    listaArr = JSON.parse(getLocal); // transformando json em objeto
  }
  // console.log(getLocal)
  listaArr.push({valor:dadoBase,confirmado:false});
  newObj=
  localStorage.setItem(listaArrDay, JSON.stringify(listaArr)); // transformando objeto em string
  mostraTarefas();
  diaSelecionado()
  diasArr()
};
function diasArr() {
  let getLocal = localStorage.getItem("Dia");
  let listaArrDay = JSON.parse(getLocal); 
  let listaArr = listaArrDay.map((e)=>e);
  // console.log(listaArr.length)
  
  // console.log(listaArr.length)
  for(z= 0; z<listaArr.length; z++){
    let getLocal2 = localStorage.getItem(listaArr[z]);
  let listaArrDay2 = JSON.parse(getLocal2); 
    // console.log(listaArr[z])
  
  if(listaArrDay2==undefined|listaArrDay2==[]|listaArrDay2==null){
    localStorage.setItem(listaArr[z], JSON.stringify([]));
  }
    
  //  console.log(listaArr[z])
  }
}


function mostraTarefas(aaa) { 
  let getLocalDay = localStorage.getItem("diaAtual");
  listaArrDay = JSON.parse(getLocalDay);
  let getLocal = localStorage.getItem(listaArrDay);  
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
    novoItemLista += `<div id="a${index}" ><input type="text" class="text" readonly id="id${index}" value="${element.valor}"/>
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
  let getLocalDay = localStorage.getItem("diaAtual");
  listaArrDay = JSON.parse(getLocalDay);
  let getLocal = localStorage.getItem(listaArrDay);
  listaArr = JSON.parse(getLocal);
  listaArr.splice(index, 1); // deletando o item pelo index
  localStorage.setItem(listaArrDay, JSON.stringify(listaArr));
  mostraTarefas();
}

  //deletar todos os itens
  deleteAllBtn.onclick = () => {
    let getLocalDay = localStorage.getItem("diaAtual");
    listaArrDay = JSON.parse(getLocalDay);
    listaArr = [];
    localStorage.setItem(listaArrDay, JSON.stringify(listaArr));
    mostraTarefas();
  };
  function salvarTarefa(index) {
    let getLocalDay = localStorage.getItem("diaAtual");
  listaArrDay = JSON.parse(getLocalDay);
    let getLocal = localStorage.getItem(listaArrDay);
    listaArr = JSON.parse(getLocal);
    let input = document.querySelector(`#id${index}`);
    let dadoAtt = input.value;
    listaArr[index] = dadoAtt;
    localStorage.setItem(listaArrDay, JSON.stringify(listaArr));

    const listaButtonEdit = document.getElementById(`edit${index}`);
    const listaButtonSave = document.getElementById(`save${index}`);
    const listaButtonCon = document.getElementById(`con${index}`);
    listaButtonEdit.classList.remove("active");
    listaButtonCon.classList.remove("active");
    listaButtonSave.classList.remove("active");

    

    mostraTarefas();
    
  }
  function confirmarTarefa(index) {
    const listaButtonEdit = document.getElementById(`edit${index}`);
    const listaButtonEdit2 = document.getElementById(`id${index}`);
    let getLocal = localStorage.getItem("confirmados");
    let valor = listaButtonEdit2.value+listaButtonEdit2.id
    let getLocalEvent = localStorage.getItem("diaAtual");
    listaArrEvent = JSON.parse(getLocalEvent);
    let getLocalEvent2 = localStorage.getItem(listaArrEvent);
    listaArr = JSON.parse(getLocalEvent2);    
    let num= index  
    
    let variavel=listaArr[num]
    
    let input = document.querySelector(`#id${index}`);
    if (input.classList != "text active") {
       variavel.confirmado=true
    
      localStorage.setItem(listaArrEvent, JSON.stringify(listaArr));
      input.classList.add("active");
      listaButtonEdit.classList.add("active");
      // console.log(listaArrEvent)
    } else {
      variavel.confirmado=false
      localStorage.setItem(listaArrEvent, JSON.stringify(listaArr));
      
      input.classList.remove("active");
      listaButtonEdit.classList.remove("active");
      // console.log(listaArr)
    }
  }
  function editTarefa(index) {
   
    const listaInput = document.getElementById(`id${index}`);
    const listaButtonEdit = document.getElementById(`edit${index}`);
    const listaButtonSave = document.getElementById(`save${index}`);
    const listaButtonCon = document.getElementById(`con${index}`);

   

    listaInput.removeAttribute("readonly");

    listaButtonEdit.classList.add("active");
    listaButtonCon.classList.add("active");
    listaButtonSave.classList.add("active");
    listaInput.focus();
    listaInput.select();
    
  }
  function mostraTodasTarefas() {    
    container2.style="display:grid"
    container1.style="display:none"    
   navDo2.setAttribute("onclick","(voltarTarefas1())")
    let tt=""
    let getLocalDay = localStorage.getItem("Dia");
    listaArrDay = JSON.parse(getLocalDay);
    let listaArrDay3= listaArrDay.map(e=>e)
  
    let getLocalEvent = localStorage.getItem("diaAtual");
    listaArrEvent = JSON.parse(getLocalEvent);
    let getLocal = localStorage.getItem(listaArrEvent);
    listaArr = JSON.parse(getLocal);      
    // let getLocalEvent = listaArrDay3.map((e)=>localStorage.getItem(e) );
    // console.log(getLocalEvent)   
  //   listaArrDay3.map((e,index)=> {tt +=`<div id="a2${e}" ><input type="text" class="text2" readonly id="id2${e}" value="${e}"/></div>`
  //   let getLocalEvent = localStorage.getItem(e); 
  //   listaArrEvent = JSON.parse(getLocalEvent); 
  //   let getLocal = localStorage.getItem(listaArrEvent);       
  //   if(listaArrEvent!=[]|listaArrEvent!=undefined|listaArrEvent!=null){
  //     console.log(listaArrEvent)
  // tt += `<div id="a${listaArrEvent}" ><input type="text" class="text" readonly id="id${listaArrEvent}" value="${listaArrEvent}"/>        
  //    </div>`;}})
     for (i =0; i<listaArrDay3.length; i++){
      //  console.log(listaArrDay3)
      let getLocal2 = localStorage.getItem(listaArrDay3[i]);
        listaArr2 = JSON.parse(getLocal2);
       
        
        if (listaArr2[i]!=null|listaArr2[i]!=undefined|listaArr2[i]!=[]){
          tt +=`<div id="a2${listaArrDay3[i]}" ><input type="text" class="text2" readonly id="id${listaArrDay3[i]}" value="${listaArrDay3[i]}"/></div>`
        }
        //  console.log(listaArr2[i])
        
          for (u =0; u<listaArr2.length; u++){
             tt += `<div id="a${listaArr2[u]}" ><input type="text" class="text" readonly id="id${listaArr2[u]}" value="${listaArr2[u].valor}"/>        
          </div>`;
          }     }
   
   
    lista2.innerHTML = tt; // adicionando os li na ul
   
  }   
  // mostraTodasTarefas()
 
   function mostraTarefasConcluidas() {       
     container3.style="display:grid"
     container1.style="display:none"    
    navDone3.setAttribute("onclick","(voltarTarefas2())")
    let tt=""
    let getLocalDay = localStorage.getItem("Dia");
    listaArrDay = JSON.parse(getLocalDay);
    let listaArrDay3= listaArrDay.map(e=>e) 
    let getLocalEvent = localStorage.getItem("diaAtual");
    listaArrEvent = JSON.parse(getLocalEvent);
    let getLocal = localStorage.getItem(listaArrEvent);
    listaArr = JSON.parse(getLocal);     
     for (i =0; i<listaArrDay3.length; i++){     
      let getLocal2 = localStorage.getItem(listaArrDay3[i]);
        listaArr2 = JSON.parse(getLocal2);               
        if (listaArr2[i]!=null|listaArr2[i]!=undefined|listaArr2[i]!=[]){
          
          tt +=`<div id="a2${listaArrDay3[i]}" ><input type="text" class="text2" readonly id="id${listaArrDay3[i]}" value="${listaArrDay3[i]}"/></div>`
        } 
        // console.log(listaArr2[i])        
          for (u =0; u<listaArr2.length; u++){
            console.log(listaArr2[u].confirmado)
            if(listaArr2[u].confirmado==true){
              console.log(listaArr2[u].confirmado)
             tt += `<div id="a${listaArr2[u]}" ><input type="text" class="text3" readonly id="id${listaArr2[u]}" value="${listaArr2[u].valor}"/>        
          </div>`;
          }   }  }   
    lista3.innerHTML = tt; // adicionando os li na ul   
  }   
  function voltarTarefas1(){
    container2.style="display:none"
    container1.style="display:grid"
    navDo3.setAttribute('onclick','mostraTarefasConcluidas()')
  }
  function voltarTarefas2(){
    container3.style="display:none"
     container1.style="display:grid"
    
     navDone3.setAttribute('onclick','mostraTarefasConcluidas()')
  }
  // mostraTarefasConcluidas()