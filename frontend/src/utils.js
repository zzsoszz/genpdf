import moment from 'moment';

function decode_utf8(s) {
    var decodeUrlStr=decodeURIComponent(s);
    return decodeUrlStr;
}

function objectToQueryString(params){
    let esc = encodeURIComponent;
    let query = Object.keys(params)
        .map(k => esc(k) + '=' + esc(params[k]))
        .join('&');
}

function arrayToObject(arr){
    var obj = arr.reduce(function(acc, cur, i) {
        acc[i] = cur;
        return acc;
    }, {});
}

function yuanToFen(x){
	var f=parseFloat(x).toFixed(2);
    var num = new Number(f*100).toFixed(0);
    return num;
}

function stringCompare(a,b) {
    if(a > b) return 1;
    if(a < b) return -1;
    return 0;
}

function identify(x){
    return function () {
        return x;
    }
}

function addf(x){
    return function (y) {
        return x+y;
    }
}

function isNumber(obj) {
    return !isNaN(obj)
}

function add(x,y) {
    return x+y;
}

function liftf(binaary) {
    return function (x) {
        return function(y){
            return binaary(x,y);
        }
    }
}

function arrayg(first) {
    var array=[];
    function more(next) {
        if(next===undefined)
        {
            return array;
        }
        array.push(next);
        return more;
    }
    return more(first);
}

function dealMoment(obj) {
    Object.keys(obj).forEach(item=>{
        if(obj[item] && moment.isMoment( obj[item]) )
        {
            obj[item]=obj[item].format("YYYY-MM-DD HH:mm:ss");
        }
    });
}

function fenToYuan(fen){
    if(fen==null){
        return null;
    }
    return (parseInt(fen)/100).toFixed(2);
}

function fenToYuanDesc(fen){
    if(fen==null){
        return "";
    }
    return fenToYuan(fen)+"元";
}

function contains(str, sub){
    if(str==null || sub==null) return false;
    return str.indexOf(sub) != -1;
}
function isEmpty(str) {
    if(str==undefined || str==null || str=="" ){
        return true;
    }
    return false;
}

export  {decode_utf8,dealMoment,fenToYuanDesc,fenToYuan,yuanToFen,stringCompare,contains,isNumber}