export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  year: string;
  image: string;
  category: string;
  glow: string;
  credential: string;
  skills: string[];
}

export const certificates: Certificate[] = [
  {
    id: "matlab-001",
    title: "MATLAB Onramp",
    issuer: "MathWorks",
    year: "2026",
    image: "/certificates/matlab-onramp.jpg",
    category: "Programming",
    glow: "blue",
    credential: "#MATLAB-001",
    skills: ["Signal Processing", "Data Visualization", "Algorithm Development"]
  },
  {
    id: "iitb-002",
    title: "C Training",
    issuer: "IIT Bombay",
    year: "2025",
    image: "/certificates/c-training-iitb.jpg",
    category: "Programming",
    glow: "orange",
    credential: "#IITB-002",
    skills: ["Embedded Systems", "Memory Management", "Low-level Programming"]
  },
  {
    id: "udemy-003",
    title: "Complete Python Developer",
    issuer: "Udemy",
    year: "2026",
    image: "/certificates/python-udemy.jpg",
    category: "Python",
    glow: "purple",
    credential: "#UDEMY-003",
    skills: ["Automation", "Machine Learning", "Web Scraping", "Backend Dev"]
  }
];
