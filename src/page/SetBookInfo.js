import * as CM from "../filter";
import {SelectBox, alertOpen} from "../common";
import * as proto from "../data";

const Filter = new CM.FilterButton(false,"set");
let setInfo = false;
let register = true;
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
    bookInfoBox.innerHTML = `<div class="left">
            <div class="title">
                <div></div>
                <div>
                    <input type="checkbox" id="auto-write">
                    <label for="auto-write">자동 입력</label>
                </div>
            </div>
            <div class="bookcover">
                <div>표지</div>
                <div>
                    <button class="upload">↑</button>
                    <button class="delete">×</button>
                </div>
            </div>
            <div class="input-box"></div>
        </div>
        <div class="right"></div>
        <div class="bottom">
            <button class="btn btn-white">취소</button>
            <button class="btn btn-green">저장</button>
        </div>`
    document.getElementById("contents").appendChild(bookInfoBox)

    // title input
    const titleIntput = document.createElement("input");
    titleIntput.setAttribute('placeholder', '제목을 입력하세요.')
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

    //문제 수 input 생성
    let bk_type = CM.getBookType(data.brand[0])

    for (let i = 0; i < proto.info_length(bk_type, data.school); i++) {
        let title = proto.info_title(bk_type, i, data.school)
        let code = proto.info_code(bk_type, i, data.school)
        
        let inputWrap = document.createElement('div')
        inputWrap.innerHTML = `<p>${title}:</p>`
        let input = document.createElement('input')
        input.setAttribute('id', code)
        input.setAttribute('placeholder', '총 수량 입력')
        inputWrap.appendChild(input)
        bookInfoBox.querySelector('.input-box').appendChild(inputWrap)
    }
    
    //alert
    // let alertBtn = bookInfoBox.querySelectorAll('.bottom .btn')
    // for(let i = 0; i < alertBtn.length; i++) {
    //     alertBtn[i].addEventListener('click', alertOpen())
    // }

    // if(bookInfoBox.querySelector('.bookcover div:first-child').children.length) {
    //     bookInfoBox.querySelector('.upload').addEventListener('click', alertOpen())
    // } else {
    //     console.log('bye')
    // }
    
}



function fixInfo(data) {
    //박스 생성
    const bookInfoBox = document.createElement('div')
    bookInfoBox.setAttribute('class', 'book-info')
    bookInfoBox.innerHTML = `<div class="left">
            <div class="title">
                <div></div>
                <div>
                    <input type="checkbox" id="auto-write">
                    <label for="auto-write">자동 입력</label>
                </div>
            </div>
            <div class="bookcover">
                <div>표지</div>
                <div>
                    <button class="upload">↑</button>
                    <button class="delete">×</button>
                </div>
            </div>
            <div class="input-box"></div>
        </div>
        <div class="right"></div>
        <div class="bottom">
            <button class="btn btn-white">취소</button>
            <button class="btn btn-gray">삭제</button>
            <button class="btn btn-green">저장</button>
        </div>`
    document.getElementById("contents").appendChild(bookInfoBox)

    // title input
    const titleIntput = document.createElement("input");
    titleIntput.setAttribute('placeholder', '제목을 입력하세요.')
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
    console.log(brand)
    titleIntput.setAttribute("value", `[${school}${data.grade}-${data.semester}] ${brand}`)

    //문제 수 input 생성
    let bk_type = CM.getBookType(data.brand[0])

    for (let i = 0; i < proto.info_length(bk_type, data.school); i++) {
        let title = proto.info_title(bk_type, i, data.school)
        let code = proto.info_code(bk_type, i, data.school)
        
        let inputWrap = document.createElement('div')
        inputWrap.innerHTML = `<p>${title}:</p>`
        let input = document.createElement('input')
        input.setAttribute('id', code)
        input.setAttribute('placeholder', '총 수량 입력')
        inputWrap.appendChild(input)
        bookInfoBox.querySelector('.input-box').appendChild(inputWrap)
    }
}