[].forEach.call(tree.querySelectorAll('ul li a'), function(el, i) {
    if (el.nextElementSibling)
        el.nextElementSibling.classList.add('hidden');
});

/* here we make a event delegation, we add an event handler to the hole tree */
tree.addEventListener('click', function(e) {
    var el = e.target;

    /* ha a kattintott elem egy horgony, az azért van, mert csomópont/levél */
    /* if the element clicked is an anchor, it's because it's a node/leaf */
    if (el.tagName === 'A') {
        // letiltja az alapértelmezett történést
        //e.preventDefault();

        /* ha van nextElementSibling, az azért van, mert gyerekei vannak, tehát csomópont */
        /* if it has a nextElementSibling, it's because it has children, so it's a node */
        if (el.nextElementSibling) {

            /* átkapcsoljuk a gyermek láthatóságát */
            /* we toggle the visibility of the child */
            el.nextElementSibling.classList.toggle('hidden');
        } else {
            // csinálj valamit az utolsó gyermekkel (levél)
            // do something with the final child (leaf)
            console.log(el.textContent);
        }
    }
});

class Menu {
    constructor(menu) {
        this.menu = menu;

        this.menuDiv = document.getElementById('menu');
        this.firstUl = document.createElement('ul');

        this.printMenu(this.menu);

        this.listeners();
        this.hiddenMenuElements();
    }

    // element builder
    createElementBuilder = (tagname, attributes, value) => {
        let newElement = document.createElement(tagname);
        for (let key in attributes) {
            newElement.setAttribute(key, attributes[key]);
        }
        newElement.innerHTML = (value) ? value : null;
        return newElement;
    }

    hiddenMenuElements = () => {
        let allElement = this.menuDiv.querySelectorAll('a');
        allElement.forEach((element) => {
            if (element.nextElementSibling) {
                element.nextElementSibling.classList.add('hidden');
            }
        });
    }

    // start
    printMenu = () => {
        this.menu.forEach(element => {
            console.log(element);
            this.firstUl.appendChild(this.addNewRow(element));
        });
        this.menuDiv.appendChild(this.firstUl)
    }

    addNewRow = (element) => {
        console.log(element.id, element.name)
        let newLi = this.createElementBuilder('li', { id: element.id, class: 'list-unstyled' });
        let newA = this.createElementBuilder('a');
        newA.innerHTML = element.name;
        newLi.appendChild(newA);

        //create add new li input
        //newLi.appendChild(this.createLi(element.id));


        if (element.child) {
            console.log(element.child);
            let childUl = this.createElementBuilder('ul');
            element.child.forEach(element => {
                console.log(element);
                childUl.appendChild(this.addNewRow(element));
            });
            newLi.appendChild(childUl);
        }

        return newLi;
    }

    createLi = (id) => {
        let div = this.createElementBuilder('div', { class: 'p-1 border border-primary', id: 'createli_' + id });
        let input = this.createElementBuilder('input', { type: 'text', class: 'form-control form-control-sm d-inline w-75' });
        let button = this.createElementBuilder('button', { 'onclick': 'menu.addNewLi(' + id + ');', class: 'btn btn-sm p-1 m-0 btn-primary' }, 'Add');
        div.appendChild(input);
        div.appendChild(button);
        return div;
    }

    addNewLi = (id) => {
        console.log('addNewLi ID: ' + id);
    }

    listeners = () => {
        this.menuDiv.addEventListener('click', function(e) {
            var el = e.target;
            if (el.tagName === 'A') {
                e.preventDefault();
                if (el.nextElementSibling) {
                    el.nextElementSibling.classList.toggle('hidden');
                } else {
                    // last element
                    console.log('LAST ELEMENT');
                    console.log(el.textContent);
                }
            }
        });
    }

}

let menu = [{
        id: 0,
        name: '00',
        child: [{
                id: 1,
                name: '01',
                child: [{
                    id: 5,
                    name: '05'
                }]
            },
            {
                id: 3,
                name: '03'
            }
        ],
    },
    {
        id: 4,
        name: '04'
    },
];

menu = new Menu(menu);