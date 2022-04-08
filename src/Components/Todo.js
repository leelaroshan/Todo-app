import React, { useState, useEffect } from 'react';

import { v4 as uuid } from 'uuid';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FiEdit } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';

export default function Todo() {
  const unique_id = uuid();
  const small_id = unique_id.slice(0, 8);

  const [todoList, setTodoList] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [todoState, setTodoState] = useState('');

  const [userId, setUserId] = useState();
    const [isTodoSubmitting, setIsTodoSubmitting] = useState(false);
    const [id, setId] = useState('');
      const [isEditing, setIsEditing] = useState(false);

  //   const [activeUserId, setActiveUserId] = useState();
    const [filterTodo, setFilterTodo] = useState([]);
  const [filterOption, setFilterOption] = useState();
  const [sortOption, setSortOption] = useState('');

  const handleChange = (e, id) => {
    if (id === 'title') {
      setTitle(e.target.value);
    }
    if (id === 'description') {
      setDescription(e.target.value);
    }
    if (id === 'todoState') {
      setTodoState(e.target.value);
    }
  };
  const handleSort = (e) => {
    setSortOption(e.target.value);
}



  useEffect(() => {
    if (localStorage.getItem('active_user')) {
      let activeUserObj = JSON.parse(localStorage.getItem('active_user'));
      setUserId(activeUserObj.user_id);
    }
    if (localStorage.getItem('todos_list')) {
      const newList = JSON.parse(localStorage.getItem('todos_list'));
      setTodoList(newList);
      return;
    }
      
    
  }, []);

  useEffect(() => {
    localStorage.setItem('todos_list', JSON.stringify(todoList));
  }, [todoList]);

  useEffect(() => {
    if (localStorage.getItem('todos_list')) {
      const newList = JSON.parse(localStorage.getItem('todos_list'));
      const filterTodos = newList.filter(
        (eachItem) => eachItem.user_id === userId
      );
      setFilterTodo(filterTodos);
      return;
    }
  }, [userId]);

  console.log(userId);
  console.log(filterTodo);
    console.log('id', id)
    console.log('title', title)
  const onFormSubmit = (e) => {
    e.preventDefault();
    let todoObj = {
      id: small_id,
      title: title,
      description: description,
      user_id: userId,
      state: todoState,
    };

    setTodoList([...todoList, todoObj]);
    setIsTodoSubmitting(true);

    setTitle('');
    setDescription('');
    setTodoState('');
    setTodoState('');

    if (setIsTodoSubmitting) {
      Swal.fire({
        title: `Todo added Successfully`,
      }).then(function () {
        let url = window.location.origin;
        window.location = url + '/todolist';
      });
    }
  };
    

    
    const updateTodo = (el) => {
        setId(el.id);
      setIsEditing(true);
        const editTodo = filterTodo.find((eachItem) => eachItem.id === el.id);
        console.log('edit todo', editTodo)
 setTitle(editTodo.title);
 setDescription(editTodo.description);
 setTodoState(editTodo.todoState);

      
      
        // localStorage.setItem('todos_list', JSON.stringify(newTodoList));
      };


    

  const removeTodo = (el) => {
         let hardCopy = [...filterTodo];
    hardCopy = hardCopy.filter((todoItem) => todoItem.id !== el.id);
    setFilterTodo(hardCopy);
    let items = JSON.parse(localStorage.getItem('todos_list'));

    items.splice(
      items.findIndex((a) => a.id === el.id),
      1
    );
    localStorage.setItem('todos_list', JSON.stringify(items));
  };


  const editHandler = () => {
    
   
     const newTodoList = filterTodo.map((eachTodo) => {
       if (eachTodo.id === id) {
         eachTodo.title = title;
         eachTodo.description = description;
         eachTodo.todoState = todoState;
       }
       return eachTodo;
     });
    setFilterTodo(newTodoList);
  


     if (setIsEditing) {
       Swal.fire({
         title: `Todo updated Successfully`,
       }).then(function () {
         let url = window.location.origin;
         window.location = url + '/todolist';
       });
     }
      setIsEditing(false);
localStorage.setItem('todos_list', JSON.stringify(filterTodo));


    
 }

  return (
    <div>
      <div className="todo_form_container">
        <h3 style={{ textAlign: 'center' }}>Todo List</h3>
        <form>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Title
            </label>
            <input
              name="title"
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={title}
              onChange={(e) => handleChange(e, 'title')}
              required
            />
          </div>

          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              Description
            </label>
            <input
              name="description"
              type="text"
              class="form-control"
              id="exampleInputPassword1"
              value={description}
              onChange={(e) => handleChange(e, 'description')}
              required
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              userId
            </label>
            <input
              name="userId"
              type="string"
              class="form-control"
              id="exampleInputPassword1"
              value={userId}
              required
            />
          </div>
          <div class="mb-3" style={{ marginBottom: '40px' }}>
            <select
              class="form-control form-control-lg"
              value={todoState}
              onChange={(e) => handleChange(e, 'todoState')}
            >
              <option>select</option>
              <option value="Todo">Todo</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>

          {/* {title && description && todoState && userId ? ( */}
          {isEditing ? (
            <button type="submit" class="btn btn-primary" onClick={editHandler}>
              Edit
            </button>
          ) : (
            <button
              type="submit"
              class="btn btn-primary"
              onClick={onFormSubmit}
            >
              Submit
            </button>
          )}
        </form>
      </div>

      <div class="mb-3" style={{ marginBottom: '30px' }}>
        <select
          class="form-control "
          onChange={(e) => handleSort(e)}
          className="sort_input"
          value={sortOption}
        >
          <option>select</option>
          <option value="sortATZ">sortATZ</option>
          <option value="sortZTA">sortZTA</option>
         
        </select>
      </div>


      <div className="todos_container">
        {filterTodo &&
          filterTodo.map((el, index) => (
            <div className="display_single_todo" key={el.id}>
              <p>{el.title}</p>
              <p>{el.description}</p>
              <button className="state_btn">{el.todoState}</button>
              <Link to="">
                <FiEdit
                  onClick={() => updateTodo(el)}
                  style={{
                    color: '#0e7c85',
                    width: '30px',
                    height: '30px',
                    cursor: 'pointer',
                  }}
                />
              </Link>
              <AiOutlineDelete
                onClick={() => removeTodo(el)}
                style={{
                  color: 'red',
                  width: '30px',
                  height: '30px',
                  cursor: 'pointer',
                }}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
