import BgImg from '../../assets/images/flags.png';

export const intTeInputStyle = () => ({
  wrapper: {
    display: 'flex',
    position: 'relative',
    marginTop: 16,
  },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

export const countryListStyle = theme => ({
  root: {
    flex: '0 0 56px',
    '&:before': {
      borderBottomColor: theme.palette.text.colorDdd,
    },
  },
  flag: {
    position: 'absolute',
    left: 6,
    top: 4,
  },
  menu: {
    width: 398,
    maxHeight: ITEM_HEIGHT * 9.5 + ITEM_PADDING_TOP,
  },
  line: {
    borderBottom: `1px solid ${theme.palette.text.colorDdd}`,
  },
  items: {
    display: 'flex',
  },
  itiFlag: {
    width: 24,
    height: 24,
    marginRight: 10,
    background: `url(${BgImg}) no-repeat;`,
  },
  icon: {
    color: theme.palette.text.secondary,
    fontSize: theme.typography.h5.fontSize,
  },
});
