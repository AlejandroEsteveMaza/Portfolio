import type { Lang } from './config';

const PROJECT_LINKS = Object.freeze({
  gymtimerpro: Object.freeze({
    previewUrl: 'https://apps.apple.com/es/app/gym-timer-pro/id6757653183',
    previewKind: 'appStore' as const,
    repoUrl: 'https://github.com/AlejandroEsteveMaza/GymTimerPro',
  }),
});

interface ResumePosition {
  role: string;
  period: string;
}

interface ResumeItem {
  period: string;
  role: string;
  company: string;
  description: string;
  positions?: ResumePosition[];
}

interface ProjectItem {
  title: string;
  description: string;
  tech: string[];
  image: string;
  imageAlt: string;
  previewUrl?: string;
  previewKind?: string;
  repoUrl?: string;
}

interface SiteData {
  showProjects: boolean;
  showContact: boolean;
  resume: { items: ResumeItem[] };
  projects: { items: ProjectItem[] };
}

const siteData: Record<Lang, SiteData> = {
  es: {
    showProjects: true,
    showContact: false,
    projects: {
      items: [
        {
          title: 'GymTimerPro',
          description:
            'App para temporizadores de entrenamiento, con bloques de trabajo y descanso configurables.',
          tech: ['Swift'],
          image: '/images/Projects/GymTimerPro.png',
          imageAlt: 'Preview de GymTimerPro',
          ...PROJECT_LINKS.gymtimerpro,
        },
      ],
    },
    resume: {
      items: [
        {
          period: '2025 - Actualmente',
          role: 'Project Manager & Product Engineer',
          company: 'ED AVIATION',
          description:
            'Coordinacion de roadmap de producto, planificacion de entregas y alineacion tecnica con objetivos de negocio.',
        },
        {
          period: '2022 - 2025',
          role: 'Full-Stack Developer AWS',
          company: 'VIEWNEXT',
          description:
            'Evolucion tecnica en plataforma AWS con foco en calidad de arquitectura, entrega continua y acompanamiento al equipo.',
          positions: [
            { role: 'Lider Tecnico Backend AWS', period: '2024 - 2025' },
            { role: 'Analista Desarrollador AWS', period: '2022 - 2024' },
          ],
        },
        {
          period: '2020 - 2022',
          role: 'Full-Stack Developer .NET',
          company: 'AYDAI',
          description:
            'Desarrollo full-stack con stack .NET, integraciones de APIs y mejoras continuas de rendimiento en aplicaciones internas.',
        },
        {
          period: '2018',
          role: 'Front-End Developer',
          company: 'Fourvenues',
          description:
            'Construccion de interfaces frontend, componentes reutilizables y mejoras de experiencia de usuario en producto web.',
        },
      ],
    },
  },
  en: {
    showProjects: true,
    showContact: false,
    projects: {
      items: [
        {
          title: 'GymTimerPro',
          description:
            'App for workout timers, with configurable work and rest blocks.',
          tech: ['Swift'],
          image: '/images/Projects/GymTimerPro.png',
          imageAlt: 'GymTimerPro preview',
          ...PROJECT_LINKS.gymtimerpro,
        },
      ],
    },
    resume: {
      items: [
        {
          period: '2025 - Present',
          role: 'Project Manager & Product Engineer',
          company: 'ED AVIATION',
          description:
            'Product roadmap coordination, delivery planning and technical alignment with business goals.',
        },
        {
          period: '2022 - 2025',
          role: 'Full-Stack Developer AWS',
          company: 'VIEWNEXT',
          description:
            'Technical evolution on AWS platform focused on architecture quality, continuous delivery and team mentoring.',
          positions: [
            { role: 'Backend Tech Lead AWS', period: '2024 - 2025' },
            { role: 'AWS Developer Analyst', period: '2022 - 2024' },
          ],
        },
        {
          period: '2020 - 2022',
          role: 'Full-Stack Developer .NET',
          company: 'AYDAI',
          description:
            'Full-stack development with .NET stack, API integrations and continuous performance improvements on internal applications.',
        },
        {
          period: '2018',
          role: 'Front-End Developer',
          company: 'Fourvenues',
          description:
            'Frontend interface development, reusable components and user experience improvements on web products.',
        },
      ],
    },
  },
};

export function getSiteData(lang: Lang): SiteData {
  return siteData[lang];
}
