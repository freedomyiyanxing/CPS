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

export const viewStyle = () => ({
  root: {
    flex: 1,
  },
  header: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  wrapper: {
    width: '100%',
    display: 'flex',
    flexFlow: 'wrap',
  },
});
