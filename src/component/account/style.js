export const settingStyle = theme => ({
  header: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    marginBottom: 12,
    background: theme.palette.primary[50],
  },
  btn: {
    padding: [[16, 20]],
    textTransform: 'capitalize',
    fontWeight: theme.typography.fontWeight,
    fontSize: theme.typography.fontSizeLg,
    color: theme.palette.text.secondary,
    '&:hover': {
      background: 'none',
    },
  },
  active: {
    color: theme.palette.text.primary,
  },
  line: {
    width: 2,
    height: 14,
    background: theme.palette.text.secondary,
  },

  root: {
    display: 'flex',
    padding: [[10, 20]],
    background: theme.palette.primary[50],
  },
  left: {
    flex: '0 0 398px',
  },
  right: {
    flex: 1,
  },
  items: {
    height: 200,
  },
});

export const balanceStyle = theme => ({
  root: {
    background: theme.palette.primary[50],
    color: theme.palette.text.primary,
  },
});

export const passwordStyle = theme => ({
  root: {
    background: theme.palette.primary[50],
    color: theme.palette.text.primary,
  },
});

// eslint-disable-next-line no-unused-vars
export const basicSettingStyle = theme => ({
  root: {
    width: '100%',
  },
});
