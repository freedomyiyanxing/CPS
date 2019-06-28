export const indexStyle = () => ({
  root: {
    display: 'flex',
  },
});

export const searchStyle = theme => ({
  root: {
    flex: '0 0 330px',
    marginRight: 10,
  },
  wrapper: {
    padding: 10,
    background: theme.palette.primary[50],
  },
  title: {
    color: theme.palette.text.primary,
    fontSize: theme.typography.h6.fontSize,
    fontWeight: theme.typography.h6.fontWeight,
    lineHeight: theme.typography.h6.lineHeight,
  },
});

export const viewStyle = theme => ({
  root: {
    flex: 1,
    padding: [[0, 10]],
    background: theme.palette.primary[50],
  },
  header: {
    width: '100%',
    height: 54,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export const listStyle = theme => ({
  imgWrapper: {
    width: 80,
    display: 'block',
  },
  tableBody: {
    borderLeft: `1px solid ${theme.palette.border.borderEf}`,
    borderRight: `1px solid ${theme.palette.border.borderEf}`,
    '& td': {
      fontSize: theme.typography.fontSizeMd,
    },
  },
  tableHead: {
    background: theme.palette.primary[100],
    '& th': {
      fontWeight: theme.typography.fontNormal,
      padding: [[3, 0]],
    },
  },
  name: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: 60,
    maxWidth: 180,
    color: theme.palette.text.color00,
    '& > span': {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
    '& > span:first-child': {
      fontWeight: theme.typography.fontWeight,
    },
    '& > span:last-child': {
      textTransform: 'uppercase',
    },
  },
  price: {
    fontWeight: theme.typography.fontWeight,
    color: theme.palette.text.color00,
  },
  prodCateName: {
    textTransform: 'capitalize',
    color: theme.palette.text.color00,
  },
  rate: {
    display: 'flex',
    alignItems: 'flex-end',
    color: theme.palette.error.main,
    '& span:first-child': {
      marginRight: 20,
      fontSize: theme.typography.fontSizeLg,
      fontWeight: theme.typography.fontWeight,
    },
    '& span::last-child': {
      fontSize: theme.typography.fontSize,
    },
  },
  status: {
    color: theme.palette.text.color00,
    textTransform: 'capitalize',
  },
});

export const itemButtonStyle = theme => ({
  btnWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 74,
  },
  btn: {
    padding: [[6, 3]],
    minWidth: 0,
    borderColor: theme.palette.border.borderDD,
  },
  copyWrapper: {
    height: 150,
    margin: [[20, 20, 30]],
    padding: 10,
    fontSize: theme.typography.fontSizeMd,
    color: theme.palette.text.secondary,
    border: `1px solid ${theme.palette.border.borderDD}`,
  },
});
