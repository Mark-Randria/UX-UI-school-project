import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

    body {
        margin: 0;
        font-family: Roboto, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-weight: 300;
        font-size: 18px;
        line-height: 1.5;
        color: rgba(0,0,0,.87); 
    }

    code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
        monospace;
    }

    h1 { 
        font-family: "Roboto Condensed", Arial, sans-serif;
        font-weight: 300;
        font-size: 32px;
        line-height: 1.05;
        color: #eee;
        padding: 17px 0; 
    }
    h2 { 
        font-family: "Roboto", sans-serif;
        font-weight: 100;
        font-size: 48px;
        line-height: 1.15;
        margin: 0; 
    }
    h3 { 
        font-family: "Roboto Condensed", sans-serif;
        font-weight: 300;
        font-size: 32px;
        line-height: 1.1;
        margin-top: 40px;
    }
    h4 { 
        font-family: "Roboto Condensed", sans-serif;
        font-weight: 300;
        font-size: 25px;
        line-height: 1.5;
        margin-top: 30px; }
    h5 { 
        font-family: "Roboto Condensed", sans-serif;
        font-weight: 400;
        font-size: 20px;
        line-height: 1.5;
        margin-top: 30px;
    }
    h6 { 
        font-family: "Roboto Condensed", sans-serif;
        font-weight: 400;
        font-size: 16px;
        line-height: 1.5;
        text-transform: uppercase;
        margin-top: 30px; 
    }

`;

export default GlobalStyle;
