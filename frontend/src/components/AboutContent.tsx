interface SocialLinks {
  facebook: string;
  instagram: string;
  linkedin: string;
}

interface AboutContentProps {
  className?: string;
  name?: string;
  title: string;
  description: string;
  imageUrl: string;
  socialLinks: SocialLinks;
}

function AboutContent(props: AboutContentProps) {
  return (
    <div>
      <div className="flex flex-col lg:flex-row items-stretch space-x-0 lg:space-x-6">
        <div className="flex-shrink-0 w-full lg:w-auto">
          <img
            src={props.imageUrl}
            alt={props.name}
            className="h-full w-full lg:w-auto rounded-lg object-cover"
          />
        </div>

        <div className="flex flex-col justify-center w-full lg:w-auto mt-4 lg:mt-0">
          <div className="text-2xl font-bold">{props.name}</div>
          <div className="text-blue-500 font-semibold text-lg">
            {props.title}
          </div>
          <hr className="border-blue-800 my-2" />
          <p className="text-gray-600 mt-2 text-sm max-w-xs text-justify">
            {props.description}
          </p>

          <div className="flex space-x-4 mt-4">
            <a
              href={props.socialLinks.facebook}
              className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-700 text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook-f text-2xl"></i>
            </a>
            <a
              href={props.socialLinks.instagram}
              className="flex items-center justify-center h-8 w-8 rounded-full bg-pink-500 text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram text-2xl"></i>
            </a>
            <a
              href={props.socialLinks.linkedin}
              className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin text-2xl"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutContent;
