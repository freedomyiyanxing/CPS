const datePickerStyle = theme => ({
  label: {
    color: theme.palette.text.secondary,
    fontSize: theme.typography.fontSizeMd,
    transform: 'translate(0, 1.5px) scale(0.75)',
    transformOrigin: 'top left',
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  selectItem: {
    flex: '0 0 122px',
  },
  text: {
    lineHeight: '24px',
    fontSize: theme.typography.fontSizeSm,
    color: theme.palette.text.secondary,
  },
  labelError: {
    color: theme.palette.error[500],
  },
});

export default datePickerStyle;
