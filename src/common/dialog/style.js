export const dialogsStyle = theme => ({
  dialog: {
    width: 600,
    margin: 0,
    maxHeight: 'calc(100% - 30px)',
  },
  header: {
    width: '100%',
    height: 45,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 20,
    background: theme.palette.primary.main,
    fontSize: theme.typography.fontSizeLg,
    color: theme.palette.primary.contrastText,
    fontWeight: theme.typography.fontWeight,
    borderRadius: [[0, 0, 4, 4]],
  },
  footer: {
    marginBottom: 30,
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  btn: {
    width: 120,
    height: 38,
    fontWeight: theme.typography.fontWeight,
    borderRadius: 4,
  },
});

export const withdrawStyle = theme => ({
  content: {
    margin: [[20, 0]],
  },
  items: {
    display: 'flex',
    alignItems: 'center',
    height: 40,
    marginBottom: 20,
  },
  left: {
    flex: '0 0 206px',
    textAlign: 'right',
    marginRight: 22,
    fontSize: theme.typography.fontSizeLg,
  },
  right: {
    width: 272,
  },
  img: {
    '& img': {
      width: 138,
    },
  },
  all: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 24,
    fontWeight: theme.typography.fontWeight,
  },
  input: {
    width: '100%',
  },
  links: {
    color: theme.palette.text.secondary,
  },
});
