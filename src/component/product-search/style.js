export const indexStyle = () => ({
  root: {
    display: 'flex',
  },
});

export const viewStyle = () => ({
  root: {
    flex: 1,
  },
  header: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  wrapper: {
    width: '100%',
    display: 'flex',
    flexFlow: 'wrap',
  },
});

export const itemStyle = theme => ({
  root: {
    width: '24.25%',
    marginBottom: 10,
    marginRight: '1%',
    background: theme.palette.primary[50],
    '&:nth-child(4n)': {
      marginRight: 0,
    },
    '&:hover': {
      boxShadow: theme.shadows[5],
    },
  },
  img: {
    width: '100%',
    height: 'inherit',
    borderRadius: 'inherit',
    '&:before': {
      paddingTop: 312,
      content: '""',
      display: 'block',
      width: '100%',
      background: theme.palette.primary[300],
    },
    '& > img': {
      position: 'absolute',
    },
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: [[0, 10]],
    fontSize: theme.typography.fontSize,
    color: theme.palette.text.primary,
    borderBottom: `1px solid ${theme.palette.primary[100]}`,
  },

  items: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 4,
    '& > span': {
      lineHeight: 1.8,
    },
    '& > span:first-child': {
      marginRight: 20,
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
    '& > span:last-child': {
      whiteSpace: 'nowrap',
    },
    '&:last-child': {
      marginBottom: 0,
    },
  },

  price: {
    margin: [[4, 0, 10]],
    '& > span': {
      display: 'flex',
      alignItems: 'flex-end',
      fontWeight: theme.typography.fontWeight,
    },
  },

  store: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.primary[500],
    minWidth: 0,
    '& > span:last-child': {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      lineHeight: 1.8,
    },
  },
  storeIcon: {
    marginRight: 8,
    fontSize: theme.typography.fontSize,
  },
  purseIcon: {
    marginRight: 5,
    fontSize: theme.typography.body1.fontSize,
  },
});

export const itemButtonStyle = theme => ({
  btnWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  btn: {
    flex: 1,
    height: 38,
  },
  disabled: {
    background: theme.palette.primary[400],
  },
  copyWrapper: {
    width: 500,
    height: 150,
    margin: [[20, 20, 30]],
    padding: 10,
    fontSize: theme.typography.fontSizeMd,
    color: theme.palette.text.secondary,
    border: `1px solid ${theme.palette.border.borderDD}`,
  },
});
