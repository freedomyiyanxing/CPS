/* eslint-disable */
export const headerStyle = theme => ({
  root: {
    width: '100%',
    height: 110,
    marginBottom: 10,
    display: 'flex',
    alignItems: 'center',
    padding: [[0, 35]],
    background: theme.palette.primary[50],
  },
  bigAvatar: {
    width: 60,
    height: 60,
  },
  name: {
    margin: [[0, 20]],
    maxWidth: 200,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    color: theme.palette.text.primary,
    fontSize: theme.typography.h5.fontSize,
  },
  email: {
    fontSize: theme.typography.fontSizeMd,
    color: theme.palette.text.secondary,
  },
  balance: {
    display: 'flex',
    alignItems: 'center',
  },
  text: {
    fontSize: theme.typography.fontSizeLg,
    color: theme.palette.text.secondary,
  },
  price: {
    marginLeft: 4,
    color: theme.palette.text.primary,
    fontSize: theme.typography.h5.fontSize,
    fontWeight: theme.typography.h5.fontWeight,
  },
  withdrawBtn: {
    marginLeft: 4,
    padding: [[5, 6]],
    borderRadius: 4,
  },
});

export const curveStyle = theme => ({
  root: {
    marginBottom: 10,
    background: theme.palette.primary[50],
  },
  date: {
    width: 300,
    padding: [[0, 10, 6]],
  },
  indicator: {
    display: 'none',
  },
  flexContainer: {
    border: `1px solid ${theme.palette.border.borderEf}`,
  },
  tabRoot: {
    padding: 0,
    flex: 1,
    maxWidth: 'inherit',
    color: theme.palette.text.primary,
    textTransform: 'capitalize',
  },
  tabWrapper: {
    height: '100%',
  },
  tabsItem: {
  },
});
