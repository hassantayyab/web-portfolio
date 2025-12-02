import { IconType } from 'react-icons';
import * as SimpleIcons from 'react-icons/si';

// Map skill icon names to react-icons simple-icons components
export const getSkillIcon = (iconName: string): IconType => {
  const iconMap: Record<string, IconType> = {
    react: SimpleIcons.SiReact,
    nextjs: SimpleIcons.SiNextdotjs,
    typescript: SimpleIcons.SiTypescript,
    tailwind: SimpleIcons.SiTailwindcss,
    framer: SimpleIcons.SiFramer,
    nodejs: SimpleIcons.SiNodedotjs,
    postgresql: SimpleIcons.SiPostgresql,
    mongodb: SimpleIcons.SiMongodb,
    graphql: SimpleIcons.SiGraphql,
    prisma: SimpleIcons.SiPrisma,
    git: SimpleIcons.SiGit,
    docker: SimpleIcons.SiDocker,
    figma: SimpleIcons.SiFigma,
    vscode: SimpleIcons.SiCoder, // VS Code doesn't have specific icon, using Coder as fallback
    vercel: SimpleIcons.SiVercel,
  };

  // Convert icon name to lowercase and handle variations
  const normalizedName = iconName.toLowerCase().replace(/[.\s]/g, '');

  // Try exact match first
  if (iconMap[normalizedName]) {
    return iconMap[normalizedName];
  }

  // Try partial match (e.g., "nextjs" -> "nextdotjs")
  const keys = Object.keys(iconMap);
  const matchedKey = keys.find(
    (key) => normalizedName.includes(key) || key.includes(normalizedName),
  );

  if (matchedKey) {
    return iconMap[matchedKey];
  }

  // Default fallback icon
  return SimpleIcons.SiCoder;
};
