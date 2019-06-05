const submitButtonStyle = theme => ({
  wrapperBtn: {
    marginTop: 30,
    position: 'relative',
  },
  btn: {
    minHeight: 38,
    boxShadow: 'none',
    textTransform: 'capitalize',
    borderRadius: 4,
    backgroundColor: theme.palette.primary.dark,
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
    color: theme.palette.primary.primary,
  },
});

export default submitButtonStyle;
