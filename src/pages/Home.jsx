import React, { Suspense, lazy, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CalendarDays, FileText, FlaskConical, Network, Search, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FloatingHeader from '../components/landing/FloatingHeader';
import Footer from '../components/landing/Footer';
import FAQs from '../components/landing/FAQs';
import { ThemeProvider, useTheme } from '../components/ThemeContext';
import FaviconUpdater from '../components/FaviconUpdater';

const BiomedicalHeroVisual = lazy(() => import('../components/landing/BiomedicalHeroVisual'));

const calendarLink = 'https://calendar.notion.so/meet/prashantsonibps/pkxx64o8n';
const appLink = 'https://lab.orphanova.com';

const heroFacts = [
  { value: '400M+', label: 'patients living with rare diseases worldwide' },
  { value: '7,000+', label: 'conditions still waiting for focused drug discovery' },
  { value: 'Minutes', label: 'from disease prompt to paper-ready direction' },
];

const proofFacts = [
  { value: '8,000+', label: 'rare diseases navigable from one shared research surface' },
  { value: '5+', label: 'major scientific data ecosystems connected in one workflow' },
  { value: '1', label: 'continuous thread from prompt to hypothesis, experiment, and draft' },
];

const principles = [
  'Start with a disease name and assemble a living research surface across literature, genes, proteins, compounds, and trial context.',
  'Validate each lead against biomedical infrastructure researchers already trust, including Open Targets, UniProt, AlphaFold, PubChem, and ClinicalTrials.gov.',
  'Move from evidence extraction to testable hypotheses, experiment plans, and manuscript-ready writing inside one continuous workflow.',
];

const workflowSteps = [
  {
    number: '01',
    title: 'Disease input and literature scan',
    text: 'Enter a rare disease, question, or starting dataset and let NOVUS map the paper trail, mechanisms, and scientific background.',
    icon: Search,
  },
  {
    number: '02',
    title: 'Evidence extraction and validation',
    text: 'Pull relationships out of the literature and enrich them with target scores, protein data, structural context, and compound evidence.',
    icon: Network,
  },
  {
    number: '03',
    title: 'Hypothesis and experiment design',
    text: 'Turn validated signals into testable hypotheses, candidate compounds, and concrete next-step experiments grounded in the evidence graph.',
    icon: FlaskConical,
  },
  {
    number: '04',
    title: 'Paper-ready outputs',
    text: 'Draft manuscripts, grant-style writeups, and research summaries that still point back to the underlying scientific inputs.',
    icon: FileText,
  },
];

const integrations = [
  {
    name: 'PubMed',
    kind: 'wordmark',
    variant: 'pubmed',
  },
  {
    name: 'Open Targets',
    kind: 'image',
    src: '/brands/open-targets.svg',
    alt: 'Open Targets logo',
    className: 'h-7 sm:h-8 logo-asset--open-targets',
  },
  {
    name: 'UniProt',
    kind: 'image',
    src: '/brands/uniprot-wide.png',
    alt: 'UniProt logo',
    className: 'h-10 sm:h-11 logo-asset--uniprot',
  },
  {
    name: 'PubChem',
    kind: 'image',
    src: '/brands/pubchem.svg',
    alt: 'PubChem logo',
    className: 'h-9 sm:h-10 logo-asset--pubchem',
  },
  {
    name: 'ClinicalTrials.gov',
    kind: 'wordmark',
    variant: 'clinicaltrials',
  },
  {
    name: 'BioRender',
    kind: 'image',
    src: '/brands/biorender-white.svg',
    alt: 'BioRender logo',
    className: 'h-6 sm:h-7 logo-asset--biorender',
  },
  {
    name: 'Tamarind Bio',
    kind: 'lockup',
    variant: 'tamarind',
  },
  {
    name: 'AlphaFold DB',
    kind: 'lockup',
    variant: 'alphafold',
  },
];

const capabilities = [
  {
    title: 'Evidence-grounded by default',
    text: 'The output is useful because the reasoning stays tied to real literature, structured evidence, protein context, and trial signals.',
  },
  {
    title: 'Built for rare-disease science',
    text: 'OrphaNova is designed for neglected biology, sparse data, and high-friction discovery work rather than generic enterprise chat workflows.',
  },
  {
    title: 'From discovery to draft',
    text: 'One pipeline can move a team from literature review to experimental direction and manuscript-quality writing without losing context.',
  },
];

function Reveal({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function HomeContent() {
  const { theme } = useTheme();
  const [graphLoadFailed, setGraphLoadFailed] = useState(false);
  const tickerLogos = [...integrations, ...integrations];

  return (
    <div className={`min-h-screen overflow-x-hidden theme-${theme} orphanova-page`}>
      <FloatingHeader theme={theme} />

      <main>
        <section className="poster-hero">
          <div className="poster-backdrop" />

          <div className="mx-auto w-full max-w-[1380px] px-5 sm:px-8 lg:px-10">
            <div className="poster-grid">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="poster-copy"
              >
                <p className="poster-tag">AI scientist for rare diseases</p>

                <h1 className="poster-title">
                  OrphaNova
                  <span>takes a disease name from literature to paper draft in minutes, not months.</span>
                </h1>

                <p className="poster-body">
                  Validate targets, inspect protein structures, score compounds, design experiments, and draft manuscripts
                  inside one rare-disease research engine.
                </p>

                <div className="poster-actions">
                  <Button
                    asChild
                    size="lg"
                    className="hero-button-primary !h-14 rounded-full !bg-[#d8a04d] !px-8 text-base font-semibold !text-[#0b1323] shadow-[0_18px_40px_rgba(216,160,77,0.22)] hover:!bg-[#e6b25d]"
                  >
                    <a href={calendarLink} target="_blank" rel="noopener noreferrer">
                      Book a demo
                      <CalendarDays className="ml-2 h-5 w-5" />
                    </a>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="hero-button-secondary !h-14 rounded-full !border-[#d4e0ea] !bg-[#f5f8fb] !px-8 text-base font-semibold !text-[#09131e] shadow-[0_18px_36px_rgba(2,12,22,0.16)] hover:!bg-[#e3ebf2] [&_svg]:!text-[#6b8196]"
                  >
                    <a href={appLink} target="_blank" rel="noopener noreferrer">
                      Open Labs
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
                  </Button>
                </div>

                <div className="poster-metrics">
                  {heroFacts.map((fact) => (
                    <div key={fact.value} className="metric-line">
                      <p className="metric-value">{fact.value}</p>
                      <p className="metric-copy">{fact.label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 26 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.95, ease: 'easeOut', delay: 0.1 }}
                className="poster-visual"
              >
                <Suspense fallback={<div className="bio-visual-placeholder" aria-hidden="true" />}>
                  <BiomedicalHeroVisual />
                </Suspense>
                <p className="bio-structure-caption">
                  Real MeCP2 bound to DNA, a protein complex directly linked to Rett syndrome, a rare neurodevelopmental disease.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="credibility" className="credibility-lane">
          <div className="mx-auto max-w-[1380px] px-5 sm:px-8 lg:px-10">
            <div className="credibility-inline">
              <p className="credibility-prefix">Backed by:</p>
              <div className="credibility-grid">
                <div className="credibility-mark">
                  <img src="/brands/google-for-startups.svg" alt="Google for Startups logo" className="h-8 sm:h-9" />
                </div>
                <div className="credibility-mark credibility-mark-nvidia">
                  <div className="nvidia-inception-lockup">
                    <img src="/brands/nvidia-symbol.png" alt="NVIDIA logo" className="nvidia-eyemark" />
                    <span className="nvidia-wordmark">
                      <strong>NVIDIA</strong>
                      <em>Inception</em>
                    </span>
                  </div>
                </div>
                <div className="credibility-mark credibility-mark-founders">
                  <img src="/brands/founders-inc.png" alt="Founders, Inc logo" className="founders-inc-logo" />
                </div>
                <div className="credibility-mark credibility-mark-yc">
                  <img src="/brands/yc-mark.svg" alt="Y Combinator logo" className="h-11 w-11 sm:h-12 sm:w-12" />
                  <span>Developed at YC Bio X AI</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="content-section">
          <div className="mx-auto max-w-[1380px] px-5 sm:px-8 lg:px-10">
            <div className="story-grid">
              <Reveal className="story-copy">
                <p className="section-kicker">Why this matters</p>
                <h2 className="section-title">
                  Rare-disease discovery is still slowed down by fragmented evidence and too many disconnected tools.
                </h2>
                <p className="section-copy">
                  Most rare diseases still have no approved treatment. OrphaNova compresses the path from disease question
                  to evidence-backed next step across literature, proteins, compounds, and clinical context.
                </p>

                <div className="principle-list">
                  {principles.map((item) => (
                    <div key={item} className="principle-line">
                      <ShieldCheck className="h-4 w-4" />
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal className="numbers-stack" delay={0.1}>
                <figure className="insight-graph">
                  {!graphLoadFailed ? (
                    <img
                      src="/images/rare-disease-trends.png"
                      alt="Rare-disease R&D trends graph showing funding, clinical trials, and FDA orphan drug approvals"
                      loading="lazy"
                      onError={() => setGraphLoadFailed(true)}
                    />
                  ) : (
                    <div className="insight-graph-fallback">
                      <img src="/brands/orphanova-lens.png" alt="" aria-hidden="true" />
                      <p>Graph image missing. Add file to <code>public/images/rare-disease-trends.png</code>.</p>
                    </div>
                  )}
                </figure>
                {proofFacts.map((fact) => (
                  <div key={fact.value} className="number-line">
                    <p className="number-value">{fact.value}</p>
                    <p className="number-label">{fact.label}</p>
                  </div>
                ))}
              </Reveal>
            </div>
          </div>
        </section>

        <section id="workflow" className="content-section workflow-section">
          <div className="mx-auto max-w-[1380px] px-5 sm:px-8 lg:px-10">
            <div className="workflow-layout">
              <Reveal className="workflow-intro">
                <p className="section-kicker">Workflow</p>
                <h2 className="section-title">From prompt to paper, without breaking the research thread.</h2>
                <p className="section-copy">
                  One pipeline ties discovery, validation, experiment planning, and writing together so scientific context
                  survives from the first question to the final draft.
                </p>
                <a
                  href={calendarLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="workflow-link"
                >
                  See the workflow in a live demo
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Reveal>

              <div className="workflow-list">
                {workflowSteps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <Reveal key={step.number} className="workflow-row" delay={index * 0.06}>
                      <div className="workflow-index">{step.number}</div>
                      <div className="workflow-copy">
                        <div className="workflow-step-head">
                          <div className="workflow-icon">
                            <Icon className="h-4 w-4" />
                          </div>
                          <h3>{step.title}</h3>
                        </div>
                        <p>{step.text}</p>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section id="stack" className="content-section stack-section">
          <div className="mx-auto max-w-[1380px] px-5 sm:px-8 lg:px-10">
            <Reveal className="stack-intro">
              <p className="section-kicker">Scientific stack</p>
              <h2 className="section-title">Research infrastructure already trusted across biotech and translational science.</h2>
              <p className="section-copy">
                OrphaNova connects into the databases, structural biology tools, molecule references, and scientific
                illustration platforms researchers already use to make decisions.
              </p>
            </Reveal>

            <Reveal className="logo-band" delay={0.08}>
              <div className="logo-band-mask">
                <div className="logo-band-track">
                  {tickerLogos.map((item, index) => (
                    <div key={`${item.name}-${index}`} className="logo-band-item">
                      {item.kind === 'image' ? (
                        <img src={item.src} alt={item.alt} className={item.className} />
                      ) : (
                        <div className={`logo-lockup logo-lockup--${item.variant}`}>
                          {item.variant === 'tamarind' ? (
                            <>
                              <img src="/brands/tamarind-mark.svg" alt="Tamarind Bio logo" className="logo-lockup-mark h-6 w-6" />
                              <span className="logo-lockup-text">Tamarind Bio</span>
                            </>
                          ) : item.variant === 'alphafold' ? (
                            <>
                              <img src="/brands/alphafold-favicon.png" alt="AlphaFold logo" className="logo-lockup-mark h-6 w-6" />
                              <span className="logo-lockup-text">
                                AlphaFold <span className="logo-lockup-subtle">DB</span>
                              </span>
                            </>
                          ) : item.variant === 'pubmed' ? (
                            <span className="logo-wordmark logo-wordmark--pubmed">PubMed</span>
                          ) : (
                            <span className="logo-wordmark logo-wordmark--clinicaltrials">ClinicalTrials.gov</span>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal className="stack-footnote" delay={0.12}>
              Including literature search, target intelligence, structure prediction, compound search, study context, and scientific illustration.
            </Reveal>
          </div>
        </section>

        <section className="content-section capability-section">
          <div className="mx-auto max-w-[1380px] px-5 sm:px-8 lg:px-10">
            <div className="capability-grid">
              {capabilities.map((item, index) => (
                <Reveal key={item.title} className="capability-column" delay={index * 0.05}>
                  <p className="section-kicker">Capability 0{index + 1}</p>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <FAQs theme={theme} />

        <section id="contact" className="content-section">
          <div className="mx-auto max-w-[1380px] px-5 sm:px-8 lg:px-10">
            <Reveal className="cta-shell">
              <div className="cta-copy">
                <p className="section-kicker">Next step</p>
                <h2 className="section-title">See how one rare-disease prompt becomes a research-ready plan.</h2>
                <p className="section-copy">
                  Book a walkthrough to see the full research pipeline in action, or open Labs and explore the product
                  surface directly.
                </p>

                <div className="cta-actions">
                  <Button
                    asChild
                    size="lg"
                    className="hero-button-primary !h-14 rounded-full !bg-[#d8a04d] !px-8 text-base font-semibold !text-[#0b1323] shadow-[0_18px_40px_rgba(216,160,77,0.22)] hover:!bg-[#e6b25d]"
                  >
                    <a href={calendarLink} target="_blank" rel="noopener noreferrer">
                      Book a demo
                      <CalendarDays className="ml-2 h-5 w-5" />
                    </a>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="hero-button-secondary !h-14 rounded-full !border-[#d4e0ea] !bg-[#f5f8fb] !px-8 text-base font-semibold !text-[#09131e] shadow-[0_18px_36px_rgba(2,12,22,0.16)] hover:!bg-[#e3ebf2] [&_svg]:!text-[#6b8196]"
                  >
                    <a href={appLink} target="_blank" rel="noopener noreferrer">
                      Open Labs
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
                  </Button>
                </div>
              </div>

              <div className="cta-visual" aria-hidden="true">
                <div className="cta-visual-ring cta-visual-ring--outer" />
                <div className="cta-visual-ring cta-visual-ring--mid" />
                <div className="cta-visual-ring cta-visual-ring--inner" />
                <span className="cta-signal cta-signal--one" />
                <span className="cta-signal cta-signal--two" />
                <span className="cta-signal cta-signal--three" />
                <span className="cta-signal cta-signal--four" />
                <div className="cta-logo-wrap">
                  <img src="/brands/orphanova-lens.png" alt="" className="cta-logo-mark" />
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default function Home() {
  return (
    <ThemeProvider>
      <FaviconUpdater />
      <HomeContent />
    </ThemeProvider>
  );
}
