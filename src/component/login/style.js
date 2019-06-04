// eslint-disable-next-line no-unused-vars
export const loginStyle = theme => ({
  wrapper: {},
  root: {
    '&:before': {
      borderBottomColor: theme.palette.text.colorDdd,
    },
  },
  btn: {
    minHeight: 38,
    marginTop: 30,
    boxShadow: 'none',
    textTransform: 'capitalize',
    borderRadius: 4,
    backgroundColor: theme.palette.primary.dark,
  },
  main: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  checkRoot: {
    padding: 6,
  },
  icon: {
    fontSize: theme.typography.fontSizeLg,
  },
  label: {
    color: theme.palette.text.color9F,
    fontSize: theme.typography.fontSizeSm,
  },
  text: {
    color: theme.palette.text.color9F,
    fontSize: theme.typography.fontSizeSm,
    cursor: 'pointer',
  },
});

export const homeStyle = theme => ({
  root: {
    background: theme.palette.primary[50],
  },
  wrapper: {
    marginBottom: 10,
  },
});
