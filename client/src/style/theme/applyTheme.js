const { lightTheme, darkTheme } = require('./theme');

export const applyTheme = (nextTheme) => {
  const theme = nextTheme === 'dark' ? darkTheme : lightTheme;
  Object.keys(theme).forEach((key) => {
    const value = theme[key];
    document.documentElement.style.setProperty(key, value);
  });
  console.log(document.documentElement.style);
};
