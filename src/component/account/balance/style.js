export const balanceStyle = () => ({
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
    padding: 10,
    background: theme.palette.primary[50],
  },
  header: {
    display: 'flex',
    alignItems: 'flex-end',
    margin: [[12, 0, 22]],
    fontSize: theme.typography.fontSizeMd,
  },
  price: {
    margin: [[0, 22, 0, 4]],
    fontSize: theme.typography.h1.fontSize,
    fontWeight: theme.typography.h1.fontWeight,
  },
  headerBtn: {
    padding: [[4, 9]],
  },
  amount: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    fontSize: theme.typography.fontSize,
    marginRight: 2,
  },
});
