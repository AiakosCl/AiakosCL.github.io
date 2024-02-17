$(document).ready(function () {

    var navbar = $(".navbar");
    var heroSection = $("#hero-section").offset().top; // Obtén la posición del header

    $(window).resize(function() {
        var alto = document.getElementById("hero-section").offsetHeight; // Actualiza la altura del header, en caso de cambio de tamaño de la ventana
        console.log("La altura es después de cambio de tamaña: " + alto);
    });

    $(window).scroll(function () {
        var alto = document.getElementById("hero-section").offsetHeight; // Obtiene la altura del Header
        // Cambia la clase del navbar según la posición en la página
        if ($(window).scrollTop() > heroSection + (alto * 0.8)) {
            navbar.removeClass("navbar navbar-expand-lg fixed-top").addClass("navbar navbar-expand-lg fixed-top bg-info");
            console.log("La altura es: " + alto);
        } else {
            navbar.removeClass("navbar navbar-expand-lg fixed-top bg-info").addClass("navbar navbar-expand-lg fixed-top");
            console.log("La altura es: " + alto);
        }
    });

    // Contrae el Navbar cuando el Toggler está visible.
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarNav .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });



    //Activa el Smooth Scroll para ir entre secciones.
    $(".nav-link").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault(); //Si el link está vacío evita que se tome acción.
            var hash = this.hash;  //almacena la ubicación de la sección en la variable hash.
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function () {
                window.location.hash = hash;
            });
        }
    });

    //Esconde los Div que se destinaron a Tooltip.  Se identifican por Id.
    $("#MiTooltip").hide();
    $("#ValidacionCorreo").hide();

    // Activará el Tooltip "MiTooltip", cuando se pase el mouse por sobre algunas de las cards (en la sección Destacado)
    $("#card1,#card2,#card3,#card4").mouseenter(function () {
        // Obtiene el valor del Div id=MiToolTip
        var tooltip = $("#MiTooltip");
        // Le cambia el aspecto a ese Div
        tooltip.css({
            "color": "cyan",
            "text-align": "center"
        });
        // Le entrega un texto a ese Div, haciéndolo aparecer, y desaparcer en 2 segundos.
        tooltip.text("Para conocer cualquiera de estos destinos, sólo contáctanos 😉📨").fadeIn();
        setTimeout(function () {
            tooltip.fadeOut();
        }, 2000);
    });

    // Validará los campos del formulario y entragará un mensaje de mensaje enviado si todo está correcto.
    $("#EnviarCorreo").click(function (event) {
        // Obteniendo los valores de los campos según su Id
        var nombre = $("#Nombre").val();
        var email = $("#Correo").val();
        var mensaje = $("#Mensaje").val();

        // Expresión regular para validar el formato de correo electrónico.
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Verifica si alguno de los campos está vacío
        if (nombre === '' || email === '' || mensaje === '') {
            //Evita que se envíe y da una alerta para completar los datos.
            event.preventDefault();
            alert('Por favor, completa todos los campos.');
        } //Verifica si lo ingresado en el campo correo corresponde a una dirección de correo.
        else if (!emailRegex.test(email)) {
            // var tooltip = $("#ValidacionCorreo");
            // tooltip.text("Por favor, ingrese un correo electrónico válido.").fadeIn();
            // setTimeout(function () {
            //     tooltip.fadeOut();
            // }, 2000);
            //event.preventDefault();
        } // Si todo está bien, todos los campos completos y correo válido, entrega el mensaje de que se envió.
        else {
            alert("El correo fue enviado correctamente...");
        }
    });
});