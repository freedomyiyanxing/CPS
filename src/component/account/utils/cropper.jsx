import React from 'react';
import uuid from 'uuid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LocalSee from '@material-ui/icons/LocalSee';
import Close from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Cropper from 'react-cropper';

import MyButton from '../../../common/material-ui-compoents/button';
import iconDefault from '../../../asstes/images/U_150x150.png';
import { cropperStyle } from '../style';

// cropper控制按钮的
const cropperBtnArr = [
  {
    id: uuid(),
    name: 'leftRotate',
    text: '左旋转',
  },
  {
    id: uuid(),
    name: 'rightRotate',
    text: '右旋转',
  },
  {
    id: uuid(),
    name: 'scaleX',
    text: '左右换向',
  },
  {
    id: uuid(),
    name: 'scaleY',
    text: '上下换向',
  },
  {
    id: uuid(),
    name: 'reset',
    text: '复位',
  },
];

@withStyles(cropperStyle)
class MyCropper extends React.Component {
  constructor(props) {
    super(props);
    const { iconUrl } = props;

    this.state = {
      open: false,
      icon: iconUrl || iconDefault,
      imgUrl: iconUrl || null,
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
    console.log('2222', file);
  };

  /**
   * 提交裁剪
   * @returns {null|boolean}
   */
  handleClick = () => {
    if (typeof this.refCropper.getCroppedCanvas() === 'undefined') {
      console.log('裁剪失败');
      return false;
    }
    this.setState({
      icon: this.refCropper.getCroppedCanvas().toDataURL(),
    }, () => {
      // eslint-disable-next-line react/destructuring-assignment
      console.log('裁剪的图片 base64: ', this.state.icon);
    });
    return null;
  };

  handleControl = (name) => {
    console.log(name);
    switch (name) {
      case 'leftRotate':
        this.refCropper.rotate(45);
        break;
      case 'rightRotate':
        this.refCropper.rotate(-45);
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
    console.log(this.clickScaleX);
    this.refCropper.scaleX(this.clickScaleX % 2 === 0 ? -1 : 1);
    this.clickScaleX += 1;
  };

  handleScaleY = () => {
    console.log(this.clickScaleY);
    this.refCropper.scaleY(this.clickScaleY % 2 === 0 ? -1 : 1);
    this.clickScaleY += 1;
  };

  render() {
    const { classes } = this.props;
    const { open, imgUrl, icon } = this.state;
    return (
      <>
        <div className={classes.root}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.handleClose}
            className={classes.wrapper}
          >
            <Avatar
              src={icon}
              alt="account icon"
              className={classes.bigAvatar}
            />
            <span className={classes.mask}>
              <LocalSee className={classes.icon} />
            </span>
          </div>
        </div>
        <Dialog
          open={open}
          onClose={this.handleClose}
          classes={{
            paper: classes.dialog,
          }}
        >
          <div className={classes.dialogTitle}>
            <MyButton
              variant="contained"
              color="secondary"
              className={classes.dialogBtn}
            >
              <label
                className={classes.label}
                htmlFor="chooseImg"
                onChange={this.handleChange}
              >
                <input type="file" id="chooseImg" />
                上传图片
              </label>
            </MyButton>
            <IconButton onClick={this.handleClose}><Close /></IconButton>
          </div>
          <div className={classes.dialogContent}>
            <Cropper
              src={imgUrl}
              className="cropper-img-wrapper"
              ref={(n) => { this.refCropper = n; }}
              dragMode="move" // 移动画布
              preview=".cropper-img-preview" // 预览视图
              aspectRatio={9 / 9} // 宽高比列
              autoCropArea={0.5} // 初始化裁剪框大小（相对于图片大小做比例）
              // viewMode={1} // 限制裁剪框不超过画布的大小
            />
            <div className={classes.dialogView}>
              <div
                className="cropper-img-preview"
                style={{ width: 200, height: 200, overflow: 'hidden' }}
              />
              <div
                className="cropper-img-preview"
                style={{
                  width: 120, height: 120, overflow: 'hidden', borderRadius: '50%',
                }}
              />
            </div>
          </div>
          <div className={classes.dialogFooter}>
            <div className={classes.dialogControl}>
              {
                cropperBtnArr.map(v => (
                  <MyButton
                    key={v.id}
                    variant="contained"
                    color="secondary"
                    className={classes.dialogBtn}
                    onClick={() => { this.handleControl(v.name); }}
                  >
                    {v.text}
                  </MyButton>
                ))
              }
            </div>
            <MyButton
              variant="contained"
              color="secondary"
              className={classes.dialogBtn}
              onClick={this.handleClick}
            >
              裁剪
            </MyButton>
          </div>
        </Dialog>
      </>
    );
  }
}

MyCropper.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
  iconUrl: PropTypes.string,
};
MyCropper.defaultProps = {
  iconUrl: null,
};


export default MyCropper;
