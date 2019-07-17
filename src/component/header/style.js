export const containerStyle = theme => ({
  root: {
    background: theme.palette.background.black,
  },
  wrapper: {
    maxWidth: 1370,
    minWidth: 1100,
    margin: [[0, 'auto']],
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: theme.palette.background.black,
  },
});

const login = theme => ({
  width: 260,
  minHeight: 68,
  display: 'flex',
  alignItems: 'center',
  color: theme.palette.primary[50],
});

const right = () => ({
  display: 'flex',
  alignItems: 'center',
});

const rightBtn = theme => ({
  padding: 16,
  color: theme.palette.primary.contrastText,
  fontSize: theme.typography.fontSizeLg,
  borderRadius: 10,
});

const _items = theme => ({
  width: '100%',
  height: 36,
  minHeight: 0,
  display: 'flex',
  justifyContent: 'flex-start',
  padding: [[0, 10]],
  color: theme.palette.primary[50],
  fontSize: theme.typography.fontSize,
  textTransform: 'capitalize',
});

// 未登陆 头部样式
export const loginNotStyle = theme => ({
  logo: login(theme),
  right: right(),
  rightBtn: rightBtn(theme),
});

// 登陆 头部样式
export const loginStyle = theme => ({
  // 弹出框
  dialogWrapper: {
    width: 400,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderTop: '4px solid',
    minHeight: 180,
  },
  dialogIcon: {
    fontSize: theme.typography.h1.fontSize,
  },
  dialogText: {
    fontSize: theme.typography.fontSizeMd,
  },
  dialogFooter: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  dialogButton: {
    padding: [[10, 30]],
  },
});

// 登陆头部 left样式
export const leftStyle = theme => ({
  left: {
    display: 'flex',
    flexDirection: 'column',
  },
  logo: login(theme),
  nav: {
    width: '100%',
    display: 'flex',
    position: 'relative',
  },
  indicator: {
    width: 48,
    position: 'absolute',
    height: 2,
    bottom: 0,
    background: theme.palette.primary[50],
    transition: 'all .2s linear',
    transform: 'translateX(12px)',
  },
  linkBtn: {
    minWidth: 0,
    height: 44,
    boxShadow: 'none',
    padding: 14,
    justifyContent: 'flex-start',
    color: theme.palette.primary[50],
    fontSize: theme.typography.fontSizeLg,
    '& .triangle-right': {
      marginLeft: 10,
      borderTopColor: theme.palette.primary[50],
    },
    // '&:hover': {
    //   background: theme.palette.primary.A400,
    // },
  },
  linkCollapse: {
    position: 'absolute',
    top: 44,
    left: 0,
    zIndex: theme.zIndex.tooltip,
  },
  linkList: {
    width: 160,
    height: 72,
    padding: 0,
    background: theme.palette.primary.A400,
  },
  items: _items(theme),
});

// 登陆头部 left样式
export const rightStyle = theme => ({
  // 左边
  right: right(),
  rightInfo: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    '& .triangle-right': {
      borderTopColor: theme.palette.primary[50],
    },
  },
  bigAvatar: {
    borderRadius: 'inherit',
  },
  defaultAvatar: { background: 'none' },
  name: {
    margin: [[0, 10, 0, 6]],
    fontSize: theme.typography.fontSizeLg,
    color: theme.palette.primary[50],
    overflow: 'hidden',
    maxWidth: 110,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  rightBtn: rightBtn(theme),

  accountCollapse: {
    position: 'absolute',
    top: 40,
    zIndex: theme.zIndex.tooltip,
  },
  accountWrapperInner: {
    width: 170,
    height: 82,
  },
  accountList: {
    padding: 0,
    position: 'relative',
    top: 10,
    background: theme.palette.primary.A400,
  },
  accountArrow: {
    position: 'absolute',
    width: 14,
    height: 14,
    top: 4,
    left: '50%',
    marginLeft: -10,
    opacity: 1,
    background: theme.palette.primary.A400,
    transform: 'rotate(225deg)',
  },

  items: _items(theme),
});
