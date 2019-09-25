const footerStyle = theme => ({
  root: {
    width: '100%',
    background: theme.palette.primary.main,
  },
  wrapper: {
    maxWidth: 1160,
    minWidth: 1100,
    margin: [[0, 'auto']],
    padding: [[20, 30]],
    background: theme.palette.primary.main,
  },
  footerNavigation: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  itemHeader: {
    marginBottom: 16,
    '& span': {
      lineHeight: 1.7,
      fontWeight: theme.typography.fontWeight,
      color: theme.palette.primary[500],
      fontSize: theme.typography.fontSizeLg,
    },
  },
  itemContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  itemIcon: {
    display: 'flex',
    paddingTop: 10,
    color: theme.palette.primary[50],
    '& > svg': {
      fontSize: '3.2rem',
      marginRight: 46,
      '&:last-child': {
        marginRight: 0,
      },
    },
  },
  links: {
    marginBottom: 10,
    lineHeight: 1.7,
    fontSize: theme.typography.fontSize,
    color: theme.palette.text.colorDdd,
  },
  copyright: {
    marginTop: 20,
    '& p': {
      lineHeight: 1.9,
      fontSize: theme.typography.caption.fontSize,
      color: theme.palette.primary[500],
    },
  },
});

export default footerStyle;
