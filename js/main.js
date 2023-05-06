class Menu {
    maxid
    constructor(menu) {
        this.time = 2000
        this.menu = menu
        this.menuInvariable = []

        this.menuDiv = document.getElementById('menu')
        this.inputsDiv = document.getElementById('inputs')
        this.firstUl = document.createElement('ul')

        this.inputName = document.getElementById('input-name')
        this.inputsIdSelector = document.getElementById('input-id-selector')
        this.inputInsertSelector = document.getElementById('input-insert-selector')
        this.submitButtonIns = document.getElementById('submit-button-ins')
        this.submitButtonDel = document.getElementById('submit-button-del')
        this.submitButtonRename = document.getElementById('submit-button-rename')
        this.submitButtonOpen = document.getElementById('submit-menu-open')
        this.submitButtonClose = document.getElementById('submit-menu-close')
        this.submitButtonSave = document.getElementById('submit-button-save')
        this.submitButtonReload = document.getElementById('submit-button-reload')
        this.msg = document.getElementById('msg')

        this.reloadMenu()
        this.listeners()
    }

    reloadMenu = () => {
        this.menuDiv.innerHTML = ''
        this.printMenu()
        this.inputsIdSelectorFill()
        this.variableSave()
        this.menuElementsSwitch('open')
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

    variableSave = () => {
        
        const variableRecursiveBulder = (ul_element) => {   
            let legoMenu = []
            ul_element.querySelectorAll(':scope > li').forEach(li_element => {

                let menuIns = []
                menuIns['id'] = li_element.getAttribute('id')
                menuIns['name'] = li_element.querySelector(':scope > a').innerHTML

                if (li_element.querySelector(':scope > a').nextElementSibling) {
                    if (li_element.querySelector(':scope > a').nextElementSibling.tagName === 'UL') {
                        menuIns['child'] = variableRecursiveBulder(li_element.querySelector(':scope > a').nextElementSibling)
                    }
                }
    
                legoMenu.push(menuIns)
            });
            return legoMenu;
        }

        let firstMenuELement = this.menuDiv.querySelector('div#menu ul')
        this.menuInvariable = variableRecursiveBulder(firstMenuELement)
        console.log('----- END ----')
        console.log(this.menuInvariable)
    }

    saveDatabase = () => {
        this.variableSave()
        
        let menu = this.menuInvariable
        
        $("#msg").html('AJAX indul!')
            
        $.ajax({
            method: "POST",
            url: "save.php",
            data: {menu: menu},
            success: function(data){
                $("#msg").html(data);
                console.log(data);
            },
            error: function(response) {
                alert("Error: No respone AJAX!");
            }
        });
    }

    menuElementsSwitch = (mode) => {
        let allElement = this.menuDiv.querySelectorAll('div#menu a')
        allElement.forEach((element) => {
            if (element.querySelector('i')) {
                element.querySelector('i').classList.remove('open')
                element.querySelector('i').classList.remove('close')
            }

            if (element.nextElementSibling) {
                if (mode == 'close') {
                    element.nextElementSibling.classList.add('hidden')

                    if (element.querySelector('i'))
                        element.querySelector('i').classList.add('open')
                }
                if (mode == 'open') {
                    element.nextElementSibling.classList.remove('hidden')
                   
                    if (element.querySelector('i'))
                        element.querySelector('i').classList.add('close')
                }
            } else {
                element.classList.add('last-link')
            }
        })
    }

    printMenu = () => {
        const recursive = (element) => {
            let inserted = this.menuElementStyle(element.id, element.name)
            // recursive
            if (element.child) {
                let childUl = this.createElementBuilder('ul')
                element.child.forEach(element => {
                    childUl.appendChild(recursive(element))
                })
                inserted.appendChild(childUl)
            }
            return inserted
        }

        // start print menu
        this.firstUl.innerHTML=''

        this.menu.forEach(element => {
            this.firstUl.appendChild(recursive(element))
        })
        this.menuDiv.appendChild(this.firstUl)
    }
    
    listeners = () => {
        this.menuDiv.addEventListener('click', function(e) {
            var el = e.target
            if (el.tagName === 'A') {
                e.preventDefault()
                if (el.nextElementSibling) {
                    el.nextElementSibling.classList.toggle('hidden')
                    if (el.nextElementSibling.className==='hidden') {
                        el.querySelector('i').classList.remove('open')
                        el.querySelector('i').classList.remove('close')
                        el.querySelector('i').classList.add('open')
                    } else {

                        el.querySelector('i').classList.remove('open')
                        el.querySelector('i').classList.remove('close')
                        el.querySelector('i').classList.add('close')
                    }
                } else {
                    // last element                
                    document.getElementById('msg').innerHTML = 'clicked menu id: ' + el.parentElement.getAttribute("id")
                }
            }
        })

        this.submitButtonIns.addEventListener('click', () => this.addNewMenuElement(this.inputName.value, this.inputsIdSelector.value, this.inputInsertSelector.value, this.createElementBuilder, this.inputsIdSelectorFill, this.maxid++), false)

        this.submitButtonDel.addEventListener('click', () => this.deleteMenuElement(this.inputsIdSelector.value, this.inputsIdSelectorFill), false)

        this.submitButtonRename.addEventListener('click', () => this.renameMenuElement(this.inputsIdSelector.value, this.inputName.value), false)

        this.submitButtonOpen.addEventListener('click', () => this.menuElementsSwitch('open'), false)

        this.submitButtonClose.addEventListener('click', () => this.menuElementsSwitch('close'), false)

        this.submitButtonSave.addEventListener('click', () => this.saveDatabase(), false)

        this.submitButtonReload.addEventListener('click', () => {
            this.menu = this.menuInvariable;
            this.reloadMenu()
        }, false)
    }

    renameMenuElement = (selectedId, newName) => {
        let actualElemet = document.querySelector(`[id="a_${selectedId}"]`)
        this.colorizeError(actualElemet)
        if (newName !== '') {
            console.log(newName)
            actualElemet.innerHTML = newName
            this.inputsIdSelectorFill()
            this.variableSave()
        } else {
            this.insertMessage('Üres az átnevezés mező!')
        }
    }

    deleteMenuElement(selectedId, inputsIdSelectorFill) {
        let selectedElement = document.querySelector(`[id="${selectedId}"]`)
        console.log(selectedElement.querySelector('ul'))
        if (selectedElement.querySelector('ul') == null) {
            selectedElement.remove()
            inputsIdSelectorFill()
            this.variableSave()
        } else {
            this.colorizeError(selectedElement)
            this.insertMessage(selectedId + ' Nem törölhető amíg vannak gyermekei!')
        }
    }

    addNewMenuElement = (inputName, inputsIdSelector, inputInsertSelector, createElementBuilder, inputsIdSelectorFill, newId) => {
        //row
        if (inputInsertSelector === 'row') {
            let inserted = this.menuElementStyle(newId, inputName)
            inserted.querySelector('a').classList.add('last-link')
            let child = document.querySelector(`#menu li[id="${inputsIdSelector}"]`)
            let parent = child.parentNode
                //parent.insertBefore(inserted, child)  Ha a sor elejére akarom beilleszteni
            parent.appendChild(inserted)
        }
        //child
        if (inputInsertSelector === 'child') {
            let inserted = this.menuElementStyle(newId, inputName)
            inserted.querySelector('a').classList.add('last-link')
            let referenceNode = document.querySelector(`#menu a[id="a_${inputsIdSelector}"]`)
            if (referenceNode.parentNode.querySelector('ul') == null) {
                let noFindUl = createElementBuilder('ul')
                referenceNode.parentNode.appendChild(noFindUl)
            }
            referenceNode.parentNode.querySelector('ul').appendChild(inserted)
            // parent icon create
            if (referenceNode.parentNode.querySelector('ul').className==='hidden') {
                referenceNode.parentNode.querySelector('i').classList.remove('open')
                referenceNode.parentNode.querySelector('i').classList.remove('close')
                referenceNode.parentNode.querySelector('i').classList.add('open')
            } else {
                referenceNode.parentNode.querySelector('i').classList.remove('open')
                referenceNode.parentNode.querySelector('i').classList.remove('close')
                referenceNode.parentNode.querySelector('i').classList.add('close')
            }
            referenceNode.parentNode.querySelector('a').classList.remove('last-link')

        }

        this.variableSave()
        this.insertMessage(newId + '. id-jű ' + inputInsertSelector + ' beillesztve! Neve: ' + inputName)

        inputsIdSelectorFill()
    }

    menuElementStyle = (newId, inputName) => {
        let element = this.createElementBuilder('li', { id: newId, class: 'list-unstyled' })
        let newA = this.createElementBuilder('a', { id: 'a_' + newId, class: 'd-flex justify-content-between align-items-center w-75 text-decoration-none text-black m-1 p-1 bg-white border rounded' }, inputName)
        let icon = this.createElementBuilder('i')
        if (!newA.querySelector('i')) { newA.appendChild(icon) }
        element.appendChild(newA)
        return element;
    }

    inputsIdSelectorFill = () => {
        let num = 1
        this.inputsIdSelector.innerHTML = ''
        let allId = this.menuDiv.querySelectorAll('div#menu li')
        allId.forEach((element) => {
            let name = element.querySelector('a').innerHTML
            let newRow = this.createElementBuilder('option', { value: element.id }, 'id: ' + element.id + ' | ' + name)
            this.inputsIdSelector.appendChild(newRow)
            num++
        })
        this.maxid = num + 1
    }

    insertMessage(msg) {
        this.msg.innerHTML = msg
        setTimeout(() => { this.msg.innerHTML = ' ' }, this.time)
    }

    colorizeError(element) {

        console.log(element)

        element.classList.add('colorize');
        setTimeout(() => {
            element.classList.remove('colorize');
        }, this.time)
    }

}

let menu1 = [{
    id: 0,
    name: 'tangerine',
    child: [{
            id: 1,
            name: 'tomato',
            child: [{
                    id: 2,
                    name: 'kumquat'
                },
                {
                    id: 3,
                    name: 'avocado'
                },
            ]
        },
        {
            id: 4,
            name: 'pomegranate'
        }
    ],
},
{
    id: 5,
    name: 'pomegranate',
    child: [{
        id: 6,
        name: 'lime',
        child: [{
                id: 7,
                name: 'raspberry'
            },
            {
                id: 8,
                name: 'apricot'
            },
        ]
    }]
},
{
    id: 9,
    name: 'kiwi'
},
]

let menu2 = [{ id: 1, name: 'Clear menu' }]

classMenu = new Menu(menu1)