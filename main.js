/*
[].forEach.call(tree.querySelectorAll('ul li a'), function(el, i) {
    if (el.nextElementSibling)
        el.nextElementSibling.classList.add('hidden');
});
*/
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
    maxid;
    constructor(menu) {
        this.menu = menu;

        this.menuDiv = document.getElementById('menu');
        this.inputsDiv = document.getElementById('inputs');
        this.firstUl = document.createElement('ul');

        this.inputName = document.getElementById('input-name');
        this.inputsIdSelector = document.getElementById('input-id-selector');
        this.inputInsertSelector = document.getElementById('input-insert-selector');
        this.submitButton = document.getElementById('submit-button');

        this.printMenu(this.menu);

        this.hiddenMenuElements();
        this.listeners();
        this.inputsIdSelectorFill();
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
        let allElement = this.menuDiv.querySelectorAll('div#menu a');
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
        let newA = this.createElementBuilder('a', { id: 'a_' + element.id, class: 'd-block text-decoration-none text-black m-1 p-1 bg-white rounded' });
        newA.innerHTML = element.name;
        newLi.appendChild(newA);

        // recursive
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

    inputsIdSelectorFill = () => {
        let num = 0;
        this.inputsIdSelector.innerHTML = '';
        let allId = this.menuDiv.querySelectorAll('div#menu li');
        allId.forEach((element) => {
            let newRow = this.createElementBuilder('option', { value: element.id }, element.id);
            this.inputsIdSelector.appendChild(newRow);
            num++;
        });
        this.maxid = num;
    }

    listeners = () => {

        [].forEach.call(this.menuDiv.querySelectorAll('ul li a'), function(el) {
            if (el.nextElementSibling)
                el.nextElementSibling.classList.add('hidden');
        });

        this.menuDiv.addEventListener('click', function(e) {
            var el = e.target;
            if (el.tagName === 'A') {
                e.preventDefault();
                console.log('Itt');
                console.log(el);
                if (el.nextElementSibling) {
                    el.nextElementSibling.classList.toggle('hidden');
                } else {
                    // last element
                    console.log('LAST ELEMENT');
                    console.log(el.textContent);
                }
            }
        });

        this.submitButton.addEventListener('click', () => this.addNewMenuElement(this.inputName.value, this.inputsIdSelector.value, this.inputInsertSelector.value, this.createElementBuilder, this.inputsIdSelectorFill, this.maxid++), false);

    }

    addNewMenuElement = (inputName, inputsIdSelector, inputInsertSelector, createElementBuilder, inputsIdSelectorFill, newId) => {

        console.log(inputName, inputsIdSelector, inputInsertSelector);

        if (inputInsertSelector === 'row') {
            let inserted = createElementBuilder('li', { id: newId, class: 'list-unstyled' });
            let newA = createElementBuilder('a', { id: 'a_' + newId, class: 'd-block text-decoration-none text-black m-1 p-1 bg-danger rounded' }, inputName + newId);
            inserted.appendChild(newA);
            let child = document.querySelector(`#menu li[id="${inputsIdSelector}"]`);
            let parent = child.parentNode;
            parent.insertBefore(inserted, child);
        }

        if (inputInsertSelector === 'child') {
            console.log(document.querySelector(`#menu a[id="a_${inputsIdSelector}"]`));

            let inserted = createElementBuilder('ul');
            let insLi = createElementBuilder('li', { id: newId, class: 'list-unstyled' });
            let newA = createElementBuilder('a', { id: 'a_' + newId, class: 'd-block text-decoration-none text-white m-1 p-1 bg-black rounded' }, inputName + newId);
            insLi.appendChild(newA);
            inserted.appendChild(insLi);
            //---
            let referenceNode = document.querySelector(`#menu a[id="a_${inputsIdSelector}"]`);

            referenceNode.parentNode.insertBefore(inserted, referenceNode.nextSibling);
        }

        inputsIdSelectorFill();
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
                    },
                    {
                        id: 6,
                        name: '06'
                    },
                    {
                        id: 7,
                        name: '07'
                    }
                ]
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


//let menu = [{ id: 0, name: '000' }];

menu = new Menu(menu);