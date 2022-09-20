
const   buttons     = document.querySelectorAll('button'),
template    = document.querySelector('template'),
fragment    = document.createDocumentFragment(),
list     = document.querySelector('ul');


const carStore = []
const addToCar = (e) => {
    list.textContent = ''
    const product = {
        title: e.target.dataset.fruta,
        id   : e.target.dataset.fruta,
        cant : 1,
        };

    const index = carStore.findIndex( (item) => item.id == product.id)
    if( index == -1) {
        carStore.push(product)
    }else carStore[index].cant ++;
    
    showCar(carStore)
};

const showCar = (arr) => {
arr.forEach( item => {
const clone = template.content.firstElementChild.cloneNode(true);
clone.querySelector('span').textContent = item.title;
clone.querySelector('.badge').textContent = item.cant;

fragment.appendChild(clone)

})
list.appendChild(fragment)
}
buttons.forEach( button => button.addEventListener('click',addToCar));

{/* <li class="list-group-item d-flex justify-content-between align-items-center">
<span class="lead">A list item</span>
<span class="badge bg-primary rounded-pill">14</span>
</li> */}