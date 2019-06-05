export const loginStyle = theme => ({
  root: {
    '&:before': {
      borderBottomColor: theme.palette.text.colorDdd,
    },
  },
  main: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  checkRoot: {
    padding: 6,
  },
  icon: {
    fontSize: theme.typography.fontSizeLg,
  },
  label: {
    color: theme.palette.text.secondary,
    fontSize: theme.typography.fontSizeSm,
  },
  text: {
    color: theme.palette.text.secondary,
    fontSize: theme.typography.fontSizeSm,
    cursor: 'pointer',
  },
});

export const forgetPasswordStyle = theme => ({
  root: {
    background: theme.palette.primary[50],
  },
  prompt: {
    lineHeight: '27px',
    fontSize: theme.typography.fontSizeMd,
    color: theme.palette.text.primary,
  },
  wrapper: {
    marginBottom: 10,
  },
});

export const emailSentPageStyle = theme => ({
  root: {
    background: theme.palette.primary[50],
  },
  prompt: {
    lineHeight: '27px',
    fontSize: theme.typography.fontSizeMd,
    color: theme.palette.text.primary,
    '& > b': {
      margin: [[0, 4]],
    },
  },
  wrapper: {
    marginBottom: 10,
  },
});

export const resetPasswordStyle = theme => ({
  root: {
    background: theme.palette.primary[50],
  },
  prompt: {
    lineHeight: '27px',
    fontSize: theme.typography.fontSizeMd,
    color: theme.palette.text.primary,
    '& > b': {
      margin: [[0, 4]],
    },
  },
  wrapper: {
    marginBottom: 10,
  },
});
