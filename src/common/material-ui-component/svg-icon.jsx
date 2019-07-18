import React from 'react';
import PropTypes from 'prop-types';
import SvgIcon from '@material-ui/core/SvgIcon';

const MySvgIcon = (props) => {
  const { children, viewBox } = props;
  return (
    <SvgIcon {...props} viewBox={viewBox}>
      {children}
    </SvgIcon>
  );
};

MySvgIcon.propTypes = {
  children: PropTypes.node.isRequired,
  viewBox: PropTypes.string.isRequired,
};

const MySvgIconReset = props => (
  <MySvgIcon viewBox="0 0 1024 1024" {...props}>
    <path
      d="M981.333333 80.64a42.666667 42.666667 0 0 0-42.666666 42.666667v106.666666A512 512 0 0 0 0 512a42.666667 42.666667 0 0 0 85.333333 0 426.666667 426.666667 0 0 1 793.386667-218.026667H768a42.666667 42.666667 0 1 0 0 85.333334h213.333333a42.666667 42.666667 0 0 0 42.666667-42.666667v-213.333333a42.666667 42.666667 0 0 0-42.666667-42.666667zM981.333333 469.333333a42.666667 42.666667 0 0 0-42.666666 42.666667A426.666667 426.666667 0 0 1 145.28 730.026667H256a42.666667 42.666667 0 0 0 0-85.333334H42.666667a42.666667 42.666667 0 0 0-42.666667 42.666667v213.333333a42.666667 42.666667 0 0 0 85.333333 0v-106.666666A512 512 0 0 0 1024 512a42.666667 42.666667 0 0 0-42.666667-42.666667z"
    />
  </MySvgIcon>
);

const MySvgIconPayment = props => (
  <MySvgIcon viewBox="0 0 18.3 14.3" {...props}>
    <path
      d="M2.9,8.9L2.9,8.9h5.6l0,0l0,0c0.2,0,0.3-0.1,0.5-0.2c0.1-0.1,0.2-0.3,0.2-0.5s0-0.4-0.2-0.5C8.9,7.6,8.7,7.5,8.6,7.5H2.9c0,0,0,0-0.1,0c-0.2,0-0.3,0.1-0.5,0.2c0,0.2-0.1,0.4,0,0.5C2.3,8.6,2.6,8.9,2.9,8.9z"
    />
    <path
      d="M10.8,8.9h1.1l0,0l0,0c0.2,0,0.3-0.1,0.5-0.2c0.1-0.1,0.2-0.3,0.2-0.5c0-0.4-0.3-0.7-0.7-0.6h-1.1c0,0,0,0-0.1,0c-0.2,0-0.3,0.1-0.5,0.2C10.1,7.9,10,8.1,10,8.3s0.1,0.3,0.2,0.5C10.5,8.8,10.6,8.9,10.8,8.9z"
    />
    <path
      d="M15.9,0L15.9,0H2.4C1.7,0,1.2,0.2,0.7,0.6S0,1.7,0,2.3V12c0,0.6,0.3,1.2,0.7,1.6c0.4,0.4,1,0.6,1.6,0.6c0,0,0,0,0.1,0h13.5v-0.1v0.1l0,0c1.3,0,2.3-1,2.3-2.3V2.3C18.2,1,17.2,0,15.9,0z M16.9,2.3v1H1.4v-1c0-0.3,0.1-0.5,0.3-0.7s0.4-0.3,0.7-0.3l0,0h13.5V1.2v0.1l0,0C16.4,1.3,16.9,1.8,16.9,2.3z M16.9,4.6V12c0,0.3-0.1,0.5-0.3,0.7c-0.2,0.2-0.4,0.3-0.7,0.3l0,0H2.4l0,0c-0.3,0-0.5-0.1-0.7-0.3S1.4,12.3,1.4,12V4.6H16.9z"
    />
    <path
      d="M2.9,11L2.9,11h4.6c0.4,0,0.7-0.3,0.6-0.7c0-0.4-0.3-0.6-0.7-0.6l0,0H2.9c0,0,0,0-0.1,0c-0.4,0-0.7,0.3-0.6,0.7C2.3,10.7,2.6,11,2.9,11z"
    />
  </MySvgIcon>
);

const MySvgIconProfile = props => (
  <MySvgIcon viewBox="0 0 15.5 16.2" {...props}>
    <path d="M12.5,5.4c0-3-2.4-5.4-5.4-5.4S1.7,2.4,1.7,5.4l0,0c0,1.9,1,3.8,2.8,4.7C2.2,11,0.5,13,0,15.5
      c-0.1,0.3,0.1,0.6,0.5,0.7l0,0h0.1c0.3,0,0.5-0.2,0.6-0.5c0.6-2.8,3-4.9,5.9-4.9h0.1C10.1,10.7,12.5,8.3,12.5,5.4L12.5,5.4L12.5,5.4
      z M2.9,5.4c0-2.3,1.9-4.2,4.2-4.2s4.2,1.9,4.2,4.2S9.5,9.6,7.2,9.6H7C4.8,9.5,3,7.6,2.9,5.4z M11.3,10.8c0,0.3,0.2,0.6,0.5,0.6
      c0,0,0,0,0.1,0h3c0.3,0,0.6-0.2,0.7-0.5c0-0.3-0.2-0.6-0.5-0.7H15h-3C11.5,10.2,11.3,10.5,11.3,10.8L11.3,10.8z M14.9,12.5h-4.8
      c-0.3,0-0.6,0.3-0.6,0.6s0.3,0.6,0.6,0.6h4.8c0.3,0,0.6-0.3,0.6-0.6S15.2,12.5,14.9,12.5L14.9,12.5z M14.9,14.9h-4.7
      c-0.3,0-0.6,0.3-0.6,0.6s0.3,0.6,0.6,0.6l0,0h4.7c0.3,0,0.6-0.2,0.6-0.5c0,0,0,0,0-0.1C15.5,15.2,15.2,14.9,14.9,14.9L14.9,14.9
      L14.9,14.9z"
    />
  </MySvgIcon>
);

const MySvgIconWebsite = props => (
  <MySvgIcon viewBox="0 0 17.5 17.5" {...props}>
    <path
      d="M14.9,2.6C13.3,0.9,11.1,0,8.7,0l0,0l0,0C6.4,0,4.2,1,2.6,2.6C0.9,4.3,0,6.5,0.1,8.8c0.1,4.7,3.9,8.6,8.7,8.6
      s8.7-3.9,8.7-8.7C17.5,6.4,16.6,4.2,14.9,2.6z M11.2,13.3c-0.5,1.4-1.2,2.4-1.9,2.8v-3C9.9,13.1,10.6,13.2,11.2,13.3z M13.9,14.3
      c-0.8,0.7-1.7,1.3-2.6,1.6c0.5-0.7,0.9-1.4,1.1-2.2C12.9,13.8,13.4,14,13.9,14.3z M9.3,11.9V9.3h2.6c0,1-0.2,1.9-0.4,2.9
      C10.8,12,10.1,11.9,9.3,11.9z M16.3,9.3c-0.1,1.5-0.7,2.9-1.6,4c-0.7-0.3-1.3-0.6-2.1-0.9c0.2-1,0.4-2.1,0.4-3.2L16.3,9.3L16.3,9.3z
       M9.3,5.6c0.7,0,1.5-0.1,2.2-0.3c0.2,0.9,0.3,1.9,0.4,2.9H9.3V5.6z M12.3,3.8c-0.2-0.8-0.6-1.5-1.1-2.2c1,0.3,1.9,0.9,2.6,1.6
      C13.4,3.4,12.9,3.7,12.3,3.8z M9.3,4.4v-3c0.7,0.4,1.4,1.4,1.9,2.8C10.6,4.3,9.9,4.4,9.3,4.4z M16.3,8.1h-3.2C13,7.1,12.9,6,12.6,5
      c0.7-0.2,1.4-0.5,2.1-0.9C15.6,5.3,16.2,6.7,16.3,8.1z M4.4,9.3c0,1.1,0.2,2.1,0.4,3.2c-0.7,0.2-1.4,0.5-2,0.9
      c-0.9-1.2-1.4-2.6-1.6-4L4.4,9.3L4.4,9.3z M5.6,9.3h2.6v2.6c-0.7,0-1.5,0.1-2.2,0.3C5.7,11.3,5.6,10.3,5.6,9.3z M5.1,13.6
      c0.2,0.8,0.6,1.5,1.1,2.2c-1-0.3-1.9-0.9-2.6-1.6C4.1,14,4.6,13.8,5.1,13.6z M8.1,13.1v3.1c-0.7-0.4-1.4-1.4-1.9-2.8
      C6.9,13.2,7.5,13.1,8.1,13.1z M4.8,5C4.6,6,4.4,7.1,4.4,8.1H1.2c0.1-1.5,0.7-2.9,1.6-4C3.4,4.5,4.1,4.7,4.8,5z M8.1,5.6v2.6H5.6
      c0-1,0.2-1.9,0.4-2.9C6.7,5.4,7.4,5.5,8.1,5.6z M3.6,3.2C4.4,2.5,5.2,2,6.2,1.6C5.7,2.3,5.4,3,5.1,3.8C4.6,3.7,4.1,3.4,3.6,3.2z
       M8.1,1.3v3C7.5,4.3,6.8,4.2,6.2,4C6.7,2.7,7.4,1.7,8.1,1.3z"
    />
  </MySvgIcon>
);

const MySvgIconPsd = props => (
  <MySvgIcon viewBox="0 0 15.6 16.6" {...props}>
    <path d="M13.2,6.2h-0.6v-2c0-2.4-2-4.2-4.8-4.2S3,1.9,3,4.2v2H2.4C1.2,6.1,0.1,7.1,0,8.3v6.2c0.1,1.2,1.2,2.2,2.4,2.1
      h10.8c1.2,0.1,2.3-0.8,2.4-2.1V8.3C15.5,7.1,14.4,6.1,13.2,6.2z M4.2,4.2C4.2,2.4,5.7,1,7.5,1c0.1,0,0.1,0,0.2,0
      c1.8-0.2,3.4,1.2,3.6,3c0,0.1,0,0.1,0,0.2v2H4.2V4.2z M14.4,14.5c0,0.6-0.6,1.1-1.2,1H2.4c-0.6,0-1.2-0.4-1.2-1V8.3
      c0-0.6,0.6-1.1,1.2-1h10.8c0.6,0,1.2,0.4,1.2,1L14.4,14.5z M7.8,9.3c-0.6,0-1.2,0.4-1.2,1c0,0.4,0.2,0.7,0.6,0.9v1.7
      c0,0.3,0.4,0.6,0.7,0.5c0.3,0,0.5-0.2,0.5-0.5v-1.7C8.7,11.1,9,10.7,9,10.3C8.9,9.7,8.4,9.3,7.8,9.3L7.8,9.3z"
    />
  </MySvgIcon>
);

const MySvgIconTaxes = props => (
  <MySvgIcon viewBox="0 0 15 15" {...props}>
    <path d="M6.2,4.1H5V2.9c0-0.3-0.3-0.6-0.6-0.6C4,2.3,3.8,2.6,3.8,2.9v1.2H2.6C2.2,4.1,2,4.3,2,4.7C2,5,2.2,5.3,2.6,5.3   h1.2v1.2c0,0,0,0,0,0c0,0.3,0.3,0.6,0.6,0.6c0,0,0,0,0,0C4.7,7.1,5,6.8,5,6.5V5.3h1.2c0.3,0,0.6-0.3,0.6-0.6   C6.8,4.3,6.5,4.1,6.2,4.1z" />
    <path d="M11.8,9h-3C8.5,9,8.2,9.3,8.2,9.6c0,0.3,0.3,0.6,0.6,0.6h3c0.3,0,0.6-0.3,0.6-0.6C12.4,9.3,12.2,9,11.8,9z" />
    <path d="M11.8,11.1h-3c-0.3,0-0.6,0.3-0.6,0.6c0,0.3,0.3,0.6,0.6,0.6h3c0.3,0,0.6-0.3,0.6-0.6   C12.4,11.4,12.2,11.1,11.8,11.1z" />
    <path d="M11.8,4.1h-3c-0.3,0-0.6,0.3-0.6,0.6c0,0.3,0.3,0.6,0.6,0.6h3c0.3,0,0.6-0.3,0.6-0.6   C12.4,4.3,12.2,4.1,11.8,4.1z" />
    <path d="M6.1,9.1c-0.2-0.2-0.6-0.2-0.9,0L4.4,9.9L3.5,9.1c-0.2-0.2-0.6-0.2-0.9,0c0,0,0,0,0,0c-0.2,0.2-0.2,0.6,0,0.8   l0.9,0.9l-0.9,0.9c-0.1,0.1-0.2,0.3-0.2,0.4c0,0.3,0.3,0.6,0.6,0.6c0.2,0,0.3-0.1,0.4-0.2l0.9-0.9l0.9,0.8c0.1,0.1,0.3,0.2,0.4,0.2   c0.2,0,0.5-0.1,0.6-0.4c0.1-0.2,0-0.5-0.1-0.7l-0.9-0.8l0.9-0.9C6.3,9.7,6.3,9.3,6.1,9.1z" />
    <path d="M15,1.4c-0.1-0.8-0.8-1.5-1.6-1.4c-0.1,0-0.1,0-0.1,0H1.7c-0.5,0-1,0.2-1.4,0.5C0.1,0.8,0,1.2,0,1.6v11.7   c0,0,0,0.1,0,0.1C0,14.3,0.8,15,1.7,15h11.6c0,0,0,0,0.1,0c0.9,0,1.7-0.7,1.7-1.7V1.6C15,1.5,15,1.5,15,1.4z M13.8,13.3   C13.8,13.4,13.8,13.4,13.8,13.3c0,0.3-0.3,0.5-0.5,0.5H1.7c0,0-0.1,0-0.1,0c-0.2,0-0.4-0.3-0.4-0.5V1.6c0,0,0,0,0-0.1   c0-0.1,0-0.1,0.1-0.2c0.1-0.1,0.3-0.1,0.5-0.1l11.5,0c0,0,0,0,0.1,0h0c0.4,0,0.4,0.2,0.4,0.4V13.3z" />
  </MySvgIcon>
);

const MySvgIconScaleX = props => (
  <MySvgIcon viewBox="0 0 2718 1024" {...props}>
    <path d="M533.455068 995.127432V650.031499h1649.861035v345.095933a27.497684 27.497684 0 0 0 46.746062 20.623263l472.960163-474.335048a39.871642 39.871642 0 0 0 0-57.745136L2230.062165 9.335464a27.497684 27.497684 0 0 0-46.746062 19.248378v346.470818h-1649.861035V28.583842a27.497684 27.497684 0 0 0-48.120947-19.248378L12.373958 483.670511a39.871642 39.871642 0 0 0 0 57.745136l472.960163 474.335048a28.872568 28.872568 0 0 0 48.120947-20.623263z" />
  </MySvgIcon>
);

const MySvgIconScaleY = props => (
  <MySvgIcon viewBox="0 0 1024 1024" {...props}>
    <path d="M694.191635 823.347848H564.052901v-622.177215h130.138734a10.888101 10.888101 0 0 0 7.777216-18.146836L523.092901 4.666329a15.035949 15.035949 0 0 0-21.776202 0L322.440749 183.023797a10.36962 10.36962 0 0 0 7.258735 18.146836h130.657215v622.177215H329.699484a10.36962 10.36962 0 0 0-7.258735 17.628355l178.87595 178.357468a15.035949 15.035949 0 0 0 21.776202 0l178.87595-178.357468a10.36962 10.36962 0 0 0-7.777216-17.628355z" />
  </MySvgIcon>
);

const MySvgIconRightRotate = props => (
  <MySvgIcon viewBox="0 0 1024 1024" {...props}>
    <path d="M972.400596 81.354233l-68.474607 68.474608a511.959683 511.959683 0 1 0-55.675616 772.419172 63.99496 63.99496 0 0 0 7.039446-97.27234 63.99496 63.99496 0 0 0-83.193449-5.119597A383.969762 383.969762 0 0 1 221.099761 718.744039a383.969762 383.969762 0 0 1 595.793081-478.042354l-72.314305 68.474607a12.798992 12.798992 0 0 0 9.599244 21.758287h221.422563a19.198488 19.198488 0 0 0 19.198488-19.198488V90.313528a12.798992 12.798992 0 0 0-22.398236-8.959295z" />
  </MySvgIcon>
);

const MySvgIconLeftRotate = props => (
  <MySvgIcon viewBox="0 0 1024 1024" {...props}>
    <path d="M50.92207 81.354233l68.474608 68.474608a511.959683 511.959683 0 1 1 55.675616 772.419172 63.99496 63.99496 0 0 1-6.399497-97.27234 63.99496 63.99496 0 0 1 83.193449-5.119597 383.969762 383.969762 0 1 0-41.596724-575.954643L278.744129 309.176292a12.798992 12.798992 0 0 1-8.959294 21.758287H48.362272a18.558539 18.558539 0 0 1-19.198488-19.198488V90.313528a12.798992 12.798992 0 0 1 21.758286-8.959295z" />
  </MySvgIcon>
);

const MySvgIconEmpty = props => (
  <MySvgIcon viewBox="0 0 1024 1024" {...props}>
    <path d="M957.12 297.024c0-0.128 0-0.192 0.064-0.256 0.512-0.896 0.896-1.792 1.216-2.752 0.256-0.512 0.448-0.96 0.64-1.344 0.256-0.768 0.256-1.408 0.448-2.112 0.192-0.832 0.384-1.536 0.448-2.24 0.064-0.448 0-0.832 0-1.216C960 285.952 960.064 284.928 959.936 283.84c-0.064-0.512-0.192-1.024-0.32-1.536-0.128-0.896-0.256-1.856-0.512-2.816-0.128-0.448-0.384-0.832-0.512-1.28-0.32-1.024-0.704-1.984-1.152-2.944C957.44 275.2 957.376 275.136 957.376 275.072c-0.256-0.448-0.512-0.832-0.832-1.28-0.512-0.768-0.96-1.6-1.536-2.304-0.512-0.64-1.088-1.216-1.6-1.728-0.512-0.512-0.96-1.024-1.472-1.472-0.768-0.64-1.6-1.216-2.496-1.728-0.384-0.192-0.64-0.512-1.024-0.704l-0.384-0.192c0 0-0.064 0-0.128-0.064l-271.744-152.704c-0.128-0.064-0.256-0.128-0.448-0.256-0.704-0.32-1.344-0.576-2.048-0.896s-1.472-0.64-2.24-0.896c-0.448-0.128-0.896-0.192-1.344-0.256-1.024-0.32-1.984-0.512-3.008-0.64-0.384 0-0.704 0-1.024 0-1.152-0.064-2.24-0.064-3.392 0.064-0.448 0.064-0.896 0.192-1.28 0.256-1.024 0.128-1.984 0.32-3.072 0.64-0.512 0.192-0.96 0.384-1.408 0.576-0.96 0.384-1.792 0.704-2.752 1.216-0.128 0.064-0.256 0.128-0.384 0.192L512 192.192 370.24 112.896C370.112 112.832 369.984 112.768 369.856 112.704 368.96 112.192 368 111.936 367.104 111.552 366.656 111.36 366.208 111.168 365.696 110.976c-1.088-0.32-2.112-0.512-3.2-0.64C362.176 110.272 361.792 110.144 361.408 110.08 360.192 109.952 358.976 109.952 357.824 110.016c-0.256 0-0.512 0-0.768 0-1.152 0.128-2.24 0.32-3.328 0.64C353.344 110.784 353.024 110.784 352.704 110.848c-0.896 0.32-1.664 0.704-2.56 1.088C349.568 112.064 348.928 112.32 348.352 112.64 348.224 112.704 348.032 112.768 347.84 112.896L76.032 265.6c0 0 0 0 0 0L75.648 265.792C75.2 266.048 74.88 266.368 74.56 266.624 73.728 267.072 72.832 267.648 72.064 268.288 71.552 268.8 71.04 269.312 70.528 269.824 70.016 270.4 69.44 270.912 68.992 271.488 68.352 272.192 67.904 273.088 67.392 273.856 67.136 274.304 66.816 274.624 66.624 275.008 66.56 275.072 66.56 275.2 66.56 275.264 66.048 276.16 65.728 277.12 65.408 278.016 65.216 278.528 64.96 278.976 64.832 279.488 64.576 280.192 64.512 280.96 64.384 281.792 64.256 282.496 64.064 283.136 64 283.84 64 284.48 64 285.12 64 285.632c0 0.896-0.064 1.728 0 2.624 0.064 0.576 0.256 1.216 0.384 1.792 0.128 0.896 0.256 1.728 0.512 2.56C65.152 293.12 65.344 293.504 65.536 294.016 65.92 294.976 66.304 295.936 66.752 296.768c0 0.064 0.064 0.128 0.064 0.256C66.944 297.152 67.136 297.28 67.2 297.536 68.032 298.88 68.992 300.16 70.08 301.312 70.464 301.696 70.848 302.08 71.296 302.464c0.96 0.896 2.048 1.664 3.2 2.496 0.384 0.256 0.768 0.576 1.216 0.832C75.904 305.92 76.032 305.92 76.096 305.984L198.144 370.56l-106.048 51.2C91.712 421.888 91.328 422.208 90.944 422.4 90.176 422.848 89.472 423.232 88.832 423.744 88.192 424.128 87.68 424.64 87.104 425.152S85.952 426.112 85.504 426.688c-0.576 0.64-1.088 1.344-1.6 1.92-0.32 0.384-0.64 0.704-0.896 1.088C82.88 429.76 82.816 430.016 82.688 430.208 82.304 430.912 81.92 431.68 81.536 432.32c-0.32 0.704-0.64 1.344-0.896 1.92-0.256 0.704-0.384 1.344-0.64 2.048C79.872 437.184 79.68 437.824 79.552 438.592S79.424 440 79.36 440.64C79.296 441.472 79.232 442.24 79.232 442.88c0 0.832 0.128 1.472 0.256 2.176C79.552 445.824 79.68 446.656 79.808 447.36 79.936 448 80.128 448.576 80.384 449.28 80.64 450.112 80.896 450.88 81.28 451.648c0.064 0.256 0.128 0.384 0.192 0.64C81.6 452.48 81.792 452.672 81.92 452.928c0.832 1.408 1.664 2.88 2.816 4.16 0.256 0.256 0.448 0.64 0.768 0.896 1.216 1.28 2.496 2.368 3.968 3.456l137.216 91.136c-0.384 1.6-0.64 3.328-0.64 5.056l0 135.424 0 0 0 0.128c0 0.384 0.128 0.768 0.128 1.152 0.064 1.152 0.128 2.24 0.32 3.264 0.128 0.768 0.384 1.344 0.64 2.112 0.192 0.768 0.384 1.344 0.64 2.112 0.256 0.768 0.64 1.344 0.96 1.984 0.32 0.64 0.64 1.344 1.088 1.984 0.384 0.64 0.896 1.152 1.344 1.728 0.512 0.512 0.896 1.152 1.408 1.728 0.768 0.64 1.6 1.344 2.432 1.984 0.384 0.256 0.64 0.64 1.024 0.768l0.064 0.128 0 0 262.976 179.776c0 0.128 0 0.128 0 0.128 0.448 0.256 1.024 0.512 1.536 0.768 0.512 0.384 1.024 0.64 1.472 0.896 0.832 0.384 1.664 0.768 2.56 1.024 0.384 0.128 0.832 0.256 1.28 0.384 0.32 0.128 0.64 0.256 0.96 0.256 1.664 0.384 3.328 0.64 5.056 0.64 0 0 0 0.128 0 0.128l0 0 0 0 0 0 0 0C512 896 512 895.872 512 895.872c1.728 0 3.392-0.256 4.992-0.64 0.384 0 0.64-0.128 1.024-0.256 0.448-0.128 0.896-0.256 1.28-0.384 0.896-0.256 1.728-0.64 2.496-1.024 0.512-0.256 1.024-0.512 1.472-0.768 0.512-0.384 1.088-0.64 1.472-0.896 0.064 0 0.128 0 0.128-0.128l262.976-179.904c0.448-0.256 0.768-0.64 1.152-0.896 0.768-0.64 1.6-1.28 2.24-1.856 0.576-0.64 1.024-1.28 1.472-1.728 0.384-0.64 0.896-1.152 1.344-1.728 0.384-0.64 0.704-1.344 1.024-1.984 0.384-0.64 0.768-1.28 1.024-1.984 0.32-0.768 0.512-1.344 0.704-2.112s0.448-1.344 0.576-2.112c0.256-1.152 0.32-2.24 0.384-3.392 0-0.256 0.128-0.64 0.128-1.024l0-0.128 0 0L797.888 557.568c0-1.728-0.256-3.456-0.64-4.992l137.28-91.2c1.408-1.024 2.752-2.176 3.968-3.392 0.256-0.32 0.448-0.704 0.704-0.96 1.152-1.28 2.048-2.688 2.88-4.16 0.128-0.192 0.256-0.384 0.384-0.64 0.128-0.192 0.128-0.384 0.256-0.576 0.384-0.832 0.64-1.6 0.896-2.432 0.256-0.704 0.384-1.28 0.64-1.856 0.128-0.768 0.256-1.472 0.256-2.304 0.128-0.704 0.256-1.344 0.256-2.112s0-1.472-0.064-2.24-0.064-1.344-0.192-2.112c-0.128-0.704-0.384-1.408-0.512-2.112-0.256-0.768-0.384-1.472-0.704-2.176-0.256-0.64-0.576-1.216-0.832-1.792-0.384-0.832-0.768-1.536-1.28-2.304-0.128-0.128-0.128-0.384-0.256-0.512-0.256-0.384-0.64-0.704-0.896-1.024-0.512-0.704-1.024-1.344-1.6-1.984-0.512-0.576-1.024-1.024-1.6-1.472-0.512-0.512-1.152-1.024-1.728-1.408C934.4 423.232 933.632 422.784 932.864 422.4c-0.384-0.192-0.768-0.576-1.152-0.704l-105.984-51.2 121.984-64.512c0.128-0.128 0.256-0.128 0.384-0.256 0.384-0.256 0.768-0.512 1.152-0.768 1.28-0.832 2.368-1.6 3.392-2.624 0.384-0.32 0.768-0.704 1.152-1.088 1.152-1.216 2.112-2.496 2.88-3.904C956.864 297.28 956.992 297.152 957.12 297.024zM664.832 585.6 556.736 515.072l218.88-117.952 100.096 48.32L664.832 585.6zM359.168 585.6 148.224 445.44l100.096-48.32 218.88 117.952L359.168 585.6zM359.04 159.104l106.688 59.776L248.384 345.28 134.656 285.184 359.04 159.104zM512 487.232 295.808 370.688 512 245.056l216.256 125.632L512 487.232zM558.208 218.816l106.688-59.776 224.448 126.08-113.664 60.096L558.208 218.816zM346.368 632.128c0.256 0.128 0.576 0.256 0.896 0.384 1.28 0.768 2.56 1.344 3.968 1.856C351.808 634.624 352.384 634.88 353.088 635.136c1.856 0.512 3.776 0.768 5.696 0.768 0.064 0 0.128 0.128 0.256 0.128l0 0 0 0c0.064 0 0.128-0.128 0.256-0.128 1.92 0 3.84-0.256 5.696-0.768 0.64-0.256 1.216-0.512 1.792-0.768 1.344-0.384 2.688-1.024 3.968-1.728 0.256-0.128 0.576-0.256 0.832-0.384L489.152 555.52l0 274.112-217.28-148.48L271.872 582.656 346.368 632.128zM752.128 681.152l-217.28 148.48L534.848 555.52l117.568 76.736c0.32 0.128 0.576 0.256 0.832 0.384 1.28 0.768 2.624 1.344 3.968 1.856 0.64 0.128 1.152 0.384 1.728 0.64 1.856 0.512 3.84 0.768 5.76 0.768 0.064 0 0.128 0.128 0.256 0.128l0 0 0 0c0 0 0.064-0.128 0.128-0.128 1.984 0 3.968-0.256 5.888-0.896 0.64-0.128 1.216-0.384 1.728-0.64 1.408-0.512 2.752-1.152 3.968-1.856 0.32-0.256 0.64-0.256 0.896-0.384l74.56-49.472L752.128 681.152 752.128 681.152z" />
  </MySvgIcon>
);

export {
  MySvgIconPayment,
  MySvgIconProfile,
  MySvgIconWebsite,
  MySvgIconPsd,
  MySvgIconTaxes,
  MySvgIconReset,
  MySvgIconScaleX,
  MySvgIconScaleY,
  MySvgIconRightRotate,
  MySvgIconLeftRotate,
  MySvgIconEmpty,
};
