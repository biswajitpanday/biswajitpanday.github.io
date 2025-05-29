import React, { lazy, Suspense, memo } from 'react';
import { IconType } from 'react-icons';

// Simple icon mapping for better bundle splitting
const iconComponents: Record<string, () => Promise<{ default: IconType }>> = {
  // FA Icons
  FaFolder: () => import('react-icons/fa').then(mod => ({ default: mod.FaFolder })),
  FaCode: () => import('react-icons/fa').then(mod => ({ default: mod.FaCode })),
  FaJs: () => import('react-icons/fa').then(mod => ({ default: mod.FaJs })),
  FaGitAlt: () => import('react-icons/fa').then(mod => ({ default: mod.FaGitAlt })),
  FaDocker: () => import('react-icons/fa').then(mod => ({ default: mod.FaDocker })),
  FaRegBuilding: () => import('react-icons/fa').then(mod => ({ default: mod.FaRegBuilding })),
  FaReact: () => import('react-icons/fa').then(mod => ({ default: mod.FaReact })),
  FaAngular: () => import('react-icons/fa').then(mod => ({ default: mod.FaAngular })),
  FaBootstrap: () => import('react-icons/fa').then(mod => ({ default: mod.FaBootstrap })),
  FaGlobe: () => import('react-icons/fa').then(mod => ({ default: mod.FaGlobe })),
  FaSitemap: () => import('react-icons/fa').then(mod => ({ default: mod.FaSitemap })),
  FaMicrochip: () => import('react-icons/fa').then(mod => ({ default: mod.FaMicrochip })),
  FaServer: () => import('react-icons/fa').then(mod => ({ default: mod.FaServer })),
  FaExchangeAlt: () => import('react-icons/fa').then(mod => ({ default: mod.FaExchangeAlt })),
  FaProjectDiagram: () => import('react-icons/fa').then(mod => ({ default: mod.FaProjectDiagram })),
  FaCloud: () => import('react-icons/fa').then(mod => ({ default: mod.FaCloud })),
  FaDatabase: () => import('react-icons/fa').then(mod => ({ default: mod.FaDatabase })),
  FaAws: () => import('react-icons/fa').then(mod => ({ default: mod.FaAws })),
  FaTools: () => import('react-icons/fa').then(mod => ({ default: mod.FaTools })),
  FaRestroom: () => import('react-icons/fa').then(mod => ({ default: mod.FaRestroom })),
  FaFunnelDollar: () => import('react-icons/fa').then(mod => ({ default: mod.FaFunnelDollar })),
  FaLinux: () => import('react-icons/fa').then(mod => ({ default: mod.FaLinux })),
  
  // SI Icons
  SiTypescript: () => import('react-icons/si').then(mod => ({ default: mod.SiTypescript })),
  SiBlazor: () => import('react-icons/si').then(mod => ({ default: mod.SiBlazor })),
  SiKubernetes: () => import('react-icons/si').then(mod => ({ default: mod.SiKubernetes })),
  SiModal: () => import('react-icons/si').then(mod => ({ default: mod.SiModal })),
  SiExpress: () => import('react-icons/si').then(mod => ({ default: mod.SiExpress })),
  SiServerless: () => import('react-icons/si').then(mod => ({ default: mod.SiServerless })),
  SiMongodb: () => import('react-icons/si').then(mod => ({ default: mod.SiMongodb })),
  SiMysql: () => import('react-icons/si').then(mod => ({ default: mod.SiMysql })),
  SiAmazondynamodb: () => import('react-icons/si').then(mod => ({ default: mod.SiAmazondynamodb })),
  SiSqlite: () => import('react-icons/si').then(mod => ({ default: mod.SiSqlite })),
  SiAmazonec2: () => import('react-icons/si').then(mod => ({ default: mod.SiAmazonec2 })),
  SiAwslambda: () => import('react-icons/si').then(mod => ({ default: mod.SiAwslambda })),
  SiAmazons3: () => import('react-icons/si').then(mod => ({ default: mod.SiAmazons3 })),
  SiAmazonsqs: () => import('react-icons/si').then(mod => ({ default: mod.SiAmazonsqs })),
  SiAmazonsimpleemailservice: () => import('react-icons/si').then(mod => ({ default: mod.SiAmazonsimpleemailservice })),
  SiJenkins: () => import('react-icons/si').then(mod => ({ default: mod.SiJenkins })),
  SiJira: () => import('react-icons/si').then(mod => ({ default: mod.SiJira })),
  SiFrontendmentor: () => import('react-icons/si').then(mod => ({ default: mod.SiFrontendmentor })),
  SiReact: () => import('react-icons/si').then(mod => ({ default: mod.SiReact })),
  SiAngular: () => import('react-icons/si').then(mod => ({ default: mod.SiAngular })),
  SiRedux: () => import('react-icons/si').then(mod => ({ default: mod.SiRedux })),
  SiDotnet: () => import('react-icons/si').then(mod => ({ default: mod.SiDotnet })),
  SiFramework: () => import('react-icons/si').then(mod => ({ default: mod.SiFramework })),
  SiTrpc: () => import('react-icons/si').then(mod => ({ default: mod.SiTrpc })),
  SiRabbitmq: () => import('react-icons/si').then(mod => ({ default: mod.SiRabbitmq })),
  
  // Other libraries
  VscAzure: () => import('react-icons/vsc').then(mod => ({ default: mod.VscAzure })),
  VscAzureDevops: () => import('react-icons/vsc').then(mod => ({ default: mod.VscAzureDevops })),
  GrTest: () => import('react-icons/gr').then(mod => ({ default: mod.GrTest })),
  GrVirtualMachine: () => import('react-icons/gr').then(mod => ({ default: mod.GrVirtualMachine })),
  DiMsqlServer: () => import('react-icons/di').then(mod => ({ default: mod.DiMsqlServer })),
  DiDotnet: () => import('react-icons/di').then(mod => ({ default: mod.DiDotnet })),
  DiScrum: () => import('react-icons/di').then(mod => ({ default: mod.DiScrum })),
  DiRedis: () => import('react-icons/di').then(mod => ({ default: mod.DiRedis })),
  GiCogsplosion: () => import('react-icons/gi').then(mod => ({ default: mod.GiCogsplosion })),
  FaArrowsSpin: () => import('react-icons/fa6').then(mod => ({ default: mod.FaArrowsSpin })),
  TbBrandCSharp: () => import('react-icons/tb').then(mod => ({ default: mod.TbBrandCSharp })),
  TbBrandLinqpad: () => import('react-icons/tb').then(mod => ({ default: mod.TbBrandLinqpad })),
  MdNotifications: () => import('react-icons/md').then(mod => ({ default: mod.MdNotifications })),
  MdSecurity: () => import('react-icons/md').then(mod => ({ default: mod.MdSecurity })),
  PiKanban: () => import('react-icons/pi').then(mod => ({ default: mod.PiKanban })),
};

interface DynamicIconProps {
  iconName: string;
  className?: string;
  fallback?: React.ReactNode;
}

const DynamicIcon: React.FC<DynamicIconProps> = memo(({ 
  iconName, 
  className = "mr-3 text-secondary-default",
  fallback = <div className={className} style={{ width: '1em', height: '1em', backgroundColor: 'currentColor', borderRadius: '2px' }} />
}) => {
  const iconLoader = iconComponents[iconName];
  
  if (!iconLoader) {
    console.warn(`Icon ${iconName} not found, using fallback`);
    return <>{fallback}</>;
  }

  const IconComponent = lazy(iconLoader);

  return (
    <Suspense fallback={fallback}>
      <IconComponent className={className} />
    </Suspense>
  );
});

DynamicIcon.displayName = 'DynamicIcon';

export default DynamicIcon; 