import React from "react";
import Tilt from "react-tilt";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const ServiceCard = ({ index, title, icon }) => (
  <Tilt className="xs:w-[250px] w-full">
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className="w-full border-4 border-[#FFD700] p-[1px] rounded-[20px] shadow-card bg-[#1A1A1D] flex justify-center items-center"
    >
      <div
        options={{
          max: 45,
          scale: 1.05,
          speed: 450,
        }}
        className="bg-[#FFD700] rounded-[20px] py-5 px-12 min-h-[280px] flex justify-center items-center flex-col hover:scale-105 transition-transform duration-300"
      >
        <img
          src={icon}
          alt={title}
          className="w-16 h-16 object-contain hover:scale-110 transition-transform duration-300"
        />
        <h3 className="text-[#FF3131] text-[20px] font-bold text-center font-extrabold uppercase">
          {title}
        </h3>
      </div>
    </motion.div>
  </Tilt>
);

const About = () => {
  return (
    <div className="flex flex-col items-center text-center">
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-[#FFD700] font-bold uppercase`}>
          Welcome to the Arena! 🎮🔥
        </p>
        <h2 className={`${styles.sectionHeadText} text-[#FF3131] font-extrabold`}>
          About <span className="text-[#FFD700]">GameVerse</span>
        </h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-white text-[18px] max-w-3xl leading-[30px] font-medium"
      >
        GameVerse is the **ultimate battleground** for gamers, where you can experience 
        **next-gen graphics, heart-pounding action, and legendary battles**. 
        Whether you’re a warrior in RPGs, a sharpshooter in FPS, or a strategist in MOBAs, 
        **GameVerse is your gateway to gaming supremacy!**
      </motion.p>

      {/* Game Features Section */}
      <div className="mt-20 flex flex-wrap gap-10 justify-center">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(About, "about");
