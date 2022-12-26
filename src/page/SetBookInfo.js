import * as CM from "../filter";
import {SelectBox, alertOpen} from "../common";
import * as proto from "../data";
import API from "../api";

const Filter = new CM.FilterButton(false,"set");
let setInfo = false;
let register = false; // 등록/수정 여부 true: 등록
export default function setBookInfo(){

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

                    register ? registerInfo(Filter.select) : fixInfo(Filter.select)
                }
            }


        })
    }
}

function registerInfo(data) {
    //박스 생성
    const bookInfoBox = document.createElement('div')
    bookInfoBox.setAttribute('class', 'book-info')
    bookInfoBox.innerHTML = `<form method="POST" action="">
    <div class="left">
            <div class="title">
                <div></div>
                <div>
                    <input type="checkbox" id="auto-write" checked>
                    <label for="auto-write">자동 입력</label>
                </div>
            </div>
            <div class="bookcover">
                <div></div>
                <div>
                    <input type="file" accept="image/*" id="file-upload">
                    <label class="upload" type="button" value="upload" for="file-upload">↑</label>
                    <button class="delete" type="button">×</button>
                </div>
            </div>
            <div class="input-box"></div>
        </div>
        <div class="right"></div>
        <div class="bottom">
            <button class="btn btn-white" type="button" value="cancel">취소</button>
            <button class="btn btn-green" type="button" value="save">저장</button>
        </div>
    </form>`
    document.getElementById("contents").appendChild(bookInfoBox)

    // title input
    const titleIntput = document.createElement("input");
    titleIntput.setAttribute('placeholder', '제목을 입력하세요.')
    titleIntput.disabled = true
    bookInfoBox.querySelector('.title div').appendChild(titleIntput);

    // 셀렉트박스
    let selectObj = [
        ["교재 유형 전체", "개념서", "유형서", "개념유형서"],
        ["노출여부 전체", "교재숨김", "교재노출"],
        ["검수 진행상태", "검수 완료", "검수 중", "검수 대기"]
    ]
    for(let i = 0; i < selectObj.length; i++) {
        new SelectBox(selectObj[i], bookInfoBox.querySelector('.right'))
    }

    //타이틀 자동입력
    let school = data.school == 'E' ? '초' : data.school == 'M' ? '중' : '고'
    let brand = CM.getBookKor(data.brand[0])
    titleIntput.setAttribute("value", `[${school}${data.grade}-${data.semester}] ${brand}`)

    bookInfoBox.querySelector('#auto-write').onclick = function(){
        if(!bookInfoBox.querySelector('#auto-write').checked) {
            titleIntput.disabled = false;
        } else {
            titleIntput.disabled = true;
            titleIntput.value = `[${school}${data.grade}-${data.semester}] ${brand}`
        }
    }

    if(brand.includes('개념서')){
        bookInfoBox.querySelector('.right .select-value').innerText = '개념서'
    } else if (brand.includes('아르케')) {
        bookInfoBox.querySelector('.right .select-value').innerText = '개념유형서'
    } else {
        bookInfoBox.querySelector('.right .select-value').innerText = '유형서'
    }

    //문제 수 input 생성
    let bk_type = CM.getBookType(data.brand[0])
    if(data.school == 'E' && bk_type == 'CP') {
        bk_type = 'EA'
    } else if (data.school == 'M' && bk_type == 'CP'){
        bk_type = 'MA'
    }

    for (let i = 1; i < proto.Ref.Proto[bk_type].length; i++) {
        let title = proto.c_title(bk_type, i)
        let code = proto.mdl_code(bk_type, i)
        
        if(code == 'VD' || code == 'QA' || code == 'CC') {
            let inputWrap = document.createElement('div')
            inputWrap.innerHTML = `<p>${title}:</p>`
            let input = document.createElement('input')
            input.setAttribute('id', code)
            input.setAttribute('placeholder', '총 수량 입력')
            inputWrap.appendChild(input)
            bookInfoBox.querySelector('.input-box').appendChild(inputWrap)
        }
    }
    
    //alert
    bookInfoBox.querySelectorAll('.bottom .btn-green').addEventListener('click', event => alertOpen(alertList.save))

    if(bookInfoBox.querySelector('.bookcover div:first-child').children.length) {
        bookInfoBox.querySelector('.upload').addEventListener('click', event => alertOpen(alertList.upload))
    }
}



function fixInfo(data) {

    //api로 기본값 채우기
    let getBookInfo = API.apiCall(API.url['getBookInfo'], {
        bk_no:27,
        book:"",
    });

    console.log(getBookInfo)

    //박스 생성
    const bookInfoBox = document.createElement('div')
    bookInfoBox.setAttribute('class', 'book-info')
    bookInfoBox.innerHTML = `<form method="POST" action="">
    <div class="left">
            <div class="title">
                <div></div>
                <div>
                    <input type="checkbox" id="auto-write" checked>
                    <label for="auto-write">자동 입력</label>
                </div>
            </div>
            <div class="bookcover">
                <div></div>
                <div>
                    <input type="file" accept="image/*" id="file-upload">
                    <label class="upload" type="button" value="upload" for="file-upload">↑</label>
                    <button class="delete" type="button">×</button>
                </div>
            </div>
            <div class="input-box"></div>
        </div>
        <div class="right"></div>
        <div class="bottom">
            <button class="btn btn-white" type="button" value="cancel">취소</button>
            <button class="btn btn-gray" type="button" value="delete">삭제</button>
            <button class="btn btn-green" type="button" value="save">저장</button>
        </div>
    </form>`
    document.getElementById("contents").appendChild(bookInfoBox)

    // title input
    const titleIntput = document.createElement("input");
    titleIntput.setAttribute('placeholder', '제목을 입력하세요.')
    titleIntput.disabled = true
    bookInfoBox.querySelector('.title div').appendChild(titleIntput);

    // 셀렉트박스
    let selectObj = [
        ["교재 유형 전체", "개념서", "유형서", "개념유형서"],
        ["노출여부 전체", "교재숨김", "교재노출"],
        ["검수 진행상태", "검수 완료", "검수 중", "검수 대기"]
    ]
    for(let i = 0; i < selectObj.length; i++) {
        new SelectBox(selectObj[i], bookInfoBox.querySelector('.right'))
    }

    //타이틀 자동입력
    let school = data.school == 'E' ? '초' : data.school == 'M' ? '중' : '고'
    let brand = CM.getBookKor(data.brand[0])
    titleIntput.setAttribute("value", `[${school}${data.grade}-${data.semester}] ${brand}`)

    bookInfoBox.querySelector('#auto-write').onclick = function(){
        if(!bookInfoBox.querySelector('#auto-write').checked) {
            titleIntput.disabled = false;
        } else {
            titleIntput.disabled = true;
            titleIntput.value = `[${school}${data.grade}-${data.semester}] ${brand}`
        }
    }

    if(brand.includes('개념서')){
        bookInfoBox.querySelector('.right .select-value').innerText = '개념서'
    } else if (brand.includes('아르케')) {
        bookInfoBox.querySelector('.right .select-value').innerText = '개념유형서'
    } else {
        bookInfoBox.querySelector('.right .select-value').innerText = '유형서'
    }

    //문제 수 input 생성
    let bk_type = CM.getBookType(data.brand[0])
    if(data.school == 'E' && bk_type == 'CP') {
        bk_type = 'EA'
    } else if (data.school == 'M' && bk_type == 'CP'){
        bk_type = 'MA'
    }

    for (let i = 1; i < proto.Ref.Proto[bk_type].length; i++) {
        let title = proto.c_title(bk_type, i)
        let code = proto.mdl_code(bk_type, i)
        
        if(code == 'VD' || code == 'QA' || code == 'CC') {
            let inputWrap = document.createElement('div')
            inputWrap.innerHTML = `<p>${title}:</p>`
            let input = document.createElement('input')
            input.setAttribute('id', code)
            input.setAttribute('placeholder', '총 수량 입력')
            inputWrap.appendChild(input)
            bookInfoBox.querySelector('.input-box').appendChild(inputWrap)
        }
    }
    
    //alert
    let alertBtn = bookInfoBox.querySelectorAll('.bottom .btn')

    for(let i = 1; i < alertBtn.length; i++) {
        alertBtn[i].addEventListener('click', event => alertOpen(alertList[alertBtn[i].value]))
    }

    //값 변경 유무
    if(getBookInfo){
        bookInfoBox.querySelectorAll('.bottom .btn-white').addEventListener('click', event => alertOpen(alertList.cancel))
    }

    if(bookInfoBox.querySelector('.bookcover div:first-child').children.length) {
        bookInfoBox.querySelector('.upload').addEventListener('click', event => alertOpen(alertList.upload))
    }
}

let alertList = {
    upload : {
        text : ['현재 교재의 섬네일이 있습니다.', '새로 변경하시겠습니까?'],
        button : ['확인', '취소'],
        function : ['function1', 'function2']
    },
    cancel : {
        text : ['변경사항이 있습니다.', '저장하지 않고 취소하시겠습니까?'],
        button : ['확인', '취소'],
        function : ['function1', 'function2']
    },
    delete : {
        text : ['현재의 교재를', '정말 삭제하시겠습니까?'],
        button : ['확인', '취소'],
        function : ['function1', 'function2']
    },
    save : {
        text : ['교재가 저장 되었습니다.'],
        button : ['확인'],
        function : ['function1']
    },
}