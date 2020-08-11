//Procurar o botão
document.querySelector("#add_time")
//Quando clicar no botão (evento que acontece, o que vai acontecer?)
.addEventListener("click", cloneField)

//Executar uma ação
function cloneField(){
    //Duplicar os campos
    //console.log("Fala")
    //A parte de sites com javascript funciona muito com as árvores binárias e ou de busca
    const newFieldContainer = document.querySelector(".schedule_item").cloneNode(true); //cloneNode vai copiar todo o elemento naquele campo.

    const fields = newFieldContainer.querySelectorAll('input') //pega tudo que tem a tag input e joga dentro de fields

    fields.forEach(function(i){
        i.value = ""
    })

    //Colocar na pagina //mas onde?
    document.querySelector("#schedule_items").append(newFieldContainer)
}