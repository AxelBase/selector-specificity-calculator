<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>The 0-0-0-0 Rule Explained | Specificity Calculator</title>
  <meta name="description" content="Deep dive into the four-column specificity system: inline styles, IDs, classes, and elements." />
  <meta property="og:title" content="The 0-0-0-0 Rule Explained" />
  <meta property="og:description" content="Understand exactly how browsers calculate CSS selector specificity using the 0-0-0-0 scoring system." />
  <meta property="og:url" content="{base}/blog/posts/post2" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}/blog">Blog</a> <span>/</span> <p>The 0-0-0-0 Rule Explained</p>
  </div>

  <article class="prose">
    <h1>The 0-0-0-0 Rule Explained</h1>
    <p class="post-meta">Published: November 25, 2025</p>

    <p class="lead">
      The famous “0-0-0-0” format isn’t just a meme — it’s the official way browsers calculate which CSS rule wins. Let’s break it down column by column.
    </p>

    <h2>Column 1: Inline Styles (style="")</h2>
    <p>Always wins unless overridden by !important. Score: <code>1-0-0-0</code></p>

    <h2>Column 2: ID Selectors (#header)</h2>
    <p>Extremely powerful. One ID beats any number of classes.</p>
    <ul>
      <li><code>#main</code> → 0-1-0-0</li>
      <li><code>#header .nav</code> → 0-1-0-1</li>
    </ul>

    <h2>Column 3: Classes, Attributes, Pseudo-classes</h2>
    <p>All of these count equally:</p>
    <ul>
      <li>Classes (.btn)</li>
      <li>Attribute selectors ([type="text"])</li>
      <li>Pseudo-classes (:hover, :focus, :not())</li>
    </ul>

    <h2>Column 4: Elements and Pseudo-elements</h2>
    <p>Weakest of all:</p>
    <ul>
      <li>div, p, h1</li>
      <li>::before, ::after, ::first-line</li>
    </ul>

    <div class="alert alert-warning my-4 p-4 bg-light border-start border-warning border-4">
      <strong>Myth busted:</strong> 10 classes do <em>not</em> beat 1 ID.<br>
      <code>.a.b.c.d.e.f.g.h.i.j</code> → 0-0-10-0 → still loses to <code>#header</code> (0-1-0-0)
    </div>

    <h2>How Browsers Compare</h2>
    <p>Browsers compare from left to right. Only move to the next column when tied.</p>

    <h2>FAQ</h2>
    <details>
      <summary>Does combining selectors increase specificity?</summary>
      <p>Yes — every part adds up. <code>div.button</code> → 0-0-1-1</p>
    </details>
    <details>
      <summary>What has zero specificity?</summary>
      <p>:where(), inherited styles, and the universal selector *</p>
    </details>

    <p class="italic-note">
      Once you internalize the 0-0-0-0 rule, CSS becomes predictable instead of magical.
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
