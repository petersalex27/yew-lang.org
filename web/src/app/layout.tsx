"use client";

import React, { ReactNode } from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '../components/ui/navmenu';
import '../styles/output.css';
import '../styles/nav.css';
import { cn } from '../lib/utils';
import Boxed from '../components/ui/boxed';
import '../styles/colors.css';

const siteTitle = 'The Yew Programming Language';

type LayoutProps = {
  children: ReactNode;
};

const RootLayout = ({ children }: LayoutProps) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <title>{siteTitle}</title>
      </head>
      
      <body className="font-mono bg-[url('../../public/assets/images/bg.png')] bg-cover">
        <main>
          <NavigationBar />
          {children}
        </main>
      </body>
    </html>
  );
};

type YewNavIconProps = {
  className?: string;
};

const YewNavIcon = ({ className }: YewNavIconProps) => (
  <img
    id="yew-nav-icon"
    src="/assets/icons/yew-nav.svg"
    alt="Yew"
    className={cn(className)}
  />
);

type NavigationBarProps = {
  className?: string;
};

/*
<div className="flex w-full justify-between items-center">
  <div className="relative w-[100%] h-14">
    <div className="absolute aspect-[16/1] right-0 top-[8px] bottom-0 left-0 bg-[#551533]" />
    <div className="absolute aspect-[16/1] top-0 left-0 right-0 bg-[#8B1E3F]">
      <YewNavIcon className="pl-8" />
      <NavigationMenu>
        <NavigationMenuList className={cn('flex space-x-4', className)}>
          <NavItem href="/about">About</NavItem>
          <NavItem href="/learn">Learn</NavItem>
          <NavItem href="/docs">Docs</NavItem>
          <NavItem href="/packages">Packages</NavItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  </div>
</div>
*/

const buttonOnHover = (ids: [string, string]) => () => {
  for (let id of ids) {
    let elem : HTMLElement | null = document.getElementById(id+'-top');
    if (elem) {
      elem.style.visibility = 'visible';
    }
    elem = document.getElementById(id+'-bottom');
    if (elem) {
      elem.style.visibility = 'visible';
    }
    elem = document.getElementById(id+'-shadow');
    if (elem) {
      elem.style.visibility = 'visible';
    }
  }
}

const buttonOnLeave = (ids: [string, string]) => () => {
  for (let id of ids) {
    let elem : HTMLElement | null = document.getElementById(id+'-top');
    if (elem) {
      elem.style.visibility = 'hidden';
    }
    elem = document.getElementById(id+'-bottom');
    if (elem) {
      elem.style.visibility = 'hidden';
    }
    elem = document.getElementById(id+'-shadow');
    if (elem) {
      elem.style.visibility = 'hidden';
    }
  }
}

const NavSpan = ({ idHead, children }: { idHead: string, children: ReactNode }) => {
  const ids : [string, string] = [`${idHead}-left-diagonal`, `${idHead}-right-diagonal`];
  return (
    <div 
      className="nav-button" 
      onMouseOver={buttonOnHover(ids)}
      onMouseLeave={buttonOnLeave(ids)}
    >
      <div className='absolute left-[0%] top-[0.5rem] w-[10%]'>
        <div className='tilt tilt-bottom tilt-lhs tilt-shadow' id={ids[0]+'-shadow'} />
      </div>
      <div className='absolute right-[0%] top-[0.5rem] w-[10%]'>
        <div className='tilt tilt-top tilt-rhs tilt-shadow' id={ids[1]+'-shadow'} />
      </div>
      <div className='absolute left-[0%] top-[0%] w-[10%]'>
        <div className='tilt tilt-top tilt-lhs' id={ids[0]+'-top'} />
        <div className='tilt tilt-bottom tilt-lhs' id={ids[0]+'-bottom'} />
      </div>
      {children}
      <div className='absolute right-[0%] top-[0%] w-[10%]'>
        <div className='tilt tilt-top tilt-rhs' id={ids[1]+'-top'} />
        <div className='tilt tilt-bottom tilt-rhs' id={ids[1]+'-bottom'} />
      </div> 
    </div>
  );
}

const NavigationBar = ({ className }: NavigationBarProps) => {
  return (
    <div className="flex w-full h-16 mb-2">
      <div className="relative w-[100%]">
        <div className="absolute h-14 top-2 bottom-0 right-0 left-0 red-bg-shadow" />
        <div className="absolute flex h-14 top-0 left-0 right-0 bottom-0">
          <div className='absolute -z-10 h-16 w-full top-0 bottom-2 left-0 right-0 bg-[#981f62]' />
          <YewNavIcon className="object-scale-down pl-8" />
          <NavigationMenu className="h-14 ml-auto">
            <NavigationMenuList className={cn('flex w-full space-x-4', className)}>
              <NavItem href="/about"><NavSpan idHead='about'>About</NavSpan></NavItem>
              <NavItem href="/learn"><NavSpan idHead="learn">Learn</NavSpan></NavItem>
              <NavItem href="/docs"><NavSpan idHead="docs">Docs</NavSpan></NavItem>
              <NavItem href="/packages"><NavSpan idHead="packages">Packages</NavSpan></NavItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </div>
  );
};

type NavItemProps = {
  href: string;
  children: ReactNode;
};

const NavItem = ({ href, children }: NavItemProps) => {
  return (
    <NavigationMenuItem>
      <NavigationMenuLink className="pl-8 pr-8 text-white" href={href}>
        {children}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

export default RootLayout;