import Button from "../components/Button";
import Link from "../components/Link";

function HomeNavbar() {
  const className = "text-black font-medium font-roboto-bold";
  return (
    <header className="w-full flex justify-between items-center py-4 px-6 bg-white shadow-md">
      <h1 className="text-3xl font-bold text-black libre-bold">TrackOBill</h1>
      <nav className="lg:flex space-x-6 xs:hidden">
        <Link className={className} text={"About Us"} link="#" />
        <Link className={className} text={"Features"} link="#" />
        <Link className={className} text={"Reviews"} link="#" />
      </nav>
      <div className="flex gap-3 lg:gap-5">
        <Button
          children="Log In"
          buttonClassName=" bg-black text-white px-4 py-2 rounded-lg libre"
        />

        <Button
          children="Sign Up"
          buttonClassName=" bg-black text-white px-4 py-2 rounded-lg libre"
        />
      </div>
    </header>
  );
}

export default HomeNavbar;
