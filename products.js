import {storesList, UI, checkForm} from './index.js';

$(document).ready(() => {
    const ui = new UI();
    
    const p = storesList[0].getProductsStorage();
    
    ui.renderProductsList(p);
    
    $('#delete-product').click((e)=>{
        const card = e.target.parentNode.parentNode;
        const i = card.id;
    
        console.log(i);
        
    })
    $(".btn-form").click((e) => {
        
        if(checkForm()){
            storesList[0].addProduct();
            $("#form")[0].reset();
        } else {storesList[0].addProduct();}
        e.preventDefault();
    });

})