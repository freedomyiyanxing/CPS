export const indexStyle = theme => ({
  prompt: {
    lineHeight: '22px',
    fontSize: 13, // theme.typography.fontSizeSm,
    color: theme.palette.text.secondary,
    '& > span': {
      cursor: 'pointer',
      borderBottom: `1px solid ${theme.palette.text.colorDdd}`,
    },
  },
});

export const registerInfoStyle = theme => ({
  title: {
    lineHeight: theme.typography.h4.lineHeight,
    fontSize: theme.typography.h4.fontSize,
    fontWeight: theme.typography.h4.fontWeight,
    color: theme.palette.text.primary,
  },
  root: {
    background: theme.palette.primary[50],
  },
  prompt: {
    lineHeight: '27px',
    color: theme.palette.text.primary,
  },
  wrapper: {
    marginBottom: 10,
  },
});
