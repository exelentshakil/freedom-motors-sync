import os
import subprocess

html_content = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Freedom Motors USA — Estimate & Architecture Scope</title>
  <style>
    @page {
      size: letter portrait;
      margin: 6mm 8mm;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #0f172a;
      background: #ffffff;
      line-height: 1.25;
      font-size: 11px;
      height: 100vh;
      max-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 2px solid #1d4ed8;
      padding-bottom: 8px;
    }
    .brand-title {
      font-size: 18px;
      font-weight: 800;
      color: #1e293b;
      letter-spacing: -0.5px;
    }
    .brand-subtitle {
      font-size: 10.5px;
      font-weight: 600;
      color: #1d4ed8;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-top: 1px;
    }
    .meta-box {
      text-align: right;
      font-size: 10px;
      color: #475569;
      line-height: 1.35;
    }
    .meta-box strong {
      color: #0f172a;
    }

    .callout-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 6px;
      margin: 6px 0;
    }
    .callout-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 6px 8px;
    }
    .callout-title {
      font-size: 9.5px;
      font-weight: 700;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }
    .callout-val {
      font-size: 12px;
      font-weight: 800;
      color: #0f172a;
      margin-top: 2px;
    }
    .callout-sub {
      font-size: 9px;
      color: #64748b;
    }

    .section-title {
      font-size: 11px;
      font-weight: 800;
      color: #1e293b;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-left: 3px solid #1d4ed8;
      padding-left: 6px;
      margin: 6px 0 4px 0;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 10px;
      margin-bottom: 6px;
    }
    th {
      background: #f1f5f9;
      color: #334155;
      font-weight: 700;
      text-align: left;
      padding: 5px 8px;
      border-top: 1px solid #cbd5e1;
      border-bottom: 1px solid #cbd5e1;
      font-size: 9.5px;
      text-transform: uppercase;
      letter-spacing: 0.4px;
    }
    td {
      padding: 5px 8px;
      border-bottom: 1px solid #f1f5f9;
      vertical-align: top;
    }
    tr:last-child td {
      border-bottom: 1px solid #cbd5e1;
    }
    .phase-badge {
      font-weight: 700;
      color: #1d4ed8;
      white-space: nowrap;
    }
    .phase-delivered {
      color: #16a34a;
      font-weight: 700;
      white-space: nowrap;
    }
    .task-desc {
      color: #64748b;
      font-size: 9.5px;
      margin-top: 1px;
    }
    .num-col {
      text-align: right;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-weight: 600;
      white-space: nowrap;
    }

    .summary-card {
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      border-radius: 6px;
      padding: 7px 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 6px;
    }
    .summary-label {
      font-size: 11px;
      font-weight: 700;
      color: #1e40af;
    }
    .summary-desc {
      font-size: 9.5px;
      color: #3b82f6;
    }
    .summary-total {
      font-size: 18px;
      font-weight: 900;
      color: #1e3a8a;
      font-family: ui-monospace, SFMono-Regular, monospace;
    }

    .footer-grid {
      display: grid;
      grid-template-columns: 1.4fr 1fr;
      gap: 10px;
      border-top: 1px solid #e2e8f0;
      padding-top: 6px;
      align-items: flex-end;
    }
    .cred-title {
      font-size: 10px;
      font-weight: 800;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.4px;
    }
    .cred-body {
      font-size: 9.5px;
      color: #475569;
      line-height: 1.3;
      margin-top: 2px;
    }
    .sig-box {
      text-align: right;
      font-size: 9.5px;
      color: #64748b;
    }
    .sig-name {
      font-size: 12px;
      font-weight: 800;
      color: #0f172a;
    }
  </style>
</head>
<body>
  <div>
    <!-- Header -->
    <div class="header">
      <div>
        <div class="brand-title">Freedom Motors USA — Scope of Work & Estimate</div>
        <div class="brand-subtitle">Next.js 15 App Router + Sanity CMS Content Lake Migration</div>
      </div>
      <div class="meta-box">
        <div><strong>Client:</strong> Freedom Motors USA (Battle Creek, MI)</div>
        <div><strong>Date:</strong> September 2026 • <strong>Valid for:</strong> 30 Days</div>
        <div><strong>Rate:</strong> $38.00 / hour • <strong>Turnaround:</strong> 2–3 Weeks</div>
      </div>
    </div>

    <!-- 4 Architectural Highlights -->
    <div class="callout-grid">
      <div class="callout-card">
        <div class="callout-title">Ingestion Engine</div>
        <div class="callout-val">04:00 AM FTPS Cron</div>
        <div class="callout-sub">Streaming ExcelJS batch parser</div>
      </div>
      <div class="callout-card">
        <div class="callout-title">Editorial Safety</div>
        <div class="callout-val">0.00% Overwrite Risk</div>
        <div class="callout-sub">Sanity fieldset programmatic locks</div>
      </div>
      <div class="callout-card">
        <div class="callout-title">Edge Latency</div>
        <div class="callout-val">&lt; 50ms On-Demand ISR</div>
        <div class="callout-sub">revalidateTag without redeployment</div>
      </div>
      <div class="callout-card">
        <div class="callout-title">ADA Section 508</div>
        <div class="callout-val">100% Compliant</div>
        <div class="callout-sub">Wheelchair fit calculator & CAPI</div>
      </div>
    </div>

    <!-- Milestone Breakdown Table -->
    <div class="section-title">Milestone Breakdown & Deliverables</div>
    <table>
      <thead>
        <tr>
          <th style="width: 15%;">Phase</th>
          <th style="width: 55%;">Technical Deliverable Scope</th>
          <th class="num-col" style="width: 10%;">Hours</th>
          <th class="num-col" style="width: 10%;">Rate</th>
          <th class="num-col" style="width: 10%;">Subtotal</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><span class="phase-delivered">Phase 0 (Delivered)</span></td>
          <td>
            <strong>Interactive Architectural Demo & Migration Cockpit</strong>
            <div class="task-desc">Functional Next.js App Router prototype with live AI spec enricher, Sanity fieldset explorer, and webhook workbench.</div>
          </td>
          <td class="num-col">0 hrs</td>
          <td class="num-col">$0.00</td>
          <td class="num-col"><strong>$0.00</strong></td>
        </tr>
        <tr>
          <td><span class="phase-badge">Phase 1</span></td>
          <td>
            <strong>Sanity Studio Schema & Fieldset Locks</strong>
            <div class="task-desc">Isolated 'sync' vs 'editorial' fieldsets, programmatic readOnly access locks, GROQ catalog query pipelines.</div>
          </td>
          <td class="num-col">16 hrs</td>
          <td class="num-col">$38.00</td>
          <td class="num-col">$608.00</td>
        </tr>
        <tr>
          <td><span class="phase-badge">Phase 2</span></td>
          <td>
            <strong>Daily FTPS Ingestion Daemon & Sentry Watchdog</strong>
            <div class="task-desc">Scheduled 04:00 AM cron, streaming ExcelJS parser, atomic client.patch() mutations, error monitoring hooks.</div>
          </td>
          <td class="num-col">18 hrs</td>
          <td class="num-col">$38.00</td>
          <td class="num-col">$684.00</td>
        </tr>
        <tr>
          <td><span class="phase-badge">Phase 3</span></td>
          <td>
            <strong>Next.js 15 App Router Frontend & Sub-50ms ISR</strong>
            <div class="task-desc">React Server Component VDPs, on-demand edge tag revalidation, wheelchair ramp clearance fit calculator.</div>
          </td>
          <td class="num-col">18 hrs</td>
          <td class="num-col">$38.00</td>
          <td class="num-col">$684.00</td>
        </tr>
        <tr>
          <td><span class="phase-badge">Phase 4</span></td>
          <td>
            <strong>Third-Party Telemetry & CRM Lead Capture</strong>
            <div class="task-desc">Google Tag Manager dataLayer stream, Meta Conversions API (CAPI) server bridge, HubSpot test drive form routing.</div>
          </td>
          <td class="num-col">10 hrs</td>
          <td class="num-col">$38.00</td>
          <td class="num-col">$380.00</td>
        </tr>
        <tr>
          <td><span class="phase-badge">Phase 5</span></td>
          <td>
            <strong>3-Tier Environment Isolation & Production Cutover</strong>
            <div class="task-desc">Isolated datasets (dev/stage/prod), dataset migration CLI, zero-downtime DNS cutover, operational handoff.</div>
          </td>
          <td class="num-col">8 hrs</td>
          <td class="num-col">$38.00</td>
          <td class="num-col">$304.00</td>
        </tr>
      </tbody>
    </table>

    <!-- Financial Total Summary Banner -->
    <div class="summary-card">
      <div>
        <div class="summary-label">Turnkey Fixed-Price or Calibrated Hourly Scope</div>
        <div class="summary-desc">70 Billable Engineering Hours • 2–3 Week Turnaround • 30-Day Post-Launch Warranty Included</div>
      </div>
      <div style="text-align: right;">
        <div style="font-size: 9px; text-transform: uppercase; color: #1e40af; font-weight: 700;">Total Investment</div>
        <div class="summary-total">$2,660.00</div>
      </div>
    </div>
  </div>

  <!-- Footer & Verification Block -->
  <div class="footer-grid">
    <div>
      <div class="cred-title">Verified Systems Engineering Credentials</div>
      <div class="cred-body">
        <strong>Shakil Ahmed</strong> — Founder & Principal Systems Architect, BarakahSoft LLC<br>
        Verified Upwork Partner • 12+ Years Enterprise Systems Engineering<br>
        Former Lead Engineer at Legiit ($1M ARR Command Center, 1M+ Orders Handled)
      </div>
    </div>
    <div class="sig-box">
      <div class="sig-name">Md Shakil A.</div>
      <div>Principal Systems Architect</div>
      <div>github.com/exelentshakil</div>
    </div>
  </div>
</body>
</html>
"""

output_html = "docs/ESTIMATE.html"
with open(output_html, "w") as f:
    f.write(html_content)

print(f"Generated {output_html}")

# Generate PDF via headless Chrome
chrome_path = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
output_pdf = "docs/ESTIMATE.pdf"

if os.path.exists(chrome_path):
    cmd = [
        chrome_path,
        "--headless",
        "--disable-gpu",
        "--no-pdf-header-footer",
        f"--print-to-pdf={output_pdf}",
        output_html
    ]
    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.returncode == 0:
        print(f"Successfully generated {output_pdf}")
    else:
        print(f"Chrome PDF generation error: {res.stderr}")
else:
    print(f"Chrome not found at {chrome_path}")
