/* eslint-disable */
import {createMuiTheme} from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import orange from '@material-ui/core/colors/orange';
import lightBlue from '@material-ui/core/colors/lightBlue';
import yellow from '@material-ui/core/colors/yellow';

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
      dark: "#5a5a5a", // button 组件 设置了variant 的hover值
      light: "#e0e0e0",
      main: "#333333",
      contrastText: "#ffffff",
    },
    // 错误色
    error: red,
    // 次要色 (当前项目的风格中用不到)
    secondary: orange,
    // 继承色 (当前项目的风格中用不到)
    inherit: yellow,
    type: 'light',
    background: {
      black: '#040404',
      default: '#f5f5f5',
      paper: '#ffffff',
      disabled: 'rgba(151, 151, 151, 0.5)',
    },
    text: {
      disabled: 'rgba(0, 0, 0, 0.38)',
      hint: 'rgba(0, 0, 0, 0.38)',
      primary: 'rgba(51, 51, 51, 1)',
      secondary: 'rgba(153, 153, 153, 1)',
      colorDdd: 'rgba(221, 221, 221, 1)',
      inherit: 'rgba(102, 102, 102, 1)',
      color00: 'rgba(0, 0, 0, 1)',
    },
    action: {
      active: 'rgba(0, 0, 0, 0.54)',
      disabled: 'rgba(0, 0, 0, 0.26)',
      disabledBackground: 'rgba(0, 0, 0, 0.12)',
      hover: 'rgba(0, 0, 0, 0.28)', // MenuItem hover 时的值
      // 没有设置 variant 属性运用的
      hoverOpacity: 0.38, // button hover 时的透明度, 颜色采用text.primary
      selected: 'rgba(0, 0, 0, 0.14)',
    },
    border: {
      borderEf: 'rgba(239,239,239, 1)', // #efefef
      borderDD: 'rgba(221, 221, 221, 1)', // #dddddd,
      border66: 'rgba(102, 102, 102, 1)', // #666
    },
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
    fontNormal: 400,
    fontSizeLg: '1.8rem',
    fontSizeMd: '1.6rem',
    fontSizeSm: '1.4rem',
    fontSizeXs: '1.2rem',
    fontFamily: '\'Mukta Vaani\',sans-serif',
    h1: {
      fontSize: '4.0rem',
      fontWeight: 800,
      lineHeight: 1.67,
    },
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
    h5: {
      fontSize: '2.4rem',
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
