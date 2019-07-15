/* eslint-disable */
import React from 'react';
import Notification from 'rc-notification';
import MySnackbarContentWrapper, { IconButtons } from './my-snackbar-content';

import './notification.css';

let notification = null;

Notification.newInstance({
  closeIcon: <IconButtons />,
  style: {
    left: 24,
    top: 24,
    bottom: 'auto',
  },
}, (n) => {
  notification = n;
});

export const openNotifications = {
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

// 弃用
function openNotification({ message, variant, duration = 3 }) {
  notification.notice({
    content: <MySnackbarContentWrapper message={message} variant={variant} />,
    duration,
    style: null,
    closable: true,
    maxCount: 3, // 最多显示多少个
    onClose() {
      console.error('弃用 ->>> 提示框');
    },
  });
}

export default openNotification;
