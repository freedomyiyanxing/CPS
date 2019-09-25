const notHomeStyle = theme => ({
  left: {
    maxWidth: 600,
    display: 'flex',
    flexDirection: 'column',
  },
  text: {
    marginTop: 20,
    fontSize: '2.7rem',
    lineHeight: 1.45,
  },
  right: {
    maxWidth: 500,
  },
  prompt: {
    fontSize: '2.2rem',
    lineHeight: 1.8,
  },
  btnWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 32,
  },
  btn: {
    width: 224,
    height: 48,
    borderRadius: 30,
    fontSize: '2.5rem',
  },

  list: {
    display: 'flex',
    justifyContent: 'stretch',
    padding: [[80, 80, 0]],
  },
  item: {
    width: 320,
    marginRight: 100,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '&:last-child': {
      marginRight: 0,
    },
  },
  listIcon: {
    width: 137,
    height: 137,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    background: theme.palette.secondary.A400,
  },
  icon: {
    color: theme.child.palette.iconBg,
  },
  listTitle: {
    margin: [[50, 0, 16]],
    fontSize: '4rem',
    lineHeight: 1.7,
    color: theme.child.palette.titleColor,
  },
  listText: {
    fontSize: '2rem',
    lineHeight: 2,
    textAlign: 'center',
    color: theme.child.palette.titleColor,
  },

  footer: {
    width: '100%',
    margin: [[84, 0]],
    textAlign: 'right',
  },
  links: {
    marginLeft: 30,
    fontSize: '2rem',
    color: theme.child.palette.iconBg,
  },
});

export default notHomeStyle;
