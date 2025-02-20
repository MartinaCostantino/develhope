// Crea la tua To-Do List mediante i metodi visti nel video.
// Crea una funzione che ti permetterà di:
// Creare una lista aggiungendo il task desiderato mediante il bottone Aggiungi.
// Creare un checkbox per ogni task aggiunto.

const input = document.querySelector('input')
const ul = document.querySelector('ul');
const button = document.querySelector('button');
button.addEventListener("click", addproduct )
 function addproduct(){
        const text = input.value;
        const li = document.createElement("li");
        li.innerHTML = text
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        li.appendChild(checkbox)
        ul.appendChild(li);
}

