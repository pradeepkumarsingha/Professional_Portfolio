import { FaReact, FaNodeJs, FaPython } from 'react-icons/fa';
import { SiMongodb, SiExpress, SiTailwindcss, SiJavascript, SiScikitlearn, SiTensorflow } from 'react-icons/si';

export const skills = {
  web: [
    { name: "React", level: 85, icon: FaReact, color: "#61DAFB" },
    { name: "JavaScript", level: 80, icon: SiJavascript, color: "#F7DF1E" },
    { name: "Tailwind CSS", level: 85, icon: SiTailwindcss, color: "#06B6D4" },
    { name: "Node.js", level: 75, icon: FaNodeJs, color: "#339933" },
    { name: "Express", level: 70, icon: SiExpress, color: "#ffffff" },
    { name: "MongoDB", level: 75, icon: SiMongodb, color: "#47A248" },
    { name: "RESTful APIs", level: 80, icon: FaNodeJs, color: "#339933" },
    { name: "MySQL", level: 70, icon: SiMongodb ,color: "#339933" }

  ],
  ai: [
    { name: "Python", level: 80, icon: FaPython, color: "#3776AB" },
    { name: "Scikit-Learn", level: 75, icon: SiScikitlearn, color: "#F7931E" },
    { name: "TensorFlow", level: 70, icon: SiTensorflow, color: "#FF6F00" },
    { name: "Pandas", level: 80, icon: FaPython, color: "#150458" },
    { name: "NumPy", level: 78, icon: FaPython, color: "#013243" },
    { name: "Keras", level: 70, icon: SiTensorflow, color: "#D00000" },
    { name: "Computer Vision", level: 75, icon: SiTensorflow, color: "#FF6F00" },
    { name: "Natural Language Processing", level: 80, icon: SiScikitlearn, color: "#F7931E" },
    {name:"GEN AI", level: 80, icon: SiTensorflow, color: "#FF6F00"}

  ]
}