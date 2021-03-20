import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
	html {
        font-size: 62.5%;
		font-size: 8px;
        @media (min-width: 2048px) {
            font-size: 9px;
    	}
        @media (min-width: 3600px) {
            font-size: 18px;
    	}
		@media (max-width: 1600px) {
            font-size: 8px;
    	}
    	@media (max-width: 768px) {
            font-size: 8px;
    	}
		@media (max-width: 360px) {
            font-size: 8px;
    	}
    }
    *,*::before,*::after {
        box-sizing: border-box;
    }
    * {
      padding: 0;
      margin: 0;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    body {
        font-size: 1.6rem;
        font-family: 'Overpass', sans-serif;
        min-height: 100vh;
        background-color: ${({ theme }) => theme.colors.background};
        /* background-image: ${({ theme }) => theme.colors.backgroundGradient}; */
    }
    ul {
        list-style: none;
    }
    a {
        color: inherit;
        text-decoration: none;
    }
    button, select, input, textarea {
        background-color: transparent;
        border: none;
        outline: none;
        font-family: 'Overpass', sans-serif;
        cursor: pointer;
    }
    select, input, textarea {
        color: ${({ theme }) => theme.colors.text};
        border-bottom: 0.1rem solid ${({ theme }) => theme.colors.text};
        margin-top: 0rem;
        font-size: 1.9rem;
        padding: .7rem 0 .5rem;
    }
    svg {
        width: auto;
        height: auto;
    }
    div.select ul {
        z-index: 999;
    }
`;

export default GlobalStyle;
