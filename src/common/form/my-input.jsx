import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';

const StyleInput = withStyles(theme => ({
  root: {
    lineHeight: 1,
    padding: 6,
    '&:before': {
      borderBottomColor: theme.palette.text.colorDdd,
    },
  },
  input: {
    padding: 0,
    fontSize: theme.typography.fontSizeMd,
  },
}))(Input);

export default StyleInput;
