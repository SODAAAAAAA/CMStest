// select 박스 생성

export class SelectBox {
    constructor(data, location) {
        this.option = data
        this.location = location
        this.value = this.create()
    }

    create() {
        let selectBox = document.createElement('select')
        let optionValue = this.option

        for(let i = 0; i < optionValue.length; i++) {
            let option = document.createElement('option')
            option.innerText = optionValue[i]
            selectBox.appendChild(option)
        }

        this.value = selectBox.options[selectBox.selectedIndex].text

        selectBox.onchange = () => {
            this.value = selectBox.value
            console.log(this.value)
            return this.value
        }
        
        this.location.appendChild(selectBox)
        return this.value
    }
}

// alert 레이어
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

    for(let i = 0; i < alertBox.querySelectorAll('button').length; i++) {
        alertBox.querySelectorAll('button')[i].addEventListener('click',
        () => {document.querySelector('.alert').classList.add('out');})
    }
}

// 등록시 저장파일명 문자열 파싱

// rev:"",
// sch:[],
// grd:[],
// sem:"",
// brand:[],

export function fileName(data) {
    let rev = data.rev
    let sch = data.sch
    let grd = data.grd
    let sem = data.sem
    let brand = data.brand

    console.log(data)
    console.log(`bookcover_${rev}${sch}${grd}${sem}${brand}.jpg`)

    return `bookcover_${rev}${sch}${grd}${sem}${brand}.jpg`
}