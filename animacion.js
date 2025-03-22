// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos del DOM
    const botonMensaje = document.getElementById('botonMensaje') || document.getElementById('boton-mensaje');
    const mensajeSecreto = document.getElementById('mensaje-secreto');
    const particulasContenedor = document.getElementById('particulas-contenedor');
    
    // Configuración de partículas
    const numeroParticulas = 50;
    let particulas = [];
    
    // Función para crear partículas
    function crearParticulas() {
      for (let i = 0; i < numeroParticulas; i++) {
        const particula = document.createElement('div');
        particula.classList.add('particula');
        
        // Valores aleatorios para posición y tamaño
        const tamaño = Math.random() * 10 + 5;
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        
        // Aplicar estilos iniciales
        particula.style.width = `${tamaño}px`;
        particula.style.height = `${tamaño}px`;
        particula.style.left = `${x}px`;
        particula.style.top = `${y}px`;
        particula.style.opacity = Math.random() * 0.5 + 0.5;
        
        // Valores de animación aleatorios
        const duracion = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        // Aplicar animación
        particula.style.animation = `flotar ${duracion}s ease-in-out ${delay}s infinite`;
        
        // Guardar referencia y añadir al DOM
        particulas.push(particula);
        particulasContenedor.appendChild(particula);
      }
    }
    
    // Función para crear una explosión de partículas
    function crearExplosion(x, y) {
      const numeroExplosion = 30;
      
      for (let i = 0; i < numeroExplosion; i++) {
        const particula = document.createElement('div');
        particula.classList.add('particula');
        
        // Tamaño aleatorio
        const tamaño = Math.random() * 8 + 3;
        particula.style.width = `${tamaño}px`;
        particula.style.height = `${tamaño}px`;
        
        // Posición inicial en el punto de explosión
        particula.style.left = `${x}px`;
        particula.style.top = `${y}px`;
        
        // Velocidad y dirección aleatorias
        const velocidadX = (Math.random() - 0.5) * 15;
        const velocidadY = (Math.random() - 0.5) * 15;
        const duracion = Math.random() * 1.5 + 1;
        
        // Aplicar animación con CSS
        particula.style.transition = `all ${duracion}s ease-out`;
        
        // Añadir al DOM
        particulasContenedor.appendChild(particula);
        
        // Forzar reflow para que la transición funcione
        void particula.offsetWidth;
        
        // Animación
        particula.style.transform = `translate(${velocidadX * 20}px, ${velocidadY * 20}px)`;
        particula.style.opacity = '0';
        
        // Eliminar después de la animación
        setTimeout(() => {
          particula.remove();
        }, duracion * 1000);
      }
    }
    
    // Manejar movimiento del ratón para crear pequeñas partículas
    document.addEventListener('mousemove', function(e) {
      // Limitar la frecuencia de creación (1 de cada 5 movimientos)
      if (Math.random() > 0.8) {
        const x = e.clientX;
        const y = e.clientY;
        
        const particula = document.createElement('div');
        particula.classList.add('particula');
        
        const tamaño = Math.random() * 5 + 2;
        particula.style.width = `${tamaño}px`;
        particula.style.height = `${tamaño}px`;
        particula.style.left = `${x}px`;
        particula.style.top = `${y}px`;
        particula.style.opacity = '0.8';
        
        particulasContenedor.appendChild(particula);
        
        // Animación simple de desvanecimiento
        setTimeout(() => {
          particula.style.transition = 'all 1.5s ease';
          particula.style.opacity = '0';
          particula.style.transform = 'translateY(-20px)';
        }, 10);
        
        // Eliminar después de la animación
        setTimeout(() => {
          particula.remove();
        }, 1500);
      }
    });
    
    // Animar los tulipanes con diferentes ángulos
    const tulipanes = document.querySelectorAll('.tulipan');
    tulipanes.forEach(tulipan => {
      // Obtener la rotación actual y usarla como base
      const estilo = window.getComputedStyle(tulipan);
      const transformMatrix = estilo.transform || estilo.webkitTransform;
      let rotacion = 0;
      
      if (transformMatrix !== 'none') {
        const valores = transformMatrix.split('(')[1].split(')')[0].split(',');
        if (valores.length === 6) {
          const a = valores[0];
          const b = valores[1];
          rotacion = Math.round(Math.atan2(b, a) * (180/Math.PI));
        }
      }
      
      // Establecer la rotación base como variable CSS personalizada
      tulipan.style.setProperty('--rotacion', `${rotacion}deg`);
    });
    
    // Evento del botón de mensaje secreto
    if (botonMensaje) {
      botonMensaje.addEventListener('click', function() {
        mensajeSecreto.classList.add('activo');
        
        // Crear explosión de partículas alrededor del botón
        const rect = botonMensaje.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        crearExplosion(x, y);
        
        // Sonido de corazón (opcional)
        const sonido = new Audio();
        sonido.src = 'https://assets.mixkit.co/sfx/preview/mixkit-confirmation-tone-1666.mp3';
        sonido.volume = 0.5;
        sonido.play().catch(e => console.log('Error reproduciendo audio:', e));
      });
      
      // Cerrar mensaje al hacer clic fuera del contenido
      mensajeSecreto.addEventListener('click', function(e) {
        if (e.target === mensajeSecreto) {
          mensajeSecreto.classList.remove('activo');
        }
      });
    }
    
    // Iniciar partículas de fondo
    crearParticulas();
    
    // Función para actualizar las posiciones según el tamaño de la ventana
    function actualizarPosiciones() {
      particulas.forEach(particula => {
        particula.style.left = `${Math.random() * window.innerWidth}px`;
        particula.style.top = `${Math.random() * window.innerHeight}px`;
      });
    }
    
    // Escuchar cambios de tamaño de ventana
    window.addEventListener('resize', actualizarPosiciones);
  });