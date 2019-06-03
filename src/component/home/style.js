export const notHomeStyle = (theme) => {
  console.log(theme);
  return {
    root: {
      background: theme.palette.primary[500],
    },
    wrapper: {
      marginBottom: 10,
    },
  };
};

export const homeStyle = (theme) => {
  console.log(theme, '---');
  return {
    root: {
      background: theme.palette.primary[50],
    },
    wrapper: {
      marginBottom: 10,
    },
  };
};
