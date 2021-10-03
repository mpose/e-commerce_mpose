var category = {};

function showImagesGallery(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}


var listaComentarios = [];

function mostrarListaComentarios(listado) {

    let htmlContentToAppend = "";
    for (let i = 0; i < listado.length; i++) {
        let comentario = listado[i];

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action>
            <div class="row">
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                    <div class="mb-1">
                        <h4 class="mb-1"> Puntuacion: `+ estrellas(comentario.score) + `</h4>
                        <p> Comentario: ` + comentario.description + `</p>
                        <p> Usuario: ` + comentario.user + `</p>
                        <p> Fecha: ` + comentario.dateTime + `</p>
                    </div>
                </div>
            </div>
        </div>
        </div>
        `

        document.getElementById("mostrarComentarios").innerHTML = htmlContentToAppend;
    }
}

function estrellas(score) {
    let total = 5;
    let result = "";
    for (let i = 0; i < total; i++) {
        if (score > 0) {
            result += '<span class="fa fa-star checked"></span>';
            score--;
        } else {
            result += '<span class="fa fa-star"></span>';
        }
    }
    return result;
}

var currentListadoProductos = []; //Sacar hasta linea 98
var listadoRelacion = [];

function mostrarProductoRelacionado(currentListadoProductos, listadoRelacion) {

    let htmlContentToAppend = "";
    for (let i = 0; i < listadoRelacion.length; i++) {
        let name = currentListadoProductos[listadoRelacion[i]].name;
        let imagen = currentListadoProductos[listadoRelacion[i]].imgSrc;
        let moneda = currentListadoProductos[listadoRelacion[i]].currency;
        let precio = currentListadoProductos[listadoRelacion[i]].cost;
        let descripcion = currentListadoProductos[listadoRelacion[i]].description;

        htmlContentToAppend += `
            <div class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                    <img src="` + imagen + `" alt="` + descripcion + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ name +`</h4>
                        </div>
                        <p class="mb-1">` + descripcion + `</p>
                        <p class="mb-1">` + moneda + precio + `</p>
                        <a class="btn btn-info" href="product-info.html">Más Información</a>
                    </div>
                </div>
            </div>
            `
        document.getElementById("relatedProducts").innerHTML = htmlContentToAppend;
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;

            let categoryNameHTML = document.getElementById("categoryName");
            let categoryDescriptionHTML = document.getElementById("categoryDescription");
            let productCountHTML = document.getElementById("productCount");
            let productCategoryHTML = document.getElementById("productCategory");

            categoryNameHTML.innerHTML = product.name;
            categoryDescriptionHTML.innerHTML = product.description;
            productCountHTML.innerHTML = product.soldCount;
            productCategoryHTML.innerHTML = product.category;

            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
        }
    });
});
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            listaComentarios = resultObj.data;
            //Muestro las categorías ordenadas
            mostrarListaComentarios(listaComentarios);
        }
    });
});

document.addEventListener("DOMContentLoaded", function (e) { //Sacar
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            currentListadoProductos = resultObj.data;
            //Muestro las categorías ordenadas
            mostrarProductoRelacionado(currentListadoProductos, product.relatedProducts);
        }
    });

});

document.addEventListener("DOMContentLoaded", function (e) {
    let ulog = localStorage.getItem('ulog');
    let infousuario = document.getElementById("info-usuarioComent")

    if (ulog) {
        ulog = JSON.parse(ulog);
        document.getElementById("usuarioComent").innerHTML = ulog;
        infousuario.style = "display: inline-block";
    }
});

document.addEventListener("DOMContentLoaded", function () { //espera a que cargue el contenido
    document.getElementById("submitComent").addEventListener("click", function () {
        let puntuacionUlog = document.getElementById("puntuacionUlog");
        let comentarioUlog = document.getElementById("comentarioUlog");
        let camposCompletos = true; //funcion bandera (flag)

        if (puntuacionUlog.value === "value1") {
            camposCompletos = false;
        }
        if (comentarioUlog.value === '') {
            camposCompletos = false;
        }
        if (camposCompletos) { //DESAFIO
            localStorage.setItem('puntuacionUsurio', JSON.stringify(puntuacionUlog.value));
            localStorage.setItem('comentarioUsuario', JSON.stringify(comentarioUlog.value));
            window.location = 'product-info.html'
        } else {
            alert("Para comentar debes completar los campos solicitados")
        }
    })
});

/* DESAFIO:
    document.addEventListener("DOMContentLoaded", function(e){
        let ulog = localStorage.getItem('ulog');
        let puntuacionUsurio = localStorage.getItem('puntuacionUsurio');
        let comentarioUsuario = localStorage.getItem('comentarioUsuario');

        document.getElementById("mostrarComentarios").innerHTML = htmlContentToAppend;
    });
    */