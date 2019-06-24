import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';

const MyInput = withStyles(theme => ({
  root: {
    lineHeight: 1,
    padding: 6,
    color: `${theme.palette.text.primary}!important`,
    '&:before': {
      borderBottomStyle: 'solid !important',
      borderBottomColor: theme.palette.text.colorDdd,
    },
  },
  input: {
    padding: 0,
    fontSize: theme.typography.fontSizeMd,
  },
}))(Input);

export default MyInput;
