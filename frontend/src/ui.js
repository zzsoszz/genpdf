import styled, {css} from "styled-components";


const Panel = styled.div`
  padding: 16px;
  border: 1px solid #ebedf0;
  margin: 16px;
  ${props => props.center && css`
        text-align:center;
  `}
`;

const Button = styled.span`
    padding: 4px 16px;
    border: 1px solid #ebedf0;
    outline: 0;
    line-height: 1.499;
    display: inline-block;
    font-weight: 400;
    text-align: center;
    color: #fff;
    box-shadow: 0 2px 0 rgba(0,0,0,0.045);
    cursor:pointer;
      ${props => props.primary && css`
                border-color: #1890ff;
                background:#1890ff;
      `}
`;

const PanelHeader = styled.div`
  padding: 8px;
`;

const PanelBody = styled.div`
  padding: 8px;
`;


const FormItem = styled.div`
  padding: 4px;
`;

const Label = styled.label`
  display:inline-block;
  width:5em;
  text-align:right;
  margin:4px 8px;
`;

const Menu = styled.div`
    height:100vh;
    display:flex;
    flex-direction:column;
    background-color: rgb(0, 12, 23);
`;


const MenuItem = styled.div`
    padding:8px 16px;
    color: #fff;
    background:#001529;
    margin:2px 0px;
    &:hover {
        background-color: #1890ff;
    }
    > *{ 
       color: #fff;
       text-decoration:none;
    }
`;

export {
    Panel,
    PanelHeader,
    PanelBody,
    FormItem,
    Label,
    Menu,
    MenuItem,
    Button
}