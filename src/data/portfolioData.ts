export interface SkillItem {
  id: string;
  index: string;
  name: string;
  category: 'languages' | 'development' | 'security';
  categoryLabel: string;
  summary: string;
  focusAreas: string[];
}

export interface ProjectDetail {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  audience: string;
  overview: string;
  problem: string;
  solution: string;
  features: {
    index: string;
    title: string;
    description: string;
  }[];
  technologies: string[];
}

export interface ProfilePost {
  id: string;
  pinned?: boolean;
  timestamp: string;
  category: string;
  title: string;
  body: string;
  hasProjectLink?: boolean;
  initialLikes: number;
  initialComments: { id: string; author: string; text: string; time: string }[];
}

export const PROFILE = {
  name: 'Sudipta Halder',
  institute: 'Gono Biswabidyalay',
  department: 'Computer Science and Engineering',
  batch: 'Batch 38',
  interest: 'Cyber Security',
  email: 'sudiptahaldersh2020@gmail.com',
  phone: '+8801621013810',
  linkedin:
    'https://www.linkedin.com/in/sudipta-halder-34760b307?utm_source=share_via&utm_content=profile&utm_medium=member_android',
  linkedinLabel: 'linkedin.com/in/sudipta-halder-34760b307',
  github: 'https://github.com/Sudipta108',
  githubLabel: 'github.com/Sudipta108',
  qrCodeUrl: '/assets/aistudio/My_QR_89c37265.png',
  photoUrl: '/assets/aistudio/WhatsApp_Image_2026-10-29_at_9.49.39_PM_e745d60d.jpeg',
  headlineBio:
    'Undergraduate in CSE (Batch 38) at Gono Biswabidyalay · Building practical apps & exploring Cyber Security.',
};

export const SKILLS: SkillItem[] = [
  {
    id: 'c-prog',
    index: '01',
    name: 'C Programming',
    category: 'languages',
    categoryLabel: 'Systems Language',
    summary:
      'Strong foundation in procedural programming, memory allocation, pointers, file handling, and low-level system concepts.',
    focusAreas: ['Pointers & Memory', 'Modular Functions', 'File I/O'],
  },
  {
    id: 'cpp',
    index: '02',
    name: 'C++',
    category: 'languages',
    categoryLabel: 'Object-Oriented & STL',
    summary:
      'Applying object-oriented design principles, Standard Template Library containers, and efficient algorithmic problem solving.',
    focusAreas: ['OOP Architecture', 'STL Containers', 'Competitive Logic'],
  },
  {
    id: 'dsa',
    index: '03',
    name: 'Data Structures',
    category: 'languages',
    categoryLabel: 'Core CS Foundations',
    summary:
      'Designing and analyzing core structures—arrays, linked lists, stacks, queues, trees, and graphs—for optimal time and space complexity.',
    focusAreas: ['Trees & Graphs', 'Stacks & Queues', 'Complexity Analysis'],
  },
  {
    id: 'algorithm',
    index: '04',
    name: 'Algorithm',
    category: 'languages',
    categoryLabel: 'Problem Solving',
    summary:
      'Designing and analyzing efficient algorithms across sorting, searching, greedy techniques, dynamic programming, and graph traversal.',
    focusAreas: ['Sorting & Searching', 'Graph Traversal', 'Dynamic Programming'],
  },
  {
    id: 'python',
    index: '05',
    name: 'Python',
    category: 'languages',
    categoryLabel: 'Scripting & Automation',
    summary:
      'Writing clean, readable scripts for data processing, workflow automation, and foundational cybersecurity analysis tasks.',
    focusAreas: ['Task Automation', 'Clean Scripting', 'Security Utilities'],
  },
  {
    id: 'app-dev',
    index: '06',
    name: 'App Development',
    category: 'development',
    categoryLabel: 'Product Engineering',
    summary:
      'Building practical, student-focused applications from scratch—starting with the class routine app tailored for CSE Batch 38.',
    focusAreas: ['UI/UX Structure', 'State & Schedules', 'Utility Apps'],
  },
  {
    id: 'cyber-security',
    index: '07',
    name: 'Cyber Security',
    category: 'security',
    categoryLabel: 'Primary Interest',
    summary:
      'Exploring network security, system hardening, vulnerability assessment, and writing defensive, security-conscious code.',
    focusAreas: ['Network Defense', 'Secure Coding', 'Threat Awareness'],
  },
];

export const PROJECTS: ProjectDetail[] = [
  {
    id: 'batch-38-routine-app',
    title: 'CSE Batch 38 Class Routine App',
    subtitle: 'Academic Schedule Utility for Gono Biswabidyalay',
    category: 'App Development',
    audience: 'Gono Biswabidyalay · CSE Batch 38',
    overview:
      'A dedicated class routine application built specifically for students of Computer Science and Engineering (Batch 38) at Gono Biswabidyalay to organize weekly lectures, lab sessions, course codes, and room assignments in one reliable place.',
    problem:
      'Students previously had to search through large timetable PDFs or scroll past dozens of messages in group chats to check morning class timings, room numbers, and lab schedules.',
    solution:
      'Designed a focused, lightweight app centered around daily class lookup—grouping courses by academic weekday, separating theory lectures from lab hours, and presenting course metadata clearly without clutter.',
    features: [
      {
        index: '01',
        title: 'Day-by-Day Academic View',
        description:
          'Organizes classes across the university week so Batch 38 classmates can immediately check what is scheduled for today or tomorrow.',
      },
      {
        index: '02',
        title: 'Lecture & Lab Distinction',
        description:
          'Clearly separates theory classes from lab sessions along with exact start/end times, course codes, and classroom or lab locations.',
      },
      {
        index: '03',
        title: 'Fast Course & Room Lookup',
        description:
          'Structured data organization allows quick filtering by course name, course code, or room number when schedules change.',
      },
      {
        index: '04',
        title: 'Student-First Usability',
        description:
          'Clean, distraction-free interface optimized for quick morning checks on phones before heading to campus.',
      },
    ],
    technologies: [
      'App Development',
      'Data Structures',
      'UI Architecture',
      'Schedule Modeling',
    ],
  },
];

export const INITIAL_POSTS: ProfilePost[] = [
  {
    id: 'post-routine-app',
    pinned: true,
    timestamp: 'Pinned Project',
    category: 'App Development · CSE Batch 38',
    title: 'Built a Class Routine App for Gono Biswabidyalay CSE Batch 38',
    body: 'Checking class timings and room numbers through scattered screenshots every morning was slowing our batch down. I created a dedicated class routine app for CSE Batch 38 so classmates can check daily lectures, lab sessions, and room assignments cleanly in one place.',
    hasProjectLink: true,
    initialLikes: 38,
    initialComments: [
      {
        id: 'c1',
        author: 'CSE Batch 38 Classmate',
        text: 'Super helpful before morning lectures — saves us from scrolling group chats.',
        time: '2d ago',
      },
    ],
  },
  {
    id: 'post-cyber-security',
    timestamp: 'Focus Area',
    category: 'Cyber Security · Learning Path',
    title: 'Exploring Cyber Security alongside Systems Programming',
    body: 'Understanding how memory, pointers, and data structures behave under the hood in C and C++ builds a strong foundation for Cyber Security. Alongside Python scripting for automation, I am actively studying network fundamentals, defensive architecture, and secure coding principles.',
    initialLikes: 24,
    initialComments: [],
  },
  {
    id: 'post-core-stack',
    timestamp: 'Technical Stack',
    category: 'C · C++ · Data Structures · Algorithm · Python',
    title: 'Core Computer Science & Engineering Foundations',
    body: 'Currently sharpening problem-solving skills in C, C++, Data Structures, and Algorithms at Gono Biswabidyalay while building practical utilities with Python and App Development.',
    initialLikes: 19,
    initialComments: [],
  },
];
