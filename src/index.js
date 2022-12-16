import API from "./api.js"

let getBookList = API.apiCall(API['getBookList'], {
    rev:"",
    sch:[],
    grd:[],
    sem:"",
    brand:[],
    is_ok:"",
    is_activ:""
}).then(response => {
    console.log(response)
});