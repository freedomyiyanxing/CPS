const login = theme => ({
  minHeight: 68,
  display: 'flex',
  alignItems: 'center',
  paddingLeft: 16,
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
  height: 42,
  minHeight: 0,
  display: 'flex',
  justifyContent: 'flex-start',
  color: theme.palette.primary[50],
  fontSize: theme.typography.fontSize,
  textTransform: 'capitalize',
});


export const containerStyle = theme => ({
  root: {
    padding: [[50, 0]],
    background: 'initial',
    color: theme.palette.primary[50],
    boxShadow: theme.shadows[0],
    transition: 'all .3s linear',
    '@media (max-width: 1370px)': {
      padding: [[25, 0]],
    },
  },
  root1: {
    padding: [[13, 0]],
    color: theme.palette.primary[50],
    background: theme.palette.background.black,
  },
  appBarBg: {
    padding: [[13, 0]],
    background: theme.palette.background.black,
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: [[0, 60]],
    '@media (max-width: 1370px)': {
      padding: [[0, 30]],
    },
  },
  logoWrapper: {
    display: 'flex',
  },
  logo: {
    fontSize: '11rem',
    height: 54,
  },
  left: {
    display: 'flex',
    alignItems: 'center',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
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
    height: 1,
    bottom: 8,
    background: theme.palette.primary[50],
    transition: 'all .2s linear',
    transform: 'translateX(47px)',
  },
  linkBtn: {
    minWidth: 0,
    marginLeft: 32,
    height: 44,
    boxShadow: 'none',
    padding: [[12, 16]],
    justifyContent: 'flex-start',
    color: theme.palette.primary[50],
    fontSize: theme.typography.fontSizeLg,
    '& .triangle-right': {
      marginLeft: 10,
      borderTopColor: theme.palette.primary[50],
    },
    '&:hover': {
      background: theme.palette.primary.A400,
    },
  },
  linkCollapse: {
    position: 'absolute',
    top: 44,
    left: 0,
    zIndex: theme.zIndex.tooltip,
  },
  linkList: {
    width: 160,
    height: 100,
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
    lineHeight: 1.4,
  },
  rightBtn: rightBtn(theme),

  accountCollapse: {
    position: 'absolute',
    top: 40,
    zIndex: theme.zIndex.tooltip,
  },
  accountWrapperInner: {
    width: 170,
    height: 110,
  },
  accountList: {
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

  dialogIcon: {
    fontSize: theme.typography.h1.fontSize,
  },
  dialogText: {
    fontSize: theme.typography.body2.fontSize,
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 80,
  },
});
