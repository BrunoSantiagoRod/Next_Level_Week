//Search the button and what to do on click.
document.querySelector("#add-time").addEventListener("click", cloneField);
//Note: addEventListener('action', function to execute).

//Run the action
//Double the fields
function cloneField(){
    //Campos a serem dublicados
    const newFieldContainer = document.querySelector('.schedule-item').cloneNode(true);
    //Nota: Node é usado para referenciar objetos html.
    //Nota: const = constante (que não muda)

    //Limpar os campos
    //Campos a serem limpados
    const fields = newFieldContainer.querySelectorAll("input");    
    //Nota: querySelectorAll seleciona todos os itens do tipo indicado em uma lista.
    
    //Para cada compo, limpar
    fields.forEach(function(field) {
        field.value = "";
        console.log(fields);
    })        

    //Colocar na página
    //Onde e o que?
    document.querySelector('#schedule-items').appendChild(newFieldContainer);
}