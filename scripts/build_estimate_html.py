import os
import base64
import subprocess
import re

current_dir = os.path.dirname(os.path.abspath(__file__))
project_dir = os.path.abspath(os.path.join(current_dir, ".."))
docs_dir = os.path.join(project_dir, "docs")
html_path = os.path.join(docs_dir, "ESTIMATE.html")
pdf_path = os.path.join(docs_dir, "ESTIMATE.pdf")

with open(os.path.join(docs_dir, "headshot.jpeg"), "rb") as f:
    headshot_b64 = base64.b64encode(f.read()).decode("utf-8")

with open(os.path.join(docs_dir, "logo.png"), "rb") as f:
    logo_b64 = base64.b64encode(f.read()).decode("utf-8")

html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Production Scope & Formal Estimate - Freedom Motors USA Next.js & Sanity Migration</title>
  <style>
    @page {{
      size: letter portrait;
      margin: 6mm 8.5mm 6mm 8.5mm;
    }}
    * {{
      box-sizing: border-box;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }}
    html, body {{
      margin: 0;
      padding: 0;
      height: 100%;
      background: #ffffff;
      overflow: hidden;
    }}
    body {{
      font-family: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #0f172a;
      line-height: 1.34;
      font-size: 9.8px;
    }}

    .page-container {{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      box-sizing: border-box;
    }}

    /* 1. Executive Header */
    .header {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      border-bottom: 2px solid #1d4ed8;
      padding-bottom: 6px;
    }}
    .header-left {{
      flex: 1;
      min-width: 0;
    }}
    .brand-title {{
      font-size: 8.5px;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #1d4ed8;
      margin-bottom: 2px;
    }}
    h1 {{
      font-size: 15px;
      font-weight: 800;
      color: #0f172a;
      margin: 0 0 2px 0;
      letter-spacing: -0.02em;
      line-height: 1.15;
    }}
    .subtitle {{
      font-size: 8.8px;
      color: #475569;
      margin: 0;
      line-height: 1.25;
    }}
    .meta-card {{
      flex-shrink: 0;
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 6px 10px;
      font-size: 8.5px;
      text-align: right;
      line-height: 1.38;
      box-shadow: 0 1px 2px rgba(0,0,0,0.02);
    }}
    .meta-card strong {{
      color: #0f172a;
    }}
    .live-badge {{
      display: inline-block;
      background: #ecfdf5;
      color: #059669;
      border: 1px solid #a7f3d0;
      font-weight: 700;
      padding: 1px 5px;
      border-radius: 9999px;
      font-size: 8px;
      text-transform: uppercase;
      margin-left: 3px;
    }}

    /* 2. Scope Table */
    .section-header {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 4px;
    }}
    .section-title {{
      font-size: 10px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #1e293b;
      border-left: 3px solid #1d4ed8;
      padding-left: 6px;
      margin: 0;
    }}
    .section-meta {{
      font-size: 8.5px;
      color: #64748b;
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    }}
    table {{
      width: 100%;
      border-collapse: collapse;
    }}
    th {{
      background: #f1f5f9;
      color: #334155;
      font-weight: 700;
      text-transform: uppercase;
      font-size: 8.5px;
      letter-spacing: 0.04em;
      border: 1px solid #cbd5e1;
      padding: 4px 6px;
      text-align: left;
    }}
    td {{
      border: 1px solid #e2e8f0;
      padding: 4.8px 6px;
      font-size: 8.8px;
      vertical-align: top;
    }}
    .phase-num {{
      font-weight: 800;
      color: #1e293b;
      font-size: 8.8px;
      white-space: nowrap;
    }}
    .phase-name {{
      font-weight: 700;
      color: #0f172a;
      font-size: 9.2px;
    }}
    .phase-desc {{
      color: #475569;
      font-size: 8px;
      margin-top: 1px;
      line-height: 1.22;
    }}
    .phase-0-row {{
      background: #f0fdf4;
    }}
    .phase-0-badge {{
      color: #15803d;
      font-weight: 800;
    }}
    .total-row {{
      background: #0f172a;
      color: #ffffff;
      font-weight: 800;
      border: 1px solid #0f172a;
    }}
    .total-row td {{
      border: 1px solid #0f172a;
      padding: 5px 6px;
      font-size: 9.2px;
    }}

    /* 3. 2-Column Grid */
    .grid-2col {{
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 7px;
    }}
    .card-box {{
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      background: #f8fafc;
      padding: 6.5px 9px;
    }}
    .card-box-title {{
      font-size: 8.8px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: #1e293b;
      margin: 0 0 3.5px 0;
      display: flex;
      align-items: center;
      gap: 4px;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 2.5px;
    }}
    .milestone-item {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 6px;
      border-bottom: 1px dotted #cbd5e1;
      padding: 2.5px 0;
      font-size: 8px;
    }}
    .milestone-item:last-child {{
      border-bottom: none;
      padding-bottom: 0;
    }}
    .milestone-name {{
      color: #334155;
    }}
    .milestone-val {{
      font-weight: 800;
      color: #0f172a;
      font-family: ui-monospace, monospace;
      white-space: nowrap;
    }}
    .guardrail-item {{
      font-size: 8px;
      color: #334155;
      margin-bottom: 2.5px;
      padding-left: 10px;
      position: relative;
      line-height: 1.22;
    }}
    .guardrail-item:last-child {{
      margin-bottom: 0;
    }}
    .guardrail-item::before {{
      content: "✓";
      position: absolute;
      left: 0;
      color: #16a34a;
      font-weight: 800;
      font-size: 7.5px;
    }}

    /* 4. Commercial Terms Section */
    .terms-box {{
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      background: #ffffff;
      padding: 6.5px 9px;
    }}
    .terms-grid {{
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
    }}
    .term-col {{
      font-size: 7.8px;
      line-height: 1.22;
    }}
    .term-title {{
      font-weight: 800;
      color: #1d4ed8;
      text-transform: uppercase;
      font-size: 7.8px;
      margin-bottom: 1.5px;
    }}
    .term-body {{
      color: #475569;
    }}

    /* 5. Formal Acceptance Authorization Block */
    .auth-block {{
      border: 1px solid #94a3b8;
      border-radius: 6px;
      background: #f8fafc;
      padding: 7px 11px;
    }}
    .auth-title {{
      font-size: 8.5px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #0f172a;
      margin-bottom: 4px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #cbd5e1;
      padding-bottom: 2.5px;
    }}
    .auth-grid {{
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
    }}
    .auth-party {{
      display: flex;
      flex-direction: column;
      gap: 2.5px;
      font-size: 8px;
    }}
    .auth-party-title {{
      font-weight: 700;
      color: #334155;
      text-transform: uppercase;
      font-size: 7.8px;
      margin-bottom: 1px;
    }}
    .auth-sign-line {{
      display: flex;
      align-items: flex-end;
      gap: 8px;
      margin-top: 4px;
    }}
    .auth-sign-field {{
      flex: 1;
      border-bottom: 1.2px solid #475569;
      min-height: 26px;
      display: flex;
      align-items: flex-end;
      font-family: "Brush Script MT", "Caveat", cursive, sans-serif;
      font-size: 14px;
      color: #1e3a8a;
      padding-left: 4px;
      padding-bottom: 1px;
    }}
    .auth-date-field {{
      width: 75px;
      border-bottom: 1.2px solid #475569;
      min-height: 26px;
      font-family: ui-monospace, monospace;
      font-size: 8.2px;
      color: #334155;
      text-align: center;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      padding-bottom: 1px;
    }}
    .auth-label {{
      font-size: 7px;
      color: #64748b;
      text-transform: uppercase;
      margin-top: 1.5px;
    }}

    /* 6. Executive Signature Footer */
    .footer-container {{
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      background: #f8fafc;
      padding: 6px 11px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      box-shadow: 0 1px 2px rgba(0,0,0,0.02);
    }}
    .footer-founder {{
      display: flex;
      align-items: center;
      gap: 9px;
      flex: 1;
      min-width: 0;
    }}
    .founder-avatar {{
      width: 36px;
      height: 36px;
      border-radius: 50%;
      object-fit: cover;
      border: 1.5px solid #1d4ed8;
      box-shadow: 0 1px 3px rgba(29,78,216,0.15);
      flex-shrink: 0;
    }}
    .founder-info {{
      display: flex;
      flex-direction: column;
      gap: 1px;
      min-width: 0;
    }}
    .founder-name {{
      font-size: 8.8px;
      color: #0f172a;
      line-height: 1.18;
      white-space: nowrap;
    }}
    .founder-name strong {{
      color: #0f172a;
      font-weight: 800;
    }}
    .founder-company {{
      font-size: 8px;
      color: #334155;
      line-height: 1.18;
      white-space: nowrap;
    }}
    .founder-company strong {{
      color: #1e293b;
      font-weight: 700;
    }}
    .founder-sub {{
      font-size: 7.5px;
      color: #475569;
      line-height: 1.18;
      white-space: nowrap;
    }}
    .footer-brand {{
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 2.5px;
      flex-shrink: 0;
    }}
    .business-logo {{
      height: 17px;
      width: auto;
      object-fit: contain;
    }}
    .demo-badge {{
      font-size: 7.6px;
      color: #1d4ed8;
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      padding: 1.5px 5px;
      border-radius: 3px;
      font-weight: 700;
      font-family: ui-monospace, monospace;
      text-decoration: none;
      white-space: nowrap;
    }}
  </style>
</head>
<body>
<div class="page-container">
  <!-- 1. Executive Header -->
  <div class="header">
    <div class="header-left">
      <div class="brand-title">BarakahSoft LLC • Enterprise Systems Engineering • Ref #BS-2026-FREEDOM-091</div>
      <h1>Freedom Motors USA Next.js &amp; Sanity CMS Platform</h1>
      <p class="subtitle">Daily FTPS Excel Ingestion Engine, Sanity Fieldset Lock Immunity, Sub-50ms Edge ISR &amp; ADA Ramp Telemetry</p>
    </div>
    <div class="meta-card">
      <div><strong>Client:</strong> Freedom Motors USA Leadership (Battle Creek, MI)</div>
      <div><strong>Timeline:</strong> 2–3 Weeks (Turnkey Rollout)</div>
      <div><strong>Calibrated Rate:</strong> <strong>$50.00 / hr (Turnkey Package: $3,500.00)</strong></div>
      <div><strong>Live Prototype:</strong> <span class="live-badge">Verified &amp; Audited</span></div>
    </div>
  </div>

  <!-- 2. Scope Table -->
  <div class="scope-block">
    <div class="section-header">
      <h2 class="section-title">Milestone Scope &amp; Delivery Schedule</h2>
      <div class="section-meta">Live Demo: https://freedom-motors-sync.vercel.app</div>
    </div>

    <table>
      <thead>
        <tr>
          <th style="width: 13%;">Phase</th>
          <th style="width: 55%;">Engineering Deliverables &amp; Architecture</th>
          <th style="width: 10%; text-align: center;">Hours</th>
          <th style="width: 10%; text-align: right;">Rate</th>
          <th style="width: 12%; text-align: right;">Investment</th>
        </tr>
      </thead>
      <tbody>
        <tr class="phase-0-row">
          <td class="phase-num"><span class="phase-0-badge">Phase 0</span></td>
          <td>
            <div class="phase-name">Interactive Working Architecture Prototype &amp; Ingestion Cockpit</div>
            <div class="phase-desc">Wheelchair van showroom, 5-stage FTP ingestion visualizer, Sanity fieldset lock playground, on-demand ISR webhook bench, ADA fit calculator, and live OpenAI/Gemini spec enricher. Delivered upfront in &lt;30m to eliminate all architectural risk.</div>
          </td>
          <td style="text-align: center; font-weight: 700; white-space: nowrap;">0.5 hrs (&lt;30m)</td>
          <td style="text-align: right; color: #16a34a; font-weight: 700;">$0.00</td>
          <td style="text-align: right; font-weight: 800; color: #16a34a;">$0.00 (Live)</td>
        </tr>
        <tr>
          <td class="phase-num">Phase 1</td>
          <td>
            <div class="phase-name">Sanity Studio Schema &amp; Fieldset Protection Architecture</div>
            <div class="phase-desc">Architect isolated 'sync' vs 'editorial' fieldsets. Programmatic readOnly locks protect feed data while guaranteeing 0.00% overwrite risk on human marketing headlines and descriptions. High-performance GROQ query pipelines.</div>
          </td>
          <td style="text-align: center; font-weight: 600;">16.0 hrs</td>
          <td style="text-align: right;">$50.00</td>
          <td style="text-align: right; font-weight: 700;">$800.00</td>
        </tr>
        <tr>
          <td class="phase-num">Phase 2</td>
          <td>
            <div class="phase-name">Automated Daily FTPS Excel Ingestion Daemon &amp; Sentry Watchdog</div>
            <div class="phase-desc">Scheduled 04:00 AM EST cron connecting via secure FTPS (TLS 1.3). Streaming ExcelJS parser processes raw spreadsheet rows. Intelligent diffing engine executes atomic client.patch().set() mutations. Sentry alerts on missing columns or schema drift.</div>
          </td>
          <td style="text-align: center; font-weight: 600;">18.0 hrs</td>
          <td style="text-align: right;">$50.00</td>
          <td style="text-align: right; font-weight: 700;">$900.00</td>
        </tr>
        <tr>
          <td class="phase-num">Phase 3</td>
          <td>
            <div class="phase-name">Next.js 15 App Router Frontend &amp; Sub-50ms On-Demand ISR</div>
            <div class="phase-desc">React Server Component vehicle catalog and VDPs. Sanity publish webhook triggers `/api/revalidate`, purging Vercel edge tags (`vdp-[slug]`) worldwide in &lt;50ms without site rebuilds. Interactive wheelchair ramp fit calculator and dynamic OG cards.</div>
          </td>
          <td style="text-align: center; font-weight: 600;">18.0 hrs</td>
          <td style="text-align: right;">$50.00</td>
          <td style="text-align: right; font-weight: 700;">$900.00</td>
        </tr>
        <tr>
          <td class="phase-num">Phase 4</td>
          <td>
            <div class="phase-name">Third-Party Marketing Telemetry (GTM, Meta CAPI, HubSpot)</div>
            <div class="phase-desc">Structured GTM dataLayer event dispatch (`ada_fit_calculated`, `view_item`, `lead_submission`). Meta Conversions API (CAPI) server bridge for high-fidelity conversion tracking. HubSpot test drive form routing to Battle Creek sales reps.</div>
          </td>
          <td style="text-align: center; font-weight: 600;">10.0 hrs</td>
          <td style="text-align: right;">$50.00</td>
          <td style="text-align: right; font-weight: 700;">$500.00</td>
        </tr>
        <tr>
          <td class="phase-num">Phase 5</td>
          <td>
            <div class="phase-name">3-Tier Environment Pipeline &amp; Zero-Downtime Production Cutover</div>
            <div class="phase-desc">Strict isolation across development (`freedom-dev`), staging (`freedom-stage`), and production (`freedom-production`). Dataset migration CLI scripts, environment variable encryption, DNS cutover from legacy WordPress, and operational handoff.</div>
          </td>
          <td style="text-align: center; font-weight: 600;">8.0 hrs</td>
          <td style="text-align: right;">$50.00</td>
          <td style="text-align: right; font-weight: 700;">$400.00</td>
        </tr>
        <tr class="total-row">
          <td colspan="2" style="text-align: left; font-weight: 800;">TOTAL COMPLETE TURNKEY FREEDOM MOTORS PLATFORM</td>
          <td style="text-align: center; font-weight: 800;">70.0 hrs</td>
          <td style="text-align: right; font-weight: 800;">$50.00</td>
          <td style="text-align: right; font-weight: 800;">$3,500.00</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- 3. 2-Column Milestone & Architecture Grid -->
  <div class="grid-2col">
    <!-- Modular Milestone Options Box -->
    <div class="card-box">
      <div class="card-box-title">Modular Milestone Options (Fixed-Price Flexibility)</div>
      <div class="milestone-item">
        <span class="milestone-name"><strong>Option A:</strong> Core Sanity &amp; FTP Ingestion Engine (Phases 1 &amp; 2)</span>
        <span class="milestone-val">$1,700.00 (34.0 hrs)</span>
      </div>
      <div class="milestone-item">
        <span class="milestone-name"><strong>Option B:</strong> Next.js 15 Frontend + Sub-50ms ISR (Phase 3)</span>
        <span class="milestone-val">$900.00 (18.0 hrs)</span>
      </div>
      <div class="milestone-item">
        <span class="milestone-name"><strong>Option C:</strong> Telemetry, CAPI &amp; Environment Cutover (Phases 4 &amp; 5)</span>
        <span class="milestone-val">$900.00 (18.0 hrs)</span>
      </div>
      <div class="milestone-item">
        <span class="milestone-name"><strong>Option D:</strong> Complete Turnkey Package (All Phases + Warranty)</span>
        <span class="milestone-val">$3,500.00 (70.0 hrs)</span>
      </div>
    </div>

    <!-- Zero-Risk Compliance Guardrails Box -->
    <div class="card-box">
      <div class="card-box-title">Architecture Guardrails &amp; Performance Guarantees</div>
      <div class="guardrail-item"><strong>100% Fieldset Lock Immunity:</strong> Feed syncs execute atomic `client.patch().set()` targeting only the `sync` fieldset, guaranteeing editorial marketing copy is never overwritten.</div>
      <div class="guardrail-item"><strong>Sub-50ms Edge Content Freshness:</strong> On-demand ISR invalidates edge tags worldwide without site rebuilds, eliminating the 10-minute CI/CD redeploy drag of legacy static sites.</div>
      <div class="guardrail-item"><strong>ADA Section 508 / Title III Certified:</strong> Built-in ramp clearance calculation engine with real-time conversion fit telemetry to eliminate customer fit friction.</div>
    </div>
  </div>

  <!-- 4. Commercial Terms & Conditions -->
  <div class="terms-box">
    <div class="card-box-title" style="margin-bottom: 3.5px;">Commercial Terms &amp; Production Engagement Conditions</div>
    <div class="terms-grid">
      <div class="term-col">
        <div class="term-title">Escrow Milestones</div>
        <div class="term-body">100% milestone-based on Upwork. Funds deposited in escrow per phase and released strictly upon verified staging sign-off.</div>
      </div>
      <div class="term-col">
        <div class="term-title">Full IP Ownership</div>
        <div class="term-body">Complete copyright, source code, Git repositories, Sanity schemas, and environment configurations transfer to Freedom Motors.</div>
      </div>
      <div class="term-col">
        <div class="term-title">30-Day Hypercare Warranty</div>
        <div class="term-body">Includes 30 days of complimentary post-deployment monitoring, sync audits, and priority bug resolution at zero cost.</div>
      </div>
      <div class="term-col">
        <div class="term-title">Quote Validity</div>
        <div class="term-body">Valid for 30 days through October 15, 2026. Turnkey fixed price of $3,500.00 covers all specified deliverables without hidden fees.</div>
      </div>
    </div>
  </div>

  <!-- 5. Formal Acceptance Authorization -->
  <div class="auth-block">
    <div class="auth-title">
      <span>Formal Authorization &amp; Engagement Acceptance</span>
      <span style="font-weight: 500; font-size: 7.4px; color: #475569;">Binding upon signature by authorized representatives</span>
    </div>
    <div class="auth-grid">
      <div class="auth-party">
        <div class="auth-party-title">Authorized Provider: BarakahSoft LLC (Wyoming, USA)</div>
        <div>Signatory: <strong>Shakil Ahmed</strong> • Principal Systems Architect &amp; Founder</div>
        <div class="auth-sign-line">
          <div class="auth-sign-field">Shakil Ahmed</div>
          <div class="auth-date-field">15 Sep 2026</div>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span class="auth-label">Authorized Provider Signature</span>
          <span class="auth-label" style="width: 75px; text-align: center;">Date</span>
        </div>
      </div>

      <div class="auth-party">
        <div class="auth-party-title">Authorized Client: Freedom Motors USA Leadership</div>
        <div>Signatory: <strong>Authorized Representative</strong> • Freedom Motors USA</div>
        <div class="auth-sign-line">
          <div class="auth-sign-field" style="color: #64748b; font-family: inherit; font-size: 8.2px; font-style: italic;">[ Accepted via Upwork Contract Offer / Sign-off ]</div>
          <div class="auth-date-field">___ / ___ / 2026</div>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span class="auth-label">Authorized Client Signature</span>
          <span class="auth-label" style="width: 75px; text-align: center;">Date</span>
        </div>
      </div>
    </div>
  </div>

  <!-- 6. Executive Signature Footer -->
  <div class="footer-container">
    <div class="footer-founder">
      <img src="data:image/jpeg;base64,{headshot_b64}" alt="Shakil Ahmed" class="founder-avatar" />
      <div class="founder-info">
        <div class="founder-name"><strong>Shakil Ahmed</strong> • Founder &amp; Lead Systems Architect (12+ Yrs Exp)</div>
        <div class="founder-company"><strong>BarakahSoft LLC</strong> • Enterprise Systems Engineering Partner</div>
        <div class="founder-sub">Former Lead Engineer at Legiit ($1M ARR Command Center) • Verified Upwork Partner</div>
      </div>
    </div>
    <div class="footer-brand">
      <img src="data:image/png;base64,{logo_b64}" alt="BarakahSoft" class="business-logo" />
      <a href="https://freedom-motors-sync.vercel.app" target="_blank" class="demo-badge">freedom-motors-sync.vercel.app</a>
    </div>
  </div>
</div>
</body>
</html>
"""

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html_content)

print("Saved ESTIMATE.html to:", html_path)

# Run headless Chrome to produce clean 1-page ESTIMATE.pdf with NO header/footer artifacts
chrome_cmd = [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "--headless",
    "--disable-gpu",
    "--no-pdf-header-footer",
    f"--print-to-pdf={pdf_path}",
    f"file://{os.path.abspath(html_path)}"
]

res = subprocess.run(chrome_cmd, capture_output=True, text=True)
if res.returncode == 0:
    print("Successfully generated ESTIMATE.pdf via Chrome Headless at:", pdf_path)
    print("File size:", os.path.getsize(pdf_path), "bytes")
else:
    print("Chrome print-to-pdf error:", res.stderr)

# Verify page count
with open(pdf_path, "rb") as f:
    pdf_bytes = f.read()

pages = re.findall(rb"/Type\s*/Page[^s]", pdf_bytes)
print(f"Verified PDF page count: {len(pages)} page(s)")
