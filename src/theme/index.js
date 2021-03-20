const colorsDark = {
    // App styles
    background: 'rgba(23,38,65,1)',
    backgroundGradient: 'linear-gradient(to bottom right,rgba(23,38,65,1),rgba(13,28,55,1))',
    title: 'rgba(255,255,255,1)',
    sideBackground: 'rgba(16,29,51,1)',
    sideBackgroundGradient: 'linear-gradient(to bottom right,rgba(16,29,51,1),rgba(6,19,41,1))',
    text: 'rgba(255,255,255,1)',

    // Side nav
    sideNav: 'rgba(16,29,51,1)',
    sideNavActive: 'rgba(34,61,98,1)',
    sideNavActiveGradient: 'linear-gradient(to bottom right, rgba(33,48,75,1),rgba(18,33,60,1))',
    sideNavText: 'rgba(255,255,255,1)',
    sideNavTextActive: 'rgba(5,122,240,1)',
    sideNavActiveColor: 'rgba(12,20,36,1)',

    // Top Nav
    navColor: 'rgba(255,255,255,1)',
    navBackground: 'rgba(16,29,51,1)',
    navActiveBackground: 'rgba(16,29,51,1)',
    navActiveColor: 'rgba(5,122,240,1)',
    topNavActive: 'linear-gradient(to bottom right,rgba(16,29,51,1),rgba(6,19,41,1))',
    boxShadow: '0px 0px 20px -7px rgba(2,10,36,1)',

    // Buttons
    roleButton: 'rgba(0,0,0,.3)',
    cancelButton: 'linear-gradient(to bottom right, rgba(190, 190, 190, 1), rgba(110, 110, 110, 1))',
    removeButton: 'linear-gradient(to bottom right, rgba(170, 170, 170, 1), rgba(90, 90, 90, 1))',

    // Modal
    modalBackgorund: 'rgba(255,255,255,.4)',
    modalContentBackground: 'rgba(16,29,51,1)',

    // Select
    selectBackground: 'rgba(33,48,75,1)',
};
const colorsWhite = {
    // App styles
    background: 'rgba(251,252,254,1)',
    backgroundGradient: 'linear-gradient(to bottom right,rgba(251,252,254,1),rgba(241,242,244,1))',
    title: 'rgba(2,79,161,1)',
    sideBackground: 'rgba(200,226,255,1)',
    sideBackgroundGradient: 'linear-gradient(to bottom right,rgba(210,236,255,1),rgba(190,216,245,1))',
    text: 'rgba(5,122,240,1)',

    // Side nav
    sideNav: 'rgba(200,226,255,1)',
    sideNavActive: 'rgba(30, 128, 226,1)',
    sideNavActiveGradient: 'linear-gradient(to bottom right,rgba(5,122,240,1),rgba(0,70,141,1))',
    sideNavText: 'rgba(5,122,240,1)',
    sideNavTextActive: 'rgba(255,255,255,1)',
    sideNavButton: '',
    sideNavActiveColor: 'rgba(5,122,240,1)',

    // Top Nav
    navColor: 'rgba(5,122,240,1)',
    navBackground: 'rgba(200,226,255,1)',
    navActiveBackground: 'rgba(30, 128, 226, 1)',
    navActiveColor: 'rgba(255,255,255,1)',
    topNavActive: 'linear-gradient(to bottom right,rgba(5,122,240,1),rgba(0,70,141,1))',
    boxShadow: '0px 0px 20px -7px rgba(140,166,195,.75)',

    // Buttons
    roleButton: 'rgba(5,122,240,.15)',
    cancelButton: 'linear-gradient(to bottom right, rgba(220, 220, 220, 1), rgba(200, 200, 200, 1))',
    removeButton: 'linear-gradient(to bottom right, rgba(250, 250, 250, 1), rgba(230, 230, 230, 1))',

    // Modal
    modalBackgorund: 'rgba(0,0,0,.4)',
    modalContentBackground: 'rgba(255,255,255,1)',

    // Select
    selectBackground: 'rgba(246,247,249,1)',
};
export const colors = {
    primary: 'rgba(5,122,240,1)',
    secondary: 'rgba(2,79,161,1)',
    white: 'rgba(255,255,255,1)',
    errorRed: '#ff0033',
    colorsList: [
        'linear-gradient(to bottom right,#057AF0, #0247C0)',
        'linear-gradient(to bottom right,#5BBA13, #288700)',
        'linear-gradient(to bottom right,#FF82A9, #DD5076)',
        'linear-gradient(to bottom right,#EF8A17, #CD5704)',
        'linear-gradient(to bottom right,#EF3054, #BC0021)',
        'linear-gradient(to bottom right,#613DC1, #300A90)',
        'linear-gradient(to bottom right,#EF3054, #BC0021)',
        'linear-gradient(to bottom right,#CEBD28, #9B8905)',
        'linear-gradient(to bottom right,#ffbe0b, #CC8B08)',
        'linear-gradient(to bottom right,#f15bb5, #C02882)',
    ],
    gradientDark: 'linear-gradient(to bottom right,rgba(22,99,181,1),rgba(2,39,111,1))',
    gradientLight: 'linear-gradient(to bottom right,rgba(5,122,240,1),rgba(0,70,141,1))',
    blackAlpha: 'rgba(0,0,0,.2)',
    whiteAlpha: 'rgba(255,255,255,.25)',
    boxShadowwhite: '0px 0px 20px -7px rgba(140,166,195,.75)',
    modalWhiteBackgorund: 'rgba(0,0,0,.4)',
    modalWhiteContentBackground: 'rgba(255,255,255,1)',
    whiteBlue: 'rgba(200,226,255,1)',
    greyGradient: 'linear-gradient(to bottom right,rgba(210,210,210,1),rgba(160,160,160,1))',
};
const font = {
    XXL: '5rem',
    XL: '4.1rem',
    L: '3.5rem',
    M: '2.2rem',
    S: '1.9rem',
    XS: '1.4rem',
    light: '300',
    normal: '400',
    bold: '700',
    black: '900',
    lineHeightL: '4.5rem',
    lineHeightM: '3.5rem',
    lineHeightS: '3rem',
};

export const white = {
    colors: {
        ...colorsWhite,
        ...colors,
    },
    font,
    borderRadius: '.6rem',
    gridGap: '4rem',
};

export const dark = {
    colors: {
        ...colorsDark,
        ...colors,
    },
    font,
    borderRadius: '.6rem',
    gridGap: '4rem',
};

// export const colorsWhite2 = {
//   white: 'rgba(255,255,255,1)',
//   primary: 'rgba(5,122,240,1)',
//   secondary: 'rgba(2,79,161,1)',
//   secondaryWithOpacity: 'rgba(2,79,161,.9)',
//   tetriary: 'rgba(23,38,65,1)',
//   alphaBlue: 'rgba(203,225,250,1)',
//   alphaBlue2: 'rgba(222,238,255,1)',
//   gradientLightFirst: 'rgba(5,122,240,1)',
//   gradientLightSecond: 'rgba(0,70,141,1)',
//   gradientDarkSecond: 'rgba(23,38,65,1)',
//   gradientDarkFirst: 'rgba(7,62,119,1)',
//   gradientLight: 'linear-gradient(to bottom right,rgba(5,122,240,1),rgba(0,70,141,1))',
//   gradientDark: 'linear-gradient(to bottom right,rgba(7,62,119,1),rgba(23,38,65,1))',
//   reversePrimary: 'linear-gradient(to bottom right,rgba(0,70,141,1),rgba(5,122,240,1))',
//   error: '#ff4444',
// };
