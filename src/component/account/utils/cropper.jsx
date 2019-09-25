import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';

import MyButton from '../../../common/material-ui-component/button';
import SubmitButton from '../../../common/form/submit-button';
import Avatars from '../../../common/material-ui-component/avatar';

import { MySvgIconLocalSee, MySvgIconClose } from '../../../common/material-ui-component/svg-icon';
import { openNotifications } from '../../../common/prompt-box/prompt-box';
import { patchRequestBody } from '../../../assets/http/index';
import { userIconPrompt } from '../../../assets/data/prompt-text';
import { cropperBtnArr } from '../../../assets/data/default-data';
import { cropperStyle } from '../style';

let LazyCropper = null;

@inject(store => ({
  userStore: store.userStore,
}))
@withStyles(cropperStyle)
@observer
class MyCropper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      isClose: true, // 控制在上传过程中不允许关闭弹出框
      imgUrl: null,
      Cropper: LazyCropper || null,
    };

    this.clickScaleX = 0;
    this.clickScaleY = 0;
  }

  /**
   * 弹出框控制
   */
  handleClose = () => {
    const { open } = this.state;
    this.setState({
      open: !open,
    });

    // 保证只进来一次
    if ((!open) && !LazyCropper) {
      import('react-cropper').then((data) => {
        LazyCropper = data.default;
        this.setState({
          Cropper: LazyCropper,
        });
      });
    }
  };

  /**
   * 选择图片
   * @param event
   */
  handleChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      this.setState({
        imgUrl: e.target.result,
      });
    };
    reader.readAsDataURL(file);
  };

  /**
   * 提交裁剪
   * @returns {Promise<any>}
   */
  handleClick = () => {
    const { id, userStore } = this.props;
    const canvas = this.refCropper.getCroppedCanvas();

    if (!canvas) {
      openNotifications.open({
        message: userIconPrompt.warningText,
        variant: 'warning',
        duration: 5,
      });
      return null;
    }

    this.setState({
      isClose: false,
    });

    return new Promise((resolve) => {
      patchRequestBody('/api/profile/upload', {
        id,
        photo: canvas.toDataURL(),
      })
        .then((response) => {
          const { path } = response;
          userStore.selUserPhoto(path);
          openNotifications.open({
            message: userIconPrompt.successText,
            variant: 'success',
            duration: 5,
          });
          this.setState({
            isClose: true,
            open: false,
          });
          resolve(true);
        })
        .catch((err) => {
          openNotifications.open({
            message: err.data.message || userIconPrompt.errorText,
            variant: 'error',
            duration: 5,
          });
          this.setState({
            isClose: true,
            open: false,
          });
          resolve(true);
        });
    });
  };

  handleControl = (name) => {
    switch (name) {
      case 'leftRotate':
        this.refCropper.rotate(-45);
        break;
      case 'rightRotate':
        this.refCropper.rotate(45);
        break;
      case 'scaleX':
        this.handleScaleX();
        break;
      case 'scaleY':
        this.handleScaleY();
        break;
      default:
        this.refCropper.reset();
    }
  };

  handleScaleX = () => {
    this.refCropper.scaleX(this.clickScaleX % 2 === 0 ? -1 : 1);
    this.clickScaleX += 1;
  };

  handleScaleY = () => {
    this.refCropper.scaleY(this.clickScaleY % 2 === 0 ? -1 : 1);
    this.clickScaleY += 1;
  };

  render() {
    const { classes, userStore } = this.props;
    const {
      open, imgUrl, isClose, Cropper,
    } = this.state;
    return (
      <>
        <div className={classes.root}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.handleClose}
            className={classes.wrapper}
          >
            <Avatars
              photo={userStore.userPhoto}
              classes={{
                img: classes.bigAvatar,
                icon: classes.iconAvatar,
              }}
            />
            <span className={classes.mask}>
              <MySvgIconLocalSee />
            </span>
          </div>
        </div>
        <Dialog
          open={open}
          onClose={isClose && this.handleClose}
          classes={{
            paper: classes.dialog,
          }}
        >
          <div className={classes.dialogTitle}>
            <MyButton
              variant="contained"
              color="primary"
              className={classes.dialogBtn}
            >
              <label
                className={classes.label}
                htmlFor="chooseImg"
                onChange={this.handleChange}
              >
                <input type="file" id="chooseImg" />
                Upload
              </label>
            </MyButton>
            <IconButton
              onClick={isClose && this.handleClose}
            >
              <MySvgIconClose className={classes.close} />
            </IconButton>
          </div>
          <div className={classes.dialogContent}>
            {
              Cropper
                ? (
                  <Cropper
                    src={imgUrl}
                    className="cropper-img-wrapper"
                    ref={(n) => {
                      this.refCropper = n;
                    }}
                    dragMode="move" // 移动画布
                    preview=".cropper-img-preview" // 预览视图
                    aspectRatio={9 / 9} // 宽高比列
                    autoCropArea={0.5} // 初始化裁剪框大小（相对于图片大小做比例）
                    viewMode={1} // 限制裁剪框不超过画布的大小
                  />
                )
                : <div className="cropper-img-preview" style={{ width: 500, height: 340 }} />
            }
            <div className={classes.dialogView}>
              <div className={`cropper-img-preview ${classes.cropperPreviewMax}`} />
              <div className={`cropper-img-preview ${classes.cropperPreviewMin}`} />
            </div>
          </div>
          <div className={classes.dialogFooter}>
            <div className={classes.dialogControl}>
              {
                cropperBtnArr.map(v => (
                  <MyButton
                    key={v.id}
                    variant="contained"
                    color="primary"
                    className={classes.dialogBtn}
                    onClick={() => {
                      this.handleControl(v.name);
                    }}
                  >
                    <v.icon />
                  </MyButton>
                ))
              }
            </div>
            <SubmitButton
              name="Submit"
              handleSubmit={this.handleClick}
              className={classes.btnWrapper}
            />
          </div>
        </Dialog>
      </>
    );
  }
}

MyCropper.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
  userStore: PropTypes.objectOf(PropTypes.object),
  id: PropTypes.string.isRequired,
};
MyCropper.defaultProps = {
  userStore: null,
};


export default MyCropper;
