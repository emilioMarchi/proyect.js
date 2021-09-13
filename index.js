
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
                ui.addCardProduct(p, productName,productDescription,productPrice);

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
    // llamar a storeList[0].filterProduct()
    filterProduct = () => {
        
        let listProducts = [];
        listProducts.push(storesList[l].products.filter( prod => prod.price <= 10 ));
        
        console.log('A continuacion los productos filtrados');
        
        for(let i = 0; i <= listProducts[0].length; i++) {
            console.log(listProducts[0][i]);
        }
    }
    postProductsStorage = () => {
        let p = this.products;
        localStorage.setItem('products', JSON.stringify(p));
    }
    getProductsStorage = () => {
        let p = JSON.parse(localStorage.getItem('products'));
        console.log(p);
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
    addCardProduct(i,n,d,p) {
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
    addProductPage = () => {
        $('.section-home').fadeOut(500);
        $('.section-products').fadeIn(500);
    }
}
const formReset = () => {

}
const storesList = [];
const l = storesList.length; 
//  Aca se inicia la app 

let store = new StoreUser(0, 'Tienda', 'email@tienda.com', 'contraseña');
storesList.push(store);

$('.btn-add').on('click', () => {
    const ui = new UI();
    ui.addProductPage();
});
$(".btn-form").click((e) => {
    const state = checkForm();
    e.preventDefault();

    if(state){
        storesList[0].addProduct();
        $("#form")[0].reset();
    } else {storesList[0].addProduct();}
});
const checkForm = () => {
            
            let state = false;
            let productName = $('#product-name').val();
            let productDescription = $('#product-description').val();
            let productPrice = parseFloat($('#product-price').val());
            let productCategory = $('.form-select').val();

            if(productName && productDescription && productPrice && productCategory) {
                state = true;
            } else {}
            return state;
}
