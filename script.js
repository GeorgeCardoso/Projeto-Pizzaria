let modalQt = 1;


const dqs = (el) => {
    return document.querySelector(el);
}
/* a mesma arrow function de cima só que simlificada

const dqs = (el)=> document.querySelector(el);

*/
const dqsa = (els) => {
    return document.querySelectorAll(els);
}
/* a mesma arrow function de cima só que simlificada

const dqsa = (els)=> document.querySelectorAll(els);

*/


pizzaJson.map((item, index) => {

    let pizzaItem = dqs('.models .pizza-item').cloneNode(true);
    // preenche as informações em pizzas

    pizzaItem.setAttribute('data-key', index);
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    // uso da tamplate string e utilizando o toFixed(2) para fixar 2 itens deposi da virgula
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    //evento de click para abrir o modale e preencher o mesmo
    pizzaItem.querySelector('a').addEventListener('click', (e) => {
        //desativa o evento padrão de atualizar a tela da tag
        e.preventDefault();

        let key = e.target.closest('.pizza-item').getAttribute('data-key');

        modalQt = 1;


        dqs('.pizzaBig img').src = pizzaJson[key].img;
        dqs('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
        dqs('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        dqs('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        dqs('.pizzaInfo--size.selected').classList.remove('selected');
        dqsa('.pizzaInfo--size').forEach((size, sizeIndex) => {

            if (sizeIndex == 2) {
                size.classList.add('selected');
            }

            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
        });
        dqs('.pizzaInfo--qt').innerHTML = modalQt;

        dqs('.pizzaWindowArea').style.opacity = 0;
        dqs('.pizzaWindowArea').style.display = 'flex';
        setTimeout(() => {
            dqs('.pizzaWindowArea').style.opacity = 1;
        }, 200);



    });
    //fim do modal

    dqs('.pizza-area').append(pizzaItem);


});

//eventos do modal

function closeModal() {

    dqs('.pizzaWindowArea').style.opacity = 0;

    setTimeout(() => {
        dqs('.pizzaWindowArea').style.display = 'none';
    }, 500);
};

dqsa('.pizzaInfo--cancelMobileButton, .pizzaInfo--cancelButton').forEach((item) => {
    item.addEventListener('click', closeModal);
});

dqs('.pizzaInfo--qtmenos').addEventListener('click', () => {

    if (modalQt > 1) {
        modalQt--;
    }
    dqs('.pizzaInfo--qt').innerHTML = modalQt;
})

dqs('.pizzaInfo--qtmais').addEventListener('click', () => {
    modalQt++;
    dqs('.pizzaInfo--qt').innerHTML = modalQt;
})

dqsa('.pizzaInfo--size').forEach((size, sizeIndex) => {

    size.addEventListener('click', (e) => {
        dqs('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
    });
});