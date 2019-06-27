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

// eslint-disable-next-line no-unused-vars
export const listStyle = theme => ({
  imgWrapper: {
    width: 80,
    display: 'block',
  },
  tableBody: {
    borderLeft: `1px solid ${theme.palette.border.borderEf}`,
    borderRight: `1px solid ${theme.palette.border.borderEf}`,
  },
  checkbox: {
    // width: 32,
  },
  img: {
    // width: 80,
  },
  name: {
    // maxWidth: 190,
  },
});
