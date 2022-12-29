import * as CM from "../filter";
import * as common from "../common";
import API from "../api";

const Filter = new CM.FilterButton(false,"set");
let setInfo = false;
export default function setBookInfo(bookInfo){

    const filterButtons = document.getElementsByClassName("filter")[0].getElementsByTagName("button");

    for(let i=0,j=filterButtons.length; i<j; i++){
        filterButtons[i].addEventListener("click", function(){
            console.log(Filter.select);
            if(!setInfo){
                let complete = true
                for (let keys in Filter.select){
                    if(Filter.select[keys].length ==0) complete = false;
                }
                if(complete){
                    setInfo = true;

                    createInfo(Filter.select, bookInfo)
                }
            } else {
                document.getElementById("contents").replaceChildren()
                
                let complete = true
                for (let keys in Filter.select){
                    if(Filter.select[keys].length ==0) complete = false;
                }
                if(complete){
                    setInfo = true;

                    createInfo(Filter.select, bookInfo)
                } else {
                    setInfo = false;
                }
            }

        })
    }
}

function createInfo(data, bookInfo) {
    //박스 생성
    const bookInfoBox = document.createElement('div')
    bookInfoBox.setAttribute('class', 'book-info')
    bookInfoBox.innerHTML = `<form method="POST" action="">
    <div class="left">
            <div class="title">
                <div>
                </div>
                <div>
                    <input type="checkbox" id="auto-write" checked>
                    <label for="auto-write">자동 입력</label>
                </div>
            </div>
            <div class="bookcover">
                <div>
                    <img>
                </div>
                <div>
                    <input type="file" accept="image/*" id="file-upload" ${!bookInfo.bk_no ? '' : 'disabled'}>
                    <label class="upload" type="button" value="upload" for="file-upload">↑</label>
                    <button class="delete" type="button">×</button>
                </div>
            </div>
            <div class="input-box"></div>
        </div>
        <div class="right"></div>
        <div class="bottom">
            <button class="btn btn-white btn-cancel" type="button" value="cancel">취소</button>
            ${!bookInfo.bk_no ? '' : '<button class="btn btn-gray btn-delete" type="button" value="delete">삭제</button>'}
            <button class="btn btn-green btn-save" type="button" value="save">저장</button>
        </div>
    </form>`
    document.getElementById("contents").appendChild(bookInfoBox)

    // title input
    const titleIntput = document.createElement("input");
    titleIntput.setAttribute('placeholder', '제목을 입력하세요.')
    titleIntput.classList.add('disabled')
    bookInfoBox.querySelector('.title div').appendChild(titleIntput);

    // 타이틀 인풋 클릭 시 체크 해제
    function titleUnchecked(){
        titleIntput.classList.remove('disabled')
        bookInfoBox.querySelector('#auto-write').checked = false
    }

    //타이틀 자동입력
    let school = data.school == 'E' ? '초' : data.school == 'M' ? '중' : '고'
    let brand = CM.getBookKor(data.brand[0])
    titleIntput.setAttribute("value", `[${school}${data.grade}-${data.semester}] ${brand}`)

    function autoTitle(){
        if(!bookInfoBox.querySelector('#auto-write').checked) {
            titleIntput.classList.remove('disabled')
        } else {
            titleIntput.classList.add('disabled')
            titleIntput.value = `[${school}${data.grade}-${data.semester}] ${brand}`
        }
    }

    bookInfoBox.querySelector('#auto-write').onclick = autoTitle
    titleIntput.onkeydown = titleUnchecked

    

    // 셀렉트박스
    let selectObj = [
        ["교재 유형 전체", "개념서", "유형서", "개념유형서"],
        ["노출여부 전체", "교재숨김", "교재노출"],
        ["검수 진행상태", "검수 완료", "검수 중", "검수 대기"]
    ]
    let selectValue = []
    for(let i = 0; i < selectObj.length; i++) {
        let select = new common.SelectBox(selectObj[i], bookInfoBox.querySelector('.right'))
        selectValue.push(select)
    }

    //셀렉트박스 자동선택
    let autoValue;
    if(brand.includes('개념서')){
        bookInfoBox.querySelector('.right .select-value').innerText = '개념서'
        autoValue = '개념서'
    } else if (brand.includes('아르케')) {
        bookInfoBox.querySelector('.right .select-value').innerText = '개념유형서'
        autoValue = '개념유형서'
    } else {
        bookInfoBox.querySelector('.right .select-value').innerText = '유형서'
        autoValue = '유형서'
    }
    selectValue[0].value = autoValue
    data.select = selectValue



    //문제 수 input 생성
    let bk_type = CM.getBookType(data.brand[0])

    if(bk_type == 'CP' && data.school == 'E') {
        bk_type = 'CP-E'
    } else if (bk_type == 'CP' && data.school == 'M'){
        bk_type = 'CP-M'
    }

    let bookTypeInfo = {
        'CO' : [
            ['LE', '개념 강의'],
            ['LV', '예제풀이 강의'],
            ['PR', '개념 확인하기'],
            ['CS', 'Skill-UP'],
            ['CE', '단원 마무리']
        ],
        'PA' : [
            ['PR', '유형 학습'],
            ['CL', '맞춤 클리닉']
        ],
        'CP-M' : [
            ['LE', '개념 강의'],
            ['PR', '기본유형 익히기']
        ],
        'CP-E': [
            ['LE', '개념 강의'],
            ['LX', '개념확인 예제'],
            ['PR', '기본기 다지기'],
            ['PR2', '기본기 강화하기'],
            ['CE', '단원 마무리']
        ]
    }

    for (let i = 0; i < bookTypeInfo[bk_type].length; i++) {
        let title = bookTypeInfo[bk_type][i][1]
        let code = bookTypeInfo[bk_type][i][0]
        
        let inputWrap = document.createElement('div')
        inputWrap.innerHTML = `<p>${title} :</p>`
        let input = document.createElement('input')
        input.setAttribute('id', code)
        input.setAttribute('type', 'number')
        input.setAttribute('placeholder', '총 수량 입력')
        inputWrap.appendChild(input)
        bookInfoBox.querySelector('.input-box').appendChild(inputWrap)
    }

    //썸네일 삭제 여부
    function checkThumb(){
        let src = bookInfoBox.querySelector('.bookcover div img').src
        if(src.includes('png') || src.includes('jpg') || src.includes('jpeg')) {
            common.alertOpen(alertList.upload)
        }
    }

    //썸네일 삭제
    function deleteThumb(){
        bookInfoBox.querySelector('.bookcover div img').src = ''
        bookInfoBox.querySelector('#file-upload').value = ''
        bookInfoBox.querySelector('#file-upload').disabled = false
    }

    // 이미지 업로드
    function readImage(input) {
        if (input.files && input.files[0]) {
            const reader = new FileReader();
            
            reader.onload = (e) => {
                const previewImage = document.querySelector('.bookcover div img');
                previewImage.src = e.target.result;
            }
            reader.readAsDataURL(input.files[0]);
            input.disabled = true;
        }
    }

    bookInfoBox.querySelector('#file-upload').addEventListener('change', (e) => {
        readImage(e.target);
    })
    bookInfoBox.querySelector('.upload').addEventListener('click', checkThumb)
    bookInfoBox.querySelector('.bookcover .delete').addEventListener('click', deleteThumb)

    !bookInfo.bk_no ? registerInfo(bookInfoBox, data) : fixInfo(bookInfoBox, data, bookInfo)
}

// 선택창 오픈 
function openFile() {
    let input = document.querySelector('#file-upload')
    input.disabled = false;
    input.click()

    common.alertClass()
}


//등록
function registerInfo(bookInfoBox, data) {
    let inputValue = bookInfoBox.querySelectorAll('.input-box input')

    //취소 클릭 시 값이 바뀌었는지 확인
    function changeCheck(){
        let valueBoolean = false
        for(let i = 0; i < inputValue.length; i++) {
            if(inputValue[i].value) {
                valueBoolean = true
            }
        }
        if(valueBoolean) {
            common.alertOpen(alertList.cancel)
        } else {
            // 취소했을 때 함수
        }
    }

    // 교재 등록
    function register() {
        for(let i = 0; i < inputValue.length; i++) {
            if(!inputValue[i].value) {
                inputValue[i].value = 0
            }
        }
        setBookAPI(data)
        common.alertOpen(alertList.save)
    }

    bookInfoBox.querySelector('.bottom .btn-cancel').addEventListener('click', changeCheck)
    bookInfoBox.querySelector('.bottom .btn-save').addEventListener('click', register)
}


//수정
async function fixInfo(bookInfoBox, data, bookInfo) {

    let book = bookInfo.bk_no ? '' : `${data.revision[0] == '2015' ? 15 : 22}${data.school[0]}${data.grade[0]}${data.semester[0]}`

    //api로 기본값 채우기
    let getBookInfo = await API.apiCall(API.url['getBookInfo'], {
        bk_no: bookInfo.bk_no,
        book : book,
    })
    
    console.log(getBookInfo)

    let codeArr = ['ce', 'cl', 'cs', 'le', 'lv', 'lx', 'pr', 'pr2']
    for(let i = 0; i < codeArr.length; i++) {
        if(getBookInfo[codeArr[i]]) {
            let code = codeArr[i].toUpperCase()
            if(bookInfoBox.querySelector(`.input-box #${code}`)) {
                bookInfoBox.querySelector(`.input-box #${code}`).value = getBookInfo[codeArr[i]]
            }
        }
    }

    let selectArr = [
        ["교재숨김", "교재노출"],
        ["검수 대기", "검수 중", "검수 완료"]
    ]
    data.select[1].value = selectArr[0][getBookInfo.is_activ]
    data.select[2].value = selectArr[1][getBookInfo.status]
    bookInfoBox.querySelectorAll('.right .select-value')[1].innerText = data.select[1].value
    bookInfoBox.querySelectorAll('.right .select-value')[2].innerText = data.select[2].value
    


    //표지 이미지
    bookInfoBox.querySelector('.bookcover div img').src = getBookInfo.bk_cover


    // 저장
    let inputValue = bookInfoBox.querySelectorAll('.input-box input')
    function fix(){
        for(let i = 0; i < inputValue.length; i++) {
            if(!inputValue[i].value) {
                inputValue[i].value = 0
            }
        }
        setBookAPI(data, getBookInfo)
        common.alertOpen(alertList.save)
    }


    //값 변경 유무
    function checkChange(){
        let change = false
        for(let i = 0; i < codeArr.length; i++) {
            if(getBookInfo[codeArr[i]]) {
                let code = codeArr[i].toUpperCase()
                if(bookInfoBox.querySelector(`.input-box #${code}`) && bookInfoBox.querySelector(`.input-box #${code}`).value != getBookInfo[codeArr[i]]) {
                    change = true
                }
            }
        }
        if(change) {
            common.alertOpen(alertList.cancel)
        } else {
            // 취소했을 때 함수
        }
    }



    //alert
    bookInfoBox.querySelector('.bottom .btn-delete').addEventListener('click', event => common.alertOpen(alertList.delete))
    bookInfoBox.querySelector('.bottom .btn-save').addEventListener('click', fix)
    bookInfoBox.querySelector('.bottom .btn-cancel').addEventListener('click', checkChange)
}

let alertList = {
    upload : {
        text : ['현재 교재의 섬네일이 있습니다.', '새로 변경하시겠습니까?'],
        button : ['확인', '취소'],
        function : [openFile]
    },
    cancel : {
        text : ['변경사항이 있습니다.', '저장하지 않고 취소하시겠습니까?'],
        button : ['확인', '취소'],
        function : ['function1']
    },
    delete : {
        text : ['현재의 교재를', '정말 삭제하시겠습니까?'],
        button : ['확인', '취소'],
        function : ['function1']
    },
    save : {
        text : ['교재가 저장 되었습니다.'],
        button : ['확인'],
        function : [common.alertClass]
    },
}


// api call
function setBookAPI(data, defaultData){

    let option = {}

    option.cs_code = `${data.revision[0] == '2015' ? 15 : 22}${data.school[0]}${data.grade[0]}${data.semester[0]}`;
    option.brand = data.brand[0];

    let set_field = [];
    let field = document.querySelectorAll('.input-box input')
    
    option.brand_kor = CM.getBookKor(data.brand[0])
    option.bk_type = CM.getBookType(data.brand[0])
    option.bk_level = CM.getBookLevel(data.brand[0])

    let bookcover = document.querySelector('.bookcover div img').src
    if(bookcover.includes('base64')) {
        option.bk_cover = bookcover
    }

    option.is_activ = data.select[1].value == '교재숨김' ? 0 : 1
    option.status = data.select[2].value == '검수 완료' ? 2 : data.select[2] == '검수 중' ? 1 : 0
    for(let i = 0; i < field.length; i++) {
        let name = field[i].getAttribute('id').toLowerCase()
        let value = field[i].value

        option[name] = value
    }
    
    if(!defaultData){
        option.bk_no = null
        option.set_field = Object.keys(option)
    } else {
        let optionKeys = Object.keys(option)
        for(let i = 0; i < optionKeys.length; i++) {
            if(option[optionKeys[i]] == defaultData[optionKeys[i]] && optionKeys[i] != 'cs_code' && optionKeys[i] != 'brand') {
                delete option[optionKeys[i]]
            } else if (option[optionKeys[i]] != defaultData[optionKeys[i]]) {
                set_field.push(optionKeys[i])
            }
        }
        option.bk_no = defaultData.bk_no
        option.set_field = set_field
    }
    console.log(option)

    let call = API.apiCall(API.url['setBookInfo'], option)
    console.log(call)
}