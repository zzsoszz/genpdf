import React, {useCallback, useContext, useEffect, useReducer, useState} from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import {Route,Router,Link} from "./router";
import {Contractor} from "./pages/constractor/Contractor";
import {ContractorList} from "./pages/constractor/ContractorList";
import {Home} from "./pages/Home";


//const baseUrl = "http://192.168.1.105:8080/gen";
//const baseUrl = "http://127.0.0.1:8080/gen";
const baseUrl = "http://47.106.199.127:8080/gen";


class App extends React.Component {
    render() {
        return (
            <Router>
                <Route path="/" component={Home} />
            </Router>
        );
    }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App/>, rootElement);
