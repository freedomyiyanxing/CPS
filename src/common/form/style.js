export const submitButtonStyle = () => ({
  wrapperBtn: {
    marginTop: 30,
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
  },
  bank: {
    justifyContent: 'space-between',
  },
  btn: props => ({
    width: props.width || '100%',
    minHeight: 38,
    borderRadius: 5,
  }),
});

export const psdVisibilityStyle = theme => ({
  icon: {
    fontSize: theme.typography.fontSizeLg,
  },
});

export const radioStyle = theme => ({
  root: {
    alignItems: 'center',
    flexDirection: 'initial',
  },
  label: {
    color: theme.palette.text.secondary,
    fontSize: theme.typography.fontSizeMd,
    transform: 'translate(0, 1.5px) scale(0.75)',
    transformOrigin: 'top left',
  },
  icon: {
    fontSize: theme.typography.fontSizeLg,
  },
});
