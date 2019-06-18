// eslint-disable-next-line no-unused-vars
export const balanceStyle = theme => ({
  root: {
    display: 'flex',
  },
});

export const searchStyle = theme => ({
  root: {
    background: theme.palette.primary[50],
    flex: '0 0 330px',
    marginRight: 10,
    padding: 10,
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
    background: theme.palette.primary[50],
    flex: 1,
  },
});
