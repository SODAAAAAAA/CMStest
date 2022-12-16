import API from "./api.js"

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