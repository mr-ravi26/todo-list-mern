import styled from "styled-components";


// ${props => props.theme.main}

const HeaderStyled = styled.div`
    .app-bar-header {
      color: white;
      height: 64px;
      box-shadow: none;
    }

    .app-bar-toolbar {
      @media only screen and (min-width: 786px) {
        padding-left: 84px;
        padding-right: 84px;
      }
    }

    .app-bar-header-menu {
        font-family: Roboto;
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        display: flex;
        align-items: center;
        text-align: center;
        letter-spacing: 0.4px;
        @media only screen and (max-width: 785px) {
          margin-left: 16px;
        }
    }

    .app-bar-header-menu-table {
      display: table;
    }

    .dialog-overflow-y-hidden {
      overflow-y: hidden;
    }
`;

export default HeaderStyled;