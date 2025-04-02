export default function Navigation({ setPage, currentPage }) {
    return (
      <nav className="flex justify-center mb-8">
        <ul className="flex space-x-4 bg-glass shadow-neomorph rounded-full p-2 backdrop-blur-md">
          {[
            { name: 'Feed', key: 'feed' },
            { name: 'Top Users', key: 'topUsers' },
            { name: 'Trending Posts', key: 'trending' }
          ].map(({ name, key }) => (
            <li key={key}>
              <button
                onClick={() => setPage(key)}
                className={`px-6 py-3 rounded-full font-semibold transition-all shadow-lg text-white ${
                  currentPage === key ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gray-700 hover:bg-gray-600'
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
  