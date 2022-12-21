
import "./style.css";
import {SelectBox, alertOpen, fileName} from "./common.js";
import API from "./api.js";

let getBookList = API.apiCall(API.url['getBookList'], {
    rev:"",
    sch:[],
    grd:[],
    sem:"",
    brand:[],
    is_ok:"",
    is_activ:""
});

console.log(getBookList)



console.log(new SelectBox(["교재 유형 전체", "개념서", "유형서", "아르케 초등", "아르케 중등"], document.querySelector('body')).value)



function hi() {
    console.log('hi')
}

function bye() {
    console.log('bye')
}

alertOpen({
    text : ['변경사항이 있습니다.', '저장하지 않고 취소하시겠습니까?'],
    button : ['확인', '취소'],
    function : [hi, bye]
})



fileName()