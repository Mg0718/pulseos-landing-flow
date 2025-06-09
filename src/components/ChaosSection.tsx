
import React from 'react';
import { AlertTriangle } from 'lucide-react';

const ChaosSection = () => {
  const tools = [
    'Slack for team chat',
    'Zoom for meetings',
    'Notion for docs',
    'Airtable for databases',
    'Asana for tasks',
    'ClickUp for dashboards',
    'Google Drive',
    'QuickBooks',
    'Calendly',
    'and... dozens more'
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto text-center space-y-12">
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Running a business shouldn't feel like{' '}
            <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              duct-taping 14 tools together
            </span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            You started to solve a problem. To serve customers. To grow something meaningful.
            But somewhere along the way, your operations turned into a monster:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {tools.map((tool, index) => (
            <div key={index} className="p-4 bg-card/50 border border-border/20 rounded-lg backdrop-blur-sm">
              <span className="text-muted-foreground">{tool}</span>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-lg p-8 max-w-2xl mx-auto">
          <div className="flex items-center justify-center mb-4">
            <AlertTriangle className="w-8 h-8 text-red-400" />
          </div>
          <p className="text-lg text-foreground">
            Now you're juggling subscriptions, chasing integrations, and praying nothing breaks.
          </p>
          <p className="text-xl font-bold text-red-400 mt-4">
            That's not modern. That's mental tax.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ChaosSection;
