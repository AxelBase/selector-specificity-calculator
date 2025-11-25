<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>Terms & Conditions | CSS Selector Specificity Calculator</title>
  <meta name="description" content="Free, open-source tool provided as-is. No warranty, no liability." />
  <meta property="og:title" content="Terms & Conditions" />
  <meta property="og:description" content="Use this free tool at your own risk. No guarantees of accuracy or fitness for purpose." />
  <meta property="og:url" content="{base}/terms" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}/">Home</a> <span>/</span> <p>Terms & Conditions</p>
  </div>

  <article class="prose">
    <h1>Terms & Conditions</h1>
    <p class="post-meta">Effective Date: November 25, 2025</p>

    <p class="lead">
      By using the <strong>CSS Selector Specificity Calculator</strong>, you agree to these simple, fair terms.
    </p>

    <h2>1. Free and Open Source</h2>
    <p>This tool is <strong>completely free</strong> to use, share, and modify under the <strong>MIT License</strong>. You can fork it, host it, or embed it anywhere.</p>

    <h2>2. Provided “As Is”</h2>
    <p>The calculator is provided <em>as-is</em> and <em>as-available</em>, without any warranties of any kind — express or implied. While we strive for accuracy according to the official W3C CSS specification, we do not guarantee:</p>
    <ul>
      <li>100% correctness in edge cases</li>
      <li>Compatibility with future CSS specifications</li>
      <li>Fitness for any particular purpose</li>
    </ul>

    <h2>3. No Liability</h2>
    <p>In no event shall the authors or contributors be liable for any direct, indirect, incidental, special, or consequential damages arising from:</p>
    <ul>
      <li>Incorrect specificity calculations</li>
      <li>Loss of productivity due to CSS bugs</li>
      <li>Any damage caused by using this tool</li>
    </ul>
    <p>Use common sense. Always verify critical CSS in browser dev tools.</p>

    <h2>4. Acceptable Use</h2>
    <p>You agree not to:</p>
    <ul>
      <li>Use the tool for illegal purposes</li>
      <li>Attempt to overload or attack the hosting service (GitHub Pages)</li>
      <li>Misrepresent the tool as your own without attribution</li>
    </ul>

    <h2>5. Changes to Terms</h2>
    <p>We may update these terms at any time. Continued use after changes constitutes acceptance.</p>

    <h2>6. Governing Law</h2>
    <p>These terms are governed by the laws of open-source goodwill and common sense.</p>

    <p class="italic-note">
      <strong>This tool exists to help you write better CSS.</strong><br>
      Use it freely, learn from it, improve it — and pay it forward.
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
