import { lazy, Suspense, ComponentType } from 'react';
import { motion } from 'framer-motion';

// Loading fallback components with better UX
export const IconFallback = ({ className = "w-4 h-4" }: { className?: string }) => (
  <div className={`${className} bg-secondary-default/30 rounded animate-pulse`} />
);

export const ComponentFallback = ({ 
  className = "h-20", 
  children 
}: { 
  className?: string;
  children?: React.ReactNode;
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className={`${className} bg-gradient-to-br from-[#27272c]/50 to-[#2a2a30]/50 rounded animate-pulse flex items-center justify-center`}
  >
    {children || <div className="w-6 h-6 border-2 border-secondary-default/30 border-t-secondary-default rounded-full animate-spin" />}
  </motion.div>
);

export const CardFallback = ({ className = "h-64" }: { className?: string }) => (
  <div className={`${className} bg-gradient-to-br from-[#27272c]/50 to-[#2a2a30]/50 rounded-lg animate-pulse`}>
    <div className="p-6 space-y-4">
      <div className="h-4 bg-secondary-default/20 rounded w-3/4"></div>
      <div className="h-3 bg-secondary-default/20 rounded w-1/2"></div>
      <div className="h-3 bg-secondary-default/20 rounded w-2/3"></div>
    </div>
  </div>
);

// Lazy loaded components with optimized loading
export const LazyStats = lazy(() => import("@/components/Stats"));
export const LazySocials = lazy(() => import("@/components/Socials"));
export const LazyProjectModal = lazy(() => import("@/components/ProjectModal"));
export const LazyProjectsFilter = lazy(() => import("@/components/ProjectsFilter"));
export const LazySkillsFilter = lazy(() => import("@/components/SkillsFilter"));
export const LazyCertificationFilter = lazy(() => import("@/components/CertificationFilter"));
export const LazyGlobalSearch = lazy(() => import("@/components/GlobalSearch"));

// Lazy loaded form components
export const LazyFormSection = lazy(() => import("@/components/FormSection"));

// Lazy loaded timeline components
export const LazyCertificationTimeline = lazy(() => import("@/components/CertificationTimeline"));

// Lazy loaded lightbox
export const LazyLightbox = lazy(() => 
  import("yet-another-react-lightbox").then(mod => ({ default: mod.default }))
);

// Higher-order component for lazy loading with enhanced error boundary
export function withLazyLoading<T extends object>(
  Component: ComponentType<T>,
  fallback?: React.ReactNode
) {
  const LazyComponent = lazy(() => Promise.resolve({ default: Component }));
  
  return function LazyWrapper(props: T) {
    return (
      <Suspense 
        fallback={fallback || <ComponentFallback />}
      >
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}

// Optimized icon lazy loading with chunked imports
export const LazyIcons = {
  // Feather Icons (Fi)
  FiDownload: lazy(() => import("react-icons/fi").then(mod => ({ default: mod.FiDownload }))),
  FiCode: lazy(() => import("react-icons/fi").then(mod => ({ default: mod.FiCode }))),
  FiCloud: lazy(() => import("react-icons/fi").then(mod => ({ default: mod.FiCloud }))),
  FiZap: lazy(() => import("react-icons/fi").then(mod => ({ default: mod.FiZap }))),
  FiAward: lazy(() => import("react-icons/fi").then(mod => ({ default: mod.FiAward }))),
  FiCalendar: lazy(() => import("react-icons/fi").then(mod => ({ default: mod.FiCalendar }))),
  FiExternalLink: lazy(() => import("react-icons/fi").then(mod => ({ default: mod.FiExternalLink }))),
  FiSearch: lazy(() => import("react-icons/fi").then(mod => ({ default: mod.FiSearch }))),
  FiFilter: lazy(() => import("react-icons/fi").then(mod => ({ default: mod.FiFilter }))),
  FiX: lazy(() => import("react-icons/fi").then(mod => ({ default: mod.FiX }))),
  
  // Font Awesome Icons (Fa)
  FaRocket: lazy(() => import("react-icons/fa").then(mod => ({ default: mod.FaRocket }))),
  FaCode: lazy(() => import("react-icons/fa").then(mod => ({ default: mod.FaCode }))),
  FaCogs: lazy(() => import("react-icons/fa").then(mod => ({ default: mod.FaCogs }))),
  FaLaptopCode: lazy(() => import("react-icons/fa").then(mod => ({ default: mod.FaLaptopCode }))),
  FaGlobe: lazy(() => import("react-icons/fa").then(mod => ({ default: mod.FaGlobe }))),
  FaDatabase: lazy(() => import("react-icons/fa").then(mod => ({ default: mod.FaDatabase }))),
  FaCloud: lazy(() => import("react-icons/fa").then(mod => ({ default: mod.FaCloud }))),
  FaGithub: lazy(() => import("react-icons/fa").then(mod => ({ default: mod.FaGithub }))),
  FaLinkedinIn: lazy(() => import("react-icons/fa").then(mod => ({ default: mod.FaLinkedinIn }))),
  FaMedium: lazy(() => import("react-icons/fa").then(mod => ({ default: mod.FaMedium }))),
  FaStackOverflow: lazy(() => import("react-icons/fa").then(mod => ({ default: mod.FaStackOverflow }))),
  
  // Simple Icons (Si)
  SiReact: lazy(() => import("react-icons/si").then(mod => ({ default: mod.SiReact }))),
  SiDotnet: lazy(() => import("react-icons/si").then(mod => ({ default: mod.SiDotnet }))),
  SiTypescript: lazy(() => import("react-icons/si").then(mod => ({ default: mod.SiTypescript }))),
  SiNextdotjs: lazy(() => import("react-icons/si").then(mod => ({ default: mod.SiNextdotjs }))),
};

// Wrapper component for lazy icons with fallback
export const LazyIcon = ({ 
  iconName, 
  className = "w-4 h-4",
  fallback 
}: { 
  iconName: keyof typeof LazyIcons;
  className?: string;
  fallback?: React.ReactNode;
}) => {
  const IconComponent = LazyIcons[iconName];
  
  if (!IconComponent) {
    return fallback || <IconFallback className={className} />;
  }
  
  return (
    <Suspense fallback={fallback || <IconFallback className={className} />}>
      <IconComponent className={className} />
    </Suspense>
  );
};

// Optimized section loader for large components
export const SectionLoader = ({ 
  isLoading, 
  children, 
  fallback,
  className = "min-h-[200px]"
}: {
  isLoading: boolean;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
}) => {
  if (isLoading) {
    return fallback || <ComponentFallback className={className} />;
  }
  
  return <>{children}</>;
};

const LazyComponentsModule = {
  LazyStats,
  LazySocials,
  LazyProjectModal,
  LazyProjectsFilter,
  LazySkillsFilter,
  LazyCertificationFilter,
  LazyGlobalSearch,
  LazyFormSection,
  LazyCertificationTimeline,
  LazyLightbox,
  LazyIcons,
  LazyIcon,
  withLazyLoading,
  IconFallback,
  ComponentFallback,
  CardFallback,
  SectionLoader,
};

export default LazyComponentsModule; 