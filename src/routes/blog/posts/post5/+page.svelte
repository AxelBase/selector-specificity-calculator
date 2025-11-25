<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>Debugging Specificity Conflicts in Real Projects</title>
  <meta name="description" content="Step-by-step guide to finding and fixing 'why isn’t my CSS working?' issues using dev tools and this calculator." />
  <meta property="og:title" content="Debugging Specificity Conflicts in Real Projects" />
  <meta property="og:url" content="{base}/blog/posts/post5" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}/blog">Blog</a> <span>/</span> <p>Debugging Specificity</p>
  </div>

  <article class="prose">
    <h1>Debugging Specificity Conflicts in Real Projects</h1>
    <p class="post-meta">Published: November 25, 2025</p>

    <p class="lead">
      “Why isn’t my CSS working?” — The #1 question every front-end developer asks weekly. 95 % of the time: specificity.
    </p>

    <h2>Step-by-Step Debugging Process</h2>
    <ol>
      <li>Open DevTools → Elements panel</li>
      <li>Select the element that’s misbehaving</li>
      <li>Look at the Styles pane — crossed-out rules = lost to specificity</li>
      <li>Copy the winning and losing selectors</li>
      <li>Paste them here → see exactly who wins and why</li>
    </ol>

    <h2>Common Culprits</h2>
    <ul>
      <li>Bootstrap/Tailwind utility classes (high specificity)</li>
      <li>Deep nesting in CSS modules or SCSS</li>
      <li>Third-party libraries using #ids</li>
      <li>Legacy CSS with long selector chains</li>
    </ul>

    <div class="alert alert-success my-4 p-4 bg-light border-start border-success border-4">
      <strong>Pro tip:</strong> Use this tool during code reviews — paste component selectors and catch conflicts before they ship.
    </div>

    <h2>FAQ</h2>
    <details>
      <summary>How do I override a library’s styles?</summary>
      <p>Match or increase specificity — or use :where() for low-specificity base styles.</p>
    </details>
    <details>
      <summary>Why does my hover state not work?</summary>
      <p>Often because a non-hover rule has higher specificity.</p>
    </details>

    <p class="italic-note">
      Turn “CSS isn’t working” into “Ah, there’s the winner” in seconds.
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
