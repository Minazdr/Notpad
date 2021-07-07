// variables
const noteList = document.querySelector('#note-list')
// eventListener 
eventListener()

function eventListener() {
    // form submission
    document.querySelector('#form').addEventListener('submit', newNote)

    //  remove note
    document.querySelector('#note-list').addEventListener('click', removeNote)

    document.addEventListener('DOMContentLoaded', localStorageOnload)
}

//  function 

function newNote(e) {
    e.preventDefault()

    // access  to the value 
    const note = document.querySelector('#note').value

    // create remove element 
    const removeBtn = document.createElement('a')
    removeBtn.textContent = 'X'
    removeBtn.classList = 'remove-note'

    // create li  tag 
    const li = document.createElement('li')
    li.appendChild(document.createTextNode(note))

    // adding remove btn to the li 
    li.appendChild(removeBtn)

    // adding li to the note-List 
    noteList.appendChild(li)

    this.reset();

    addNoteToLocalStorage(note)

    // alert('یادداشت با موفقیت انجام شد')
    Swal.fire(
        'Good job!',
        'You clicked the button!',
        'success'
      )
}

// remove note form list
function removeNote(e) {
    if (e.target.classList.contains('remove-note')) {
        e.target.parentElement.remove()
    }

    removeNoteLocalStorage(e.target.parentElement.textContent)
}

function addNoteToLocalStorage(note) {
    const notes = getNotesFromLocalStorage()
    notes.push(note)
    localStorage.setItem('notes', JSON.stringify(notes))
}

function getNotesFromLocalStorage() {
    let notes;
    let getFormLS;
    getFormLS = localStorage.getItem('notes')
    if (getFormLS === null) {
        notes = []
    } else {
        notes = JSON.parse(getFormLS)
    }
    return notes
}

function localStorageOnload() {
    const notes = getNotesFromLocalStorage();

    notes.forEach(note => {
        // create remove element 
        const removeBtn = document.createElement('a')  
        removeBtn.textContent = 'X'
        removeBtn.classList = 'remove-note'

        // create li  tag 
        const li = document.createElement('li')
        li.appendChild(document.createTextNode(note))

        // adding remove btn to the li 
        li.appendChild(removeBtn)

        // adding li to the note-List X
        noteList.appendChild(li)
    });
}

function removeNoteLocalStorage(noteContent){
    const noteDelete = noteContent.substring(0 , noteContent.length -1)
    
    const  notesFromLS = getNotesFromLocalStorage();

    notesFromLS.forEach((note  , index) => {
        if(note === noteDelete ){
            console.log(index);
            notesFromLS.splice(index , 1)
        }
    });

    localStorage.setItem('notes' , JSON.stringify(notesFromLS))
    console.log(noteDelete);
    console.log(notesFromLS);

}

