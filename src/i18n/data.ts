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
    showContact: true,
    projects: {
      items: [
        {
          title: 'GymTimerPro',
          description:
            'Identifique una necesidad real, defini el flujo de producto, desarrolle la app en Swift y la publique en la App Store. Temporizadores de entrenamiento con bloques de trabajo y descanso configurables — de la idea al lanzamiento en produccion.',
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
            'Liderazgo del roadmap de producto y coordinacion entre negocio y equipo tecnico. Toma de decisiones de arquitectura, priorizacion de entregas y aplicacion de IA para optimizar procesos internos.',
        },
        {
          period: '2022 - 2025',
          role: 'Full-Stack Developer → Tech Lead AWS',
          company: 'VIEWNEXT',
          description:
            'Evolucione de desarrollador a lider tecnico del equipo backend. Meje la calidad de arquitectura en AWS, implante CI/CD y mentorize al equipo para reducir el tiempo de entrega y elevar los estandares tecnicos.',
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
            'Desarrollo full-stack de aplicaciones internas con .NET. Integre APIs externas y optimice rendimiento, reduciendo los tiempos de carga de los modulos criticos.',
        },
        {
          period: '2018',
          role: 'Front-End Developer',
          company: 'Fourvenues',
          description:
            'Desarrollo de interfaces para producto web B2B en el sector del ocio nocturno. Mejore la experiencia de usuario y construi componentes reutilizables que acelero el ciclo de desarrollo del equipo.',
        },
      ],
    },
  },
  en: {
    showProjects: true,
    showContact: true,
    projects: {
      items: [
        {
          title: 'GymTimerPro',
          description:
            'Identified a real need, defined the product flow, built the app in Swift and shipped it to the App Store. Workout timers with configurable work and rest blocks — from idea to production launch.',
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
            'Leading the product roadmap and bridging business and engineering teams. Making architecture decisions, prioritizing delivery, and applying AI to optimize internal processes.',
        },
        {
          period: '2022 - 2025',
          role: 'Full-Stack Developer → Tech Lead AWS',
          company: 'VIEWNEXT',
          description:
            'Grew from developer to backend tech lead. Improved AWS architecture quality, introduced CI/CD practices, and mentored the team to reduce delivery time and raise technical standards.',
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
            'Full-stack development of internal applications with .NET. Integrated external APIs and optimized performance, reducing load times on critical modules.',
        },
        {
          period: '2018',
          role: 'Front-End Developer',
          company: 'Fourvenues',
          description:
            'Built interfaces for a B2B web product in the nightlife industry. Improved UX and created reusable components that accelerated the team\'s development cycle.',
        },
      ],
    },
  },
};

export function getSiteData(lang: Lang): SiteData {
  return siteData[lang];
}
