import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle } from 'lucide-react';

const ROLE_OPTIONS = [
  {
    id: 'researcher',
    title: 'Researcher',
    description: 'Academic or industry researcher',
  },
  {
    id: 'student',
    title: 'Student',
    description: 'Graduate or undergraduate student',
  },
  {
    id: 'clinician',
    title: 'Clinician',
    description: 'Medical doctor or healthcare provider',
  },
  {
    id: 'other',
    title: 'Other',
    description: 'Other professional role',
  },
];

const EMPLOYMENT_OPTIONS = [
  {
    id: 'organization',
    title: 'With an Organization',
    description: 'University, hospital, or company',
  },
  {
    id: 'self_employed',
    title: 'Self-employed',
    description: 'Independent researcher or consultant',
  },
];

export default function DemoBookingModal({ open, onOpenChange }) {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState(null);
  const [employmentStatus, setEmploymentStatus] = useState(null);
  const [projectDescription, setProjectDescription] = useState('');

  const resetState = () => {
    setStep(1);
    setRole(null);
    setEmploymentStatus(null);
    setProjectDescription('');
  };

  const handleClose = (nextOpen) => {
    if (!nextOpen) {
      resetState();
    }
    onOpenChange(nextOpen);
  };

  const handleBookDemo = () => {
    // In the future we could append this info to a query param or send to an API.
    window.open('https://calendar.notion.so/meet/prashantsonibps/pkxx64o8n', '_blank');
    handleClose(false);
  };

  const canGoNextFromStep1 = !!role;
  const canGoNextFromStep2 = !!employmentStatus;
  const canBookFromStep3 = projectDescription.trim().length > 0;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl p-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center overflow-hidden">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/690a1389568b31dc5bffd62d/ee6ddf117_ChatGPTImageNov12202509_01_55PM.png"
                alt="OrphaNova"
                className="w-9 h-9 object-contain"
              />
            </div>
            <span>Welcome to OrphaNova</span>
          </DialogTitle>
        </DialogHeader>

        <div className="mt-2 mb-4">
          <p className="text-sm text-slate-500">
            Let&apos;s personalize your demo experience.
          </p>
        </div>

        {/* Step indicators */}
        <div className="flex items-center justify-center gap-4 mb-6">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold
                  ${
                    step > s
                      ? 'bg-green-500 text-white'
                      : step === s
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-200 text-slate-600'
                  }`}
              >
                {step > s ? <CheckCircle className="w-4 h-4" /> : s}
              </div>
              <span className="text-xs text-slate-500 hidden sm:inline">
                {s === 1 && 'Role'}
                {s === 2 && 'Employment'}
                {s === 3 && 'Focus'}
              </span>
            </div>
          ))}
        </div>

        {/* Step 1: Role */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-slate-900">
                What best describes your role?
              </h3>
              <p className="text-sm text-slate-500">
                This helps us customize your demo.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ROLE_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setRole(option.id)}
                  className={`text-left border rounded-xl p-3 hover:border-blue-500 transition-all
                    ${
                      role === option.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-200 bg-white'
                    }`}
                >
                  <div className="font-semibold text-sm text-slate-900">
                    {option.title}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    {option.description}
                  </div>
                </button>
              ))}
            </div>

            <div className="flex justify-end pt-2">
              <Button
                disabled={!canGoNextFromStep1}
                onClick={() => setStep(2)}
                className="px-6"
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Employment status */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-slate-900">
                Employment Status
              </h3>
              <p className="text-sm text-slate-500">
                Are you affiliated with an organization?
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {EMPLOYMENT_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setEmploymentStatus(option.id)}
                  className={`text-left border rounded-xl p-3 hover:border-blue-500 transition-all
                    ${
                      employmentStatus === option.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-200 bg-white'
                    }`}
                >
                  <div className="font-semibold text-sm text-slate-900">
                    {option.title}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    {option.description}
                  </div>
                </button>
              ))}
            </div>

            <div className="flex justify-between pt-2">
              <Button
                variant="ghost"
                onClick={() => setStep(1)}
                className="px-4"
              >
                Back
              </Button>
              <Button
                disabled={!canGoNextFromStep2}
                onClick={() => setStep(3)}
                className="px-6"
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Project / research focus */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-slate-900">
                What are you working on?
              </h3>
              <p className="text-sm text-slate-500">
                Tell us about your current research or interests.
              </p>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="demo_project_focus"
                className="text-sm font-medium text-slate-700"
              >
                Current Research or Project Focus
              </Label>
              <Textarea
                id="demo_project_focus"
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                rows={4}
                placeholder="e.g., Investigating novel therapeutic targets for rare genetic disorders, studying biomarkers for early disease detection, developing treatments for orphan diseases..."
              />
              <p className="text-xs text-slate-500">
                This helps us tailor the demo to show you the most relevant features for your work.
              </p>
            </div>

            <div className="flex justify-between pt-2">
              <Button
                variant="ghost"
                onClick={() => setStep(2)}
                className="px-4"
              >
                Back
              </Button>
              <Button
                disabled={!canBookFromStep3}
                onClick={handleBookDemo}
                className="px-6"
              >
                Book Demo
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

