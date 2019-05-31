export const containerStyle = theme => ({
  root: {
    background: theme.palette.primary.contrastText,
  },
  wrapper: {
    maxWidth: 1370,
    minWidth: 1000,
    margin: [[0, 'auto']],
    display: 'flex',
    justifyContent: 'space-between',
  },
});

export const loginHeaderStyle = theme => ({
  logo: {
    width: 260,
    minHeight: 68,
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.primary[50],
  },
});
