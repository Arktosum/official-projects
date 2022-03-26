const cells = document.getElementsByClassName('cell')

for (var i = 0; i < cells.length; i++){
    cells[i].addEventListener('click',(e)=>{
        console.log(e.target)
    })
}