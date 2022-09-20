
const template          = document.getElementById('template'),
        footer          = document.getElementById('footer'),
        templateFooter  = document.getElementById('template-footer'),
        fragment        = document.createDocumentFragment(),
        list            = document.querySelector('ul');
let     carStore        = [];


document.addEventListener('click', (e) => {
    if(e.target.matches('.card .btn-primary')) {
        addToCar(e);
    }
    if(e.target.matches('.list-group-item .btn-success')){
        addCant(e)
    }
    if(e.target.matches('.list-group-item .btn-danger')){
        removeCant(e)
    }
})

const addToCar = (e) => {
    const product = {
        title: e.target.dataset.fruta,
        id   : e.target.dataset.fruta,
        price: parseInt(e.target.dataset.price),
        cant : 1,
        };
    const index = carStore.findIndex( (item) => item.id == product.id)
    if( index == -1) {
        carStore.push(product)
    }else {
        carStore[index].cant ++;
        //carStore[index].price = carStore[index].cant * product.price;
    }
    //console.log(carStore);
    showCar()
};
const showCar = () => {
    list.textContent = ''
    carStore.forEach( item => {
    const clone = template.content.cloneNode(true);
    clone.querySelector('.text-white .lead').textContent    = item.title;
    clone.querySelector('.badge').textContent               = item.cant;
    clone.querySelector('div .lead span').textContent       = item.price * item.cant;
    clone.querySelector('.btn-danger').dataset.id           = item.id;
    clone.querySelector('.btn-success').dataset.id           = item.id;
    fragment.appendChild(clone)
    });
    //console.log(carStore);
    list.appendChild(fragment)
    showFooter()
};
const showFooter = () => {
    footer.textContent = '';
    const total = carStore.reduce(
        (acc, current) => acc + (current.cant * current.price),
        0);
    const clone = templateFooter.content.cloneNode(true);
    clone.querySelector('span').textContent = total;
    footer.appendChild(clone);
    if(total == 0) {
        footer.textContent = '';
    }
}
const addCant = (e) =>{
    carStore = carStore.map( item => {
        if(item.id == e.target.dataset.id) {
            item.cant++
        }
        return item
    })
    showCar()
}
const removeCant = (e) =>{
    carStore = carStore.filter( item => {
        if(item.id == e.target.dataset.id) {
            if(item.cant > 0) {
                item.cant--;
                if(item.cant === 0 ) return;
                return item;
            }
        }
    })
    showCar()
}