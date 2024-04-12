import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    :root {
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600&family=Reggae+One&display=swap');

        // black/blue theme
        --dime-green: #1ED8AB;
        --dime-dark-black: #303030;
        --text-black: #393838;
        --dark-grey: #7B8791;
        --light-grey: #ECEFFF;
        --red: #EC7474;
    }

    body {
        background-color: var(--light-grey);
        color: var(--text-black);
    }

    body, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a {
        margin: 0;
        padding: 0;
        font-family: 'Inter', sans-serif;
    }
`

export default GlobalStyle