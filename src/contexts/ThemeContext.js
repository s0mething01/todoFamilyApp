import { useContext, createContext } from 'react';
import useStateWithLocalStorage from 'hooks/useStateWithLocalStorage';

import { ThemeProvider } from 'styled-components';
import { white, dark } from 'theme';

const ThemeContext = createContext({
    themeColor: 'dark',
    setThemeColor: () => {},
});

export const useTheme = () => {
    return useContext(ThemeContext);
};

export const ThemeContextProvider = ({ children }) => {
    const [themeColor, setThemeColor] = useStateWithLocalStorage('theme', 'dark');

    return (
        <ThemeContext.Provider value={{ themeColor, setThemeColor }}>
            <ThemeProvider theme={themeColor === 'dark' ? dark : white}>{children}</ThemeProvider>
        </ThemeContext.Provider>
    );
};

export default ThemeContext;
