class Produto{

    constructor(){
        this.id = 1;
        this.ArrayProduto = [];
        this.idAdd = null;
    }

    preencher(produto){

        let msg = "";
        if(produto.nome == ""){
            msg += "Digite o nome do produto\n";
        }
        
        if(produto.valor == ""){
            msg += "Digite o valor do produto\n";
        }
        
        console.log(msg);
        if(msg==""){
            return true;
        }
        else{
            alert(msg)
            return false;
        }
        
    }


    salvar(){
        let produto = this.lerCampos();
        let validCamp = this.preencher(produto);
    
        console.log(validCamp)
        if(validCamp){
            if(this.idAdd == null){
                this.adicionar(produto);
                console.log(this.ArrayProduto);
                this.id++;
            }
            else{
                this.atualizar(this.idAdd, produto)
            }
            
        }
        this.insertCamp();
        this.cancelar();
       
    }

    lerCampos(){
        let objProd = {}
            objProd.id = this.id;
            objProd.nome = document.getElementById("nomeProd").value;
            objProd.valor = document.getElementById("valorProd").value;
            return objProd;
    }

    adicionar(produto){
        //pega um dado e add dentro do vetor PUSH
        this.ArrayProduto.push(produto);
    }

    cancelar(){
        document.getElementById("nomeProd").value = ""; //atribuindo vazio ao campo
        document.getElementById("valorProd").value = "";
        this.idAdd = null;
        document.getElementById("btn").innerText = "Salvar"

    }

    insertCamp(){
        let tbody = document.getElementById("tbody");

        tbody.innerText = ""; // não permite que cria mais de uma linha
        for(let i = 0; i < this.ArrayProduto.length; i++){
            let tr = tbody.insertRow(); //cria linha

            let td_id = tr.insertCell();
            let td_nome = tr.insertCell();
            let td_valor = tr.insertCell();
            let td_acoes = tr.insertCell();

            td_id.innerText = this.ArrayProduto[i].id;
            td_nome.innerText = this.ArrayProduto[i].nome;
            td_valor.innerText = this.ArrayProduto[i].valor;  
            
            //botao editar
            let imgEdit = document.createElement("img");
            imgEdit.src = "IMAGEM/editar.png";
            td_acoes.appendChild(imgEdit);
            imgEdit.setAttribute("onclick", "produto.editar("+ JSON.stringify(this.ArrayProduto[i]) +")" ); // transforma em Json o arquivo 

            //botao excluir
            let imgE = document.createElement("img");
            imgE.src = "IMAGEM/lixo.png";
            imgE.setAttribute("onclick", "produto.excluir("+ this.ArrayProduto[i].id +")");
            td_acoes.appendChild(imgE);
        }
    }

    excluir(id){
        if(confirm("Deseja deletar?")){
            let tbody = document.getElementById("tbody");
            for(let i = 0; i < this.ArrayProduto.length; i++){
             if(this.ArrayProduto[i].id == id){
                    this.ArrayProduto.splice(i, 1);
                    tbody.deleteRow(i);
                }
            }

            console.log(this.ArrayProduto);
        }
    }

    editar(dados){
        this.idAdd = dados.id;
        document.getElementById("nomeProd").value = dados.nome; //passando para os inputs esses valores do objeto Dados
        document.getElementById("valorProd").value = dados.valor;
        document.getElementById("btn").innerText = "Atualizar"
    }

    atualizar(id, produto){
        for(let i = 0; i < this.ArrayProduto.length; i++){
            if(this.ArrayProduto[i].id == id){
                this.ArrayProduto[i].nome = produto.nome;
                this.ArrayProduto[i].valor = produto.valor;
            }
        }
    }
}

let produto = new Produto();

