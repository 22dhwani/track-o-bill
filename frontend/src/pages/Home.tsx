// home.tsx

import HomeNavbar from "../home/HomeNavbar";

const Home: React.FC = () => {
  return (
    <div className="max-h-screen border-4 lg:border-[20px]  border-black bg-white flex flex-col items-center !overflow-hidden">
      <HomeNavbar />
      <main className="grid md:grid-cols-1 lg:grid-cols-2 items-center text-center px-6 mt-12">
        <div className="basis-3/4">
          <h2 className="text-xl font-semibold text-black mb-1">
            🚀 INSTANT SPLIT
          </h2>
          <h1 className="text-5xl font-bold text-black mb-4">
            Split & Share Expenses with{" "}
            <span className="text-green-600">Friends</span> and{" "}
            <span className="text-green-600">Family</span>
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl">
            Simplify group expenses effortlessly. Our user-friendly app makes
            bill splitting, expense tracking, and payments coordination
            seamless. Gain financial clarity and peace of mind with ShareSplits.
          </p>
          <button className="bg-black text-white px-6 py-3 rounded-md mt-6 font-semibold">
            Open a ShareSplits Account
          </button>

          <div className="flex items-center space-x-3 mt-8">
            {/* Profile images placeholders */}
            <img
              src="https://via.placeholder.com/40"
              alt="user1"
              className="w-10 h-10 rounded-full"
            />
            <img
              src="https://via.placeholder.com/40"
              alt="user2"
              className="w-10 h-10 rounded-full"
            />
            <img
              src="https://via.placeholder.com/40"
              alt="user3"
              className="w-10 h-10 rounded-full"
            />
            <p className="text-gray-700">
              The best application to manage your Expenses in group
            </p>
          </div>
        </div>
        <div className="basis-1/4 relative flex flex-col bg-purple-200 w-full max-w-md mt-12 rounded-lg p-6">
          <div className="flex items-center space-x-3 bg-black text-white rounded-md p-4">
            <div>
              <p className="font-semibold">Hi Kianna</p>
              <p className="text-sm">Make your groups and split bill easily</p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md mt-4">
            <h3 className="text-lg font-semibold">Trip to Paris</h3>
            <div className="flex justify-between mt-2">
              <p className="text-lg font-bold">Total</p>
              <p className="text-lg font-bold text-green-600">$3800</p>
            </div>
            <div className="flex justify-between mt-2">
              <p className="text-lg font-bold">To Collect</p>
              <p className="text-lg font-bold text-green-600">$900</p>
            </div>
            <button className="bg-green-600 text-white w-full py-2 rounded-md mt-4 font-semibold">
              View Split
            </button>

            <div className="mt-6">
              <h4 className="font-semibold text-gray-700">Expense History</h4>
              <ul className="mt-4 space-y-2">
                <li className="flex justify-between items-center">
                  <span>Resort Booking</span>
                  <span className="font-semibold text-green-600">$600</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Breakfast At Hotel</span>
                  <span className="font-semibold text-green-600">$500</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Beach</span>
                  <span className="font-semibold text-green-600">$300</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full bg-yellow-300 text-black text-center py-4 mt-12">
        <p className="font-bold text-lg">
          Your Partner in Group Finance Management
        </p>
      </footer>
    </div>
  );
};

export default Home;
