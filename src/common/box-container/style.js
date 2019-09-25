const containerStyle = theme => ({
  container: {
    width: '100%',
  },
  root: {
    position: 'relative',
    minWidth: 1100,
  },
  wrapper: props => ({
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 10,
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    color: theme.palette.primary[50],
    background: props.isHome ? 'rgba(0, 0, 0, 0.64)' : null,
  }),
  content: {
    margin: [[0, 'auto']],
    maxWidth: 1430,
    padding: [[0, 30]],
    minWidth: 1100,
  },
  img: {
    width: '100%',
    display: 'flex',
  },
  placeholderImg: {
    minHeight: 600,
    background: theme.palette.background.disabled,
  },
});

export default containerStyle;
