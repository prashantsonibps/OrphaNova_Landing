
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion, AnimatePresence } from 'framer-motion';


export default function Layout({ children, setActiveContent, activeContent }) {
  const location = useLocation();
  const isHomePage = location.pathname === createPageUrl('Home');


  if (isHomePage) {
    return <>{children}</>;
  }

  return (
    <>{children}</>
  );
}
