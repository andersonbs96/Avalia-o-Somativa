let listaAlunos = [];
let mediaGeral = 0;

//função ativada ao clicar no botão
function cadastrar(){
    //tratamento de erro
    try {
        let nome = document.getElementById("setNome").value;
        if (nome === ""){
            alert("Digite um nome válido");
        }
        else {
            let n1 = parseFloat(document.getElementById("setNota1").value);
            let n2 = parseFloat(document.getElementById("setNota2").value);
            let n3 = parseFloat(document.getElementById("setNota3").value);
            let n4 = parseFloat(document.getElementById("setNota4").value);
            if (isNaN(n1) || isNaN(n2) || isNaN(n3)|| isNaN(n4)){
                alert("Digite uma nota válida");
            }
            else {
                let media = mediaAluno(n1, n2, n3, n4);
                let situacao = situacaoAluno(media);
                mediaGeral = mediaGeralTurma();
                
                listarAluno(nome, n1, n2, n3, n4, media, situacao);

                alert("Aluno cadastrado!");

                document.getElementById("setNome").value = "";
                document.getElementById("setNota1").value = "";
                document.getElementById("setNota2").value = "";
                document.getElementById("setNota3").value = "";
                document.getElementById("setNota4").value = "";
            }        
        } 
    }
    catch(erro){
        alert(erro, "Ocorreu um erro, favor, tentar novamente");
    }    
}

//As três funções seguintes estão ligadas a função cadastrar
function mediaAluno(n1, n2, n3, n4){
    
    let media = (n1 + n2 + n3 + n4)/4;
    return media;
}

function mediaGeralTurma(){
    
    let somaMedia = listaAlunos.reduce((total, aluno) => total + aluno.media, 0);
    return somaMedia/ listaAlunos.length;
}
     
function situacaoAluno(media){   
    if (media >= 70){
        situacao = `Aprovado`;
    }
    else if (media >= 50){
        situacao = `Recuperação`;
    }
    else {
        situacao = `Reprovado`;
    }
    
    return situacao;
}
//função para colocar todas as variaveis dentro de uma array
function listarAluno(nome, n1, n2, n3, n4, media, situacao){
    let aluno = {
        "nome": nome,
        "nota1": n1,
        "nota2": n2,
        "nota3": n3,
        "nota4": n4,
        "media": media,
        "situacao": situacao
    };
    
    listaAlunos.push(aluno);
    
    //O nome que for adicionado a lista cria um elemento option no html
    let addOption = document.createElement("option");
    addOption.text = aluno.nome;
    addOption.value = aluno.nome;
    document.getElementById("selectAluno").appendChild(addOption);    
}

//função para aparecer as notas referente ao aluno selecionado no menu select
function buscarDadosAlunos(){
    let selecionarNome = document.getElementById("selectAluno").value;
    let selecionarAluno = listaAlunos.find(aluno => aluno.nome === selecionarNome);
    
    if (selecionarAluno) {
        document.getElementById("getNota1").innerText = selecionarAluno.nota1;
        document.getElementById("getNota2").innerText = selecionarAluno.nota2;
        document.getElementById("getNota3").innerText = selecionarAluno.nota3;
        document.getElementById("getNota4").innerText = selecionarAluno.nota4;
        document.getElementById("getMedia").innerText = selecionarAluno.media.toFixed(1);
        document.getElementById("situacao").innerText = selecionarAluno.situacao;
        document.getElementById("getMediaGeral").innerText = mediaGeralTurma().toFixed(1);
        
        document.getElementById("getMedia").classList.remove("notaAlta", "notaMedia", "notaAlta");
        //codigo de condição para adiciorar três classes, cada um para mudança de cor
        if (selecionarAluno.media >= 70){
            document.getElementById("getMedia").classList.add("notaAlta");
        }
        else if (selecionarAluno.media >= 50){
            document.getElementById("getMedia").classList.add("notaMedia");
        }
        else {
            document.getElementById("getMedia").classList.add("notaBaixa");
        } 
        
        buscarAlunoMedia(listaAlunos);
        
    } else {
        // Se o aluno não for encontrado, limpa os campos
        document.getElementById("getNota1").innerText = "";
        document.getElementById("getNota2").innerText = "";
        document.getElementById("getNota3").innerText = "";
        document.getElementById("getNota4").innerText = "";
        document.getElementById("getMedia").innerText = "";
        document.getElementById("situacao").innerText = "";
        document.getElementById("getMediaGeral").innerText = "";
    }
}

//Função para criar corpo da tabela para aparição de nome do aluno que estiver com a média abaixo da média geral.
function buscarAlunoMedia(listaAlunos){
    
    let alunosMedia = listaAlunos.filter(aluno => aluno.media < mediaGeralTurma());
    
    const tabelaCorpo = alunosMedia.map(alunoMedia => {
       return `            
            <tr>
                <td class="corpoAluno">${alunoMedia.nome}</td>
                <td class="corpoMedia">${alunoMedia.media}</td>
            </tr>
            `; 
    });
    
    const tabelaItems = document.getElementById("tabelaCorpo");
    tabelaItems.innerHTML = tabelaCorpo.join("");
}

