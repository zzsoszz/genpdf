import React, {useCallback, useEffect, useReducer} from "react";
import * as R from "ramda";
import shortid from "shortid";
import Big from "big.js";
import _ from "lodash";
import {FormItem, Label, Panel, PanelBody, PanelHeader} from "../../ui"
import {useFetchData} from "../../useHooks";
import {config} from "../../config";
import {Orders} from "./Orders";
import {DispatchContext} from "./DispatchContext"
import {reducerContractor} from "../../reducer/reducerContractor";
import {isNumber} from "../../utils";
import {INIT_CONTRACTOR, INIT_ORDER, UPDATE_CONTRACTOR, UPDATE_PERSON} from "../../actions";
import {Person} from "./Person";


var rootState = {
    person: {
        name:"",
        idno:"",
        address:"回风街道办事处大溪口村   组"
    },
    orders: []
};


function ContractorEdit(props) {
    console.log("ContractorEdit",props.history.params.id);
    const id=props.history.params.id;

    window.localStorage.removeItem("contractor");

    const [contractor, dispatch] = useReducer(reducerContractor, rootState);
    const initContractor = useFetchData(config.baseUrl+"/contractor/"+id, {
                method: "GET",
                headers: {
                    Accept: "application/json"
                }
            }
     );

    useEffect(
        e => {
           if(initContractor){
               console.log("initContractor",initContractor);
               dispatch({
                   type:INIT_CONTRACTOR,
                   payload:initContractor
               })
           }
        },
        [initContractor]
    );

    useEffect(
        e => {
            console.log("useEffect.contractor",contractor);
            var c=JSON.stringify(contractor);
            window.localStorage.setItem("contractor",c);
        },
        [contractor]
    );

    const memoizedPersonCallback = useCallback(_.throttle(person => {
        console.log("memoizedPersonCallback");
        dispatch({type: UPDATE_PERSON, payload: person});
    },0), []);//如果加了contractor.person就会造成person改变重新执行执行了里面的throttle函数

    return (
        <div>
            <DispatchContext.Provider value={dispatch}>

                <Panel>
                    <PanelHeader>合同基本信息</PanelHeader>
                    <PanelBody>
                        <FormItem>
                            <Label>合同名称:</Label>
                            <input
                                value={contractor.name}
                                onChange={e=>{
                                    dispatch({type: UPDATE_CONTRACTOR, payload:{
                                            name:e.target.value
                                        }})
                                }}
                            />
                        </FormItem>
                        <FormItem>
                            <Label>协议编号:</Label>
                            <input
                                value={contractor.agreementId}
                                onChange={e=>{
                                    dispatch({type: UPDATE_CONTRACTOR, payload:{
                                            agreementId:e.target.value
                                        }})
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
                    {contractor.orders ? <Orders orders={contractor.orders} /> : null}
                </div>


            </DispatchContext.Provider>
        </div>
    );
}


export {
    ContractorEdit
}