class Menu {
    maxid
    constructor(menu) {
        this.menu = menu

        this.menuDiv = document.getElementById('menu')
        this.inputsDiv = document.getElementById('inputs')
        this.firstUl = document.createElement('ul')

        this.inputName = document.getElementById('input-name')
        this.inputsIdSelector = document.getElementById('input-id-selector')
        this.inputInsertSelector = document.getElementById('input-insert-selector')
        this.submitButton = document.getElementById('submit-button')

        this.printMenu(this.menu)

        this.hiddenMenuElements()
        this.listeners()
        this.inputsIdSelectorFill()
        console.log('qwerwer')
        this.menuDiv.querySelectorAll('ul li a').forEach((element) => {
            console.log(element.nextElementSibling.innerHTML);
            if (element.nextElementSibling) {
                element.nextElementSibling.classList.add('hidden')
            }
        });
    }

    // element builder
    createElementBuilder = (tagname, attributes, value) => {
        let newElement = document.createElement(tagname)
        for (let key in attributes) {
            newElement.setAttribute(key, attributes[key])
        }
        newElement.innerHTML = (value) ? value : null
        return newElement
    }

    hiddenMenuElements = () => {
        let allElement = this.menuDiv.querySelectorAll('div#menu a')
        allElement.forEach((element) => {
            if (element.nextElementSibling) {
                element.nextElementSibling.classList.add('hidden')
            }
        })
    }

    // start
    printMenu = () => {
        this.menu.forEach(element => {
            this.firstUl.appendChild(this.recursive(element))
        })
        this.menuDiv.appendChild(this.firstUl)
    }

    recursive = (element) => {
        let newLi = this.createElementBuilder('li', { id: element.id, class: 'list-unstyled' })
        let newA = this.createElementBuilder('a', { id: 'a_' + element.id, class: 'd-block text-decoration-none text-black m-1 p-1 bg-white rounded' })
        newA.innerHTML = element.name
        let newUl = this.createElementBuilder('ul')
        newLi.appendChild(newA)
        newLi.appendChild(newUl)

        // recursive
        if (element.child) {
            let childUl = this.createElementBuilder('ul')
            element.child.forEach(element => {
                childUl.appendChild(this.recursive(element))
            })
            newLi.appendChild(childUl)
        }
        return newLi
    }

    inputsIdSelectorFill = () => {
        let num = 0
        this.inputsIdSelector.innerHTML = ''
        let allId = this.menuDiv.querySelectorAll('div#menu li')
        allId.forEach((element) => {

            if (element.querySelector('a').nextElementSibling) {
                if (element.querySelector('a').nextElementSibling.innerHTML === '') {
                    element.querySelector('a').style.fontStyle = 'italic'
                }
            }

            let name = element.querySelector('a').innerHTML
            let newRow = this.createElementBuilder('option', { value: element.id }, name)
            this.inputsIdSelector.appendChild(newRow)
            num++
        })
        this.maxid = num
    }

    listeners = () => {
        this.menuDiv.addEventListener('click', function(e) {
            var el = e.target
            if (el.tagName === 'A') {
                e.preventDefault()
                if (el.nextElementSibling) {
                    el.nextElementSibling.classList.toggle('hidden')
                } else {
                    // last element
                    console.log('LAST ELEMENT')
                    console.log(el.textContent)
                }
            }
        })

        this.submitButton.addEventListener('click', () => this.addNewMenuElement(this.inputName.value, this.inputsIdSelector.value, this.inputInsertSelector.value, this.createElementBuilder, this.inputsIdSelectorFill, this.maxid++), false)
    }

    addNewMenuElement = (inputName, inputsIdSelector, inputInsertSelector, createElementBuilder, inputsIdSelectorFill, newId) => {

        console.log(inputName, inputsIdSelector, inputInsertSelector)
            //row
        if (inputInsertSelector === 'row') {
            let inserted = createElementBuilder('li', { id: newId, class: 'list-unstyled' })
            let newA = createElementBuilder('a', { id: 'a_' + newId, class: 'd-block text-decoration-none text-black m-1 p-1 bg-danger rounded' }, inputName + newId)
            let newUl = createElementBuilder('ul')
            inserted.appendChild(newA)
            inserted.appendChild(newUl)
            let child = document.querySelector(`#menu li[id="${inputsIdSelector}"]`)
            let parent = child.parentNode
            parent.insertBefore(inserted, child)
        }
        //child
        if (inputInsertSelector === 'child') {
            let inserted = createElementBuilder('li', { id: newId, class: 'list-unstyled' })
            let newA = createElementBuilder('a', { id: 'a_' + newId, class: 'd-block text-decoration-none text-white m-1 p-1 bg-black rounded' }, inputName + newId)
            let newUl = createElementBuilder('ul')
            inserted.appendChild(newA)
            inserted.appendChild(newUl)
            let referenceNode = document.querySelector(`#menu a[id="a_${inputsIdSelector}"]`)

            referenceNode.parentNode.querySelector('ul').classList.remove('hidden')
            referenceNode.parentNode.querySelector('ul').appendChild(inserted)
        }

        inputsIdSelectorFill()
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
]

//menu = [{ id: 0, name: '001' }]

menu = new Menu(menu)