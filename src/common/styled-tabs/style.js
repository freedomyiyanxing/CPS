const tabsStyle = theme => ({
  root: {
    minHeight: 0,
  },
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > div': {
      maxWidth: 64,
      width: '100%',
      backgroundColor: theme.palette.primary[50],
    },
  },
});

export default tabsStyle;
