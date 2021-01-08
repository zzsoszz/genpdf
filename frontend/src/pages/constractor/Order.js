import React, {useCallback, useContext} from "react";
import _ from "lodash";
import {Panel, PanelBody, PanelHeader} from "../../ui";
import {exportOrder, saveContractor} from "../../services/contractor";
import {DispatchContext} from "./DispatchContext";
import {ADD_ORDER_ITEM, DELETE_ORDER_ITEM, UPDATE_ORDER_ITEM} from "../../actions";
import {OrderItem} from "./OrderItem";


function getOrderTotal(order) {
    if (order && order.items) {
        return order.items
            .filter(item => item.checked)
            .map(item => item.count * item.price)
            .reduce((cur, total) => {
                return cur + total;
            }, 0).toFixed(2);
    }
    return 0;
}


const Order = React.memo(function (props) {
    console.log("Order", props);
    const dispatch = useContext(DispatchContext);
    const onOrderItemChangeThrottle = useCallback(
        _.throttle(orderItem => {
            console.log("onOrderItemChange");
            dispatch({
                type: UPDATE_ORDER_ITEM,
                payload: {...orderItem, orderId: props.id}
            });
        }, 0),
        []
    );

    //必须使用 useCallback，要不然每次Order，都会创建不同的onchange的处理的函数，导致属性被更新，从而造成重新渲染组件
    const onOrderItemDeleteCallback = useCallback(
        orderItem => {
            console.log("onOrderItemDelete");
            dispatch({
                type: DELETE_ORDER_ITEM,
                payload: {...orderItem, orderId: props.id}
            });
        },
        []
    );

    return (
        <Panel>
            <PanelHeader>
                <span>{props.title}</span>
            </PanelHeader>
            <PanelBody>
                <table>
                    <colgroup>
                        <col style={{width:"50px"}}/>
                        <col style={{width:"50px"}}/>
                        <col style={{width:"100px"}}/>
                        <col style={{width:"100px"}}/>
                        <col style={{width:"100px"}}/>
                        <col style={{width:"70px"}}/>
                        <col style={{width:"80px"}}/>
                        <col style={{width:"80px"}}/>
                        <col style={{width:"80px"}}/>
                        <col style={{width:"80px"}} align="center"/>
                    </colgroup>
                    <thead>
                        <tr>
                            <th>选中</th>
                            <th>序号</th>
                            <th>分类</th>
                            <th>名称</th>
                            <th>规格</th>
                            <th>单位</th>
                            <th>单价</th>
                            <th>数量</th>
                            <th>总价</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.items
                            ? props.items.map((item, index) => {
                                return (

                                    <OrderItem
                                        index={index}
                                        key={item.id}
                                        {...item}
                                        onOrderItemChange={onOrderItemChangeThrottle}
                                        onOrderItemDelete={onOrderItemDeleteCallback}
                                    />

                                );
                            })
                            : null}
                    </tbody>
                </table>
                <span>
                  总金额:
                    {props.items ? getOrderTotal(props) : null}
                </span>
                <div>
                    <button
                        onClick={e =>
                            dispatch({
                                type: ADD_ORDER_ITEM,
                                payload: {orderId: props.id}
                            })
                        }
                    >
                        添加项目
                    </button>
                    <button style={{marginLeft: "8px"}}
                            onClick={e => {
                                exportOrder(props.id)
                            }}>
                        导出
                    </button>
                    <button style={{marginLeft: "8px"}}
                            onClick={e => {
                                saveContractor()
                            }}>
                        保存
                    </button>
                </div>
            </PanelBody>
        </Panel>
    );
});

export {
    Order
}