/* eslint-disable */
export const headerStyle = theme => ({
  root: {
    width: '100%',
    height: 110,
    marginBottom: 10,
    display: 'flex',
    alignItems: 'center',
    padding: [[0, 35]],
    background: theme.palette.primary[50],
  },
  bigAvatar: {
    width: 60,
    height: 60,
  },
  name: {
    margin: [[0, 20]],
    maxWidth: 200,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    color: theme.palette.text.primary,
    fontSize: theme.typography.h5.fontSize,
  },
  email: {
    fontSize: theme.typography.fontSizeMd,
    color: theme.palette.text.secondary,
  },
  balance: {
    display: 'flex',
    alignItems: 'center',
  },
  text: {
    fontSize: theme.typography.fontSizeLg,
    color: theme.palette.text.secondary,
  },
  price: {
    marginLeft: 4,
    color: theme.palette.text.primary,
    fontSize: theme.typography.h5.fontSize,
    fontWeight: theme.typography.h5.fontWeight,
  },
  withdrawBtn: {
    marginLeft: 4,
    padding: [[5, 6]],
    borderRadius: 4,
  },
});

export const curveStyle = theme => ({
  root: {
    marginBottom: 10,
    background: theme.palette.primary[50],
  },
  date: {
    width: 300,
    padding: [[0, 10, 6]],
  },
  indicator: {
    display: 'none',
  },
  flexContainer: {
    paddingBottom: 10,
  },
  tabRoot: {
    padding: 0,
    flex: 1,
    maxWidth: 'inherit',
    color: theme.palette.text.primary,
    textTransform: 'capitalize',
    opacity: 1,
    overflow: 'initial',
    border: `1px solid ${theme.palette.border.borderEf}`,
    borderRight: 'none',
    '&:last-child': {
      borderRight: `1px solid ${theme.palette.border.borderEf}`,
    },
  },
  tabWrapper: {
    height: 80,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: [[5, 10, 0]],
  },
  tabsText: {
    fontSize: theme.typography.fontSize,
    color: theme.palette.text.inherit,
    textAlign: 'left',
    lineHeight: '20px',
  },
  active: {
    background: theme.palette.border.borderEf,
  },
  tabsItem: {
  },
  triangle: {
    position: 'absolute',
    borderTopColor: theme.palette.border.borderEf,
    bottom: -8,
    left: '50%',
    marginLeft: -11,
    borderWidth: '8px 11px 0',
  },
  /*
    position: absolute;
    border-top-color: #efefef;
    bottom: -8px;
    left: 50%;
    margin-left: -11px;
    border-width: 8px 11px 0;
  */
});
