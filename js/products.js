var listaProductos = [];

function mostrarListadoProductos(listado){

    let htmlContentToAppend = "";
    for(let i = 0; i < listado.length; i++){
        let product = listado[i];

        htmlContentToAppend += `
        <a href="product-info.html" class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                    <div class="mb-1">
                        <h4 class="mb-1">`+ product.name +`</h4>
                        <p>` + product.description + `</p>
                        <p> Precio: ` + product.currency + product.cost + `</p>
                    </div>

                </div>
            </div>
        </div>
        `

        document.getElementById("lista-de-productos").innerHTML = htmlContentToAppend;
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            listaProductos = resultObj.data;
            //Muestro las categorías ordenadas
            mostrarListadoProductos(listaProductos);
        }
    });

});