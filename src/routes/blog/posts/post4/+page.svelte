<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>!important vs Specificity: Who Really Wins?</title>
  <meta name="description" content="When does !important override specificity? When does it lose? Complete guide with real-world examples." />
  <meta property="og:title" content="!important vs Specificity: Who Really Wins?" />
  <meta property="og:description" content="Discover the exact rules of the CSS cascade when !important is involved." />
  <meta property="og:url" content="{base}/blog/posts/post4" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}/blog">Blog</a> <span>/</span> <p>!important vs Specificity</p>
  </div>

  <article class="prose">
    <h1>!important vs Specificity: Who Really Wins?</h1>
    <p class="post-meta">Published: November 25, 2025</p>

    <p class="lead">
      You’ve probably heard it a thousand times: “Never use !important!” But what actually happens when you do? Let’s settle this once and for all.
    </p>

    <h2>The Official Cascade Order (2025)</h2>
    <p>Modern browsers follow this strict priority (highest to lowest):</p>
    <ol>
      <li>Transition declarations</li>
      <li><strong>!important user agent styles</strong></li>
      <li><strong>!important user styles</strong> (e.g. browser extensions)</li>
      <li><strong>!important author styles</strong> ← Your CSS with !important</li>
      <li>Animation declarations</li>
      <li>Normal author styles (regular specificity)</li>
      <li>User styles (without !important)</li>
      <li>User agent styles (browser defaults)</li>
    </ol>

    <div class="alert alert-danger my-4 p-4 bg-light border-start border-danger border-4">
      <strong>Key rule:</strong><br>
      Any <code>!important</code> declaration beats <em>all</em> normal specificity — even a selector with 100 IDs.
    </div>

    <h2>Real-World Example</h2>
    <pre><code>#header .nav .item &#123; color: red !important; &#125;   → wins<br>
body div#main &#123; color: blue; &#125;                     → loses<br>
</code></pre>

    <h2>When !important Actually Loses</h2>
    <p>It loses to:</p>
    <ul>
      <li>Another <code>!important</code> with higher cascade position</li>
      <li>Inline styles with <code>!important</code></li>
      <li>User agent or user <code>!important</code> styles</li>
    </ul>

    <h2>Why You Should (Almost) Never Use It</h2>
    <p>!important creates “specificity black holes” — future styles must use even more !important to override. It breaks the cascade and makes maintenance hell.</p>

    <h2>FAQ</h2>
    <details>
      <summary>Is there ever a valid use case?</summary>
      <p>Yes — quick hotfixes, third-party widget overrides, or utility classes in very controlled design systems.</p>
    </details>
    <details>
      <summary>Can specificity ever beat !important?</summary>
      <p>Never. !important always wins against normal rules.</p>
    </details>

    <p class="italic-note">
      Use !important only when you truly have no other choice — and document why.
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

  .prose details {
    background: var(--secondary-bg);
    border: 1px solid var(--border-color);
    border-radius: 6px;
    padding: 1rem;
    margin-bottom: 1rem;
    transition: background-color 0.2s ease;
  }
  
  .prose details[open] {
    background-color: var(--card-bg);
  }

  .prose summary {
    cursor: pointer;
    font-weight: 600;
    color: var(--accent-secondary);
    list-style: none;
  }
  
  .prose summary::-webkit-details-marker {
    display: none;
  }
  
  .prose summary::before {
    content: '+';
    margin-right: 0.75rem;
    color: var(--accent-primary);
    font-weight: bold;
    display: inline-block;
    transition: transform 0.2s ease;
  }

  .prose details[open] summary::before {
    transform: rotate(45deg);
  }
  
  .prose details p {
    margin-top: 1rem;
    padding-left: 1.5rem;
    border-left: 2px solid var(--accent-primary);
    color: var(--text-secondary);
  }

  .prose .italic-note {
    font-style: italic;
    color: var(--text-secondary);
    text-align: center;
    margin-top: 3rem;
  }
</style>
