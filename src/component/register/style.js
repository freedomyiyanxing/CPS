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
  firstTitle: {
    marginTop: 14,
  },
  lastTitle: {
    marginTop: 34,
  },
  errorWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: 130,
    alignItems: 'center',
    color: theme.palette.error.main,
  },
  errorTitle: {
    fontSize: theme.typography.h4.fontSize,
    fontWeight: theme.typography.h4.fontWeight,
    lineHeight: theme.typography.h4.lineHeight,
  },
  errorText: {
    fontSize: theme.typography.fontSize,
    fontWeight: theme.typography.fontWeight,
    lineHeight: 1.5,
  },
  text: {
    maxHeight: 178,
    overflowY: 'auto',
    padding: 12,
    margin: [[10, 0, 6]],
    lineHeight: '1.6rem',
    borderRadius: 4,
    fontSize: theme.typography.fontSize,
    color: theme.palette.text.primary,
    border: `1px solid ${theme.palette.border.borderDD}`,
  },
});
