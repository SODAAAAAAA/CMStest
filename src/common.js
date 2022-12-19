// select 박스 생성
// .value로 선택값 가져오기

// data : ["교재 유형 전체", "개념서", "유형서", "아르케 초등", "아르케 중등"]
// is_ok : ["검수 여부 전체", "검수 완료", "검수 대기"] / ["0", "1"]
// is_activ : ["노출여부 전체", "교재숨김", "교재노출"]

export class SelectBox {
    constructor(data) {
        this.option = data
        this.value = null //미완
    }

    create(location) {
        let selectBox = document.createElement('select')
        let optionValue = this.option

        for(let i = 0; i < optionValue.length; i++) {
            let option = document.createElement('option')
            option.innerText = optionValue[i]
            selectBox.appendChild(option)
        }

        location.appendChild(selectBox)

        this.value = selectBox.value
    }
}

// alert 레이어
export function alertOpen(data) {
    let alertObj = {
        cancel : {
            text : ['변경사항이 있습니다.', '저장하지 않고 취소하시겠습니까?'],
            button : ['확인', '취소']
        },
        delete : {
            text : ['현재의 교재를', '정말 삭제하시겠습니까?'],
            button : ['확인', '취소']
        },
        save : {
            text : ['교재가 저장되었습니다.'],
            button : ['확인']
        },
        change : {
            text : ['현재 교재의 섬네일이 있습니다.', '새로 변경하시겠습니까?'],
            button : ['확인', '취소']
        },
    }

    let alertContents = alertObj[data]

    if(alertContents) {
        if(document.querySelector('.alert')) {
            document.querySelector('.alert').remove();
        }

        let alertBox = document.createElement('div')
        alertBox.setAttribute('class', 'alert')

        alertBox.innerHTML = `<div class="alert-top"><button>X</button></div>
        <div class="alert-middle"></div>
        <div class="alert-bottom"></div>`

        for(let i = 0; i < alertContents.text.length; i++) {
            let alertSentence = document.createElement('p')
            alertSentence.innerText = alertContents.text[i]
            alertBox.querySelector('.alert-middle').appendChild(alertSentence)
        }

        for(let i = 0; i < alertContents.button.length; i++) {
            let alertButton = document.createElement('button')
            alertButton.innerText = alertContents.button[i]
            alertBox.querySelector('.alert-bottom').appendChild(alertButton)
        }

        document.querySelector('#root').appendChild(alertBox)

        for(let i = 0; i < alertBox.querySelectorAll('button').length; i++) {
            alertBox.querySelectorAll('button')[i].addEventListener('click',
            () => {document.querySelector('.alert').classList.add('out');})
        }
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