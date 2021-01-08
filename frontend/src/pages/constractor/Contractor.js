import React, {useCallback, useEffect, useReducer} from "react";
import * as R from "ramda";
import shortid from "shortid";
import Big from "big.js";
import _ from "lodash";
import {Button, FormItem, Label, Panel, PanelBody, PanelHeader} from "../../ui"
import {useFetchData} from "../../useHooks";
import {config} from "../../config";
import {Orders} from "./Orders";
import {DispatchContext} from "./DispatchContext"
import {reducerContractor} from "../../reducer/reducerContractor";
import {isNumber} from "../../utils";
import {INIT_CONTRACTOR, INIT_ORDER, UPDATE_CONTRACTOR, UPDATE_PERSON} from "../../actions";
import {Person} from "./Person";


const getCommoditys = config.baseUrl + "/contractor/commoditys";



var byCol1 = R.groupBy(function (record) {
    return record.category;
});


function convertData(data) {
    var renameCol = data.map(item => {
        return {
            ...item, name: item.name || "",
            price: (isNumber(item.price) ? new Big(item.price).toFixed(2) : 0),
            count: 0, checked: false
        };
    });
    var grouped = byCol1(renameCol);
    var convertedData = Object.keys(grouped).map(key => ({
        id: shortid.generate(),
        title: key,
        items: grouped[key]
    }));
    console.log(convertedData);
    return convertedData;
}

function getValue(){
    console.log("getValue.................");
    var contractorStorage =  window.localStorage.getItem("contractor");
    try{
        var contractorJson=contractorStorage?JSON.parse(contractorStorage):null;
        return contractorJson;
    }catch (e) {
        window.localStorage.removeItem("contractor");
    }
}

function Contractor() {
    console.log("Contractor");
    const [contractor, dispatch] = useReducer(reducerContractor, getValue());
    useEffect(
        e => {
            console.log("fetch...............",contractor);
            if(!contractor){
                fetch(getCommoditys).then(function (res) {
                    console.log("fetch...............",res);
                    if(res.ok){
                        res.json().then(function (json) {
                            dispatch({
                                type:INIT_CONTRACTOR,
                                payload:{
                                    person: {
                                        name: "",
                                        idno: "",
                                        address: "回风街道办事处大溪口村   组"
                                    },
                                    orders: convertData(json)
                                }
                            });
                        })
                    }
                });
            }

        },
        []
    );


    useEffect(
        e => {
            var c = JSON.stringify(contractor);
            window.localStorage.setItem("contractor", c);
        },
        [contractor]
    );

    const memoizedPersonCallback = useCallback(_.throttle(person => {
        console.log("memoizedPersonCallback");
        dispatch({type: UPDATE_PERSON, payload: person});
    }, 0), []);//如果加了contractor.person就会造成person改变重新执行执行了里面的throttle函数

    function clearContractor() {
        window.localStorage.removeItem("contractor");
        alert("清理成功");
        window.history.pushState("/contractor/add",null,"/contractor/add");
    }
    return (
        <div>

            <DispatchContext.Provider value={dispatch}>

                <Panel>
                    <Button primary onClick={clearContractor}>
                        清除
                    </Button>
                </Panel>

                {
                    contractor?<div>
                        <Panel>
                            <PanelHeader>合同基本信息</PanelHeader>
                            <PanelBody>
                                <FormItem>
                                    <Label>合同名称:</Label>
                                    <input
                                        value={contractor.name}
                                        onChange={e => {
                                            dispatch({
                                                type: UPDATE_CONTRACTOR, payload: {
                                                    name: e.target.value
                                                }
                                            })
                                        }}
                                    />
                                </FormItem>
                                <FormItem>
                                    <Label>协议编号:</Label>
                                    <input
                                        value={contractor.agreementId}
                                        onChange={e => {
                                            dispatch({
                                                type: UPDATE_CONTRACTOR, payload: {
                                                    agreementId: e.target.value
                                                }
                                            })
                                        }}
                                    />
                                </FormItem>
                            </PanelBody>
                        </Panel>

                        <Panel>
                            <PanelHeader>住户信息</PanelHeader>
                            <PanelBody>
                                <Person
                                    {...contractor.person}
                                    onPersonChange={memoizedPersonCallback}
                                />
                            </PanelBody>
                        </Panel>
                        <div>
                            {contractor.orders ? <Orders orders={contractor.orders}/> : null}
                        </div>

                    </div>:null
                }


            </DispatchContext.Provider>
        </div>
    );
}


export {
    Contractor
}