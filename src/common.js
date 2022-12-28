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

        this.selectBox.innerHTML = `<button class="select-value" type="button">${optionValue[0]}</button><ul class="option"></ul>`

        for(let i = 1; i < optionValue.length; i++) {
            let option = document.createElement('li')
            option.innerHTML = `<button type="button">${optionValue[i]}</button>`
            this.selectBox.querySelector('.option').appendChild(option)
        }

        this.value = this.selectBox.querySelector('.select-value').text

        this.selectBox.onclick = (e) => {
            this.selectBox.querySelector('.option').classList.toggle('active')
            let selectBtn = this.selectBox.querySelectorAll('.option li button')

            for(let i = 0; i < selectBtn.length; i++) {
                if(e.target == selectBtn[i]) {
                    this.value = e.target.textContent
                    this.selectBox.querySelector('.select-value').innerText = this.value
                }
            }
        }

        window.addEventListener('click', (e) => {
            if(e.target !== this.selectBox.querySelector('.select-value')) {
                this.selectBox.querySelector('.option').classList.remove('active')
            }
        })
        
        this.location.appendChild(this.selectBox)
    }
}

// alert 레이어
// 
export function alertOpen(data) {
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

    for(let i = 0; i < document.querySelectorAll('.alert-bottom button').length; i++) {
        document.querySelectorAll('.alert-bottom button')[i].onclick = data.function[i]
    }

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