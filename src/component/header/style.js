export const containerStyle = theme => ({
  root: {
    background: theme.palette.primary.main,
  },
  wrapper: {
    maxWidth: 1370,
    minWidth: 1100,
    margin: [[0, 'auto']],
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: theme.palette.primary.main,
  },
});

const login = theme => ({
  width: 260,
  minHeight: 68,
  display: 'flex',
  alignItems: 'center',
  color: theme.palette.primary[50],
});

const line = (theme, margin) => ({
  width: 2,
  height: 12,
  margin,
  background: theme.palette.primary[700],
});

const right = () => ({
  display: 'flex',
  alignItems: 'center',
});

// 未登陆 头部样式
export const loginNotStyle = theme => ({
  logo: login(theme),
  right: right(),
  rightBtn: {
    fontSize: theme.typography.fontSizeLg,
    textTransform: 'capitalize',
  },
  line: line(theme, [[0, 4]]),
});

const drop = (theme, top, width) => ({
  position: 'absolute',
  top,
  left: 0,
  width,
  zIndex: theme.zIndex.tooltip,
});

// 登陆 头部样式
export const loginStyle = theme => ({
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
  navBtn: {
    minWidth: 0,
    height: 44,
    boxShadow: 'none',
    padding: 0,
    justifyContent: 'flex-start',
    textTransform: 'capitalize',
    color: theme.palette.primary[50],
    fontSize: theme.typography.fontSizeLg,
    '&:first-child': {
      marginRight: 26,
    },
    '& .triangle-right': {
      marginLeft: 10,
      borderTopColor: theme.palette.primary[50],
    },
  },
  lastBtn: {
    padding: [[0, 18]],
  },
  addActive: {
    background: theme.palette.primary.A400,
  },
  indicator: {
    width: 48,
    position: 'absolute',
    height: 2,
    bottom: 0,
    background: theme.palette.primary[50],
    transition: 'all .2s linear',
  },

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
  img: {
    width: 40,
    height: 40,
    display: 'flex',
  },
  name: {
    margin: [[0, 10, 0, 6]],
    fontSize: theme.typography.fontSizeLg,
    color: theme.palette.primary[50],
  },
  line: line(theme, [[0, 4, 0, 30]]),
  rightBtn: {
    fontSize: theme.typography.fontSizeLg,
    textTransform: 'capitalize',
  },
  dropDownContainer: drop(theme, 40, 170),
  dropDownContainer1: drop(theme, 44, 160),
  dropDownWrapper: {
    background: theme.palette.primary.A400,
    position: 'relative',
    top: 10,
  },
  dropDownWrapper1: {
    background: theme.palette.primary.A400,
  },
  dropDownArrow: {
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
  list: {
    padding: 0,
  },
  items: {
    width: '100%',
    height: 36,
    minHeight: 0,
    display: 'flex',
    justifyContent: 'flex-start',
    padding: [[0, 10]],
    color: theme.palette.primary[50],
    fontSize: theme.typography.fontSize,
    textTransform: 'capitalize',
  },
});
