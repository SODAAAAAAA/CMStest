import gsap from "gsap";

export const  CMS_math_book ={};

//기본정보
const baseInfo = {
    rev : "15",
    school: ["E","M","H"],
    school_ko : ["초","중","고"],
    grade: [[3,4,5,6],[1,2,3],[1]],
    semester: [1,2],
    brand_kor : ["개념서","아르케","뜨레스","엑사스","노벰","아르케1","아르케2","아르케3","아르케4","아르케5","아르케6","뜨레스1","뜨레스2","엑사스1","엑사스2","노벰1","노벰2","올킬솔루션","교과서 적중문제","서술형 따라잡기","온라인 문제"],
    brand: ["CO",null,"TR","HE","NO","A1","A2","A3","A4","A5","A6","T1","T2","H1","H2","N1","N2","AK","TB","CT","ON"],
    bk_type : ["CO","PA","PA","PA","PA","PA","PA","PA","PA","PA","CP","CP","CP","CP","CP","CP","ON","ON","ON","ON"],
    level :  [0,3,5,6,3,3,5,5,6,6,2,2,2,2,2,2,0,0,0,0],
    revision : ["2015","2022"]

}


//공통객체
CMS_math_book.Books = {}
for( let i=0,j=baseInfo.brand.length; i<j; i++){

    CMS_math_book.Books[baseInfo.brand[i]] = [baseInfo.brand_kor[i], baseInfo.bk_type[i], baseInfo.level[i]];
}

export let bk_kor, bk_type, bk_level;

//브랜드명으로 책이름 반환받는 함수
export function getBookKor(brand){

    if(!baseInfo.brand.includes(brand)) {
        console.log("getBookKor : 잘못된 brand명")
        return ""
    }
    else return CMS_math_book.Books[brand][0];

}

//브랜드명으로 책 타입 반환 함수
export function getBookType(brand){
    if(!baseInfo.brand.includes(brand)) {
        console.log("getBookType : 잘못된 brand명")
        return ""
    }
    else return CMS_math_book.Books[brand][1];
} 

//브랜드명으로 책 레벨 반환 함수
export function getBookLevel(brand){
    if(!baseInfo.brand.includes(brand)) {
        console.log("getBookLevel : 잘못된 brand명")
        return -1;
    }
    else return CMS_math_book.Books[brand][2];
} 

//책이름으로 브랜드명 반환 함수
export function getBrandByKor(kor){

    if(!baseInfo.brand_kor.includes(kor)){
        console.log("getBrandByKor : 잘못된 brand이름");
        return "";
    }
    else {
        const index = baseInfo.brand_kor.indexOf(kor);
        return baseInfo.brand[index];    
    }
}

//상단 검색/입력 토글/선택버튼 생성


let check = [];//임시객체

export class FilterButton{

    constructor(all, mode){

        this.all = all;
        this.allButton = this.all? document.getElementById("btn-all") : null;
        this.select = {
            revision:[],
            school : [] ,
            grade:[],
            semester:[],
            brand : []
        }
        this.brandButton = document.querySelectorAll(".brand>li>button") ;
        this.brandInnerButton = document.querySelectorAll(".brand ul button"); 
      

        const schoolButton = document.getElementsByClassName("school")[0].getElementsByTagName("button")
        const revButton = document.getElementsByClassName("year")[0].getElementsByTagName("button")       
        const semesterButton =  document.getElementsByClassName("semester")[0].getElementsByTagName("button") 
        const gradeButton = document.getElementsByClassName("grade")[0].getElementsByTagName("button");
       
        
        for(let i=0,j=schoolButton.length; i<j; i++){
            schoolButton[i].addEventListener("click", ()=>{
                console.log(i)
                this.select.school[0] = baseInfo.school[i];
                this.setGrade(i);
            })
        }
        
        for(let i=0,j=revButton.length; i<j; i++){
            revButton[i].addEventListener("click", ()=>{
                this.select.revision.includes(baseInfo.revision[i])?
                    this.select.revision.splice( this.select.revision.indexOf(baseInfo.revision[i]) ,1) 
                    : this.select.revision.push(baseInfo.revision[i])
            })
        }

        for(let i=0,j=semesterButton.length; i<j; i++){
            semesterButton[i].addEventListener("click", ()=>{
                this.select.semester.includes((i+1).toString())?
                    this.select.semester.splice( this.select.semester.indexOf((i+1).toString()) ,1) 
                    : this.select.semester.push((i+1).toString())
            })
        }

        for(let i=0,j=gradeButton.length; i<j; i++){
            gradeButton[i].addEventListener("click", ()=>{
                this.select.grade.includes((i+1).toString())?
                    this.select.grade.splice( this.select.grade.indexOf((i+1).toString()) ,1) 
                    : this.select.grade.push((i+1).toString())
            })
        }       
        this.setBrandValue();       
    }  
    
    toggle(){
        
        let all = true;
        for(let keys in this.select){
            if(this.select[keys].length!=0) all = false;
        }

       
    }

    setGrade(index){

        const gradeButton = document.getElementsByClassName("grade")[0].getElementsByTagName("button")
        for(let i=0,j=gradeButton.length; i<j; i++){
            if(gradeButton[i].classList.contains("checked") ) gradeButton[i].classList.remove("checked") 
            baseInfo.grade[index].indexOf(i+1)>-1 ? 
                gsap.set(gradeButton[i],{display:"block"}) 
                : gsap.set(gradeButton[i],{display:"none"})            
        }
        this.select.grade = [];

       // const brandButton = document.querySelectorAll(".brand button");
        for(let i=1,j=this.brandButton.length; i<j; i++){
                for(let m=0,n=this.brand[i].length;m<n;m++){
                if(baseInfo.brand[i]) {
                    this.select.school[0]==="M"?
                    gsap.set(check[i][m],{display:"none"})
                    : gsap.set(check[i][m],{display:"block"})
                }
                else {
                    if( check[i][m].classList.contains("checked") )
                    check[i][m].classList.remove("checked")
                }
            } 
            
        }
         
    } 
    
    setBrandValue(){

       const brandButton = document.querySelectorAll(".brand ul button")
        const brandTotal = [0,6,2,2,2];
        this.brand = [];
       // let check:any[][] = [];
        let res = 0;
        for(let i=0,j=this.brandButton.length; i<j; i++){
            this.brandButton[i].setAttribute("value", baseInfo.brand[i]===null?"":baseInfo.brand[i])
            this.brandButton[i].addEventListener("click", ()=>{

                this.setBrand(baseInfo.brand[i])
            });         
            
            for(let m=0,n=brandTotal[i]; m<n; m++){
               
                if(!this.brand [i]) {this.brand [i] = [];
                    check[i]=[];
                }
               
                this.brand [i].push(j+res)
                check[i].push(brandButton[res])
                this.brandInnerButton[res].setAttribute("value", baseInfo.brand[j+res] );
               
                res+=1;
           }
        }
        
        for(let i=0,j=this.brandInnerButton.length; i<j; i++){

            this.brandInnerButton[i].addEventListener("click", ()=>{
                this.setBrand(this.brandInnerButton[i].getAttribute("value"))
            })
           
        }


    }    

    setBrand(brand){

       // if(this.select.school[0]==="M"||index===0){

            if(brand) { 
                this.select.brand.includes(brand)?
                    this.select.brand.splice( this.select.brand.indexOf( brand ), 1)
                    : this.select.brand.push(brand)
            }else{

            }
      //  }
      
    }   
    
}







