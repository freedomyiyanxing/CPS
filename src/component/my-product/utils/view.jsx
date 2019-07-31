import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import DropDownBox from '../../../common/drop-down-box/drop-down-box';
import MyPagination from '../../../common/pagination/pagination';
import AllTopBtn from './all-top-btn';
import ProductList from './product-list';
import EmptyPage from '../../../common/empty';
import Skeleton from '../../../common/skeleton/index';

import { get, deleteRequestBody, SUCCESS } from '../../../assets/http/index';
import { myProduct } from '../../../assets/data/default-data';
import { getCheckArr } from '../../../assets/js/utils-methods';
import { openNotifications } from '../../../common/prompt-box/prompt-box';
import { myProductPrompt } from '../../../assets/data/prompt-text';
import { viewStyle } from '../style';

const PAGE_SIZE = 5; // 分页每一页条数

@withStyles(viewStyle)
class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      pagination: {},
      checkedAllBool: false,
      loading: true,
    };

    this.sort = myProduct.productSort[0].value;
    this.pageCurrent = 1;
    this.value = null; // 默认search 表单值为null

    // 选中的id
    this.selectId = [];
  }

  componentDidMount() {
    this._unmount = true;
    this.getData().then();
  }

  componentWillUnmount() {
    this._unmount = false;
  }

  /**
   * 获取数据
   * @param value // 表单数据
   * @param page // 当前页码
   * @param size // 每页条数
   * @param sortBy // 排序
   * @returns {Promise<any>}
   */
  getData = (
    value = this.value,
    page = this.pageCurrent,
    size = PAGE_SIZE,
    sortBy = this.sort,
  ) => new Promise((resolve) => {
    const { checkedAllBool } = this.state;
    this.value = value; // 如果参数value有值 则覆盖缓存的值
    this.pageCurrent = page; // 如果参数page有值 则覆盖缓存的值
    get('/api/promotions/my', {
      page, size, ...value, sortBy,
    }).then((response) => {
      const { total, pages, items } = response;
      if (this._unmount) {
        this.setState({
          data: getCheckArr(items),
          pagination: {
            total,
            pages,
          },
          loading: false,
        });

        // 当查询数据时 且 用户动过check 则清除所欲check状态
        if (checkedAllBool) {
          this.setState({
            checkedAllBool: false,
          });
        }
        this.selectId.length = 0;
        resolve(true);
      }
    });
  });

  // 获取筛选排序的值
  handleSelectChange = (v) => {
    this.sort = v;
    this.getData().then();
  };

  // 点击分页时调用
  handlePaginationChange = (current) => {
    this.pageCurrent = current;
    this.getData().then();
  };

  // 点击check全选按钮
  handleCheckAllChange = (e) => {
    const { data } = this.state;
    const { checked } = e.target;
    this.setState({
      data: getCheckArr(data, checked),
      checkedAllBool: checked,
    });

    // 不管选中还是取消 先清空数组 防止已经点击了单个check选中
    this.selectId.length = 0;

    // 选中时
    if (checked) {
      data.forEach((items) => {
        this.selectId.push(items.id);
      });
    }
  };

  // 点击单个 check 按钮
  handleCheckChange = (index, ids) => {
    const { data, checkedAllBool } = this.state;
    const { check, id } = data[index];
    // 选中时
    if (!check) {
      this.selectId.push(id);
    } else {
      // 取消时
      this.selectId.splice(this.selectId.indexOf(ids), 1);
    }

    // 修改当前数据的check状态
    data[index].check = !check;
    this.setState({
      data,
    });

    // 当把所有check致为false时 且 checkAll状态为true 时 清除checkAll的选中状态
    if (!this.selectId.length && checkedAllBool) {
      this.setState({
        checkedAllBool: false,
      });
    }
  };

  // 点击单个删除
  handleDeleteClick = id => new Promise((resolve) => {
    this.selectId.push(id);
    this.handleDelete().then(() => {
      resolve(true);
    });
  });

  // 执行删除逻辑
  handleDelete = () => new Promise((resolve) => {
    const { data, pagination } = this.state;

    if (!this.selectId.length) {
      resolve(true);
      return false;
    }

    // 表示在删除最后一页的数据
    if (
      data.length === this.selectId.length
      && this.pageCurrent > 1
      && pagination.pages === this.pageCurrent
    ) {
      this.pageCurrent -= 1;
    }

    deleteRequestBody('/api/promotions/delete', {
      ids: this.selectId.join(','),
    }).then((response) => {
      const { message } = response;
      if (message === SUCCESS) {
        this.getData().then(); // 请求数据
        openNotifications.open({
          message: myProductPrompt.deleteSuccess,
          variant: 'success',
          duration: 5,
        });
        resolve(true);
      }
    }).catch((err) => {
      openNotifications.open({
        message: err.data.message || myProductPrompt.errorText,
        variant: 'error',
        duration: 5,
      });
      resolve(true);
    });
  });

  // 下载 xls
  getAllLinks =() => new Promise((resolve) => {
    if (!this.selectId.length) {
      resolve(true);
      return;
    }
    // responseType: 'arraybuffer' response 是一个包含二进制数据的 JavaScript ArrayBuffer,
    get('/api/promotions/links', { ids: this.selectId.join(',') }, 'arraybuffer')
      .then((response) => {
        openNotifications.open({
          message: myProductPrompt.downloadLinks,
          variant: 'success',
          duration: 5,
        });
        resolve(true);

        const blob = new Blob([response]);
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'links.xls';
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        a.remove();
      })
      .catch((err) => {
        resolve(true);
        openNotifications.open({
          message: err.data.message || myProductPrompt.errorText,
          variant: 'error',
          duration: 5,
        });
      });
  });

  render() {
    const { classes } = this.props;
    const {
      data, pagination, checkedAllBool, loading,
    } = this.state;
    return (
      <div className={classes.root}>
        <div className={classes.header}>
          <AllTopBtn
            getAllLinks={this.getAllLinks}
            handleDeleteChange={this.handleDelete}
          />
          <DropDownBox
            selects={myProduct.productSort}
            onChange={this.handleSelectChange}
          />
        </div>
        <Skeleton
          loading={loading}
        >
          {
            data.length
              ? (
                <ProductList
                  data={data}
                  checkedAllBool={checkedAllBool}
                  handleDeleteClick={this.handleDeleteClick}
                  handleCheckAllChange={this.handleCheckAllChange}
                  handleCheckChange={this.handleCheckChange}
                />
              )
              : <EmptyPage height={284} />
          }
          <MyPagination
            total={pagination.total} // 总条数
            pageSize={PAGE_SIZE} // 每页条数
            pageCurrent={this.pageCurrent}
            change={this.handlePaginationChange} // 点击分页时调用
          />
        </Skeleton>
      </div>
    );
  }
}

View.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default View;
