const footerStyle = theme => ({
  root: {
    width: '100%',
    background: theme.palette.primary.dark,
  },
  wrapper: {
    width: 1064,
    margin: [[20, 'auto', 10, 'auto']],
  },
  footerNavigation: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  item: {
    // flex: '0 0 33%',
  },
  itemHeader: {
    marginBottom: 16,
    '& span': {
      display: 'block',
      width: '100%',
      fontWeight: theme.typography.fontWeight,
      color: theme.palette.text.color9F,
      fontSize: theme.typography.fontSizeMd,
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
