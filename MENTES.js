variableSave = () => {
    console.log('VARIABLE SAVE:')
    console.log('menuDiv:')
    console.log(this.menuDiv)
        /*
        let findId = 4
        var foundIndex = this.menu.findIndex(x => x.id === findId);
        console.log(this.menu[foundIndex])
        */
    console.log('variable:')
    console.log(this.menu)
    console.log('--------------')

    function recursiveLog(element) {

        let menuRow = {}

        console.log(element)
        console.log(element.tagName)

        if (element.tagName === 'UL') {
            console.log('Ez egy <ul> REKURZIOBAKULD')

            throw new Error("ERROR");
            /*
            console.log(element.children)
            console.log('length ' + element.children.length)

            for (let n = 0; n < element.children.length; n++) {
                //menuRow['child'][recursiveLog(element.children[n])]
                //menuRow['child'] = [{ 'kisfasz': '123123' }]
                menuRow['child'].push(recursiveLog(element.children[n]))

            }
            */
        }


        if (element.tagName === 'LI') {
            console.log('Ez egy <li>')
            element = element.children
        }



        if (element.tagName === 'A') {
            console.log('Ez egy <a>')

            let splitId = element.getAttribute('id').split('_')
            let aId = splitId[splitId.length - 1]

            console.log(element.getAttribute('id') + ' kiszed:' + aId)

            menuRow['id'] = aId
            menuRow['name'] = element.innerHTML

        }

        return menuRow;
    }

    this.buildMenu = []

    let allElement = this.menuDiv.querySelectorAll('div#menu a')
    allElement.forEach((element) => {
        console.log('FŐ element eleje: ----')
        console.log(element)

        this.buildMenu.push(recursiveLog(element))

        console.log('FŐ element vége ----')
    })

    console.log('----- END ----')

    console.log(this.buildMenu)
        /*
        if (element.nextElementSibling) {
            console.log(element.nextElementSibling)
        }
        */
}