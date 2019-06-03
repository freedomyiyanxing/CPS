/* eslint-disable */
import { createMuiTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';
import orange from '@material-ui/core/colors/orange';
import lightBlue from '@material-ui/core/colors/lightBlue';

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
      dark: "#292929",
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
      primary: 'rgb(255, 255, 255)',
      secondary: 'rgba(0, 0, 0, 0.54)',
    },
    action: {
      active: 'rgba(0, 0, 0, 0.54)',
      disabled: 'rgba(0, 0, 0, 0.26)',
      disabledBackground: 'rgba(0, 0, 0, 0.12)',
      hover: 'rgba(0, 0, 0, 0.8)',
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
    fontSizeXs: 10,
  },
  // 间距
  spacing: {
    unit: 10,
  },
});
