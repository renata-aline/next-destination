
let listAttractions = [];

let listAttractionsEdit ;

const form = document.getElementById("form-itens");
const attractionsInput = document.getElementById("receive-item");
const ulAttractions = document.getElementById("list-of-attractions");
const ulAttractionVisited = document.getElementById("attractions-visited");

const recoveredList = localStorage.getItem('listAttractions')


function updateLocalStorage() {
    localStorage.setItem('listAttractions', JSON.stringify(listAttractions))
}

if(recoveredList){
  listAttractions = JSON.parse(recoveredList) 
  showAttraction() 
}else{
    listAttractions = []
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  saveAttraction();
  showAttraction();
  attractionsInput.focus()
});

function saveAttraction() {
  const attraction = attractionsInput.value;
  const checkDuplicate = listAttractions.some(
    (element) =>
      element.value.toUpperCase() === attraction.toUpperCase()
  );

  if (checkDuplicate) {
    alert("já existe");
  } else {
    listAttractions.push({
      value: attraction,
      check: false,
    });
  }

  attractionsInput.value = ''
}

function showAttraction() {
    ulAttractions.innerHTML = ''
    ulAttractionVisited.innerHTML = ''

    listAttractions.forEach((element, index) => {
      if(element.check){
        ulAttractionVisited.innerHTML += `
        <li class="attractions-to-visit is-flex is-justify-content-space-between" data-value="${index}">
        <div>
            <input type="checkbox" checked class="is-clickable" />  
            <span class="attractions-visited is-size-5">${element.value}</span>
        </div>
        <div>
            <i class="fa-solid fa-trash is-clickable deletar"></i>
        </div>
    </li>
     `
      }else{

        ulAttractions.innerHTML += `
        <li class= "attractions-to-visit is-flex is-justify-content-space-between" data-value="${index}">
        <div>
            <input type="checkbox" class="is-clickable" />
            <input type="text" class="is-size-5" value="${element.value}" ${index !== Number(listAttractionsEdit) ? 'disabled' : ''}></input>
        </div>


        <div>
            ${ index === Number(listAttractionsEdit) ? '<button onclick="saveEdit()"><i class="fa-regular fa-floppy-disk is-clickable"></i></button>' : '<i class="fa-regular is-clickable fa-pen-to-square editar"></i>'}
            <i class="fa-solid fa-trash is-clickable deletar"></i>
        </div>
    </li>
    `
    }

    })

    const inputsCheck = document.querySelectorAll('input[type="checkbox"]')

    inputsCheck.forEach(i => {
      i.addEventListener('click', (event) => {
        const elementValue = event.target.parentElement.parentElement.getAttribute('data-value');
        listAttractions[elementValue].check = event.target.checked
         showAttraction()

      })
    })

    const deleteObjects = document.querySelectorAll('.deletar');

    deleteObjects.forEach(i => {
      i.addEventListener('click', (event) => {
        const elementValue = event.target.parentElement.parentElement.getAttribute('data-value');
        listAttractions.splice(elementValue,1)
         showAttraction()

      })
    })

    const editItems = document.querySelectorAll(".editar");

    editItems.forEach(i => {
      i.addEventListener('click', (event) => {
        listAttractionsEdit = event.target.parentElement.parentElement.getAttribute('data-value');
         showAttraction()
      })
    })

    updateLocalStorage()
}

function saveEdit() {
  const itemEdited = document.querySelector(`[data-value="${listAttractionsEdit}"] input[type="text"]`)
  listAttractions[listAttractionsEdit].value = itemEdited.value
  console.log(listAttractions)
  listAttractionsEdit = -1;
  showAttraction()
}


    document.addEventListener('DOMContentLoaded', () => {
        const placeInput = document.getElementById('place-destination');
        const welcomeMessage = document.getElementById('welcome-message');
    
        placeInput.addEventListener('input', () => {
            const placeName = placeInput.value.trim();
            if (placeName) {
                welcomeMessage.textContent = `Welcome to ${placeName}!`;
            } else {
                welcomeMessage.textContent = '';
            }
        });
    });
    
