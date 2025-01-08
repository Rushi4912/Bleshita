declare module '@heroicons/react/solid' {
    import React from 'react';
  
    export interface HeroIconProps extends React.SVGProps<SVGSVGElement> {}
  
    export const CheckIcon: React.FC<HeroIconProps>;
    export const XIcon: React.FC<HeroIconProps>;
    export const PlusIcon: React.FC<HeroIconProps>;
    // Add more icons as needed or use `export *` to define all.
  }
  
  declare module '@heroicons/react/outline' {
    import React from 'react';
  
    export interface HeroIconProps extends React.SVGProps<SVGSVGElement> {}
  
    export const CheckIcon: React.FC<HeroIconProps>;
    export const XIcon: React.FC<HeroIconProps>;
    export const PlusIcon: React.FC<HeroIconProps>;
    // Add more icons as needed or use `export *` to define all.
  }
  