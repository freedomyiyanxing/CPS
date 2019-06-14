export const submitButtonStyle = theme => ({
  wrapperBtn: {
    marginTop: 30,
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
  },
  btn: { // 解决同一个页面 不同组件引入相同的Button组件导致的问题
    minHeight: 38,
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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

export const mySelectStyle = theme => ({
  root: {
    '&:before': {
      borderBottomColor: theme.palette.text.colorDdd,
    },
  },
  icon: {
    color: theme.palette.text.secondary,
  },
  menu: {
    maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
  },
});

export const myTextareaStyle = theme => ({
  root: {
    '&:before': {
      borderBottomColor: theme.palette.text.colorDdd,
    },
    '& > textarea': {
      fontSize: theme.typography.fontSizeMd,
    },
  },
});

export const psdVisibilityStyle = theme => ({
  icon: {
    fontSize: theme.typography.fontSizeLg,
  },
});

export const radioStyle = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    margin: [[16, 0, 8]],
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
