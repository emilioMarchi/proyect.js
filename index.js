
class StoreUser {
    constructor(id, n, e, p) {
        this.id = id;
        this.name = n;
        this.email = e;
        this.password = p;
        this.products = [];
        this.data = {
            hour: '',
            dir: '',
        }
        
        this.addProduct = () => {
        
            let productName = $('#product-name').val();
            let productDescription = $('#product-description').val();
            let productPrice = parseFloat($('#product-price').val());
            let productCategory = $('.form-select').val();
            let p = storesList[l].products.length;
            
            if(productName && productDescription && productPrice && productCategory) {
                let product = new ProductStore (p, productName, productDescription, productPrice, productCategory);
                storesList[l].products.push(product);
                localStorage.setItem('products', product);
                this.postProductsStorage();

                let ui = new UI();
                ui.addCardProduct(p, productName, productDescription, productPrice);

                $('.msj-container').slideDown(500)
                .delay(1000)
                .fadeOut(500);
                
            } else {$('.msj2-container').slideDown(500)
            .delay(1000)
            .fadeOut(500);}

            // Aca iria la funcion para eliminar el producto y el elemento del dom que dispara el evento
            $('#delete-product').click((e) => {
                console.log(e.target.parentNode.parentNode);
            })
        }
    }
    // funcion para filtrar productos (en desarrollo)
    filterProduct = () => {
        
        let listProducts = [];
        listProducts.push(storesList[l].products.filter( prod => prod.price <= 10 ));
        
        console.log('A continuacion los productos filtrados');
        
        for(let i = 0; i <= listProducts[0].length; i++) {
            console.log(listProducts[0][i]);
        }
    }
    postProductsStorage = () => {
        let productsJson = JSON.stringify(this.products);
        localStorage.setItem('products', productsJson);
    }
    getProductsStorage = () => {
        let p = JSON.parse(localStorage.getItem('products'));
        console.log(p);
    }
        // funcion para enviar datos a archivo json (en desarrollo)
    postProductsJson = () => {
        const URLJSON = "json/products.json";
        const data = JSON.stringify(this.products);

        $.post(URLJSON, data, (respuesta, estado) => {
            if(estado === 'success') {
                console.log(respuesta);
            }
        }, 'json');
    }
    // funcion para traer datos del archivo json
    getProductsJson = () => {
        const URLJSON = "json/products.json";
        
        $.getJSON(URLJSON, (respuesta, estado) => {
            if (estado === 'success') {
                let data = respuesta;
                this.products = data;
                console.log(data)
            }
        })
    }

    
}

class ProductStore {
    constructor(id, n, d, p, c) {
        this.id = id;
        this.name = n;
        this.description = d;
        this.price = p;
        this.category = c;
    }

    
}
class UI {
    addCardProduct = (i,n,d,p) => {
        $('.products-list').prepend(`<div class="product-card col-md-4 row-md-1">
                                                        <div class="nav-card">
                                                            <i id='delete-product' class="fas fa-trash-alt"></i>
                                                            <i id='edit-product' class="fas fa-pencil-alt"></i>
                                                        </div>
                                                        <div class="body-card">
                                                            <h4>ID:${i}</h4>
                                                            <h3>${n}</h3>
                                                            <h4>${d}</h4>
                                                        </div>
                                                        <div class='footer-card'>
                                                        <h3>$ ${p}</h3>
                                                        </div>
                                                    </div>`);
    }
    renderAddProductPage = () => {
        $('.section-home').fadeOut(500);
        $('.section-products').fadeIn(500);
        this.renderProductsList;
    }
    renderProductsList = () => {
        const products = storesList[l].products;
        
        for (const p of products) {
            this.addCardProduct(p.id, p.name, p.description, p.price);
        }
    }
}
const storesList = [];
const l = storesList.length; 

//  Aca se inicia la app 
$(document).ready(() => {
    let store = new StoreUser(0, 'Tienda', 'email@tienda.com', 'contraseña');
    storesList.push(store);
    
    storesList[0].getProductsJson();
    // evento renderProductList sobre btn agregar producto
    $('.btn-add').on('click', () => {
        const ui = new UI();
        ui.renderAddProductPage();
        ui.renderProductsList();
    });
    
    // evento agregar producto sobre formulario
    $(".btn-form").click((e) => {
        const state = checkForm();
        
        if(state){
            storesList[0].addProduct();
            $("#form")[0].reset();
        } else {storesList[0].addProduct();}
        e.preventDefault();
    });
})
// funcion para validar formulario
const checkForm = () => {     
            let state = false;
            let productName = $('#product-name').val();
            let productDescription = $('#product-description').val();
            let productPrice = parseFloat($('#product-price').val());
            let productCategory = $('.form-select').val();
            // todavia no pude solucionar validar que llegue el valor de productCatergory
            if(productName && productDescription && productPrice && productCategory) {
                state = true;
            } else {}
            return state;
}
