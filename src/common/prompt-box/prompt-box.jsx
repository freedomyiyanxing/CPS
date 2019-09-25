import React from 'react';
import Notification from 'rc-notification';
import { MySnackbarContentWrapper, IconButtons } from './my-snackbar-content';

import './notification.css';

let notification = null;

Notification.newInstance({
  closeIcon: <IconButtons />,
  style: {
    right: 24,
    top: 90,
    bottom: 'auto',
  },
}, (n) => {
  notification = n;
});

const openNotifications = {
  open({
    message, variant, duration = 3, key = '',
  }) {
    notification.notice({
      content: <MySnackbarContentWrapper message={message} variant={variant} />,
      duration,
      style: null,
      closable: true,
      maxCount: 3, // 最多显示多少个
      key,
    });
  },
  clean(key) {
    notification.removeNotice(key);
  },
};

export {
  openNotifications,
};
