import React from "react";
import {FormItem, Label} from "../../ui";

const Person = React.memo(function Person(props) {
    console.log("person-------222", props);
    return (
        <div>
            <FormItem>
                <Label>姓名:</Label>
                <input
                    style={{width:"300px"}}
                    value={props.name}
                    onChange={e => {
                        props.onPersonChange({...props, name: e.target.value})
                    }}
                />
            </FormItem>
            <FormItem>
                <Label>身份证:</Label>
                <input
                    style={{width:"300px"}}
                    value={props.idno}
                    onChange={e => {
                        props.onPersonChange({...props, idno: e.target.value})
                    }}
                />
            </FormItem>
            <FormItem>
                <Label>住址:</Label>
                <input
                    style={{width:"300px"}}
                    value={props.address}
                    onChange={e => {
                        props.onPersonChange({...props, address: e.target.value})
                    }}
                />
            </FormItem>
        </div>
    );
});
export {
    Person
}