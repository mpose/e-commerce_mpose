let productCost = 0;
let productCount = 0;
let comissionPercentage = 0.13;
let MONEY_SYMBOL = "$";
let DOLLAR_CURRENCY = "Dólares (USD)";
let PESO_CURRENCY = "Pesos Uruguayos (UYU)";
let DOLLAR_SYMBOL = "USD ";
let PESO_SYMBOL = "UYU ";
let PERCENTAGE_SYMBOL = '%';
let SUCCESS_MSG = "¡Se ha realizado la compra con éxito! :)";
let ERROR_MSG = "Ha habido un error :(, verifica qué pasó.";

var listaProductosCarrito = [];

function mostrarCarrito(listado){

    let htmlContentToAppend = "";
    for(let i = 0; i < listado.length; i++){
        let product = listado[i];

        htmlContentToAppend += `
        <div class="list-group-item">
            <div class="row">
                <div class="col-3">
                    <img src="` + product.src + `" alt="" class="img-thumbnail">
                </div>
                <div class="col" class="col-md-8 order-md-1">
                    <div class="d-flex w-100 justify-content-between">
                    <div class="mb-1">
                        <h4 class="mb-1">Producto: `+ product.name +`</h4>
                        <p>Cantidad seleccionada: ` + product.count + ` unidades</p>
                        <p>Precio por unidad: ` + product.currency + product.unitCost + `</p>
                    </div>
                    <p><strong>Subtotal: ` + product.currency + (Math.round(product.unitCost * product.count)) + `</strong></p>
                </div>
            </div>
        </div>
        `

        document.getElementById("mostrarCarrito").innerHTML = htmlContentToAppend;
    }
}

//Función que se utiliza para actualizar los costos de publicación
function updateTotalCosts(listado){
    for(let i = 0; i < listado.length; i++){
        let costoUnitario = listado[i].unitCost;
        let moneda = listado[i].currency;
        let cantidadS = listado[i].count;

    let unitProductCostHTML = document.getElementById("productCostText");
    let comissionCostHTML = document.getElementById("comissionText");
    let totalCostHTML = document.getElementById("totalCostText");

    let unitCostToShow = moneda + (Math.round(costoUnitario * cantidadS));
    let comissionToShow = moneda + (Math.round((costoUnitario * cantidadS) * comissionPercentage));
    let totalCostToShow = moneda + (Math.round(((costoUnitario * cantidadS) * comissionPercentage) + (costoUnitario * cantidadS)));

    unitProductCostHTML.innerHTML = unitCostToShow;
    comissionCostHTML.innerHTML = comissionToShow;
    totalCostHTML.innerHTML = totalCostToShow;
}
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            listaProductosCarrito = resultObj.data;
            //Muestro las categorías ordenadas
            mostrarCarrito(listaProductosCarrito.articles);
            updateTotalCosts(listaProductosCarrito.articles); //Agrego la funcion para que por defecto traiga el costo con envio Premium
        }
    });
    
    document.getElementById("goldradio").addEventListener("change", function(){
        comissionPercentage = 0.15;
        updateTotalCosts(listaProductosCarrito.articles);
    });
    
    document.getElementById("premiumradio").addEventListener("change", function(){
        comissionPercentage = 0.07;
        updateTotalCosts(listaProductosCarrito.articles);
    });

    document.getElementById("standardradio").addEventListener("change", function(){
        comissionPercentage = 0.05;
        updateTotalCosts(listaProductosCarrito.articles);
    });

});