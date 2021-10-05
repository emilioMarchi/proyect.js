import {storesList, UI, checkForm} from './index.js';

const ui = new UI();
const p = storesList[0].getProductsStorage();
console.log(p)
ui.renderProductsList(p);


$('.delete').click((e) => {
    const card = e.target.parentNode.parentNode;
    const i = card.id;
    card.remove();
    
    setTimeout(()=>{
        storesList[0].products.splice(i,1);
        console.log(storesList[0].products)
    }, 1000);
});
$('#save').click(()=>{
    storesList[0].postProductsStorage();
});


$(".btn-form").click((e) => {
    e.preventDefault();
    if(checkForm()){
        storesList[0].addProduct();
        $("#form")[0].reset();
    } else {storesList[0].addProduct();}
});

        
    
    
        
