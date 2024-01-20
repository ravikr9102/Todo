import { useState } from 'react';
import './index.css';
import { RxCross1 } from 'react-icons/rx';
import { IoMdAdd } from 'react-icons/io';

function App() {
  const [showInput, setShowInput] = useState(false);
  const [value, setValue] = useState('');
  const [todos, setTodos] = useState([]);
  const [startedTodos, setStartedTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [id, setId] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleInputShow = () => {
    setShowInput(true);
  };

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value !== '') {
      setTodos([...todos, { value, id }]);
      setValue('');
      setShowInput(false);
    }
    setId(id + 1);
  };

  const handlePendingCheckbox = (index) => {
    const movedTodo = todos.splice(index, 1)[0];
    setTodos(todos);
    setStartedTodos([...startedTodos, movedTodo]);
  };

  const handleStartedCheckbox = (index) => {
    const filterTodo = startedTodos.splice(index, 1)[0];
    setStartedTodos(startedTodos);
    setCompletedTodos([...completedTodos, filterTodo]);
  };

  const handleRemoveCompletedTodo = (index) => {
    const updatedCompletedTodos = [...completedTodos];
    updatedCompletedTodos.splice(index, 1);
    setCompletedTodos(updatedCompletedTodos);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const getBackgroundColor = () => {
    switch (selectedCategory) {
      case 'pending':
        return '#f3bf57';
      case 'started':
        return '#008000';
      case 'completed':
        return '#FF0000';
      default:
        return '#f3bf57';
    }
  };

  const filteredTodos = () => {
    switch (selectedCategory) {
      case 'pending':
        return todos;
      case 'started':
        return startedTodos;
      case 'completed':
        return completedTodos;
      default:
        return todos;
    }
  };

  return (
    <>
      <div className="flex justify-center items-center md:pt-40 pt-24">
        <button
          onClick={() => handleCategoryChange('pending')}
          className="mr-7 px-5 py-1.5 rounded bg-[#f3bf57] text-gray-800 font-sans"
        >
          Pending
        </button>
        <button
          onClick={() => handleCategoryChange('started')}
          className="px-5 font-sans py-1.5 rounded bg-[#008000] text-gray-800"
        >
          Started
        </button>
        <button
          onClick={() => handleCategoryChange('completed')}
          className="ml-7 px-5 font-sans py-1.5 rounded bg-[#FF0000] text-gray-800"
        >
          Completed
        </button>
      </div>
      <div className="flex flex-col items-center mt-8">
        {filteredTodos().map((todo, index) => (
          <div
            key={todo.id}
            className={`flex items-center md:w-1/4 w-2/4 text-white my-2 p-4 rounded-lg`}
            style={{ backgroundColor: getBackgroundColor() }}
          >
            {selectedCategory === 'completed' ? (
              <>
                <p className="flex-grow mr-2 text-gray-800 text-base line-through  font-medium">
                  {todo.value}
                </p>
                <button
                  onClick={() => handleRemoveCompletedTodo(index)}
                  className="text-white text-2xl"
                >
                  <RxCross1 />
                </button>
              </>
            ) : (
              <>
                <input
                  type="checkbox"
                  className="cursor-pointer md:w-6 md:h-6 w-5 h-5"
                  onChange={() =>
                    selectedCategory === 'pending'
                      ? handlePendingCheckbox(index)
                      : handleStartedCheckbox(index)
                  }
                />
                <p className="ml-2 text-gray-800 flex-grow font-medium">
                  {todo.value}
                </p>
              </>
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-col justify-center items-center pt-16">
        <h1 className="text-white text-5xl mb-4 font-sans ">Todo App</h1>
        {showInput ? (
          <div>
            <form onSubmit={handleSubmit}>
              <input
                className="bg-transparent text-white outline-none border border-white px-3 py-2.5 rounded mt-8 border-r-0 rou rounded-r-none"
                type="text"
                placeholder="Enter your todos!"
                value={value}
                onChange={handleInputChange}
              />
              <button className="px-3 bg-gradient-to-r hover:from-green-400 to-blue-500 from-pink-500 hover:to-indigo-500  text-white rounded py-2.5 border border-white border-l-0 rounded-l-none">
                Add
              </button>
            </form>
          </div>
        ) : (
          <button
            className="w-12 h-12 mt-10 rounded-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500  text-white flex justify-center items-center text-2xl"
            onClick={handleInputShow}
          >
            <IoMdAdd />
          </button>
        )}
      </div>
    </>
  );
}

export default App;
