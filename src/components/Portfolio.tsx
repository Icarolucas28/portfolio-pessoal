"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowUp,
  Award,
  BriefcaseBusiness,
  Check,
  Code2,
  Download,
  ExternalLink,
  GraduationCap,
  Heart,
  Mail,
  Menu,
  Moon,
  Send,
  Sun,
  UserRound,
  X,
  Zap,
} from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { education, experiences, hobbies, profile, skillGroups } from "@/data/portfolio";

const navItems = [
  ["Início", "inicio"],
  ["Sobre", "sobre"],
  ["Skills", "skills"],
  ["Projetos", "projetos"],
  ["Formação", "formacao"],
  ["Experiências", "experiencias"],
  ["Certificados", "certificados"],
  ["Hobbies", "hobbies"],
  ["Contato", "contato"],
] as const;

function SectionTitle({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <motion.div
      className="section-heading"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
    >
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </motion.div>
  );
}

export default function Portfolio() {
  const reduceMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [activeSection, setActiveSection] = useState("inicio");
  const [progress, setProgress] = useState(0);
  const [formStatus, setFormStatus] = useState<"idle" | "ready">("idle");

  useEffect(() => {
    const onScroll = () => {
      const top = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? (top / height) * 100 : 0);

      let current = "inicio";
      navItems.forEach(([, id]) => {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= 180) current = id;
      });
      setActiveSection(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    setMenuOpen(false);
  };

  const submitContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const subject = String(data.get("subject") || "");
    const message = String(data.get("message") || "");
    const body = `Nome: ${name}\nE-mail: ${email}\n\n${message}`;
    setFormStatus("ready");
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <>
      <div className="scroll-progress" style={{ width: `${progress}%` }} />
      <header className="navbar">
        <button className="brand" onClick={() => scrollTo("inicio")} aria-label="Voltar ao início">
          <span className="brand-mark">IL</span>
          <span>Ícaro Lucas</span>
        </button>

        <nav className="nav-links" aria-label="Navegação principal">
          {navItems.map(([label, id]) => (
            <button
              key={id}
              className={activeSection === id ? "active" : ""}
              onClick={() => scrollTo(id)}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="nav-actions">
          <button
            className="icon-button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Alternar tema"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className="nav-cta" onClick={() => scrollTo("contato")}>Contato</button>
          <button
            className="icon-button menu-button"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div className="mobile-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button className="mobile-close" onClick={() => setMenuOpen(false)} aria-label="Fechar menu">
              <X />
            </button>
            {navItems.map(([label, id]) => (
              <button key={id} onClick={() => scrollTo(id)}>{label}</button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <section id="inicio" className="hero section">
          <div className="hero-grid" />
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.7 }}
          >
            <div className="status-pill"><span /> Disponível para conexões</div>
            <p className="hero-kicker">Olá, eu sou</p>
            <h1>
              <span>Ícaro Lucas</span>
              <strong>Silva de Oliveira</strong>
            </h1>
            <p className="hero-role">
              {profile.role} <b>|</b> <span>{profile.specialty}</span>
            </p>
            <p className="hero-tagline">{profile.tagline}</p>
            <div className="hero-buttons">
              <button className="primary-button" onClick={() => scrollTo("projetos")}>
                Conheça meus projetos <ArrowDown size={17} />
              </button>
              <a className="secondary-button" href="/curriculo.pdf" download>
                <Download size={17} /> Baixar currículo
              </a>
            </div>
          </motion.div>

          <motion.div
            className="portrait-stage"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.8, delay: 0.15 }}
            aria-label="Retrato pessoal não fornecido"
          >
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="portrait-frame">
              <div className="portrait-monogram">
                <span>IL</span>
                <small>Futuro & tecnologia</small>
              </div>
            </div>
            <div className="tech-node node-one"><Zap size={16} /></div>
            <div className="tech-node node-two"><CpuIcon /></div>
            <div className="tech-node node-three"><CodeIcon /></div>
          </motion.div>

          <button className="scroll-cue" onClick={() => scrollTo("sobre")} aria-label="Rolar para sobre mim">
            <span>Explore</span><ArrowDown size={16} />
          </button>
        </section>

        <section id="sobre" className="section">
          <div className="container">
            <SectionTitle eyebrow="01 / Quem sou" title="Sobre mim" />
            <div className="about-grid">
              <motion.div className="about-visual" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <div className="about-card">
                  <div className="portrait-monogram small"><span>IL</span></div>
                  <div className="about-badge"><UserRound size={16} /> Perfil acadêmico</div>
                </div>
              </motion.div>
              <motion.div className="about-copy" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <p>
                  Sou estudante de Engenharia de Computação na Universidade Ceuma e possuo formação técnica
                  em Redes de Computadores pelo SENAI.
                </p>
                <p>
                  Tenho interesse em desenvolvimento de software, desenvolvimento Front-end, inteligência
                  artificial, robótica e inovação. Durante minha trajetória acadêmica, participei de projetos
                  e atividades relacionadas à tecnologia, competições de robótica e iniciativas acadêmicas.
                </p>
                <p>
                  Também participo da organização da Liga Acadêmica de Inteligência Artificial (LIA). Meu
                  objetivo é aprimorar continuamente meus conhecimentos e desenvolver soluções que contribuam
                  para minha evolução acadêmica e profissional.
                </p>
                <div className="about-facts">
                  <div><GraduationCap /><span><b>Engenharia</b><small>Universidade Ceuma</small></span></div>
                  <div><NetworkIcon /><span><b>Redes</b><small>Formação pelo SENAI</small></span></div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="skills" className="section">
          <div className="container">
            <SectionTitle eyebrow="02 / Conhecimentos" title="Skills & Tecnologias" subtitle="Ferramentas e áreas que estudo e utilizo na minha formação." />
            <div className="skills-grid">
              {skillGroups.map((group, groupIndex) => (
                <motion.article
                  className="skill-group"
                  key={group.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: reduceMotion ? 0 : groupIndex * 0.06 }}
                >
                  <h3>{group.title}</h3>
                  <div className="skill-list">
                    {group.skills.map((skill) => {
                      const Icon = skill.icon;
                      return (
                        <div className="skill-card" key={skill.name}>
                          <div className="skill-icon"><Icon size={21} /></div>
                          <div><b>{skill.name}</b><small>{skill.description}</small></div>
                        </div>
                      );
                    })}
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="projetos" className="section">
          <div className="container">
            <SectionTitle eyebrow="03 / Portfólio" title="Projetos" subtitle="Uma seleção dos meus trabalhos será apresentada aqui." />
            <div className="empty-state">
              <div className="empty-icon"><BriefcaseBusiness /></div>
              <h3>Projetos em atualização</h3>
              <p>Nenhum projeto concluído está cadastrado no momento. Novos trabalhos serão adicionados com imagens, descrição e links válidos.</p>
              <button className="secondary-button" onClick={() => scrollTo("contato")}>Conversar sobre uma ideia</button>
            </div>
          </div>
        </section>

        <section id="formacao" className="section">
          <div className="container">
            <SectionTitle eyebrow="04 / Caminho acadêmico" title="Formação" />
            <div className="timeline">
              {education.map((item, index) => (
                <motion.article
                  className="timeline-item"
                  key={item.title}
                  initial={{ opacity: 0, x: index % 2 ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="timeline-marker"><GraduationCap /></div>
                  <div className="timeline-card">
                    <span>{index === 0 ? "Atual" : "Concluída"}</span>
                    <h3>{item.title}</h3>
                    <p>{item.institution}</p>
                    <small>{item.status}</small>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="experiencias" className="section">
          <div className="container">
            <SectionTitle eyebrow="05 / Participações" title="Experiências acadêmicas" />
            <div className="experience-grid">
              {experiences.map((experience, index) => (
                <motion.article
                  className="experience-card"
                  key={experience.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: reduceMotion ? 0 : index * 0.1 }}
                >
                  <div className="experience-head">
                    <div className="experience-logo">{index === 0 ? "LIA" : "FLL"}</div>
                    <div><small>{experience.organization}</small><h3>{experience.title}</h3></div>
                  </div>
                  <p className="experience-role">{experience.role}</p>
                  <p>{experience.description}</p>
                  {"highlight" in experience && experience.highlight && (
                    <div className="achievement"><Award size={17} /> {experience.highlight}</div>
                  )}
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="certificados" className="section">
          <div className="container">
            <SectionTitle eyebrow="06 / Reconhecimentos" title="Certificados" subtitle="Certificados e conquistas serão exibidos quando disponíveis." />
            <div className="empty-state compact">
              <div className="empty-icon"><Award /></div>
              <h3>Espaço reservado</h3>
              <p>Esta galeria está preparada para receber certificados verificados, incluindo instituição, data e link de validação.</p>
            </div>
          </div>
        </section>

        <section id="hobbies" className="section">
          <div className="container">
            <SectionTitle eyebrow="07 / Além do código" title="Hobbies & Interesses" />
            <div className="hobby-grid">
              {hobbies.map(([title, description], index) => (
                <motion.article
                  key={title}
                  className="hobby-card"
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: reduceMotion ? 0 : index * 0.05 }}
                >
                  <div className="hobby-icon"><Heart size={20} /></div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="contato" className="section contact-section">
          <div className="container contact-grid">
            <motion.div className="contact-copy" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <SectionTitle eyebrow="08 / Contato" title="Vamos construir algo juntos?" subtitle="Estou aberto a novas oportunidades, conexões, projetos e experiências que contribuam para meu desenvolvimento pessoal e profissional." />
              <div className="contact-links">
                <a href={`mailto:${profile.email}`}><Mail /><span><small>E-mail</small>{profile.email}</span></a>
                <a href={profile.github} target="_blank" rel="noreferrer"><Code2 /><span><small>GitHub</small>Icarolucas28</span><ExternalLink /></a>
                <div><BriefcaseBusiness /><span><small>LinkedIn</small>Adicionar perfil profissional</span></div>
              </div>
            </motion.div>

            <motion.form
              className="contact-form"
              onSubmit={submitContact}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="form-row">
                <label>Nome<input name="name" required minLength={2} placeholder="Seu nome" /></label>
                <label>E-mail<input name="email" type="email" required placeholder="voce@email.com" /></label>
              </div>
              <label>Assunto<input name="subject" required minLength={3} placeholder="Sobre o que queremos conversar?" /></label>
              <label>Mensagem<textarea name="message" required minLength={10} rows={5} placeholder="Conte um pouco sobre sua ideia..." /></label>
              {formStatus === "ready" && <p className="form-feedback"><Check size={16} /> Seu aplicativo de e-mail será aberto para concluir o envio.</p>}
              <button className="primary-button" type="submit"><Send size={17} /> Enviar mensagem</button>
            </motion.form>
          </div>
        </section>
      </main>

      <footer>
        <div className="container footer-inner">
          <button className="brand" onClick={() => scrollTo("inicio")}><span className="brand-mark">IL</span><span>Ícaro Lucas</span></button>
          <p>© 2026 Ícaro Lucas Silva de Oliveira</p>
          <div className="footer-social">
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Code2 size={18} /></a>
            <a href={`mailto:${profile.email}`} aria-label="E-mail"><Mail size={18} /></a>
            <button onClick={() => scrollTo("inicio")} aria-label="Voltar ao topo"><ArrowUp size={18} /></button>
          </div>
        </div>
      </footer>
    </>
  );
}

function CpuIcon() {
  return <Zap size={16} />;
}

function CodeIcon() {
  return <span className="code-symbol">&lt;/&gt;</span>;
}

function NetworkIcon() {
  return <Zap size={20} />;
}
