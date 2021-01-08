import React from "react";
import {Link, Route, Router} from "../router";
import {ContractorList} from "./constractor/ContractorList";
import {Contractor} from "./constractor/Contractor";
import { Container } from 'react-awesome-styled-grid'
import {Menu,MenuItem} from "../ui";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList,faPlus } from '@fortawesome/free-solid-svg-icons'
import {ContractorEdit} from "./constractor/ContractorEdit";
import  {
    Layout,
    LeftSideBar,
    Content
} from "./Layout";

// import {ContractorEdit} from "./constractor/ContractorEdit";


/**
 * https://github.com/styled-components/awesome-styled-components
 * https://github.com/santosfrancisco/react-awesome-styled-grid
 * @returns {*}
 * @constructor
 */
function Home() {
    return (
            <Layout>
                <LeftSideBar>
                    <Menu>
                        <MenuItem>
                             <FontAwesomeIcon icon={faList} />
                             <Link to="/contractor" >住户列表</Link>
                        </MenuItem>
                        <MenuItem>
                            <FontAwesomeIcon icon={faPlus} />
                            <Link to="/contractor/add" >添加住户</Link>
                        </MenuItem>
                    </Menu>
                </LeftSideBar>
                <Content>
                    <Route exact path="/contractor" component={ContractorList} />
                    <Route exact path="/contractor/add" component={Contractor} />
                    <Route exact path="/contractor/edit/:id" component={ContractorEdit} />
                </Content>
            </Layout>
    )
}
export {
    Home
}