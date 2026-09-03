import { useState, useCallback } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { CredibilityStrip } from '@/components/sections/CredibilityStrip';
import { SelectedWork } from '@/components/sections/SelectedWork';
import { EngineeringApproach } from '@/components/sections/EngineeringApproach';
import { TechStack } from '@/components/sections/TechStack';
import { About } from '@/components/sections/About';
import { Timeline } from '@/components/sections/Timeline';
import { ResumeCTA } from '@/components/sections/ResumeCTA';
import { Contact } from '@/components/sections/Contact';
import { AIAssistant } from '@/components/sections/AIAssistant';

import { Metrics } from '@/components/sections/Metrics';

function App() {
  const [aiOpen, setAiOpen] = useState(false);

  const handleViewProject = useCallback((projectId: string) => {
    const el = document.getElementById('work');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    window.dispatchEvent(new CustomEvent('open-case-study', { detail: projectId }));
  }, []);

  return (
    <>
      <Navbar onAskEngineer={() => setAiOpen(true)} />
      <main>
        <Hero onAskEngineer={() => setAiOpen(true)} />
        <CredibilityStrip />
        <SelectedWork />
        <EngineeringApproach />
        <TechStack />
        <Metrics />
        <About />
        <Timeline />
        <ResumeCTA />
        <Contact />
      </main>
      <Footer />
      <AIAssistant
        isOpen={aiOpen}
        onClose={() => setAiOpen(false)}
        onViewProject={handleViewProject}
      />
    </>
  );
}

export default App;
