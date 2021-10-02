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
        
    }
    addProduct = () => {
    
        let productName = $('#product-name').val();
        let productDescription = $('#product-description').val();
        let productPrice = parseFloat($('#product-price').val());
        let productCategory = $('.form-select').val();
        let p = storesList[0].products.length;
        
        
        if(productName && productDescription && productPrice && productCategory) {
            let product = new ProductStore (p, productName, productDescription, productPrice, productCategory);
            storesList[0].products.push(product);
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
    }
    // funcion para filtrar productos (en desarrollo)
    filterProduct = () => {
        
        let listProducts = [];
        listProducts.push(storesList[0].products.filter( prod => prod.price <= 10 ));
        
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
        let products = JSON.parse(localStorage.getItem('products'));
        return products;
    }

    // funcion para traer datos del archivo json
    getProductsJson = () => {
        const URLJSON = "json/products.json";
        
        $.getJSON(URLJSON, (respuesta, estado) => {
            if (estado === 'success') {
                let data = respuesta;
                const getProductsJsonToProductList = (data) => {

                    for (const d of data) {
                        storesList[0].products.push(d);
                    }
                }
                getProductsJsonToProductList(data);
                this.postProductsStorage();
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
        $('.products-list').prepend(`<div id='${i}' class="product-card col-md-4 row-md-1">
                                                        <div class='nav-card'>
                                                            <i class="delete far fa-trash-alt"></i>
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
    
    renderProductsList = (p) => {
        for(let i = 0; i < p.length; i++) {
            const x = p[i];
            const id = x.id;
            const n = x.name;
            const d = x.description;
            const price = x.price;

            this.addCardProduct(id, n, d, price);  
        }
    }
}

//  Aca se inicia la app 

    const storesList = [];
    const newStore = new StoreUser(0, 'Tienda', 'email@tienda.com', 'contraseña');
    storesList.push(newStore);

    storesList[0].getProductsJson();



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
const getDate = () => {
    const date = new Date();
    const dateInfo = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}hs`;
    
}
console.log('holis')
export default {storesList, UI, checkForm};