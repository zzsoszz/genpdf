import shortid from "shortid";

import {
    ADD_ORDER,
    ADD_ORDER_ITEM,
    DELETE_ORDER_ITEM,
    INIT_ORDER,
    UPDATE_CONTRACTOR,
    UPDATE_ORDER,
    UPDATE_ORDER_ITEM,
    UPDATE_PERSON,
    INIT_CONTRACTOR
} from "../actions";


function reducerOrder(order, action) {
    switch (action.type) {
        case ADD_ORDER_ITEM:
            if (order.items) {
                var newItem = {
                    id: shortid.generate(),
                    count: 0,
                    price: 0
                };
                return {
                    ...order,
                    items: [...order.items, newItem]
                };
            } else {
                var orderitems = [
                    {
                        id: shortid.generate(),
                        count: 0,
                        price: 0
                    }
                ];
                return {...order, items: orderitems};
            }
        case DELETE_ORDER_ITEM:
            console.log("DELETE_ORDER_ITEM" + action.payload.id);
            if (action.payload.id) {
                var newItems = order.items.filter(
                    item => item.id !== action.payload.id
                );
                return {...order, items: newItems};
            }
            return order;
        case UPDATE_ORDER_ITEM:
            if (action.payload.id) {
                var newItems = order.items.map(item =>
                    item.id === action.payload.id ? action.payload : item
                );
                order.items=newItems;
                return order;
            }
            return order;
        default:
            return order;
    }
}

function reducerOrders(orders, action) {
    console.log(action);
    switch (action.type) {
        case INIT_ORDER:
            return [...action.payload];
        case ADD_ORDER_ITEM:
            if (action.payload.orderId) {
                return orders.map(order => {
                    if (order.id === action.payload.orderId) {
                        return reducerOrder(order, action);
                    } else {
                        return order;
                    }
                });
            } else {
                return orders;
            }
        case DELETE_ORDER_ITEM:
            if (action.payload.orderId) {
                return orders.map(order => {
                    if (order.id === action.payload.orderId) {
                        return reducerOrder(order, action);
                    } else {
                        return order;
                    }
                });
            } else {
                return orders;
            }
        case UPDATE_ORDER_ITEM:
            if (action.payload.orderId) {
                return orders.map(order => {
                    if (order.id === action.payload.orderId) {
                        return reducerOrder(order, action);
                    } else {
                        return order;
                    }
                });
            } else {
                return orders;
            }
        case ADD_ORDER:
            return [
                ...orders,
                {
                    id: shortid.generate()
                }
            ];
        case UPDATE_ORDER:
            return orders.map(item => reducerOrder(item, action));
        default:
            return orders;
    }
}

function reducerPerson(person, action) {
    switch (action.type) {
        case UPDATE_PERSON:
            return {...action.payload};
        default:
            return person;
    }
}

function reducerContractor(contractor, action) {
    switch (action.type) {
        case UPDATE_PERSON:
            return {
                ...contractor,
                person: reducerPerson(contractor.person, action),
            };
        case UPDATE_CONTRACTOR:
            return {
                ...contractor,
                ...action.payload
            }
        case INIT_CONTRACTOR:
            return action.payload;
        default:
            return {
                ...contractor,
                orders: reducerOrders(contractor.orders, action)
            };
    }
}

export {
    reducerContractor
}