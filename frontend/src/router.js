import React, { useState, useEffect,useContext } from "react";
import { useLocation } from "react-use";
const RouterContext=React.createContext();

var route = require('path-match')({
    sensitive: false,
    strict: false,
    end: false,
});

var routeExact = require('path-match')({
    sensitive: false,
    strict: false,
    end: true,
});

/**@xyg
 * import pathToRegexp from "path-to-regexp";
 * https://github.com/pillarjs/path-to-regexp#parameters
 * https://github.com/dashed/react-hashchange/blob/master/src/index.js
 * https://github.com/pillarjs/path-match
 * https://www.npmjs.com/package/path-to-regexp
 */

function Route(props) {
    const historyState=useContext(RouterContext);
    var match = props.exact? routeExact(props.path): route(props.path) ;
    var params = match(historyState.pathname);
    console.log("Route.............",props.path,historyState.pathname);
    console.log("Route.............params",params);
    if (params === false) {
        return null;
    }
    return <props.component history={{params:params}} />;
}


function Router(props) {
    const historyState = useLocation();
    return (
        <RouterContext.Provider value={historyState}>
            {
                React.Children.map(props.children, (child, i) => {
                    if (typeof child === "function") {
                        return child();
                    }
                    return React.cloneElement(child, { ...child.props });//, historyState: historyState 使用上下文代替props
                })
            }
        </RouterContext.Provider>
    )
}

function Link(props){
    function goTo(e){
        e.preventDefault();
        window.history.pushState(props.to,null,props.to);
    }
    return <a style={{margin:"8px"}} href={props.to} onClick={goTo}>{props.children}</a>
}

export{
    Router,
    Route,
    Link
}