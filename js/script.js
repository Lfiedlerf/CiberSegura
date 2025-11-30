/**
 * Script Principal
 * Cumple con: Separación de responsabilidades, validación nativa y manipulación DOM con jQuery.
 */

// 1. Utilidades y Configuración (Modo Oscuro)
const AppConfig = {
  initTheme: function() {
    const themeBtn = $('<button class="btn btn-outline-light ms-3" id="themeToggle">🌙</button>');
    $('.navbar-nav').append(themeBtn);

    // Recuperar preferencia de localStorage 
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
      $('body').addClass('dark-mode');
      themeBtn.text('☀️');
    }

    // Toggle de tema
    themeBtn.on('click', function() {
      $('body').toggleClass('dark-mode');
      const isDark = $('body').hasClass('dark-mode');
      $(this).text(isDark ? '☀️' : '🌙');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }
};

// 2. Lógica de Negocio: Test de Seguridad (jQuery para DOM) 
const SecurityTest = {
  init: function() {
    const $modal = $('#testModal');
    if ($modal.length === 0) return; // Guard clause si no estamos en la página correcta

    const respuestas = {};
    const totalPreguntas = $modal.find('.modal-content h5').length;

    // Delegación de eventos con .on() [cite: 22]
    $modal.on('click', '.respuesta', function() {
      const $btn = $(this);
      const pregunta = $btn.parent().prev('h5').text().trim();
      const respuesta = $btn.data('resp');

      // Feedback visual inmediato
      $btn.siblings().removeClass('active');
      $btn.addClass('active');

      // Guardar estado
      respuestas[pregunta] = respuesta;

      // Verificar completitud
      if (Object.keys(respuestas).length === totalPreguntas) {
        SecurityTest.evaluar(respuestas);
      }
    });
  },

  evaluar: function(respuestas) {
    const hayRiesgos = Object.values(respuestas).includes('no');
    const $feedback = $('#feedback');
    
    // Lógica condicional clara
    if (hayRiesgos) {
      $feedback
        .removeClass('text-success').addClass('text-danger')
        .html('⚠️ Hay áreas vulnerables. Revisa la sección de <a href="consejos.html">Consejos</a>.');
    } else {
      $feedback
        .removeClass('text-danger').addClass('text-success')
        .text('✅ ¡Excelente! Tus hábitos de ciberseguridad son sólidos.');
    }
    
    $feedback.hide().fadeIn(); // Efecto suave jQuery [cite: 22]
  }
};

// 3. Validación de Formularios (JS Nativo estricto) [cite: 17, 18]
function initFormValidation() {
  const forms = document.querySelectorAll('.needs-validation');

  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      // Detener envío si no es válido
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        // Simulación de envío exitoso (evitamos recarga para demo)
        event.preventDefault();
        alert('Gracias por contactarnos. Te responderemos pronto.');
        form.reset();
        form.classList.remove('was-validated');
        return; // Salir para no agregar la clase was-validated de nuevo
      }

      form.classList.add('was-validated'); // Feedback de Bootstrap
    }, false);
  });
}

// Inicialización Global
$(document).ready(function() {
  AppConfig.initTheme(); // Bono Dark Mode
  SecurityTest.init();   // Lógica jQuery
  initFormValidation();  // Lógica Nativa JS
});