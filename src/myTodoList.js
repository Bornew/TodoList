import React, { Component } from "react";
import "antd/dist/antd.css";
import { Input, Button, List } from "antd";
import store from "./store";
import {getAddItemAction, getInputChangeAction, getDeleteItemAction} from './store/actionCreators';

export default class MyTodoList extends Component {
  static defaultProps = {};
  constructor(props) {
    super(props);
    this.state = store.getState();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    store.subscribe(this.handleStoreChange);
  }
  handleStoreChange = () => {
    this.setState(store.getState());
  };
  handleInputChange = e => {
    const action = getInputChangeAction(e.target.value);
    store.dispatch(action);
  };
  handleButtonClick = () => {
    const action = getAddItemAction();
    store.dispatch(action);
  };
  handleItemDelete = index => {
    const action = getDeleteItemAction(index);
    store.dispatch(action);
  };
  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <div>
          <Input
            placeholder={"todoinfo"}
            value={this.state.inputValue}
            style={{ width: "300px", marginRight: "20px" }}
            onChange={this.handleInputChange}
          />
          <Button type={"primary"} onClick={this.handleButtonClick}>
            submit
          </Button>
          <List
            style={{ marginTop: "10px", width: "300px" }}
            bordered
            dataSource={this.state.list}
            renderItem={(item, index) => (
              <List.Item onClick={this.handleItemDelete.bind(this, index)}>
                {item}
              </List.Item>
            )}
          />
        </div>
      </div>
    );
  }
}
