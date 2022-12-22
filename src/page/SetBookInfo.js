import * as CM from "../filter";
import {SelectBox, alertOpen} from "../common";
const Filter = new CM.FilterButton(false,"set");
let setInfo = false;
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
                            <button class="btn btn-gray" disabled>삭제</button>
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
                    let school = Filter.select.school == 'E' ? '초' : Filter.select.school == 'M' ? '중' : '고'
                    let brand = Filter.select.brand[0]
                    if (brand == 'CO') {
                        brand = '개념서'
                    } else if(Number(brand.slice(1))){
                        let ko = brand.slice(0, 1)
                        let brandObj = {
                            A : '아르케',
                            T : '뜨레스',
                            H : '엑사스',
                            N : '노벰',
                        }

                        brand = `${brandObj[ko]}${brand.slice(1)}`
                    } else {
                        let brandObj = {
                            AR : '아르케',
                            TR : '뜨레스',
                            HE : '엑사스',
                            NO : '노벰',
                        }

                        brand = `${brandObj[brand]}`
                    }
                    titleIntput.setAttribute("value", `[${school}${Filter.select.grade}-${Filter.select.semester}] ${brand}`)

                    //문제 수 input 생성
                    let inputObj = {}
                    if(brand == '개념서') {
                        inputObj = {
                            LE : '개념 강의',
                            LV : '예제풀이 강의',
                            PR : '개념 확인하기',
                            CS : 'Skill-UP',
                            CE : '단원 마무리',
                        }
                    } else if(school == '초' && brand.includes('아르케')) {
                        inputObj = {
                            LE : '개념 강의',
                            LX : '개념확인 예제',
                            PR : '기본기 다지기',
                            PR2 : '기본기 강화하기',
                            CE : '단원 마무리',
                        }
                    } else if(school == '중' && brand.includes('아르케')) {
                        inputObj = {
                            LE : '개념 강의',
                            PR : '기본유형 익히기',
                        }
                    } else {
                        inputObj = {
                            PR : '유형 학습',
                            CL : '맞춤 클리닉',
                        }
                    }
                    for(let i = 0; i < Object.keys(inputObj).length; i++) {
                        let inputWrap = document.createElement('div')
                        inputWrap.innerHTML = `<p>${Object.values(inputObj)[i]}:</p>`
                        let input = document.createElement('input')
                        input.setAttribute('id', Object.keys(inputObj)[i])
                        input.setAttribute('placeholder', '총 수량 입력')
                        inputWrap.appendChild(input)
                        bookInfoBox.querySelector('.input-box').appendChild(inputWrap)
                    }
                }
            }


        })
    }


    






}