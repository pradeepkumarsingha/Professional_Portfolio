import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaEye,
  FaLanguage,
  FaRobot,
  FaBrain,
  FaLink
} from "react-icons/fa";

import {
  SiMongodb,
  SiExpress,
  SiTailwindcss,
  SiJavascript,
  SiMysql,
  SiFastapi,
  SiScikitlearn,
  SiTensorflow,
  SiPandas,
  SiNumpy,
  SiKeras
} from "react-icons/si";

export const skills = {
  web: [
    {
      name: "React",
      level: 85,
      icon: FaReact,
      color: "#61DAFB"
    },
    {
      name: "JavaScript",
      level: 82,
      icon: SiJavascript,
      color: "#F7DF1E"
    },
    {
      name: "Tailwind CSS",
      level: 85,
      icon: SiTailwindcss,
      color: "#06B6D4"
    },
    {
      name: "Node.js",
      level: 78,
      icon: FaNodeJs,
      color: "#339933"
    },
    {
      name: "Express.js",
      level: 75,
      icon: SiExpress,
      color: "#FFFFFF"
    },
    {
      name: "MongoDB",
      level: 75,
      icon: SiMongodb,
      color: "#47A248"
    },
    {
      name: "MySQL",
      level: 72,
      icon: SiMysql,
      color: "#4479A1"
    },
    {
      name: "RESTful APIs",
      level: 82,
      icon: FaNodeJs,
      color: "#339933"
    },
    {
      name: "FastAPI",
      level: 75,
      icon: SiFastapi,
      color: "#009688"
    }
  ],

  ai: [
    {
      name: "Python",
      level: 85,
      icon: FaPython,
      color: "#3776AB"
    },
    {
      name: "Scikit-Learn",
      level: 80,
      icon: SiScikitlearn,
      color: "#F7931E"
    },
    {
      name: "TensorFlow",
      level: 72,
      icon: SiTensorflow,
      color: "#FF6F00"
    },
    {
      name: "Pandas",
      level: 82,
      icon: SiPandas,
      color: "#150458"
    },
    {
      name: "NumPy",
      level: 82,
      icon: SiNumpy,
      color: "#013243"
    },
    {
      name: "Keras",
      level: 72,
      icon: SiKeras,
      color: "#D00000"
    },
    {
      name: "Computer Vision",
      level: 75,
      icon: FaEye,
      color: "#5C6BC0"
    },
    {
      name: "Natural Language Processing",
      level: 78,
      icon: FaLanguage,
      color: "#7E57C2"
    },
    {
      name: "Generative AI",
      level: 80,
      icon: FaRobot,
      color: "#FF6F00"
    },
    {
      name: "LangChain",
      level: 75,
      icon: FaLink,
      color: "#1C9A72"
    },
    {
      name: "LLMs",
      level: 80,
      icon: FaBrain,
      color: "#8E44AD"
    }
  ]
};