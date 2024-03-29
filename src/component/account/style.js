const indexStyle = theme => ({
  root: {
    minHeight: 'calc(100vh - 390px)',
    background: theme.palette.primary[50],
  },
  list: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: [[0, 110]],
  },
  listItem: {
    flex: '0 0 33.33%',
    margin: [[25, 0]],
    padding: 20,
    borderRadius: 5,
    '&:hover .MuiListItemIcon-root': {
      background: 'none',
    },
  },
  listAvatar: {
    minWidth: 50,
    width: 50,
    marginRight: 15,
    justifyContent: 'center',
    height: 50,
    alignItems: 'center',
    background: theme.palette.primary[100],
    color: theme.palette.text.secondary,
    transition: 'background 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  },
  title: {
    fontWeight: theme.typography.fontWeight,
  },
  dialogWrapper: {
    minHeight: 92,
  },
});

const containerStyle = theme => ({
  root: {
    display: 'flex',
    padding: [[10, 24, 40]],
    background: theme.palette.primary[50],
  },
  wrapper: {
    width: 400,
  },
  title: {
    width: '100%',
    height: 50,
    marginBottom: 2,
    lineHeight: '50px',
    paddingLeft: 20,
    fontSize: theme.typography.fontSizeLg,
    fontWeight: theme.typography.fontWeight,
    background: theme.palette.primary[50],
  },
});

const cropperStyle = theme => ({
  root: {
    flex: 1,
    position: 'relative',
  },
  wrapper: {
    position: 'absolute',
    top: 46,
    right: 257,
    cursor: 'pointer',
    overflow: 'hidden',
    borderRadius: '50%',
    boxShadow: '0px 1px 5px 0px rgba(0,0,0,1)',
    '&:hover > span': {
      transform: 'translateY(0)',
    },
  },
  bigAvatar: {
    width: 120,
    height: 120,
  },
  iconAvatar: {
    width: 120,
    height: 120,
    '& > svg': {
      fontSize: 60,
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
    paddingBottom: 10,
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
  close: {
    fontSize: theme.typography.button.fontSize,
  },
  btnWrapper: {
    marginTop: 0,
    width: 80,
  },
  cropperPreviewMax: {
    width: 200, height: 200, overflow: 'hidden',
  },
  cropperPreviewMin: {
    width: 120, height: 120, overflow: 'hidden', borderRadius: '50%',
  },
});

const paymentStyle = () => ({
  root: {
    margin: [[50, 0, 10]],
    position: 'relative',
    overflow: 'hidden',
    minHeight: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  gobacks: {
    marginTop: 50,
  },
});

const taxesStyle = theme => ({
  root: {
    fontSize: theme.typography.fontSizeLg,
  },
});


export {
  indexStyle,
  containerStyle,
  cropperStyle,
  paymentStyle,
  taxesStyle,
};
