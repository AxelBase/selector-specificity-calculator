<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>Why :not(), :is(), and :has() Don’t Add Extra Specificity</title>
  <meta name="description" content="Learn how modern functional pseudo-classes actually affect the cascade — and why :where() is a game-changer." />
  <meta property="og:title" content="Why :not(), :is(), and :has() Don’t Add Extra Specificity" />
  <meta property="og:url" content="{base}/blog/posts/post3" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}/blog">Blog</a> <span>/</span> <p>Modern Pseudo-classes & Specificity</p>
  </div>

  <article class="prose">
    <h1>Why :not(), :is(), and :has() Don’t Add Extra Specificity</h1>
    <p class="post-meta">Published: November 25, 2025</p>

    <p class="lead">
      Modern CSS introduced powerful new pseudo-classes like :not(), :is(), :where(), and :has(). But many developers are surprised to learn: <strong>most of them add zero specificity themselves</strong>.
    </p>

    <h2>The Old Rule Still Applies</h2>
    <p>Only the selectors <em>inside</em> these functions contribute to specificity. The function wrapper usually adds nothing.</p>

    <h2>Breakdown by Pseudo-class</h2>
    <ul>
      <li><strong>:not()</strong> → 0 specificity. Only its argument counts.<br>
        <code>:not(.active)</code> → 0-0-1-0</li>
      <li><strong>:is()</strong> → Uses the <em>highest</em> specificity of its arguments.<br>
        <code>:is(article, aside) h1</code> → 0-0-0-2 (same as h1)</li>
      <li><strong>:where()</strong> → Always 0 specificity — even for its arguments!<br>
        <code>:where(#main) .card</code> → 0-0-1-0 (the #main is ignored!)</li>
      <li><strong>:has()</strong> → 0 specificity for the function itself.<br>
        <code>section:has(h2)</code> → 0-0-0-2</li>
    </ul>

    <div class="alert alert-success my-4 p-4 bg-light border-start border-success border-4">
      <strong>Pro tip:</strong> Use :where() to write reusable, low-specificity components without specificity wars.
    </div>

<h2>Real-World Example</h2>
<pre><code>:where(.card) &#123; padding: 1rem; &#125;        → 0-0-0-0<br>
.card &#123; padding: 2rem; &#125;                 → 0-0-1-0<br></code></pre>
<p>The second rule wins — even though :where() contains a class!</p>    <p>The second rule wins — even though :where() contains a class!</p>

    <h2>FAQ</h2>
    <details>
      <summary>Can :has() ever increase specificity?</summary>
      <p>No. The relational selector adds no weight — only the subject and its contents do.</p>
    </details>
    <details>
      <summary>Should I replace all classes with :where()?</summary>
      <p>Only for base styles. Keep meaningful classes for overrides.</p>
    </details>

    <p class="italic-note">
      Modern CSS finally gives us tools to write scalable stylesheets — without fighting specificity.
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
