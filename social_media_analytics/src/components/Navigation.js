export default function Navigation({ setPage, currentPage }) {
    return (
      <nav className="flex justify-center mb-8">
        <ul className="flex space-x-4 bg-[#1a1c2d] backdrop-blur-lg rounded-full px-4 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-[#2a2d3e]">
          {[
            { name: 'Feed', key: 'feed' },
            { name: 'Top Users', key: 'topUsers' },
            { name: 'Trending Posts', key: 'trending' }
          ].map(({ name, key }) => (
            <li key={key}>
              <button
                onClick={() => setPage(key)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 text-white text-sm
                  ${
                    currentPage === key
                      ? 'bg-gradient-to-r from-[#4776E6] to-[#8E54E9] shadow-[0_4px_15px_rgba(78,119,230,0.4)]'
                      : 'hover:bg-[#2a2d3e] hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)]'
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
  