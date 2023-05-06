class Menu {
    constructor(menu) {
        this.time = 2000
        this.staticMenu = menu
        this.staticMenuName = 'Fruits'
        this.menu = menu
        this.menuId = 0
        this.menuInVariable = []
        this.menuList =[]

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
        this.menuSelector = document.getElementById('menu-selector')
        this.menuName = document.getElementById('menu-name')
        this.msg = document.getElementById('msg')

        this.reloadMenu()
        this.listeners()
    }

    reloadMenu = () => {
        this.menuDiv.innerHTML = ''
        this.menuSelectorOptions()
        this.printMenu()
        this.elementSelectorOptions()
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

                let menuIns = {}
                menuIns['id'] = parseInt(li_element.getAttribute('id'))
                menuIns['name'] = li_element.querySelector(':scope > a').innerText

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
        this.menuInVariable = variableRecursiveBulder(firstMenuELement)
        console.log('----- menu in variable ----')
        console.log(this.menuInVariable)
    }

    saveDatabase = () => {
        this.variableSave()
                
        $("#msg").html('AJAX start!')
            
        $.ajax({
            method: "GET",
            url: "save.php",
            data: {data: JSON.stringify(this.menuInVariable), menuid: 2 },
            success: function(data){
                $("#msg").html(data);
                console.log(data);
            },
            error: function() {
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

        this.submitButtonIns.addEventListener('click', () => this.addNewMenuElement(this.inputName.value, this.inputsIdSelector.value, this.inputInsertSelector.value, this.createElementBuilder, this.elementSelectorOptions, this.maxid++), false)

        this.submitButtonDel.addEventListener('click', () => this.deleteMenuElement(this.inputsIdSelector.value, this.elementSelectorOptions), false)

        this.submitButtonRename.addEventListener('click', () => this.renameMenuElement(this.inputsIdSelector.value, this.inputName.value), false)

        this.submitButtonOpen.addEventListener('click', () => this.menuElementsSwitch('open'), false)

        this.submitButtonClose.addEventListener('click', () => this.menuElementsSwitch('close'), false)

        this.submitButtonSave.addEventListener('click', () => this.saveDatabase(), false)
        
        this.submitButtonReload.addEventListener('click', () => {
            this.menu = this.menuInVariable;
            this.reloadMenu()
        }, false)

        this.inputsIdSelector.addEventListener('change', (e) => this.colorizeError(document.querySelector(`[id="${e.target.value}"] a`))
        , false)

        this.menuSelector.addEventListener('change', (e) => {

            //console.log(e.target.value)
            var selectedId = e.target.value
            console.log(selectedId)

            if (selectedId === 0) {
                this.menu = this.staticMenu
                this.menuName.innerHTML = this.staticMenuName
            } else {
                for (const key in  this.menuList) {
                    const value =  this.menuList[key];
                    
                    console.log(value.name)

                    if (value.id == selectedId) {
                        this.menu = JSON.parse(value.menu)
                        this.menuName.innerHTML = value.name
                    }        
                }
            }

            this.reloadMenu()

        }, false)

    }

    addNewMenuElement = (inputName, inputsIdSelector, inputInsertSelector, createElementBuilder, elementSelectorOptions, newId) => {
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

        elementSelectorOptions()
    }

    renameMenuElement = (selectedId, newName) => {
        let actualElemet = document.querySelector(`[id="a_${selectedId}"]`)
        this.colorizeError(actualElemet)
        if (newName !== '') {
            console.log(newName)
            actualElemet.innerHTML = newName
            this.elementSelectorOptions()
            this.variableSave()
        } else {
            this.insertMessage('Üres az átnevezés mező!')
        }
    }

    deleteMenuElement(selectedId, elementSelectorOptions) {
        let selectedElement = document.querySelector(`[id="${selectedId}"]`)
        let thisParentElement = selectedElement.parentElement;
        if (selectedElement.querySelector('ul') == null || selectedElement.querySelector('ul').innerHTML=='') {

            if (thisParentElement.parentElement.getAttribute('id') === 'menu' && !(selectedElement.previousElementSibling || selectedElement.nextElementSibling)) {
                this.insertMessage('At least one menu item must remain!')
                this.colorizeError(thisParentElement.querySelector('li a'))
                return;
            }

            selectedElement.remove()

            if (thisParentElement.innerHTML == '') {
                thisParentElement.parentElement.querySelector('a').classList.add('last-link');
                thisParentElement.parentElement.querySelector('a i').setAttribute('class', '');
                thisParentElement.parentElement.querySelector('ul').remove()
            }

            elementSelectorOptions()

            this.variableSave()

        } else {
            this.colorizeError(selectedElement)
            
            this.insertMessage(selectedId + '. id. It cannot be deleted while you have children!')
        }
    }

    menuElementStyle = (newId, inputName) => {
        let element = this.createElementBuilder('li', { id: newId, class: 'list-unstyled' })
        let newA = this.createElementBuilder('a', { id: 'a_' + newId, class: 'd-flex justify-content-between align-items-center w-75 text-decoration-none text-black m-1 p-1 bg-white border rounded' }, inputName)
        let icon = this.createElementBuilder('i')
        if (!newA.querySelector('i')) { newA.appendChild(icon) }
        element.appendChild(newA)
        return element;
    }

    printMenu = (menuId) => {
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

        if (this.menu === '') {
            this.menu='<ul></ul>'
        }

        this.menu.forEach(element => {
            this.firstUl.appendChild(recursive(element))
        })
        this.menuDiv.appendChild(this.firstUl)
    }

    menuSelectorOptions = async (result) => {

        this.menuSelector.innerHTML = ''

        //let newRow = this.createElementBuilder('option', { id: 0 }, 'id: 0 Static Menu')
        let newRow = this.createElementBuilder('option', { id: 0 }, '0')
        this.menuSelector.appendChild(newRow)

        try {
            result = await $.ajax({
                method: "GET",
                url: "select.php",
                success: function(data){
                    return JSON.parse(data);
                },
                error: function() {
                    alert("Error: No respone AJAX!");
                }
            });
        } catch (error) {
            console.error(error);
        }

        this.menuList = JSON.parse(result);

        for (const key in  this.menuList) {
            const value =  this.menuList[key];
            //this.menuSelector.appendChild(this.createElementBuilder('option', {id: value.id}, 'id: ' + value.id +' '+ value.name))
            this.menuSelector.appendChild(this.createElementBuilder('option', {id: value.id}, value.id))
        };
    }

    elementSelectorOptions = () => {
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