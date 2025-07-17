$(document).ready(function(){
  $('#formContacto').on('submit', function(e){
    e.preventDefault();
    const form = this;
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }
    alert('Formulario enviado con éxito.');
    form.reset();
    form.classList.remove('was-validated');
  });

  const respuestas = {};
  const totalPreguntas = $('#testModal .modal-content h5').length;

  $('.respuesta').click(function(){
    const pregunta = $(this).parent().prev('h5').text().trim();
    respuestas[pregunta] = $(this).data('resp');

    if (Object.keys(respuestas).length === totalPreguntas) {
      const algunaNo = Object.values(respuestas).includes('no');
      const mensaje = algunaNo
        ? 'Recomendamos mejorar tus prácticas de seguridad.'
        : 'Excelente, mantén tu sistema al día.';
      $('#feedback').text(mensaje);
    }
  });

  $('.checkbox').click(function() {
    const isChecked = $(this).prop('checked');
    $(this).prop('checked', !isChecked);
  });
});
