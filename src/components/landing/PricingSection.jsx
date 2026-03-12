import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Sparkles } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function PricingSection({ onTryFree, onBookCall, theme }) {
  const [billingPeriod, setBillingPeriod] = useState('annually');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const isDark = theme === 'dark';

  const plans = [
    {
      name: 'Student Plan',
      description: 'Best for students and early learners exploring rare disease research',
      price: { monthly: '$0', annually: '$0' },
      priceDetail: { monthly: '/month', annually: '/month' },
      popular: false,
      buttonText: 'Sign Up',
      buttonAction: () => window.location.href = 'https://lab.orphanova.com',
      features: [
        '5 NOVUS AI credits per month',
        '1 export per month',
        'Basic literature reasoning',
        'Basic hypothesis suggestions',
        'Personal dashboard',
        'Community support'
      ]
    },
    {
      name: 'Advanced Plan',
      description: 'For researchers and professionals who need full AI-powered workflows.',
      price: { monthly: '$49', annually: '$45' },
      priceDetail: { 
        monthly: '/month', 
        annually: '/month'
      },
      billedAs: {
        monthly: 'billed monthly',
        annually: 'billed annually'
      },
      popular: true,
      buttonText: 'Upgrade',
      buttonAction: onTryFree,
      features: [
        'Unlimited NOVUS AI reasoning',
        'NOVUS AI watch mode',
        'Full-text analysis and deep synthesis',
        'Unlimited exports (PDF, DOCX, citations)',
        'Paper rewriting and authorship refinement',
        'Image generation for scientific figures',
        'Data privacy guaranteed',
        'Saved projects and workflow history',
        'Fast processing priority'
      ]
    },
    {
      name: 'Team / Lab Plan',
      description: 'For labs, institutes, and teams collaborating on scientific discovery.',
      price: { monthly: 'Custom', annually: 'Custom' },
      priceDetail: { monthly: null, annually: null },
      popular: false,
      buttonText: 'Contact Sales',
      buttonAction: onBookCall,
      features: [
        'Multi-user workspace',
        'Team dashboards',
        'Hypothesis ranking & validation reports',
        'Reproducible workflows',
        'Shared datasets and libraries',
        'Priority team support'
      ]
    },
    {
      name: 'Enterprise Plan',
      description: 'For pharma, biotech, and large R&D organizations.',
      price: { monthly: 'Custom', annually: 'Custom' },
      priceDetail: { monthly: null, annually: null },
      popular: false,
      buttonText: 'Book a Call',
      buttonAction: onBookCall,
      features: [
        'Custom AI pipelines and integrations',
        'Unlimited users & datasets',
        'Secure cloud or on-prem deployment',
        'Compliance, audit logs, SLAs',
        'Dedicated enterprise support'
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <motion.section
          ref={ref}
          className="py-6 sm:py-10 bg-transparent relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1 }}
    >


      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-4 sm:mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 px-2"
            style={{ color: isDark ? '#ffffff' : '#0f172a' }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Plans
          </motion.h2>
          <motion.p 
            className="text-sm sm:text-base max-w-2xl mx-auto px-2"
            style={{ color: isDark ? '#dbeafe' : '#64748b' }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Flexible plans built for every stage of discovery
          </motion.p>
        </motion.div>

        {/* Billing Toggle */}
        <motion.div 
          className="flex justify-center mb-4 sm:mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className={`backdrop-blur-md p-1.5 rounded-xl border flex gap-1 ${
            isDark 
              ? 'bg-slate-800/60 border-slate-600'
              : 'bg-white/60 border-slate-300'
          }`}>
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-4 sm:px-6 py-2 rounded-lg font-medium transition-all text-sm sm:text-base ${
                billingPeriod === 'monthly'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('annually')}
              className={`px-4 sm:px-6 py-2 rounded-lg font-medium transition-all text-sm sm:text-base ${
                billingPeriod === 'annually'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Annual (save 15%)
            </button>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ 
                y: -8,
                scale: 1.02,
                boxShadow: plan.popular 
                  ? '0 20px 60px rgba(59, 130, 246, 0.4)' 
                  : isDark ? '0 20px 40px rgba(0, 0, 0, 0.3)' : '0 20px 40px rgba(0, 0, 0, 0.1)',
                transition: { type: "spring", stiffness: 300, damping: 25 }
              }}
            >
              <Card 
                className={`relative backdrop-blur-md border-2 h-full flex flex-col ${
                  plan.popular 
                    ? 'border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.3)]' 
                    : isDark ? 'border-slate-600 hover:border-slate-500' : 'border-slate-300 hover:border-slate-400'
                } ${
                  isDark ? 'bg-slate-800/60' : 'bg-white/80'
                } transition-all duration-300`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white px-4 py-1 text-sm font-bold shadow-lg flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      POPULAR
                    </Badge>
                  </div>
                )}

                <CardHeader className="pb-3">
                  <CardTitle className="text-xl font-bold mb-1" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>
                    {plan.name}
                  </CardTitle>
                  <div className="mb-2">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>
                        {plan.price[billingPeriod]}
                      </span>
                      {plan.priceDetail && plan.priceDetail[billingPeriod] && (
                        <span className="text-lg font-normal" style={{ color: isDark ? '#cbd5e1' : '#64748b' }}>
                          {plan.priceDetail[billingPeriod]}
                        </span>
                      )}
                    </div>
                    {plan.billedAs && plan.billedAs[billingPeriod] && (
                      <div className="text-xs mt-1" style={{ color: isDark ? '#cbd5e1' : '#64748b' }}>
                        {plan.billedAs[billingPeriod]}
                      </div>
                    )}
                    {plan.savings && plan.savings[billingPeriod] && (
                      <div className="mt-2">
                        <Badge className="bg-green-600/20 text-green-400 border-green-500/30">
                          {plan.savings[billingPeriod]}
                        </Badge>
                      </div>
                    )}
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: isDark ? '#cbd5e1' : '#64748b' }}>
                    {plan.description}
                  </p>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col">
                  <ul className="space-y-2 mb-4 flex-1">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-xs" style={{ color: isDark ? '#e2e8f0' : '#475569' }}>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={plan.buttonAction}
                    className={`w-full ${
                      plan.popular
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg'
                        : 'bg-slate-700 hover:bg-slate-600 text-white'
                    } py-4 text-base font-semibold`}
                  >
                    {plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer Tagline */}
        <motion.div 
          className="mt-4 sm:mt-6 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <p className="text-xs sm:text-sm px-2" style={{ color: isDark ? '#cbd5e1' : '#64748b' }}>
            Powered by <span className="text-blue-400 font-semibold">Novus AI</span> — secure, research-grade, and built to uncover cures across{' '}
            <span className={isDark ? 'text-white font-semibold' : 'text-slate-900 font-semibold'}>8,000+ rare diseases</span>.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}