// DRY - Don't Repeat Yourself
// Técnica conocida como funciones anónimas autoejecutables. -- Esta técnica nos sirve por si de un proyecto a otro, nos sirve la misma funcionalidad, simplemente nos llevamos el código y hacemos las adecuaciones respectivas.

// Cada funcionalidad que se realiza para este proyecyo, se emplea la técnica de función anónima autoejecutable.

/* *************** MENU **************** */
// Versión de Header para móvil.
// Cada vez que se necesite interactuar con el DOM, lo pasamos como la variable 'd' para ahorrar código. Recordar que las variables del DOM llevan el símbolo del dólar '$'.
// A partir de este punto comienza la función autoejecutable.
((d) => {
  const $btnMenu = d.querySelector(".menu-btn"),
    $menu = d.querySelector(".menu");

  // Se programa un Evento al btn.
  $btnMenu.addEventListener("click", (e) => {
    // Dentro el btn del Menú que está en la variable Menú, al primer elemento hijo le intercambie en su lista de clases, la clase None; de igual manera para el último hijo. En este caso, los hijos son los SVGs.
    $btnMenu.firstElementChild.classList.toggle("none");
    $btnMenu.lastElementChild.classList.toggle("none");
    $menu.classList.toggle("is-active");
  });

  // Técnica de delegación de eventos.
  // Aquí se está evaluando cuál es el elemento que detonará el Click. Que va enfocado a uno de los enlaces del menú cuando esté sea activado, si nosotros damos click a uno de los enlaces, lo que se quiere conseguir es que el menú se desactive y se vuelva a ocultar.
  d.addEventListener("click", (e) => {
    // Con Target es una propiedad donde nos referimos al objeto que origina el evento, y con el método Matches por donde podemos pasar un Selecto válido.
    //Si el evento que originó el Click dentro del documento, no es un enlace dentro del menú, entonces retorna falso, aquí no pasa nada.
    if (!e.target.matches(".menu a")) return false;
    // Aquí removemos y agregamos las clases para lograr que el btn hamburguesa pueda abrir y cerrar el menú.
    $btnMenu.firstElementChild.classList.remove("none");
    $btnMenu.lastElementChild.classList.add("none");
    $menu.classList.remove("is-active");
  });
})(document);

/* *************** CONTACT FORM **************** */
// De igual manera, para poder reutilizar este código, se realiza en una función autoejecutable para que no entre en conflicto con otro ejercicio.
// Recordar que estas variables que se crearon, se les antepone el signo de dólar para ubicar que es una variable que es un elemento del DOM, de lo contrario es una variable dentro de la lógica de programación.
((d) => {
  const $form = d.querySelector(".contact-form"),
    $loader = d.querySelector(".contact-form-loader"),
    $response = d.querySelector(".contact-form-response");

  // Se asigna el evento Submit al formulario.
  $form.addEventListener("submit", (e) => {
    //Para evitar que el formulario se envíe, se aplica la siguiente línea, de esta manera se podrá controlar por Ajax.
    e.preventDefault();
    // Cuando el formulario se envíe, lo primero que se hace es quiartle al elemento Loader, de su lista de clases, la clase None, para que el Loader pueda ser visible.
    $loader.classList.remove("none");
    // Una vez que el Loader seea visible, se manda la petición al siguiente servicio, que nos ayudará a recibir los formularios en nuestro correo.
    fetch("https://formsubmit.co/ajax/misael.vazquez.itse@gmail.com", {
      // Este envío se tiene que hacer por el método POST. donde se especifica la información que se va a enviar, que en este caso, es el formulario como tal.
      method: "POST",
      // Este FormData envía los datos al servicio que estamos utilizando y los datos los obtenemos del e.target, el cual es el elemento que origina el evento, en este caso, nuestro formulario.
      body: new FormData(e.target),
      // Fetch trabaja con promesas, por lo que se ejecutan dos métodos then( ) y por cualquier cosa que falle un método catch( ) para capturar el error.
    })
      // Para esta primera validación, si la respuesta se ejecutó correctamente, res.ok valida verdadero, entonces la respuesta de fromsubmit de que ya envío la información la convertirá a json, y caso contrario si hay algún error se rechaza la promesa que devuelve fetch para que el error se pueda manipular hacia el método catch.
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      // Si la respuesta es exitosa se ejecuta este Then.
      .then((json) => {
        // Se manda a consola para comprobar, no tiene otro relevancia.
        console.log(json);
        // El objeto que controla todas las partes de la URL que se escribe en la barra de dirección de nuestro navegador, está en Location.
        // Aquí le decimos que queremos que se modifique el Hash y que se agregue #gracias., con lo que se activará la ventana Modal.
        location.hash = "#gracias";
        // En cuanto se activa la ventana Modal, se limpia el formulario.
        $form.reset();
      })
      // Si la respuesta es negativa se ejecuta este Catch en caso de que exista algún error.
      .catch((err) => {
        console.log(err);
        // Esta variable la usaremos para poder enviar un mensaje de error.
        // Si la propiedad err.statusText, que es donde generalmente viene el mensaje del error, y no existe, entonces se coloca un mensaje personalizado.
        let message =
          err.statusText || "Ocurrió un error al enviar, intenta nuevamente.";
        // Dentro del Response buscar un H3 y ahí colocar el siguiente mensaje de error, a su vez se va a imprimir el número de error que generalmente siempre está en err.status, y también se imprime el err.statusText que mande la API, que proviene del mensaje que se configuró previamente con la variable Message.
        $response.querySelector(
          "h3"
        ).innerHTML = `Error ${err.status}: ${message}`;
      })
      // Se ejecuta un método finally, que independientemente del resultado de la respuesta, esto se va a ejecutar.
      .finally(() => {
        // Cuando se nos devuelva que el formulario ya se envió, entonces se ocultará nuevamente el Loader y le volvemos a agregar la clase None.
        $loader.classList.add("none");
        // Para ocultar la ventana Modal.
        setTimeout(() => {
          // Se vuelve a modificar el Hash para que la ventana Modal se cierre.
          location.hash = "#close";
        }, 3000);
      });
  });
})(document);
