export const containerStyle = theme => ({
  root: {
    background: theme.palette.primary.main,
  },
  wrapper: {
    maxWidth: 1370,
    minWidth: 1000,
    margin: [[0, 'auto']],
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

// 未登陆 头部样式
export const loginNotStyle = theme => ({
  logo: {
    width: 260,
    minHeight: 68,
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.primary[50],
  },
});


// 登陆 头部样式
export const loginStyle = theme => ({
  left: {
    display: 'flex',
    flexDirection: 'column',
  },
  logo: {
    width: 260,
    minHeight: 60,
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.primary[50],
  },
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
  indicator: {
    position: 'absolute',
    height: 2,
    background: 'red',
    width: 48,
    bottom: 0,
  },

  // 左边
  right: {
    display: 'flex',
    alignItems: 'center',
    color: '#fff',
  },
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
    border: `1px dashed ${theme.palette.primary[600]}`,
  },
  name: {
    margin: [[0, 10, 0, 6]],
    fontSize: theme.typography.fontSizeLg,
  },
  line: {
    width: 2,
    height: 12,
    margin: [[0, 20, 0, 30]],
    background: theme.palette.primary[700],
  },
  rightBtn: {
    fontSize: theme.typography.fontSizeLg,
    textTransform: 'capitalize',
  },
  dropDownContainer: {
    position: 'absolute',
    top: 40,
    left: 0,
    width: 170,
  },
  dropDownContainer1: {
    position: 'absolute',
    top: 44,
    left: 0,
    width: 160,
  },
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
  dropBtn: {
    width: '100%',
    height: 36,
    display: 'flex',
    justifyContent: 'flex-start',
    padding: [[0, 10]],
    color: theme.palette.primary[50],
    fontSize: theme.typography.fontSize,
    textTransform: 'capitalize',
  },
});
