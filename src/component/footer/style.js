const footerStyle = theme => ({
  root: {
    width: '100%',
    background: theme.palette.primary.dark,
  },
  wrapper: {
    width: 1100,
    minWidth: 1100,
    margin: [[0, 'auto']],
    padding: [[20, 0, 10]],
    background: theme.palette.primary.dark,
  },
  footerNavigation: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  itemHeader: {
    marginBottom: 16,
    '& span': {
      display: 'block',
      width: '100%',
      fontWeight: theme.typography.fontWeight,
      color: theme.palette.text.secondary,
      fontSize: theme.typography.fontSizeLg,
    },
  },
  itemContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  links: {
    lineHeight: '22px',
    fontSize: theme.typography.fontSizeSm,
    color: theme.palette.text.colorDdd,
  },
  copyright: {
    marginTop: 20,
    '& p': {
      lineHeight: '22px',
      fontSize: theme.typography.fontSizeXs,
      color: theme.palette.text.colorDdd,
    },
  },
});

export default footerStyle;
