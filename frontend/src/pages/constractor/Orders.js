import React, {useContext} from "react";
import {DispatchContext} from "./DispatchContext";
import {Order} from "./Order";
import {ADD_ORDER} from "../../actions";
const Orders = React.memo(function Orders(props) {
    const orders = props.orders;
    const dispatch = useContext(DispatchContext);
    return (
        <div className="App">
            <div>
                <div>
                    {orders.map((item, index) => (
                        <Order key={index} {...item} person={props.person}/>
                    ))}
                </div>
                {/*<div>final price:{getTotal()}</div>*/}
                <div style={{margin: "32px"}}>
                    <button onClick={e => dispatch({type: ADD_ORDER})}>
                        ADD ORDER
                    </button>
                </div>
            </div>
        </div>
    );
});

export {
    Orders
}