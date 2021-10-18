let comissionPercentage = 0.13;
let MONEY_SYMBOL = "$";
let DOLLAR_CURRENCY = "Dólares (USD)";
let PESO_CURRENCY = "Pesos Uruguayos (UYU)";
let DOLLAR_SYMBOL = "USD ";
let PESO_SYMBOL = "UYU ";
let PERCENTAGE_SYMBOL = '%';
let SUCCESS_MSG = "¡Se ha realizado la publicación con éxito! :)";
let ERROR_MSG = "Ha habido un error :(, verifica qué pasó.";
var listaProductosCarrito = [];

function calculoSubtotal (unitCost) {
    let cantidad = parseInt(document.getElementById("cantidadComprar").value);

    let subTotal = PESO_SYMBOL + Math.round(unitCost * cantidad);

    document.getElementById("productCostText").innerHTML = subTotal;
}

function mostrarCarrito(listado) {

    let htmlContentToAppend = "";
    for (let i = 0; i < listado.length; i++) {
        let product = listado[i];
        let subTotal = Math.round(product.unitCost * product.count);
        document.getElementById("productCostText").innerHTML = product.currency + subTotal;

        htmlContentToAppend += `
        <div>
            <div class="row">
                <div class="col-3">
                    <img src="` + product.src + `" alt="" class="img-thumbnail">
                </div>
                <div class="col" class="col-md-8 order-md-1">
                    <div class="d-flex w-100 justify-content-between">
                    <div class="mb-1">
                        <h4 class="mb-1">Producto: `+ product.name + `</h4>
                        <p>Precio por unidad: ` + product.currency + product.unitCost + `</p>
                        <div class="col-md-3 mb-3">
                            <label>¿Cantidad?</label>
                                <input type="number" class="form-control" onchange="calculoSubtotal(`+ product.unitCost +`)" id="cantidadComprar" value="`+ product.count +`" min="0">
                                    <div class="invalid-feedback">
                                        La cantidad es requerida.
                                    </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        `

        document.getElementById("mostrarCarrito").innerHTML = htmlContentToAppend;
    }
}


document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            listaProductosCarrito = resultObj.data.articles;
            //Muestro las categorías ordenadas
            mostrarCarrito(listaProductosCarrito);
             //Agrego la funcion para que por defecto traiga el costo con envio Premium
        }
    });
    document.getElementById("productCostText").addEventListener("change", function () {
        calculoSubtotal()
    });
});