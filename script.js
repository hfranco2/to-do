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
const navDone3 = document.querySelector("#navDone3");
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
  //usando a variavel nav posso implementar a funcionalidade de poder criar tarefas para outros meses
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
  //aqui estou criando a data para criar o calendario dinamico
  const diasAntes = diasSemana.indexOf(stringData.split(", ")[0]);

  calendario.innerHTML = "";
// aqui uso um loop com a variavel de dias anteriores ao mes mas os dias do mes para criar um calendario que contenha o numero correto de quadrados
  for (let i = 1; i <= diasAntes + diasNoMes; i++) {
    const quadradoDia = document.createElement("div");
    quadradoDia.classList.add("day");
    const stringDia = `${i - diasAntes}/${month + 1}/${year}`;
    quadradoDia.setAttribute("id", stringDia);
    if (i > diasAntes) {
      quadradoDia.innerText = i - diasAntes;
      if (i - diasAntes === day && nav === 0) {
        quadradoDia.id = "currentDay"; }

      

      quadradoDia.addEventListener("click", () => selecionaDia(stringDia));
      //quando seleciono o dia ele chama a função selecionaDia para colocar como base para a criação de array e objetos passando o valor do dia selecionado
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
  //aqui se eu nao selecionei nenhum dia,  ou seja, a primeira vez que estou acessando o to-do no momento, ele seta o dia selecionado como hoje
  let diaBase = dia;
  let getLocal = localStorage.getItem("Dia");
 
  if (getLocal == null) {
    listaArr = [];
  } else {
    listaArr = JSON.parse(getLocal); // transformando json em objeto
  }
  if (listaArr.find(e => e == diaBase)) {  
  } else {
    listaArr.push(diaBase);
  }
  localStorage.setItem("Dia", JSON.stringify(listaArr)); // transformando objeto em string
 
  limpandoArrayDiaAtual = []
    //aqui eu limpo o array que indica o dia atual para sempre ser o dia selecionado, pois uso como base para criar os arrays com os objetos dos evetos
    localStorage.setItem("diaAtual", JSON.stringify(limpandoArrayDiaAtual));
    // console.log(diaBase)
    localStorage.setItem("diaAtual", JSON.stringify(diaBase));

  
  //aqui chamo a função diaSelecionado
  diaSelecionado(diaBase)
  //chamo a função mostrar tarefas para que se houver eventos registrados no array ele ja mostra eles
  mostraTarefas();
  //chamo a função que cria um array com todos os dias ja visitados
  diasArr()
  calendarioBox.style.display = "none";
}
//aqui estou criando o botão para sair ou entrar no calendario
dia.onclick = () => {
  calendarioBox.style.display = "flex";
};
voltar.onclick = () => {
  calendarioBox.style.display = "none";
};
//aqui eu pego o valor colocado no input pelo usuario
input.onkeyup = () => {
  //aqui coloco condição apra que o botão para incluir a tarefa so fique habilitado se escrevi algo no input
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
  //aqui criou um novo array usando o map para nao alterar o array original  
  for(z= 0; z<listaArr.length; z++){
    let getLocal2 = localStorage.getItem(listaArr[z]);
  let listaArrDay2 = JSON.parse(getLocal2);   
  if(listaArrDay2==undefined|listaArrDay2==[]|listaArrDay2==null){
    localStorage.setItem(listaArr[z], JSON.stringify([]));
  }
    }
}


function mostraTarefas(aaa) { 
  //aqui é a função que mostra todas as tarefas criadas no dia 
  let getLocalDay = localStorage.getItem("diaAtual");
  listaArrDay = JSON.parse(getLocalDay);
  let getLocal = localStorage.getItem(listaArrDay);  //pego o dia atual e procuro o array que tme seu nome
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
//crio as divs que contem os eventos dinamicamente usando  o foreach para cada elemento do array do dia atual
  listaArr.forEach((element, index) => {
    // se o elemento esta confirmado ele ja cria com a classe que deixa o estilo como confirmado
    if(element.confirmado==false){
    novoItemLista += `<div id="a${index}" ><input type="text" class="text" readonly id="id${index}" value="${element.valor}"/>
  <span id="con${index}" onclick="confirmarTarefa(${index})" class="confirmar"><i class="far fa-check-circle"></i></span>

 <span id="edit${index}" onclick="editTarefa(${index})" class="edit" ><i class="fas fa-edit"></i></span>

 <span id="save${index}" onclick="salvarTarefa(${index})" class="salvar"><i class="fas fa-upload"></i></span>
 <span onclick="deleteTarefa(${index})" id="delete"><i class="fas fa-trash"></i></span>
</div>`;
  }else{
    novoItemLista += `<div id="a${index}" ><input type="text" class="text active" readonly id="id${index}" value="${element.valor}"/>
  <span id="con${index}" onclick="confirmarTarefa(${index})" class="confirmar"><i class="far fa-check-circle"></i></span>

 <span id="edit${index}" onclick="editTarefa(${index})" class="edit" ><i class="fas fa-edit"></i></span>

 <span id="save${index}" onclick="salvarTarefa(${index})" class="salvar"><i class="fas fa-upload"></i></span>
 <span onclick="deleteTarefa(${index})" id="delete"><i class="fas fa-trash"></i></span>
</div>`;
  }

});
  lista.innerHTML = novoItemLista; // adicionando os li no form
  //limpo o input
  input.value = "";
  
}
function deleteTarefa(index) {
  //a função deletar tarefa que pega como parametro o index do array do item clicado
  let getLocalDay = localStorage.getItem("diaAtual");
  listaArrDay = JSON.parse(getLocalDay);
  let getLocal = localStorage.getItem(listaArrDay);
  listaArr = JSON.parse(getLocal);
  listaArr.splice(index, 1); // deletando o item pelo index usando o metodo splice
  localStorage.setItem(listaArrDay, JSON.stringify(listaArr));
  mostraTarefas();
}

  //deletar todos os itens
  deleteAllBtn.onclick = () => {
    //aqui deleto todas as tarefas do dia selecionado
    let getLocalDay = localStorage.getItem("diaAtual");
    listaArrDay = JSON.parse(getLocalDay);
    listaArr = [];
    localStorage.setItem(listaArrDay, JSON.stringify(listaArr));
    mostraTarefas();
  };
  function salvarTarefa(index) {
    //aqui é a função que salva a tarefa quando eu edito o valor do input
    let getLocalDay = localStorage.getItem("diaAtual");
  listaArrDay = JSON.parse(getLocalDay);
    let getLocal = localStorage.getItem(listaArrDay);
    listaArr = JSON.parse(getLocal);
    //pego o valor do dia atual, procuro o array que tem seu nome e uso o index passado no clic para localizar o item certo   
    let input = document.querySelector(`#id${index}`);
    let dadoAtt = input.value;
    listaArr[index].valor = dadoAtt;
    //altero o valor da propriedade valor do objeto no array do dia selecionado
    localStorage.setItem(listaArrDay, JSON.stringify(listaArr));
    //faço as alterações necessarias no estilo dos botoes
    const listaButtonEdit = document.getElementById(`edit${index}`);
    const listaButtonSave = document.getElementById(`save${index}`);
    const listaButtonCon = document.getElementById(`con${index}`);
    listaButtonEdit.classList.remove("active");
    listaButtonCon.classList.remove("active");
    listaButtonSave.classList.remove("active");

    

    mostraTarefas();
    
  }
  function confirmarTarefa(index) {
    //função que muda o status da tarefa em questão para confirmado ou não confirmado
    const listaButtonEdit = document.getElementById(`edit${index}`);
    const listaButtonEdit2 = document.getElementById(`id${index}`);    
    let getLocalEvent = localStorage.getItem("diaAtual");
    listaArrEvent = JSON.parse(getLocalEvent);
    let getLocalEvent2 = localStorage.getItem(listaArrEvent);
    listaArr = JSON.parse(getLocalEvent2);    
    let num= index  
    
    let variavel=listaArr[num]
    
    let input = document.querySelector(`#id${index}`);
    //aqui eu verifico se a classe ja esta ativa, se não o botão vai ativar, se esta ele vai desativar
    if (input.classList != "text active") {
      //mudo o valor da propriedade confirmado
       variavel.confirmado=true    
      localStorage.setItem(listaArrEvent, JSON.stringify(listaArr));
      //mudo o estilo do objeto em questão
      input.classList.add("active");
      listaButtonEdit.classList.add("active");
      // console.log(listaArrEvent)
    } else {
      variavel.confirmado=false
      localStorage.setItem(listaArrEvent, JSON.stringify(listaArr));      
      input.classList.remove("active");
      listaButtonEdit.classList.remove("active");
      
    }
  }
  function editTarefa(index) {
    //aqui eu altero a propriedade do input e seu estilo para poder editar e depois chamar a fuinção salvarTarefa
    const listaInput = document.getElementById(`id${index}`);
    const listaButtonEdit = document.getElementById(`edit${index}`);
    const listaButtonSave = document.getElementById(`save${index}`);
    const listaButtonCon = document.getElementById(`con${index}`);
    listaInput.removeAttribute("readonly");
    listaButtonEdit.classList.add("active");
    listaButtonCon.classList.add("active");
    listaButtonSave.classList.add("active");
    listaInput.focus();
    listaInput.enterKeyHint(enter);
    // listaInput.select();
    
  }
  function mostraTodasTarefas() {    
    //aqui euy crio a função mostrar todas as tarefas onde ela chama um outro container com seu visual
    container2.style="display:grid"
    container3.style="display:none"
    container1.style="display:none"    
   navDo2.setAttribute("onclick","(voltarTarefas1())")
   // crio um variavel onde apenas coloco os valores nela para depois setar com innerHTML
    let tt=""
    let getLocalDay = localStorage.getItem("Dia");
    listaArrDay = JSON.parse(getLocalDay);
    let listaArrDay3= listaArrDay.map(e=>e)
  
    let getLocalEvent = localStorage.getItem("diaAtual");
    listaArrEvent = JSON.parse(getLocalEvent);
    let getLocal = localStorage.getItem(listaArrEvent);
    listaArr = JSON.parse(getLocal);      
   //pego o array do dia atual para manipulalo
     for (i =0; i<listaArrDay3.length; i++){
      //  console.log(listaArrDay3)
      let getLocal2 = localStorage.getItem(listaArrDay3[i]);
        listaArr2 = JSON.parse(getLocal2);
        //pego cada array de cada dia para alterar        
        if (listaArr2[i]!=null|listaArr2[i]!=undefined|listaArr2[i]!=[]){
          tt +=`<div id="a2${listaArrDay3[i]}" ><input type="text" class="text2" readonly id="id${listaArrDay3[i]}" value="${listaArrDay3[i]}"/></div>`
        }      
        //para cada evento de cada dia eu adiciono na minha variavel tt o innerHTMl
          for (u =0; u<listaArr2.length; u++){
             tt += `<div id="a${listaArr2[u]}" ><input type="text" class="text" readonly id="id${listaArr2[u]}" value="${listaArr2[u].valor}"/>        
          </div>`;
          }     }
   
   
    lista2.innerHTML = tt; // adicionando os li no form
   
  }   
  // mostraTodasTarefas()
 
   function mostraTarefasConcluidas() {       
     //aqui eu crio a função para mostrar todas as tarefas concluidas
     container3.style="display:grid"
     container2.style="display:none"
     container1.style="display:none"    
      navDone3.setAttribute("onclick","(voltarTarefas2())")
    //uso a mesma logica da função mostrar todas as tarefas porem uso um if para verificar se o valor dos eventos de cada dia tem a propriedade confirmado com true ou não
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
          for (u =0; u<listaArr2.length; u++){
            // se ele ta confirmado é criado uma div para ele com o devidop estilo
            if(listaArr2[u].confirmado==true){
             tt += `<div id="a${listaArr2[u]}" ><input type="text" class="text3" readonly id="id${listaArr2[u]}" value="${listaArr2[u].valor}"/>        
          </div>`;
          }   }  }   
    lista3.innerHTML = tt; // adicionando os li na ul   
  }   
  function voltarTarefas1(){
    //função para fechas a visualizaçãso de todas as tarefas
    container2.style="display:none"
    container1.style="display:grid"
    navDo2.setAttribute('onclick','mostraTarefasConcluidas()')
  }
  function voltarTarefas2(){
     //função para fechas a visualizaçãso de todas as tarefas concluidas
    container3.style="display:none"
     container1.style="display:grid"    
     navDone3.setAttribute('onclick','mostraTarefasConcluidas()')
       }
  