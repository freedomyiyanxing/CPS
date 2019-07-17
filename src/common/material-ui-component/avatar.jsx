import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';

import MyPerson from './icon-person';

// 图片路径
const IMGUrl = process.env.IMG_BASE || '';

const _getImageUrl = (image, options) => {
  if (!image) return '';
  if (image.startsWith('http')) return image;
  let url = IMGUrl;
  if (options) {
    url += `/fit-in/${options.width}x${options.height}`;
    if (options.fill) {
      url += `/filters:fill(${options.fill})`;
    } else if (image.endsWith('png')) {
      url += '/filters:fill(transparent)';
    } else {
      url += '/filters:fill(fff)';
    }
  }
  url += image;
  return url;
};

const Avatars = (props) => {
  const { photo, classes, options } = props;
  return (
    photo
      ? (
        <Avatar
          src={_getImageUrl(photo, options)}
          alt="icon"
          className={classes.img}
        />
      )
      : (
        <Avatar className={classes.icon || classes.img}>
          <MyPerson />
        </Avatar>
      )
  );
};

Avatars.propTypes = {
  options: PropTypes.objectOf(PropTypes.object),
  photo: PropTypes.string,
  classes: PropTypes.string,
};

Avatars.defaultProps = {
  photo: '',
  classes: '',
  options: null,
};

export default Avatars;
