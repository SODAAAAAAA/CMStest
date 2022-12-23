// select 박스 생성

export class SelectBox {
    constructor(data, location) {
        this.option = data
        this.location = location
        this.create()
    }

    create() {
        this.selectBox = document.createElement('select')
        let optionValue = this.option

        for(let i = 0; i < optionValue.length; i++) {
            let option = document.createElement('option')
            option.innerText = optionValue[i]
            this.selectBox.appendChild(option)
        }

        this.value = this.selectBox.options[this.selectBox.selectedIndex].text

        this.selectBox.onchange = () => {
            this.value = this.selectBox.value
        }
        
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

    alertBox.querySelector('.alert-top button').addEventListener('click',
        () => {document.querySelector('.alert').classList.add('out');}
    )
}

// 등록시 저장파일명 문자열 파싱

export function fileName() {
    let filter = document.querySelector('.filter')

    let rev = filter.querySelector('.year .checked button').textContent.substring(2)
    let sch = filter.querySelector('.school .checked button').textContent
    let grd = filter.querySelector('.grade .checked button').textContent
    let sem = filter.querySelector('.sem .checked button').textContent
    let brand = filter.querySelector('.brand > .checked button').textContent

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
    if(document.querySelector('.brand > .checked div')) {
        brand = `${brand.substring(0, 1)}${document.querySelector('.brand .checked .checked button').textContent}`
    }

    let name = `bookcover_${rev}${sch}${grd}${sem}${brand}.jpg`

    console.log(name)
    return name
}