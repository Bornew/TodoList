const defaultState = {
  inputValue: '',
  list:[]
};

/**
 * reducer就像一个手册，
 * JSON.parse(JSON.stringify(state))就是相当于将state做了一次深拷贝
 * reducer可以接受state中的数据，但是不能改变数据
 * 增加： list.push(data);
 * 删除： list.splice(index, number); number表示要删的个数。index是删除的起始位置
 * @param state
 * @param action
 * @returns {{inputValue: string, list: number[]}}
 */
export default (state = defaultState, action) => {
  console.log(state, action);
  if (action.type === "change_input_value") {
    const newState = JSON.parse(JSON.stringify(state));
    newState.inputValue = action.value;
    console.log(action.type);
    return newState;
  }
  if (action.type === "add_todo_item") {
    const newState = JSON.parse(JSON.stringify(state));
    newState.list.push(newState.inputValue);
    newState.inputValue = '';
    return newState;
  }
  if (action.type === "delete_todo_item") {
    const newState = JSON.parse(JSON.stringify(state));
    newState.list.splice(action.index, 1);
    return newState;
  }

  return state;
};
