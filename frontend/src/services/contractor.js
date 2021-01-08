import {decode_utf8} from "../utils";
import {config} from "../config";

const genpdfServce =config.baseUrl+ "/contractor/genpdf";
const commonContractorServce =config.baseUrl+ "/contractor";



function fetchB(...args) {
    return fetch(...args).then(function(res){
		if(res.status!=200){
			var message=res.headers.get("message");
			message=decode_utf8(message);	
			alert(message);
			throw message;
		}
		return res;
	});
}



async function exportPdf(body) {
    var response = await fetchB(
        genpdfServce,
        {
            method: "POST",
            headers: {
                Accept: "text/csv;charset=GBK",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }
    );
    return response;
}

function saveContractor() {
    var body=JSON.parse(localStorage.getItem("contractor"));
    console.log("saveContractor",body);
    fetchB(commonContractorServce, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: body ? JSON.stringify(body) : ""
    }).then(function (response) {
        if (response.ok) {
            alert("导入成功！");
        }else{
            alert("导入失败！"+response.status);
        }
    })
}



function searchContractor(body) {
    var response =  fetch(commonContractorServce+"/_search", {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: body ? JSON.stringify(body) : ""
    });
    if (response.ok) {
        alert("查询成功！");
        response.json().then(function (data) {
            console.log(data);
        });
    }else{
        alert("查询失败！");
    }
}


function exportOrder(orderId) {
    var contractor=JSON.parse(localStorage.getItem("contractor"));
    console.log("contractor.........",contractor);
    contractor.orders.filter(item=>item.id==orderId).map(one=>{
        var items=one.items.filter(orderItem => orderItem.checked && (isNaN(orderItem.price) || isNaN(orderItem.count) ) )
        if(items.length>0){
            console.log("数据填写有误");
        }
    });
    var contractorNew={
        ...contractor,
        orders:contractor.orders.filter(item=>item.id==orderId).map(one=>{
            console.log("one",one);
            one.items=one.items.filter(orderItem => orderItem.checked)
            return one;
        })
    };
    console.log("contractorNew",contractorNew);
    exportPdf(contractorNew).then(res => {
            if (res.ok) {
                res.blob().then(blob => {
                    try {
                        var a = document.createElement("a");
                        var url = window.URL.createObjectURL(blob);
                        var filename = res.headers
                            .get("Content-Disposition")
                            .split(";")[1]
                            .split("=")[1];
                        a.href = url;
                        a.download = decode_utf8(filename);
                        a.click();
                        window.URL.revokeObjectURL(url);
                    } catch (e) {
                        alert(e)
                    }
                })
            }else{
                alert("导出失败:"+res.status);
            }
        }
    );
}

export {
    exportPdf,
    saveContractor,
    searchContractor,
    exportOrder
}