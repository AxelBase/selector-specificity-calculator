<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>Privacy Policy | CSS Selector Specificity Calculator</title>
  <meta name="description" content="We collect zero data. Everything runs in your browser — no tracking, no cookies, no servers." />
  <meta property="og:title" content="Privacy Policy | CSS Selector Specificity Calculator" />
  <meta property="og:description" content="This tool runs 100% client-side. Your selectors never leave your device." />
  <meta property="og:url" content="{base}/privacy" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}/">Home</a> <span>/</span> <p>Privacy Policy</p>
  </div>

  <article class="prose">
    <h1>Privacy Policy</h1>
    <p class="post-meta">Effective Date: November 25, 2025</p>

    <p class="lead">
      <strong>Your privacy is absolute.</strong> The CSS Selector Specificity Calculator runs <em>entirely in your browser</em>. We do not collect, store, transmit, or log any data — period.
    </p>

    <h2>1. No Data Collection</h2>
    <p>This tool processes all CSS selectors locally on your device using pure JavaScript. We do <strong>not</strong> collect:</p>
    <ul>
      <li>Any CSS selectors you enter</li>
      <li>IP addresses, browser fingerprints, or device information</li>
      <li>Usage statistics or analytics</li>
      <li>Cookies, localStorage (beyond temporary session), or any tracking pixels</li>
    </ul>

    <h2>2. 100% Client-Side Operation</h2>
    <p>Every calculation happens in your browser. When you:</p>
    <ul>
      <li>Type a selector → processed instantly in memory</li>
      <li>Click “Copy Results” → uses the browser’s native clipboard API</li>
      <li>Share a URL → only encodes selectors in the URL fragment (#?q=…)</li>
    </ul>
    <p><strong>Nothing is ever sent to any server.</strong></p>

    <h2>3. Third-Party Services</h2>
    <p>We use only Bootstrap 5 and Bootstrap Icons via official CDN (jsDelivr) for styling. These CDNs do not track individual users on static GitHub Pages sites. No analytics, no ads, no telemetry.</p>

    <h2>4. Data Security</h2>
    <p>Because no data leaves your device, there is no server to hack, no database to breach, and no logs to leak. Your selectors remain private by design.</p>

    <h2>5. Children’s Privacy</h2>
    <p>This tool is safe and appropriate for users of all ages. No personal information is ever requested or stored.</p>

    <h2>6. Changes to This Policy</h2>
    <p>As a static open-source project, any change to privacy practices would require a new version. Updates will be clearly announced on GitHub and reflected here.</p>

    <h2>7. Contact</h2>
    <p>This tool is open source and community-driven. Questions? Open an issue on our <a href="https://github.com/axelbase/selector-specificity-calculator" target="_blank" rel="noopener">GitHub repository</a>.</p>

    <p class="italic-note">
      <strong>We believe privacy isn’t a feature — it’s the default.</strong><br>
      Use this tool with complete confidence. Your CSS stays yours.
    </p>
  </article>
</div>

<style>
  .post-layout {
    max-width: 800px;
    padding-top: 2rem;
    padding-bottom: 4rem;
  }

  .breadcrumbs {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
    font-size: 0.9rem;
    color: var(--text-secondary);
  }
  .breadcrumbs a {
    color: var(--accent-secondary);
  }
  .breadcrumbs a:hover {
    text-decoration: underline;
  }
  .breadcrumbs p {
    margin: 0;
  }

  .prose {
    line-height: 1.8;
  }

  .prose .post-meta {
    color: var(--text-secondary);
    font-size: 0.9rem;
    margin-bottom: 2rem;
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 1rem;
  }

  .prose h1, .prose h2{
    color: var(--accent-secondary);
  }

  .prose h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }

  .prose h2 {
    margin-top: 2.5rem;
    border-bottom: 1px solid var(--secondary-bg);
    padding-bottom: 0.5rem;
  }
  .prose p {
    color: var(--text-primary);
  }
  .prose ul {
    list-style-type: '→ ';
    padding-left: 1.5rem;
    color: var(--text-primary);
  }
  .prose ul li::marker {
    color: var(--accent-primary);
  }
  .prose ul li {
    padding-left: 0.5rem;
    margin-bottom: 0.5rem;
  }
  .prose .italic-note {
    font-style: italic;
    color: var(--text-secondary);
    text-align: center;
    margin-top: 3rem;
  }
</style>
