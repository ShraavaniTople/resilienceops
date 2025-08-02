import React, { useState } from 'react';

type Incident = { id: string; severity: 'low'|'med'|'high'; title: string; createdAt: string };

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="card">
    <h3 className="card-title">{title}</h3>
    <div className="card-desc">{children}</div>
  </section>
);

export default function App(){
  const [toast,setToast]=useState<string|null>(null);
  const [incidents,setIncidents]=useState<Incident[]>([]);
  const [ack,setAck]=useState<number>(0);

  const runHealth=()=>{
    try{
      const pong=(window as any).electronAPI?.ping?.();
      setToast(typeof pong==='string'?pong:'OK ✅');
    }catch{ setToast('OK ✅'); }
    setTimeout(()=>setToast(null),1200);
  };

  const newMockIncident=()=>{
    const sev: Incident['severity'] = (['low','med','high'] as const)[Math.floor(Math.random()*3)];
    const inc: Incident = {
      id: Math.random().toString(36).slice(2,8),
      severity: sev,
      title: sev==='high' ? 'Checkout failures (422)' : sev==='med' ? 'Rate limit spikes' : 'Intermittent retries',
      createdAt: new Date().toISOString()
    };
    setIncidents(i=>[inc, ...i].slice(0,3)); // keep it small for demo
    setToast('Mock incident created');
    setTimeout(()=>setToast(null),1000);
  };

  const acknowledgeOne=()=>{
    if(!incidents.length) return;
    setIncidents(i=>i.slice(1));
    setAck(a=>a+1);
  };

  return (
    <div className="min-h-full">
      <div className="h-5" />
      <header className="header container flex items-center justify-between">
        <div>
          <h1 className="text-[28px] font-extrabold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-teal-500">ResilienceOps</span>
          </h1>
          <p className="text-[13.5px] text-slate-600 mt-1">Incident-to-Impact Orchestrator</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn" onClick={newMockIncident}>New Mock Incident</button>
          <button className="btn" onClick={runHealth}>Run Health Check</button>
        </div>
      </header>

      <main className="container grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Section title="Incidents">
          {incidents.length === 0 ? (
            <p className="text-slate-500">No open incidents. Click <span className="font-medium">New Mock Incident</span> to test the flow.</p>
          ) : (
            <ul className="space-y-2">
              {incidents.map(i=>(
                <li key={i.id} className="flex items-start justify-between">
                  <div>
                    <div className="font-medium">{i.title}</div>
                    <div className="text-xs text-slate-500">{i.id} • {i.severity} • {new Date(i.createdAt).toLocaleTimeString()}</div>
                  </div>
                  <span className="chip">{i.severity}</span>
                </li>
              ))}
            </ul>
          )}
          <div className="chips">
            <span className="chip">{incidents.length} open</span>
            <span className="chip">{ack} acknowledged</span>
            <button className="chip" onClick={acknowledgeOne}>Acknowledge one</button>
          </div>
        </Section>

        <Section title="API Spec Changes">
          Connect providers in <span className="font-medium">Settings</span> to watch OpenAPI/GraphQL and flag breaking changes.
          <div className="chips"><span className="chip">Watching: 0</span><span className="chip">Breaking: 0</span></div>
        </Section>

        <Section title="Fix Plans">
          When an incident correlates with a spec change, proposed remediation steps will appear here for approval.
          <div className="chips"><span className="chip">Proposed: 0</span><span className="chip">Approved: 0</span></div>
        </Section>

        <Section title="Executions">
          Track pull requests, rollbacks, feature-flag toggles, and workflow replays.
          <div className="chips"><span className="chip">PRs: 0</span><span className="chip">Rollbacks: 0</span><span className="chip">Replays: 0</span></div>
        </Section>

        <Section title="Settings">
          Connect services and set guardrails:
          <div className="chips"><span className="chip">GitHub/GitLab</span><span className="chip">Sentry/Datadog</span><span className="chip">Policies</span></div>
        </Section>

        <Section title="About">
          ResilienceOps correlates incidents with upstream API changes and proposes safe, reversible fixes.
          <div className="chips"><span className="chip">Version v0.1</span><span className="chip">Local runtime</span></div>
        </Section>
      </main>

      {toast && <div className="toast">{toast}</div>}
      <div className="h-10" />
    </div>
  );
}
