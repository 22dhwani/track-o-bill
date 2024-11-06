// home.tsx

import AboutContent from "../components/AboutContent";
import HomeNavbar from "../home/HomeNavbar";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../assets/tanmay.jpeg";

const About: React.FC = () => {
  return (
    <div className="max-h-screen border-4 lg:border-[20px] border-black bg-white flex flex-col items-center !overflow-auto">
      <HomeNavbar />
      <h1 className="text-4xl font-bold my-4 text-center">Behind the Scenes</h1>
      <h1 className="text-xl font-bold max-w-4xl mx-auto text-center p-4">
        "Our team is a dynamic group of design experts dedicated to crafting
        innovative and user-centered solutions that inspire and elevate the user
        experience."
      </h1>

      <div className="flex flex-wrap justify-center m-4 gap-20">
        <AboutContent
          name="Durva Brahmbhatt"
          title="Frontend Developer "
          description="I am the co-founder of enjoyo and we’ve pushed our limit so far to make it successful. This is additional text to show how the content scales with the image height."
          imageUrl="https://randomuser.me/api/portraits/women/8.jpg"
          socialLinks={{
            facebook: "#",
            instagram: "#",
            linkedin: "#",
          }}
        />

        <AboutContent
          name="Dhwani Sheth"
          title="Frontend Developer"
          description="Passionate about creating intuitive user experiences that delight and inspire. Pushing the boundaries of design with creativity and attention to detail."
          imageUrl="https://randomuser.me/api/portraits/women/2.jpg"
          socialLinks={{
            facebook: "#",
            instagram: "#",
            linkedin: "#",
          }}
        />
        <AboutContent
          name="Dhrumil Shah"
          title="Full-stack Developer"
          description="Passionate about creating intuitive user experiences that delight and inspire. Pushing the boundaries of design with creativity and attention to detail."
          imageUrl="https://randomuser.me/api/portraits/men/3.jpg"
          socialLinks={{
            facebook: "#",
            instagram: "#",
            linkedin: "#",
          }}
        />
        <AboutContent
          name="Tanmay Damle"
          title="Backend Designer"
          description="Passionate about creating intuitive user experiences that delight and inspire. Pushing the boundaries of design with creativity and attention to detail."
          imageUrl="https://randomuser.me/api/portraits/men/4.jpg"
          socialLinks={{
            facebook: "#",
            instagram: "#",
            linkedin: "#",
          }}
        />
        <AboutContent
          name="Jinal Barot"
          title="Backend Designer"
          description="Passionate about creating intuitive user experiences that delight and inspire. Pushing the boundaries of design with creativity and attention to detail."
          imageUrl="https://randomuser.me/api/portraits/women/5.jpg"
          socialLinks={{
            facebook: "#",
            instagram: "#",
            linkedin: "#",
          }}
        />
        <AboutContent
          name="Devansh Mehta"
          title="Frontend Developer"
          description="Passionate about creating intuitive user experiences that delight and inspire. Pushing the boundaries of design with creativity and attention to detail."
          imageUrl="https://randomuser.me/api/portraits/men/1.jpg"
          socialLinks={{
            facebook: "#",
            instagram: "#",
            linkedin: "#",
          }}
        />
        <AboutContent
          name="Smit Patel"
          title="Full-stack Developer"
          description="Passionate about creating intuitive user experiences that delight and inspire. Pushing the boundaries of design with creativity and attention to detail."
          imageUrl="https://randomuser.me/api/portraits/men/6.jpg"
          socialLinks={{
            facebook: "#",
            instagram: "#",
            linkedin: "#",
          }}
        />
      </div>
    </div>
  );
};

export default About;
