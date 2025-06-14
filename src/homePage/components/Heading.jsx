import SearchIcon from "@mui/icons-material/Search";

const Heading = ({ searchHandler, searchInputRef }) => {
  return (
    <div className="text-center">
      {/* Main Heading */}
      <h1 className="mb-8 text-5xl font-bold tracking-tight text-white sm:text-7xl">
        <span className="block">探索課程</span>
        <span className="block bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">
          發現精彩
        </span>
      </h1>

      {/* Subtitle */}
      <div className="mx-auto max-w-3xl">
        <p className="mb-4 text-lg leading-8 text-blue-100 sm:text-xl">
          本站收錄自 105 學年度至 110 學年第 1 學期所有課程之成績分布。
        </p>
        <p className="mb-12 text-base leading-7 text-blue-200 sm:text-lg">
          自110學年第2學期開始之課程成績皆為同學自行上傳。
        </p>
      </div>

      {/* Enhanced Search Bar */}
      <div className="mx-auto max-w-2xl">
        <form onSubmit={searchHandler} className="group relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center pl-6">
            <SearchIcon className="h-6 w-6 text-white/60 transition-colors duration-200 group-focus-within:text-white/90" />
          </div>

          <input
            ref={searchInputRef}
            type="text"
            placeholder="搜尋教授姓名..."
            className="w-full rounded-2xl border-2 border-white/20 bg-white/10 py-5 pr-32 pl-16 text-lg font-medium text-white placeholder-white/60 shadow-xl backdrop-blur-md transition-all duration-300 ease-out hover:border-white/30 hover:bg-white/15 hover:shadow-2xl focus:border-white/40 focus:bg-white/20 focus:placeholder-white/40 focus:shadow-2xl focus:ring-4 focus:ring-white/20 focus:outline-none"
            aria-label="搜尋教授"
          />

          <button
            type="submit"
            className="group/btn absolute inset-y-0 right-0 flex items-center pr-3"
            aria-label="搜尋"
          >
            <div className="rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 ease-out hover:scale-105 hover:from-orange-600 hover:to-red-600 hover:shadow-xl focus:ring-4 focus:ring-orange-500/50 focus:outline-none active:scale-95">
              <span className="mr-2 hidden sm:inline">搜尋</span>
              <SearchIcon className="h-5 w-5" />
            </div>
          </button>
        </form>
      </div>

      {/* Call to Action */}
      <div className="mt-12">
        <p className="mb-4 text-sm text-blue-200">
          🌟 立即開始探索，發現最適合你的課程！
        </p>
        <div className="flex flex-wrap justify-center gap-3 text-xs text-blue-300">
          <span className="rounded-full bg-white/10 px-3 py-1 backdrop-blur-sm">
            💯 成績分布
          </span>
          <span className="rounded-full bg-white/10 px-3 py-1 backdrop-blur-sm">
            📝 學生評價
          </span>
          <span className="rounded-full bg-white/10 px-3 py-1 backdrop-blur-sm">
            🔍 智能搜尋
          </span>
        </div>
      </div>
    </div>
  );
};

export default Heading;
