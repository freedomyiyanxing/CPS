/* eslint-disable */
import { createMuiTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';
import orange from '@material-ui/core/colors/orange';
import lightBlue from '@material-ui/core/colors/lightBlue';
import purple from '@material-ui/core/colors/purple';
import brown from '@material-ui/core/colors/brown';
import lime from '@material-ui/core/colors/lime';
import blueGrey from '@material-ui/core/colors/blueGrey';
import blue from '@material-ui/core/colors/blue';

export const theme = createMuiTheme({
  // 色彩配置
  palette: {
    // 主色
    primary: {
      '50': "#ffffff",
      '100': "#f5f5f5",
      '200': "#eeeeee",
      '300': "#e0e0e0",
      '400': "#bdbdbd",
      '500': "#9e9e9e",
      '600': "#757575",
      '700': "#616161",
      '800': "#424242",
      '900': "#212121",
      A100: "#d5d5d5",
      A200: "#aaaaaa",
      A400: "#292929",
      A700: "#616161",
      dark: "#333333",
      light: "#e0e0e0",
      main: "#040404",
      contrastText: "#ffffff",
    },
    // 错误色
    error: red,
    // 次要色 (当前项目的风格中用不到)
    secondary: orange,
    // 继承色 (当前项目的风格中用不到)
    inherit: lightBlue,
    type: 'light',
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      disabled: 'rgba(0, 0, 0, 0.38)',
      hint: 'rgba(0, 0, 0, 0.38)',
      primary: 'rgb(51, 51, 51)',
      secondary: 'rgb(153, 153, 153)',
      colorDdd: 'rgb(221, 221, 221)',
    },
    action: {
      active: 'rgba(0, 0, 0, 0.54)',
      disabled: 'rgba(0, 0, 0, 0.26)',
      disabledBackground: 'rgba(0, 0, 0, 0.12)',
      hover: 'rgba(0, 0, 0, 0.28)',
      hoverOpacity: 0.18,
      selected: 'rgba(0, 0, 0, 0.14)',
    }
  },
  // 边框配置
  shape: {
    borderRadius: 0,
  },
  // 字体配置
  typography: {
    useNextVariants: true,
    htmlFontSize: 10,
    fontWeight: 800,
    fontSizeLg: 18,
    fontSizeMd: 16,
    fontSizeSm: 14,
    fontSizeXs: 12,
    fontFamily: '\'Mukta Vaani\',sans-serif',
    h2: {
      fontSize: '3.6rem',
      fontWeight: 800,
      lineHeight: 1.67,
    },
    h4: {
      fontSize: '2rem',
      fontWeight: 800,
      lineHeight: 1.7,
    },
    h6: {
      fontSize: '1.8rem',
      fontWeight: 800,
      lineHeight: 1,
    },
  },
  // 间距
  spacing: {
    unit: 10,
  },
});
