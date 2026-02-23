const { useState } = React;

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      <header className="bg-white shadow-sm border-b border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800">Counter App</h1>
      </header>
      
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
          <h2 className="text-gray-500 text-sm uppercase tracking-wider font-semibold mb-4">Current Count</h2>
          <div className="text-6xl font-bold text-indigo-600 mb-8">{count}</div>
          
          <div className="flex gap-3 justify-center">
            <button 
              onClick={() => setCount(count - 1)}
              className="px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-lg font-semibold transition-colors duration-200 shadow-md hover:shadow-lg active:scale-95"
            >
              Decrement
            </button>
            
            <button 
              onClick={() => setCount(0)}
              className="px-6 py-3 bg-slate-500 hover:bg-slate-600 text-white rounded-lg font-semibold transition-colors duration-200 shadow-md hover:shadow-lg active:scale-95"
            >
              Reset
            </button>
            
            <button 
              onClick={() => setCount(count + 1)}
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-semibold transition-colors duration-200 shadow-md hover:shadow-lg active:scale-95"
            >
              Increment
            </button>
          </div>
        </div>
      </main>
      
      <footer className="bg-white border-t border-gray-200 p-6 text-center text-gray-600">
        <p>Made with React & Tailwind CSS</p>
      </footer>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);