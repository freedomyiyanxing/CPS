import BgImg from '../../asstes/images/flags.png';

export const intTeInputStyle = () => ({
  root: {
    margin: [[16, 0, 8]],
  },
  wrapper: {
    display: 'flex',
    position: 'relative',
    marginTop: 4,
  },
});

export const telInputStyle = () => ({
  root: {
    flex: 1,
    paddingLeft: 6,
  },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

export const countryListStyle = theme => ({
  root: {
    flex: '0 0 60px',
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
});
