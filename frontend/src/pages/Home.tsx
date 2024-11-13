import Footer from "../home/Footer";
import HomeNavbar from "../home/HomeNavbar";
import Man from "../../images/man.avif";
import Women from "../../images/women.jpg";
import { NavLink } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="lg:max-h-screen border-4 lg:border-t-[20px] lg:border-b-0 lg:border-x-[20px] border-black bg-slate-900  flex flex-col items-center !overflow-hidden">
      <HomeNavbar />
      <main className="grid md:grid-cols-1 lg:grid-cols-6 items-center text-center px-6 xs:my-12 lg:my-6 gap-10 ">
        {/* First Column: 4/6 width */}
        <div className="lg:col-span-4 flex flex-col items-center">
          <h2 className="text-xl font-semibold text-white mb-1">
            🚀 INSTANT SPLIT
          </h2>
          <h1 className="text-5xl font-bold text-white mb-4 libre-bold tracking-wide leading-snug">
            Split & Share Expenses with{" "}
            <span className="text-green-600">Friends</span> and{" "}
            <span className="text-green-600">Family</span>
          </h1>
          <p className="text-lg text-white max-w-2xl">
            Simplify group expenses effortlessly. Our user-friendly app makes
            bill splitting, expense tracking, and payments coordination
            seamless. Gain financial clarity and peace of mind with ShareSplits.
          </p>
          <NavLink to="/dashboard">
            <button className="bg-black text-white px-6 py-3 rounded-md mt-6 font-semibold">
              Open a ShareSplits Account
            </button>
          </NavLink>

          <div className="flex flex-col items-center space-x-3 mt-8 gap-3">
            {/* Profile images placeholders */}
            <div className="flex gap-3">
              <img
                src={Man}
                alt="user1"
                className="w-10 h-10 rounded-full object-fit"
              />
              <img
                src={Women}
                alt="user1"
                className="w-10 h-10 rounded-full object-fit"
              />
              <img
                src={Man}
                alt="user1"
                className="w-10 h-10 rounded-full object-fit"
              />
            </div>
            <p className="text-white">
              The best application to manage your Expenses in group
            </p>
          </div>
        </div>

        {/* Second Column: 2/6 width */}
        <div className="lg:col-span-2 relative flex flex-col items-center bg-purple-200 w-full max-w-md mt-4 rounded-lg p-6">
          <div className="flex items-center space-x-3 bg-black text-white rounded-md p-4">
            <div>
              <p className="font-semibold">Hi Kianna</p>
              <p className="text-sm">Make your groups and split bill easily</p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md mt-4 w-full">
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

      <Footer />
    </div>
  );
};

export default Home;
