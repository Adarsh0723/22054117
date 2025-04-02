export default function Navigation({ setPage, currentPage }) {
    return (
      <nav className="flex justify-center mb-8">
        <ul className="flex space-x-6 bg-glass backdrop-blur-lg shadow-neomorph rounded-full px-6 py-3">
          {[
            { name: 'Feed', key: 'feed' },
            { name: 'Top Users', key: 'topUsers' },
            { name: 'Trending Posts', key: 'trending' }
          ].map(({ name, key }) => (
            <li key={key}>
              <button
                onClick={() => setPage(key)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-md text-white text-lg
                  ${
                    currentPage === key
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 scale-105 shadow-lg'
                      : 'bg-gray-800 bg-opacity-60 hover:bg-opacity-100 hover:scale-105'
                  }`}
              >
                {name}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
  