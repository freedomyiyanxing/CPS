import React from 'react';
import Notification from 'rc-notification';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import MySnackbarContentWrapper from './my-snackbar-content';

import './notification.css';

let notification = null;

Notification.newInstance({
  closeIcon: (
    <IconButton style={{ padding: 15 }}>
      <Close style={{ fontSize: 18, color: '#fff' }} />
    </IconButton>
  ),
  style: {
    left: 24,
    top: 24,
    bottom: 'auto',
  },
}, (n) => {
  notification = n;
});

function openNotification({ message, variant }) {
  notification.notice({
    content: <MySnackbarContentWrapper message={message} variant={variant} />,
    duration: 3,
    style: null,
    closable: true,
    maxCount: 3, // 最多显示多少个
    onClose() {
      console.log('提示框 删除时通知');
    },
  });
}

export default openNotification;
