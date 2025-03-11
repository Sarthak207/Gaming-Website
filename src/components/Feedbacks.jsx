import React, { useState } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { testimonials } from "../constants";

const FeedbackCard = ({ index, testimonial, name, game, rating, image }) => (
  <motion.div
    variants={fadeIn("", "spring", index * 0.5, 0.75)}
    className="bg-[#1A1A1D] p-8 rounded-3xl xs:w-[320px] w-full shadow-lg border-2 border-[#FFD700]"
  >
    <p className="text-[#FFD700] font-extrabold text-[48px]">"</p>

    <div className="mt-1">
      <p className="text-white tracking-wider text-[18px]">{testimonial}</p>

      <div className="mt-5 flex justify-between items-center gap-1">
        <div className="flex-1 flex flex-col">
          <p className="text-white font-medium text-[16px]">
            <span className="text-[#FF3131]">@</span> {name}
          </p>
          <p className="mt-1 text-gray-400 text-[14px]">
            Rated <span className="text-[#FFD700]">{rating}⭐</span> for{" "}
            <span className="text-[#00C9A7]">{game}</span>
          </p>
        </div>

        <img
          src={image}
          alt={`feedback_by-${name}`}
          className="w-12 h-12 rounded-full object-cover border-2 border-[#FFD700]"
        />
      </div>
    </div>
  </motion.div>
);

const FeedbackForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    game: "",
    rating: "",
    feedback: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.game && formData.rating && formData.feedback) {
      onSubmit(formData);
      setFormData({ name: "", game: "", rating: "", feedback: "" });
    }
  };

  return (
    <motion.div
      variants={fadeIn("", "spring", 0.5, 0.75)}
      className="bg-[#1A1A1D] p-8 rounded-3xl w-full max-w-[400px] mx-auto shadow-lg border-2 border-[#FFD700] text-white"
    >
      <h3 className="text-[#FFD700] text-xl font-bold mb-4">Share Your Feedback</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="p-2 rounded-lg bg-black text-white border border-[#FFD700] focus:outline-none"
          required
        />
        <input
          type="text"
          name="game"
          placeholder="Favorite Game"
          value={formData.game}
          onChange={handleChange}
          className="p-2 rounded-lg bg-black text-white border border-[#FFD700] focus:outline-none"
          required
        />
        <select
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          className="p-2 rounded-lg bg-black text-white border border-[#FFD700] focus:outline-none"
          required
        >
          <option value="">Rate the Game</option>
          <option value="1">1⭐</option>
          <option value="2">2⭐</option>
          <option value="3">3⭐</option>
          <option value="4">4⭐</option>
          <option value="5">5⭐</option>
        </select>
        <textarea
          name="feedback"
          placeholder="Your feedback..."
          value={formData.feedback}
          onChange={handleChange}
          className="p-2 rounded-lg bg-black text-white border border-[#FFD700] focus:outline-none h-24"
          required
        ></textarea>
        <button
          type="submit"
          className="bg-[#FF3131] hover:bg-[#FFD700] text-white font-bold p-2 rounded-lg transition-all"
        >
          Submit Feedback
        </button>
      </form>
    </motion.div>
  );
};

const Feedbacks = () => {
  const [feedbackList, setFeedbackList] = useState(testimonials);

  const addFeedback = (newFeedback) => {
    setFeedbackList([
      ...feedbackList,
      {
        ...newFeedback,
        image: "https://via.placeholder.com/50", // Default avatar
      },
    ]);
  };

  return (
    <div className="mt-4 bg-[#000000] rounded-[10px] p-3">
      <div className={`bg-[#1A1A1D] rounded-2xl ${styles.padding} min-h-[100px]`}>
        <motion.div variants={textVariant()}>
          <p className={`${styles.sectionSubText} text-[#FFD700]`}>Player Voices</p>
          <h2 className={`${styles.sectionHeadText} text-[#FF3131]`}>Feedback form</h2>
        </motion.div>
      </div>

      {/* Feedback Form */}
      <div className="mt-10 flex justify-center">
        <FeedbackForm onSubmit={addFeedback} />
      </div>

      {/* Display Feedbacks */}
      <div className="mt-16 pb-14 flex flex-wrap gap-7 justify-center">
        {feedbackList.map((testimonial, index) => (
          <FeedbackCard key={index} index={index} {...testimonial} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Feedbacks, "feedback");
