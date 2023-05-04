const getList = async () => {
    let url = 'http://127.0.0.1:5000/acesso';
    fetch(url, {
      method: 'get',
    })
      .then((response) => response.json())
      .then((data) => {
        data.acessos.forEach(item => insertList(item.cracha, item.nome, item.area, item.funcao))
      })
      .catch((error) => {
        console.error('Error:', error);
      });
}

getList()

const postItem = async (inputCracha, inputNome, inputArea, inputFuncao) => {
    const formData = new FormData();
    formData.append('cracha', inputCracha);
    formData.append('nome', inputNome);
    formData.append('area', inputArea);
    formData.append('funcao', inputFuncao);
  
    let url = 'http://127.0.0.1:5000/acesso';
    fetch(url, {
      method: 'post',
      body: formData
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error:', error);
      });
}

const insertButton = (parent) => {
    let span = document.createElement("span");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    parent.appendChild(span);
}

const removeElement = () => {
    let close = document.getElementsByClassName("close");
    var table = document.getElementById('tabeladeacessos');
    let i;
    for (i = 0; i < close.length; i++) {
      close[i].onclick = function () {
        let div = this.parentElement.parentElement;
        const nomeItem = div.getElementsByTagName('td')[0].innerHTML
        if (confirm("Você tem certeza?")) {
          div.remove()
          deleteItem(nomeItem)
          alert("Removido!")
        }
      }
    }
}
 
const deleteItem = (item) => {
    console.log(item)
    let url = 'http://127.0.0.1:5000/acesso?nome=' + item;
    fetch(url, {
      method: 'delete'
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error:', error);
      });
}

const newItem = () => {
    let inputCracha = document.getElementById("newcracha").value;
    let inputNome = document.getElementById("newnome").value;
    let inputArea = document.getElementById("newarea").value;
    let inputFuncao = document.getElementById("newfuncao").value;
  
    if (inputCracha === '') {
      alert("Digite o número do crachá");
    } else {
      insertList(inputCracha, inputNome, inputArea, inputFuncao)
      postItem(inputCracha, inputNome, inputArea, inputFuncao)
      alert("Acesso liberado!")
    }
}

const insertList = (nameCracha, nome, area, funcao) => {
    var item = [nameCracha, nome, area, funcao]
    var table = document.getElementById('tabeladeacessos');
    var row = table.insertRow();
  
    for (var i = 0; i < item.length; i++) {
      var cel = row.insertCell(i);
      cel.textContent = item[i];
    }
    insertButton(row.insertCell(-1))
    document.getElementById("newcracha").value = "";
    document.getElementById("newnome").value = "";
    document.getElementById("newarea").value = "";
    document.getElementById("newfuncao").value = "";
  
    removeElement()
}