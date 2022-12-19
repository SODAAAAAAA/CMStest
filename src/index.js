import API from "./api.js"
import {SelectBox, alertOpen, fileName} from "./common.js"
import "./style.css";

let getBookList = await API.apiCall(API['getBookList'], {
    rev:"",
    sch:[],
    grd:[],
    sem:"",
    brand:[],
    is_ok:"",
    is_activ:""
});

console.log(getBookList)

new SelectBox(["교재 유형 전체", "개념서", "유형서", "아르케 초등", "아르케 중등"]).create(document.querySelector('body'))

alertOpen('cancel')

fileName({
    rev: "15",
    sch: "E",
    grd: "5",
    sem: "1",
    brand: "COA"
})