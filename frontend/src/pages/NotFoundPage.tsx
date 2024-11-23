import NotFound from "../images/notFound.png";

const NotFoundPage = () => {
  return (
    <div className="flex h-screen justify-center items-center ">
      <img src={NotFound} alt="" className="md:w-3/6 md:h-4/6 object-contain" />
    </div>
  );
};

export default NotFoundPage;
