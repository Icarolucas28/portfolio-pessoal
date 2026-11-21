import {
  Boxes,
  Braces,
  CloudCog,
  Code2,
  Database,
  GitBranch,
  Globe2,
  Network,
  Palette,
  ServerCog,
  TerminalSquare,
  Cpu,
  type LucideIcon,
} from "lucide-react";

export type Skill = {
  name: string;
  description: string;
  icon: LucideIcon;
};

export type SkillGroup = {
  title: string;
  skills: Skill[];
};

export const profile = {
  name: "Ícaro Lucas Silva de Oliveira",
  role: "Estudante de Engenharia de Computação",
  specialty: "Desenvolvedor Front-end",
  tagline:
    "Transformando ideias em experiências digitais por meio da tecnologia e da criatividade.",
  email: "icarolucas28@gmail.com",
  github: "https://github.com/Icarolucas28",
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Desenvolvimento Front-end",
    skills: [
      { name: "HTML", description: "Estruturação semântica", icon: Globe2 },
      { name: "CSS", description: "Interfaces responsivas", icon: Palette },
      { name: "JavaScript", description: "Interatividade web", icon: Braces },
      { name: "React", description: "Componentização", icon: Boxes },
      { name: "Next.js", description: "Aplicações React", icon: Code2 },
    ],
  },
  {
    title: "Programação",
    skills: [
      { name: "Lógica", description: "Raciocínio e algoritmos", icon: Cpu },
      { name: "Terminal", description: "Uso de linha de comando", icon: TerminalSquare },
    ],
  },
  {
    title: "Redes de computadores",
    skills: [
      { name: "Infraestrutura", description: "Fundamentos de redes", icon: Network },
      { name: "Configuração", description: "Dispositivos e conectividade", icon: ServerCog },
      { name: "Comunicação", description: "Conceitos de conectividade", icon: CloudCog },
    ],
  },
  {
    title: "Banco de dados",
    skills: [
      { name: "MySQL", description: "Banco de dados relacional", icon: Database },
      { name: "Modelagem", description: "Estruturação de dados", icon: Boxes },
      { name: "SQL", description: "Consultas e organização", icon: Braces },
    ],
  },
  {
    title: "Ferramentas",
    skills: [
      { name: "Git", description: "Controle de versão", icon: GitBranch },
      { name: "GitHub", description: "Colaboração e projetos", icon: Code2 },
      { name: "VS Code", description: "Ambiente de desenvolvimento", icon: TerminalSquare },
      { name: "MySQL Workbench", description: "Design e consultas", icon: Database },
    ],
  },
];

export const education = [
  {
    title: "Engenharia de Computação",
    institution: "Universidade Ceuma",
    status: "Graduação em andamento",
  },
  {
    title: "Técnico em Redes de Computadores",
    institution: "SENAI",
    status: "Formação técnica",
  },
];

export const experiences = [
  {
    title: "Liga Acadêmica de Inteligência Artificial",
    organization: "LIA",
    role: "Secretário da diretoria",
    description:
      "Organização e planejamento das atividades da liga, acompanhamento dos grupos de projetos, controle de presença e desenvolvimento de iniciativas relacionadas à inteligência artificial.",
  },
  {
    title: "FIRST LEGO League",
    organization: "FLL",
    role: "Participante em torneios de robótica",
    description:
      "Participação em competições nos anos de 2021, 2022 e 2023, com projetos de inovação e pesquisa, trabalho em equipe, design e construção de robôs.",
    highlight: "Campeão em Design de Robô — 2022",
  },
];

export const hobbies = [
  ["Tecnologia e inovação", "Acompanhar novidades e tendências"],
  ["Robótica", "Projetos e resolução de desafios"],
  ["Inteligência artificial", "Estudo e aplicações"],
  ["Desenvolvimento", "Construção de soluções"],
  ["Programação", "Aprendizado prático"],
  ["Aprendizado contínuo", "Explorar novas tecnologias"],
] as const;
