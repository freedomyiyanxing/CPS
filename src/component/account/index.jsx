/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { createForm, formShape } from 'rc-form';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import DialogIndex from '../../common/dialog/dialog-index';
import DialogHeader from '../../common/dialog/dialog-header';
import DialogFooter from '../../common/dialog/dialog-footer';
import MainContainer from '../../common/box-container/main-container';
import Password from '../../common/form/password';

import { openNotifications } from '../../common/prompt-box/prompt-box';
import { postRequestBody } from '../../asstes/http/index';
import { accountIndex } from '../../asstes/data/default-data';
import { validPasswordPrompt, errorText } from '../../asstes/data/prompt-text';
import { indexStyle } from './style';

@withStyles(indexStyle)
@createForm()
class AccountIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      btnLoading: false,
    };
  }

  handleClick = (links) => {
    const { history } = this.props;
    history.push(`/my/${links}`);
    // if (links !== 'account-payment' || window.__valid__password__) {
    //   history.push(`/my/${links}`);
    //   console.log(links);
    // } else {
    //   this.setState({
    //     open: true,
    //   });
    // }
  };

  // 确认密码提交
  handleChangePayment = () => {
    const { form, history } = this.props;
    form.validateFields((error, value) => {
      if (!error) {
        this.setState({
          btnLoading: true,
        });
        postRequestBody('/api/profile/password/validate', {
          password: value.password,
        })
          .then((response) => {
            const { valid } = response;
            if (valid) {
              window.__valid__password__ = valid; // 设置一个全局的变量, 用于控制路由拦截
              history.push('/my/account-payment');
            } else {
              openNotifications.open({
                message: validPasswordPrompt.validPasswordError,
                variant: 'error',
                duration: 5,
              });
            }
            this.setState({
              btnLoading: false,
            });
          })
          .catch((err) => {
            openNotifications.open({
              message: err.data.message || errorText,
              variant: 'error',
              duration: 5,
            });
            this.setState({
              btnLoading: false,
            });
          });
      }
    });
  };

  // 关闭弹出框
  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    const { classes, form } = this.props;
    const { open, btnLoading } = this.state;
    return (
      <>
        <MainContainer>
          <div className={classes.root}>
            <List component="nav" className={classes.list}>
              {
                accountIndex.map(items => (
                  <ListItem
                    button
                    key={items.id}
                    className={classes.listItem}
                    onClick={() => { this.handleClick(items.links); }}
                  >
                    <ListItemIcon className={classes.listAvatar}>
                      <items.icon />
                    </ListItemIcon>
                    <ListItemText
                      primary={items.title}
                      secondary={items.text}
                      classes={{
                        primary: classes.title,
                      }}
                    />
                  </ListItem>
                ))
              }
            </List>
          </div>
        </MainContainer>
        <DialogIndex
          open={open}
          onClose={this.handleClose}
          wrapperCls={classes.dialogWrapper}
          header={<DialogHeader title="haha" />}
          footer={(
            <DialogFooter
              handleChange={this.handleChangePayment}
              handleDelete={this.handleClose}
              loading={btnLoading}
              title={{
                ok: 'Submit',
                delete: 'Close',
              }}
            />
          )}
        >
          <Password form={form} name="Password" />
        </DialogIndex>
      </>
    );
  }
}

AccountIndex.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
  history: PropTypes.objectOf(PropTypes.object).isRequired,
  form: formShape.isRequired,
};

export default AccountIndex;
