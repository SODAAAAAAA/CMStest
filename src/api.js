import axios from "axios";

const API = {
    getBookList : 'getBookList',
    getBookInfo : 'getBookInfo',
    setBookInfo : 'setBookInfo',
    getBookUnitList : 'getBookUnitList',
    getLecUnitTitle : 'getLecUnitTitle',
    updateUnitQnum : 'updateUnitQnum',
    getUnitQAList : 'getUnitQAList',
    getQAList : 'getQAList',
    getQAInfo : 'getQAInfo',
    setQAInfo : 'setQAInfo',
    getVideoList : 'getVideoList',
    getVideoInfo : 'getVideoInfo',
    setVideoInfo : 'setVideoInfo',
    getPaperList : 'getPaperList',
    getPaperInfo : 'getPaperInfo',
    setPaperInfo : 'setPaperInfo',
    getPaperQAList : 'getPaperQAList',
    getPaperQASInfo : 'getPaperQASInfo',
    setPaperQASInfo : 'setPaperQASInfo',
    apiCall : function(api, option) {
        return new Promise (resolve => {
            axios.post(`./api/cms/${api}.php`, option)
            .then((response) => {
                resolve(response.data)
            })
            .catch((error) => {
                resolve(`ERROR - ${error.message}`)
            })
        })
    }
}

export default API;