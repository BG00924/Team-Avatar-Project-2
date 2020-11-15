// var deleteGameBtn = document.getElementById('delete-btn')
var elements = document.getElementsByClassName("delete-btn");
for (var i = 0; i < elements.length; i++) {
  elements[i].addEventListener('click', handleDeleteSubmit);
}
function handleDeleteSubmit(event) {
  event.preventDefault()
  event.stopPropagation()
  var Id = event.target.parentNode.id
  fetch(`/api/games/${Id}`, {
    method: 'DELETE'
  });
  document.location.reload('/mygames')
}
// bulma modal javascript 
var refs = {
  modalEdicion: {
    open: function () {
      document.getElementById('modalEdicion').classList.add('is-active');
    },
    close: function () {
      document.getElementById('modalEdicion').classList.remove('is-active');
    }
  }
};
// bulma modal end
// Event listeners
// deleteGameBtn.addEventListener("click", handleDeleteSubmit);
