import React, { Component } from "react";
import PropTypes from 'prop-types';

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  render() {
    const content = this.props.content;
    return <div onClick={this.handleClick}>{content}</div>;
  }

  handleClick() {
    // const {deleteItem} = this.props.deleteItem;
    const { deleteItem, index } = this.props;
    deleteItem(index);
  }
}

TodoItem.propTypes = {
  test: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  deleteItem: PropTypes.func,
  index: PropTypes.number
}
TodoItem.defaultProps = {
  test: 'hello world'
}

export default TodoItem;
