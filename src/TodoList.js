import React, { Component, Fragment } from "react";
import "./style.css";
import TodoItem from "./TodoItem";
import axios from "axios";
import store from './store';
import { CSSTransition } from "react-transition-group";

/**
 * 通过Fragment这个占位符，可以让外层的标签隐藏掉
 * 想要使用js中的变量或表达式，外层要加一个大括号
 * 通过bind来用组件对应的this绑定函数的this,改变函数的作用域
 * 不能直接改变state中的数据，要用setState
 * 展开运算符：...Array
 * react中有一个概念叫做 immutable， state不允许我们做任何的改变，
 * 父组件向子组件传递一个函数时，实际上子组件不能找到该方法。this指向应该是父组件，不是子组件，所以需要强制绑定
 * 多使用箭头函数，()=>{} 其中括号表示将括号内的内容返回
 * setState里面可以接收prevState，表示修改之前的state
 */
/**
 * 需求： 点击button 可以把输入框里的内容添加到列表里
 * 以前的设计思想：直接操作dom
 * React：响应式思想，不操作dom，操作数据，感知到数据变化，自动帮我们生成dom，改变数据
 */
/**
 * 对react的一些思考：
 * - 从命令式开发方式到声明式开发方式
 * - 可以与其他框架并存 react只负责id="root"的渲染
 * - 单向数据流
 * - 是一个视图层的框架，不能对数据做很多处理，需要用到redux等框架
 * - 函数式编程
 * - 面向测试的编程，只要给函数一个输入值，看输出值是否符合预期。这就是函数式编程的优势
 */
/**
 * props state 与 render：
 *当父组件的render被运行时，子组件的render都会被重新执行一次
 */
/**
 * 虚拟DOM：
 *
 * 1。state数据
 * 2。JSX模板
 * 3。数据+模板结合，生成真实的DOM，来显示
 * <div><span>hello world</span></div>
 * 4。生成虚拟DOM （虚拟DOM就是一个JS对象，用它来描述真实的DOM）
 * ['div', {id: 'abc'}, ['span', {}, 'hello world']]
 * 5. state发生变化
 * 6。 生成虚拟的DOM
 *
 * 好处：
 * 1。 性能提升了
 * 2。 使得跨端应用得以实现（既可以开发原生应用，也可以开发网页应用）。React Native。桌面端应用以及移动端原生应用不能识别DOM，只能在浏览器中识别。而虚拟DOM会被转成JS，会被识别成组件
 * Diff算法在DOM比对中的作用
 *
 * 生命周期：
 * initialization set up props and states
 * constructor是初始化
 * 1。ComponentWillMount: 在组件即将被挂载之前被执行
 * 2。然后开始render
 * 3。ComponentDidMount: 在组件被挂载到页面之后被执行
 *
 * Updation：
 * - props：
 * 1。componentWillreceiveProps： 一个组件要从父组件接受参数，只要父组件的render函数被执行了，子组件的这个生命周期函数才会被执行，只有这个组件已经存在于父组件中，才会被执行
 * 2。shouldComponentUpdate：（true/false）
 * 3。componentWillUpdate：
 * 4。render：
 * 5. ComponentDidUpdate：
 *
 * - state：
 * 1。shouldComponentUpdate：（true/false）
 * 2。componentWillUpdate：在组件被更新之前 会自动更新 但是在shouldComponentUpdate（返回true）之后被执行
 * 3。render：
 * 4。ComponentDidUpdate：
 *
 * Unmounting：
 * -componentWillUnmount: 组件快要被移除时执行
 *
 * 使用shouldComponentUpdate: 可以提升性能 避免无谓的子组件的重新渲染
 * 不能把ajax请求 放在render中，因为render函数会重新执行，请求就会不断进行
 * 应该放在只被执行一次的函数中，所以一般放在componentDidMount，是最合适的做法
 *
 *
 *
 * redux:
 * - store
 * - reducer
 * -
 * 图书馆流程：
 1. React Components：借书的人
 2. Action Creators：说要借什么书这句话
 3. Store：图书管理员
 4. Reducers：记录本
 */
class TodoList extends Component {
  // 在jsx语法中，render返回的元素最外层必须有一个包裹元素。
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      show: true,
      list: ["Learn English", "Learn React", "作品集"]
    };
  }
  componentWillMount() {
    console.log("componentWillMount: 组件挂载到页面上之前");
  }
  componentDidMount() {
    console.log("componentDidMount: 组件已经被挂载到页面上了");
    axios
      .get("/api/todolist")
      .then(() => {
        alert("succ");
      })
      .catch(() => {
        alert("error");
      });
  }
  shouldComponentUpdate(nextProps, nextState) {
    // console.log("shouldComponentUpdate: 组件要被更新了");
    if (nextProps.content !== this.props.content) {
      return true;
    }
    return false; //表示组件要被更新 return false 就表示组件不要被更新
  }

  handleInputChange(e) {
    // const value = e.target.value;
    // this.setState(() => ({
    //   inputValue: value
    // }));
    const action = {
      type: 'change_input_value',
      value: e.target_value
    }
    store.dispatch(action);
  }
  handleBtnClick() {
    // this.setState(prevState => ({
    //   list: [...prevState.list, prevState.inputValue],
    //   inputValue: ""
    // }));
    const action = {
      type: 'add_todo_item'
    }
    store.dispatch(action);
  }
  handleItemDelete(index) {
    this.setState(prevState => {
      const list = [...prevState.list];
      list.splice(index, 1); //删除下标是index这一项，删除一个
      return { list };
    });
  }
  handleToggle = () => {};
  render() {
    return (
      <Fragment>
        <CSSTransition in={this.state.show} timeout={1000} classNames="fade" onEntered={(el)=>{el.style.color="blue"}}>
          <div>hello</div>
        </CSSTransition>
        <button onClick={this.handleToggle.bind(this)}>toggle</button>
        {/*<div>*/}
        {/*<label htmlFor="insertArea">输入内容</label>*/}
        {/*<input*/}
        {/*id="insertArea"*/}
        {/*value={this.state.inputValue}*/}
        {/*onChange={this.handleInputChange.bind(this)}*/}
        {/*/>*/}
        {/*<button onClick={this.handleBtnClick.bind(this)}>submit</button>*/}
        {/*</div>*/}
        {/*<ul>*/}
        {/*{this.state.list.map((item, index) => {*/}
        {/*return (*/}
        {/*<TodoItem*/}
        {/*content={item}*/}
        {/*index={index}*/}
        {/*deleteItem={this.handleItemDelete.bind(this)}*/}
        {/*/>*/}
        {/*);*/}
        {/*})}*/}
        {/*</ul>*/}
      </Fragment>
    );
  }
}
export default TodoList;
