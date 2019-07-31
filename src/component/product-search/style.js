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
    width: '24.2%',
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
      background: theme.palette.background.disabled,
      display: 'block',
      width: '100%',
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
    color: theme.palette.text.primary,
  },
  name: {
    width: '100%',
    lineHeight: '26px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    textAlign: 'center',
    fontSize: theme.typography.fontSizeMd,
    fontWeight: theme.typography.fontWeight,
  },
  price: {
    height: 26,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: theme.typography.fontSizeMd,
    '& span:first-child': {
      marginRight: 10,
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
  },
  advertising: {
    display: 'flex',
    alignItems: 'center',
    height: 24,
    fontSize: theme.typography.fontSize,
  },
  brokerage: {
    margin: [[0, 6, 0, 10]],
    fontWeight: theme.typography.fontWeight,
    color: theme.palette.error[500],
  },
  rate: {
    color: theme.palette.error[500],
  },
  date: {
    lineHeight: '24px',
    fontSize: theme.typography.fontSize,
    '& span:last-child': {
      marginLeft: 10,
      fontSize: theme.typography.fontSizeMd,
    },
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
