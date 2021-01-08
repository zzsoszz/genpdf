import React, {useCallback, useContext, useEffect, useReducer, useState} from "react";
import ReactDOM from "react-dom";
import {useFetchData,useFormInput} from "../../useHooks";
import {config} from "../../config";
import {Link} from "../../router";
import {FormItem, Label, Panel, Table, TableBody, TableHeader, TableRow} from "../../ui";
import {contains} from "../../utils";
import {isEmpty} from "lodash";
const commonContractorServce =config.baseUrl+ "/contractor";

function ContractorList() {
    const data =useFetchData(commonContractorServce+"/_search",{
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body:JSON.stringify({})
    });
    const filter=useFormInput(null);
    console.log("ContractorList");
    return <div>
        <Panel>
            <FormItem>
                <Label>关键词:</Label>
                <input {...filter} style={{width:"300px"}} />
            </FormItem>
        </Panel>
        <Panel>
            <table>
                <thead>
                <tr>
                    <th>姓名</th>
                    <th>身份证</th>
                    <th>协议号</th>
                    <th>创建时间</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                {data?data.filter(one=> isEmpty(filter.value)?true:contains((one.personName||"")+(one.personIdno||""),filter.value) ).map((item,index)=>(
                    <tr key={index}>
                        <td>{item.personName}</td>
                        <td>{item.personIdno}</td>
                        <td>{item.agreementId}</td>
                        <td>{item.createDate}</td>
                        <td>
                            <Link style={{width:"200px;"}} to={"/contractor/edit/"+item.id} key={item.id}>修改</Link>
                        </td>
                    </tr>
                )):null}
                </tbody>
            </table>
        </Panel>
    </div>
}

export {
    ContractorList
}