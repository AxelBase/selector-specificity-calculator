<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>Best Practices for Writing Low-Specificity CSS</title>
  <meta name="description" content="Write scalable, maintainable styles using modern techniques: BEM, :where(), utilities, and more." />
  <meta property="og:title" content="Best Practices for Writing Low-Specificity CSS" />
  <meta property="og:url" content="{base}/blog/posts/post7" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}/blog">Blog</a> <span>/</span> <p>Low-Specificity Best Practices</p>
  </div>

  <article class="prose">
    <h1>Best Practices for Writing Low-Specificity CSS</h1>
    <p class="post-meta">Published: November 25, 2025</p>

    <p class="lead">
      The most maintainable codebases aren’t the ones with perfect specificity — they’re the ones that avoid specificity wars entirely.
    </p>

    <h2>Modern Techniques (2025)</h2>
    <ul>
      <li>Use <code>:where()</code> for base component styles</li>
      <li>Prefer single-class selectors</li>
      <li>Avoid selector nesting when possible</li>
      <li>Use CSS custom properties for theming</li>
      <li>Utility-first when appropriate</li>
    </ul>

    <h2>Golden Rules</h2>
    <ul>
      <li>Never use IDs in CSS</li>
      <li>Never nest more than 2 levels</li>
      <li>Use BEM or similar for clarity</li>
      <li>Keep specificity as flat as possible</li>
    </ul>

    <h2>FAQ</h2>
    <details>
      <summary>Should I use reset or normalize?</summary>
      <p>Both — modern resets + normalize for consistency.</p>
    </details>

    <p class="italic-note">
      Write CSS that future-you will thank you for.
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
