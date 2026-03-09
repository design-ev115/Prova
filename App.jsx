const { useState, useEffect } = React;

const App = () => {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    setTodos([...todos, {
      id: Date.now(),
      text: inputValue,
      completed: false,
      createdAt: new Date().toLocaleDateString()
    }]);
    setInputValue('');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeTodosCount = todos.filter(t => !t.completed).length;
  const completedTodosCount = todos.filter(t => t.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 font-sans">
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
            <h1 className="text-3xl font-bold mb-2">📝 Task Manager</h1>
            <p className="text-indigo-100">Organizza la tua giornata</p>
            <div className="mt-4 flex gap-4 text-sm">
              <span className="bg-white/20 px-3 py-1 rounded-full">
                {activeTodosCount} attivi
              </span>
              <span className="bg-white/20 px-3 py-1 rounded-full">
                {completedTodosCount} completati
              </span>
            </div>
          </div>

          {/* Input Section */}
          <div className="p-6 border-b border-gray-100">
            <form onSubmit={addTodo} className="flex gap-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Aggiungi una nuova task..."
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95"
              >
                Aggiungi
              </button>
            </form>
          </div>

          {/* Filters */}
          <div className="flex gap-1 p-4 bg-gray-50 border-b border-gray-100">
            {['all', 'active', 'completed'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`flex-1 py-2 px-4 rounded-lg font-medium capitalize transition-all duration-200 ${
                  filter === f
                    ? 'bg-white text-indigo-600 shadow-md'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                {f === 'all' ? 'Tutti' : f === 'active' ? 'Attivi' : 'Completati'}
              </button>
            ))}
          </div>

          {/* Todo List */}
          <div className="max-h-96 overflow-y-auto">
            {filteredTodos.length === 0 ? (
              <div className="p-12 text-center text-gray-400">
                <div className="text-6xl mb-4">
                  {filter === 'completed' ? '🎉' : filter === 'active' ? '☕' : '📋'}
                </div>
                <p className="text-lg">
                  {filter === 'completed' 
                    ? 'Nessun task completato' 
                    : filter === 'active' 
                    ? 'Nessun task attivo' 
                    : 'Nessun task'}
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-gray-100">
                {filteredTodos.map((todo) => (
                  <li
                    key={todo.id}
                    className="group flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <button
                      onClick={() => toggleTodo(todo.id)}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                        todo.completed
                          ? 'bg-emerald-500 border-emerald-500 text-white'
                          : 'border-gray-300 hover:border-indigo-500'
                      }`}
                    >
                      {todo.completed && (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                    
                    <div className="flex-1">
                      <p className={`font-medium transition-all duration-200 ${
                        todo.completed ? 'text-gray-400 line-through' : 'text-gray-700'
                      }`}>
                        {todo.text}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">{todo.createdAt}</p>
                    </div>

                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="opacity-0 group-hover:opacity-100 p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-all duration-200"
                      title="Elimina"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer */}
          {completedTodosCount > 0 && (
            <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
              <span className="text-sm text-gray-500">
                {completedTodosCount} task completati
              </span>
              <button
                onClick={clearCompleted}
                className="text-sm text-rose-600 hover:text-rose-700 font-medium hover:underline"
              >
                Elimina completati
              </button>
            </div>
          )}
        </div>

        <footer className="mt-8 text-center text-gray-500 text-sm">
          <p>Fatto con React & Tailwind CSS</p>
        </footer>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);