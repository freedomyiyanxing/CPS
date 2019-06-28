const datePickerStyle = theme => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  selectItem: {
    flex: '0 0 122px',
  },
  text: {
    lineHeight: '24px',
    fontSize: theme.typography.fontSizeXs,
    color: theme.palette.text.secondary,
  },
});

export default datePickerStyle;

export const rcCalendarStyle = theme => ({
  root: {
    position: 'absolute',
    right: 6,
    top: 6,
    zIndex: 10,
    width: 18,
    height: 18,
    cursor: 'pointer',
    color: theme.palette.text.secondary,
  },
  close: {
    fontSize: theme.typography.fontSizeLg,
  },
});
