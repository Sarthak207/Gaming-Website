import { motion } from "framer-motion";
import { styles } from "../styles";

const Hero = () => {
  return (
    <section className="relative w-full h-screen flex items-center justify-center">
      {/* Blurred Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('src/assets/tech/contrabg2.jpeg')",
          filter: "blur(4px)", // Apply blur ONLY to he background'
          backgroundPosition:"uppermost",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Hero Content - Stays Sharp */}
      <div className="relative z-10 text-center">
        <h1 className={`${styles.heroHeadText} text-[#FF3131] font-bold uppercase`}>
          Welcome, <span className="text-[#FFD700]">Elite Soldier! 🔥</span>
        </h1>
        <p className={`${styles.heroSubText} mt-2 text-white`}>
          Lock & Load! The battlefield awaits. 💀💥
        </p>
      </div>
    </section>
  );
};

export default Hero;
