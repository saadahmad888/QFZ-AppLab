document.querySelectorAll('.btn-delete').forEach(btn => {
  btn.addEventListener('click', function(event) {
    event.stopPropagation(); 
  });
});