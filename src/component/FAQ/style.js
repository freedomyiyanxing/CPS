const faqStyle = theme => ({
  faqText: {
    color: theme.palette.primary[50],
    fontSize: '11rem',
  },
  logoWrapper: {
    display: 'flex',
    justifyContent: 'center',
    margin: [[40, 0, 50]],
  },
  logo: {
    height: 'inherit',
    fontSize: '26.3rem',
    color: theme.child.palette.iconBg,
    '& .st0': {
      color: theme.child.palette.bg,
    },
  },
  textList: {
    '& h4': {
      fontSize: theme.typography.h5.fontSize,
      color: theme.child.palette.bg,
      marginBottom: 16,
    },
    '& h5': {
      marginBottom: 35,
      lineHeight: 1.9,
      fontSize: theme.typography.h5.fontSize,
      color: theme.child.palette.iconBg,
    },
    '& p': {
      lineHeight: 2.3,
      fontSize: theme.typography.h6.fontSize,
      color: theme.child.palette.iconBg,
    },
  },
  btnWrapper: {
    display: 'flex',
    justifyContent: 'center',
    margin: [[80, 0, 90]],
  },
  btn: {
    width: 246,
    height: 60,
    fontSize: '2.6rem',
    borderRadius: 30,
  },
  marginBom8: {
    marginBottom: 80,
  },
  marginBom5: {
    marginBottom: 50,
  },
});

export default faqStyle;
