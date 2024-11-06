import Button from "../components/Button";
import Link from "../components/Link";

function HomeNavbar() {
  const className = "text-black font-medium font-roboto-bold";
  const handleClick = () => {
    window.location.href = "/signup"; // Replace with your target URL
  };

  const handleloginClick = () => {
    window.location.href = "/login"; // Replace with your target URL
  };
  return (
    <header className="w-full flex justify-between items-center py-4 px-6 bg-white shadow-md">
      <h1 className="text-3xl font-bold text-black libre-bold">
        <a href="/home" rel="noopener noreferrer" className="cursor-pointer">
          TrackOBill
        </a>
      </h1>
      <nav className="lg:flex space-x-6 xs:hidden">
        <Link className={className} text={"About Us"} link="/about-us" />
        <Link className={className} text={"Features"} link="#" />
        <Link className={className} text={"Reviews"} link="#" />
      </nav>
      <div className="flex gap-3 lg:gap-5">
        <Button
          children="Log In"
          onClick={handleloginClick}
          buttonClassName=" bg-black text-white px-4 py-2 rounded-lg libre"
        />

        <Button
          onClick={handleClick}
          children="Sign Up"
          buttonClassName=" bg-black text-white px-4 py-2 rounded-lg libre"
        />
      </div>
    </header>
  );
}

export default HomeNavbar;
