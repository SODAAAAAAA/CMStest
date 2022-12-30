// select 박스 생성

export class SelectBox {
    constructor(data, location) {
        this.option = data
        this.location = location
        this.create()
    }

    create() {
        this.selectBox = document.createElement('div')
        this.selectBox.setAttribute('class', 'select')
        let optionValue = this.option

        this.valueBox = document.createElement('button')
        this.valueBox.setAttribute('class', 'select-value')
        this.valueBox.setAttribute('type', 'button')
        this.valueBox.innerText = optionValue[0]

        let optionBox = document.createElement('ul')
        optionBox.setAttribute('class', 'option')

        this.selectBox.appendChild(this.valueBox)
        this.selectBox.appendChild(optionBox)

        let optionBtn = []
        for(let i = 1; i < optionValue.length; i++) {
            let optionLi = document.createElement('li')
            let selectBtn = document.createElement('button')
            selectBtn.setAttribute('type', 'button')
            selectBtn.innerText = optionValue[i]
            optionLi.appendChild(selectBtn)
            optionBox.appendChild(optionLi)

            optionBtn.push(selectBtn)
        }

        this.value = this.valueBox.textContent

        this.selectBox.onclick = (e) => {
            optionBox.classList.toggle('active')

            for(let i = 0; i < optionBtn.length; i++) {
                if(e.target == optionBtn[i]) {
                    this.value = e.target.textContent
                    this.valueBox.innerText = this.value
                }
            }
        }
        
        this.location.appendChild(this.selectBox)
    }
}

// alert 레이어
export function alertOpen(data, pre) {

    if(pre != null) {
        if(pre.name == 'checkChange') {
            pre()
            return
        } else {
            pre()
        }
    }

    let alertBox = document.querySelector('.alert')

    alertBox.classList.remove('out')
    document.querySelector('.alert-middle').textContent = '';

    for(let i = 0; i < data.text.length; i++) {
        let alertSentence = document.createElement('p')
        alertSentence.innerText = data.text[i]
        alertBox.querySelector('.alert-middle').appendChild(alertSentence)
    }

    let cancelBtn = document.querySelector('.alert-bottom .cancel-btn')
    if(data.button.length < 2) {
        cancelBtn.style.display = 'none'
    } else {
        cancelBtn.style.display = 'inline'
    }

    document.querySelectorAll('.alert-bottom button')[0].onclick = data.function[0]
    document.querySelectorAll('.alert-bottom button')[1].onclick = alertClass

    alertBox.querySelector('.alert-top button').addEventListener('click', alertClass)
}

export function alertClass() {
    let alertBox = document.querySelector('.alert')
    document.querySelector('.alert').classList.add('out');
    alertBox.querySelector('.alert-top button').removeEventListener('click', alertClass)
}

// 등록시 저장파일명 문자열 파싱

export function fileName() {
    let filter = document.querySelector('.filter')

    let rev = filter.querySelector('.year .checked').textContent.substring(2)
    let sch = filter.querySelector('.school .checked').textContent
    let grd = filter.querySelector('.grade .checked').textContent
    let sem = filter.querySelector('.semester .checked').textContent
    let brand = filter.querySelector('.brand > li > .checked').textContent

    switch(sch){
        case '초': sch = 'E'; break;
        case '중': sch = 'M'; break;
        case '고': sch = 'H'; break;
    }

    let brandObj = {
        '개념서' : 'CO',
        '아르케' : 'AR',
        '뜨레스' : 'TR',
        '엑사스' : 'HE',
        '노벰' : 'NO',
    }
    brand = brandObj[brand]
    if(document.querySelector('.brand > .checked + ul')) {
        brand = `${brand.substring(0, 1)}${document.querySelector('.brand .checked + ul .checked').textContent}`
    }

    let name = `bookcover_${rev}${sch}${grd}${sem}${brand}.jpg`

    console.log(name)
    return name
}

window.addEventListener('click', (e) => {
    for(let i = 0; i < document.querySelectorAll('.select-value').length; i++) {
        if(e.target !== document.querySelectorAll('.select-value')[i]) {
            document.querySelectorAll('.option')[i].classList.remove('active')
        }
    }
})