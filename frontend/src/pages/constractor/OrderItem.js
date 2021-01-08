import React from "react";
import Big from "big.js";
import {Throttle} from "react-throttle";
import {isNumber} from "../../utils";

const OrderItem = React.memo(function (props) {
    console.log("orderitem", props);
    function getItemTotal() {
        if (props.count && props.price) {
            return (isNumber(props.count) && isNumber(props.price)) ? new Big(props.count).times(new Big(props.price)).toFixed(2) : 0;
        }
        return 0;
    }
    return (
        <React.Fragment>
            <tr style={{background: (props.checked ? "#bababa" : "")}}
            >
                <td>
                    <input
                        style={{height:"20px",width:"20px"}}
                        checked={props.checked}
                        type="checkbox"
                        onChange={e => {
                            props.onOrderItemChange({...props, checked: !props.checked});
                        }}
                    />
                </td>
                <td>
                    <span>{props.index}</span>
                </td>
                <td>
                        <input
                            value={props.subcategory}
                            onChange={e => {
                                props.onOrderItemChange({...props, subcategory: e.target.value});
                            }}
                        />
                </td>
                <td>
                    <input
                        value={props.name}
                        onChange={e => {
                            props.onOrderItemChange({...props, name: e.target.value});
                        }}
                    />
                </td>
                <td>
                    <input
                        value={props.subname}
                        onChange={e => {
                            props.onOrderItemChange({...props, subname: e.target.value});
                        }}
                    />
                </td>
                <td>
                    <input
                        value={props.unit}
                        onChange={e => {
                            props.onOrderItemChange({...props, unit: e.target.value});
                        }}
                    />
                </td>
                <td>
                    <input
                        value={props.price}
                        onChange={e => {
                            if (isNaN(e.target.value)) return;
                            props.onOrderItemChange({...props, price: e.target.value});
                        }}
                    />
                </td>
                <td>
                    <input
                        value={props.count}
                        onChange={e => {
                            if (isNaN(e.target.value)) return;
                            props.onOrderItemChange({...props, count: e.target.value});
                        }}
                    />
                </td>
                <td>
                    <span>{getItemTotal()}</span>
                </td>
                <td>
                    <a href={"#"}
                       onClick={e => {
                           props.onOrderItemDelete({...props});
                       }}
                    >
                        删除
                    </a>
                </td>
            </tr>
        </React.Fragment>
    );
});
export {
    OrderItem
}