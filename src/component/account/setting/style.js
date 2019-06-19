export const settingStyle = theme => ({
  header: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    marginBottom: 12,
    background: theme.palette.primary[50],
  },
  btn: {
    padding: [[16, 20]],
    textTransform: 'capitalize',
    fontWeight: theme.typography.fontWeight,
    fontSize: theme.typography.fontSizeLg,
    color: theme.palette.text.secondary,
    '&:hover': {
      background: 'none',
    },
  },
  active: {
    color: theme.palette.text.primary,
  },
  line: {
    width: 2,
    height: 14,
    background: theme.palette.text.secondary,
  },

  root: {
    display: 'flex',
    padding: [[20, 24, 60]],
    background: theme.palette.primary[50],
  },
  left: {
    flex: '0 0 398px',
  },
  right: {
    flex: 1,
  },
});

export const cropperStyle = theme => ({
  root: {
    flex: 1,
    position: 'relative',
  },
  wrapper: {
    position: 'absolute',
    top: 46,
    right: 257,
    width: 120,
    height: 120,
    cursor: 'pointer',
    overflow: 'hidden',
    borderRadius: '50%',
    boxShadow: '0px 1px 5px 0px rgba(0,0,0,1)',
    '&:hover > span': {
      transform: 'translateY(0)',
    },
  },
  mask: {
    width: '100%',
    height: 30,
    position: 'absolute',
    bottom: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: theme.palette.background.black,
    transition: 'all .2s linear',
    transform: 'translateY(30px)',
    opacity: 0.8,
  },
  icon: {
    color: theme.palette.primary[50],
  },
  dialog: {
    overflow: 'hidden',
    borderRadius: 5,
    padding: 10,
    margin: 0,
    maxWidth: 800,
    maxHeight: 'calc(100% - 30px)',
  },
  dialogTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dialogBtn: {
    minHeight: 36,
    borderRadius: 5,
    padding: 0,
  },
  label: {
    minHeight: 36,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    padding: [[0, 10]],
    '& > input': {
      display: 'none',
    },
  },
  dialogContent: {
    display: 'flex',
    padding: [[10, 0]],
    borderTop: `1px solid ${theme.palette.text.colorDdd}`,
    borderBottom: `1px solid ${theme.palette.text.colorDdd}`,
  },
  dialogView: {
    marginLeft: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dialogFooter: {
    padding: 10,
    display: 'flex',
    justifyContent: 'space-between',
  },
  dialogControl: {
    width: 74 * 5,
    display: 'flex',
    justifyContent: 'space-between',
  },
});
