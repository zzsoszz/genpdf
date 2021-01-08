import styled, {css} from "styled-components";


const Layout = styled.div`
    display:flex;
`;

const LeftSideBar = styled.div`
    display:block;
    position:fixed;
    width:130px;
`;

const Content = styled.div`
    margin-left:130px;
    display:block;
    flex:1;
`;

export {
    Layout,
    LeftSideBar,
    Content
}


