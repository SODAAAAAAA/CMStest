// 학습 프로토
const Ref = {
    Proto : {
        'CO' : [
            ['개념서 기본', '개념서 기본', null],
            ['개념서 기본', '개념 강의 보기', 'VD'],
            ['개념서 기본', 'Self-Check', 'SC'],
            ['개념서 기본', '개념 확인하기', 'QA'],
            ['개념서 기본', '오답 클리닉', 'WC'],
            ['개념서 기본', '개념 설명하기', 'RC']
        ],
        'CO-E' : [
            ['개념서(단원마무리)', '개념서(단원마무리)', null],
            ['개념서(단원마무리)', '단원 마무리', 'QA'],
            ['개념서(단원마무리)', '오답 클리닉', 'WC']
        ],
        'CO-S' : [
            ['개념서(스킬업)', '개념서(스킬업)', null],
            ['개념서(스킬업)', '스킬업', 'QA'],
            ['개념서(스킬업)', '오답 클리닉', 'WC']
        ],
        'PA' : [
            ['유형서', '유형서', null],
            ['유형서', '유형 학습', 'QA'],
            ['유형서', '오답 클리닉', 'WC'],
            ['유형서', '맞춤 클리닉', 'CC']
        ],
        'EA' : [
            ['초등 아르케', '초등 아르케', null],
            ['초등 아르케', '개념 강의 보기', 'VD'],
            ['초등 아르케', '개념 설명하기', 'RC'],
            ['초등 아르케', '기본기 다지기', 'QA'],
            ['초등 아르케', '오답 클리닉', 'WC'],
            ['초등 아르케', '기본기 강화하기', 'QA'],
            ['초등 아르케', '오답 클리닉', 'WC']
        ],
        'EA-E' : [
            ['초등 아르케(단원마무리)', '초등 아르케(단원마무리)', null],
            ['초등 아르케(단원마무리)', '단원 마무리', 'QA'],
            ['초등 아르케(단원마무리)', '오답 클리닉', 'WC'],
        ],
        'MA' : [
            ['중등 아르케', '중등 아르케', null],
            ['중등 아르케', '개념 강의 보기', 'VD'],
            ['중등 아르케', '개념 설명하기', 'RC'],
            ['중등 아르케', '기본 유형 익히기', 'QA'],
            ['중등 아르케', '오답 클리닉', 'WC']
        ],
    },
}

let codeArr = ['CO', 'CO-E', 'CO-S', 'PA', 'EA', 'EA-E', 'MA']

const protoCategory = (prt_code, cno) => {
    if(codeArr.includes(prt_code) && Number.isInteger(cno) && 0 <= cno && cno <= Object.keys(Ref.Proto[prt_code]).length) {
        return true
    } else {
        return false
    }
}

export function prt_title(prt_code, cno){
    return protoCategory(prt_code, cno) ? Ref.Proto[prt_code][cno][0] : null;
}

export function c_title(prt_code, cno){
    return protoCategory(prt_code, cno) ? Ref.Proto[prt_code][cno][1] : null;
}

export function mdl_code(prt_code, cno){
    return protoCategory(prt_code, cno) ? Ref.Proto[prt_code][cno][2] : null;
}


// 책 유형별 문제&강의
export const bookTypeInfo = {
    CO : [
        ['LE', '개념 강의'],
        ['LV', '예제풀이 강의'],
        ['PR', '개념 확인하기'],
        ['CS', 'Skill-UP'],
        ['CE', '단원 마무리']
    ],
    PA : [
        ['PR', '유형 학습'],
        ['CL', '맞춤 클리닉']
    ],
    CP : {
        M : [
            ['LE', '개념 강의'],
            ['PR', '기본유형 익히기']
        ],
        E : [
            ['LE', '개념 강의'],
            ['LX', '개념확인 예제'],
            ['PR', '기본기 다지기'],
            ['PR2', '기본기 강화하기'],
            ['CE', '단원 마무리']
        ]
    }
}

export function info_length(bk_type, school) {
    if(bk_type == 'CP') {
        return bookTypeInfo[bk_type][school].length
    } else {
        return bookTypeInfo[bk_type].length
    }
}

export function info_title(bk_type, num, school){
    if(bk_type == 'CP') {
        return bookTypeInfo[bk_type][school][num][1]
    } else {
        return bookTypeInfo[bk_type][num][1]
    }
}

export function info_code(bk_type, num, school){
    if(bk_type == 'CP') {
        return bookTypeInfo[bk_type][school][num][0]
    } else {
        return bookTypeInfo[bk_type][num][0]
    }
}