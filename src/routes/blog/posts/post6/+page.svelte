<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>How Browsers Compare Two Selectors Step-by-Step</title>
  <meta name="description" content="The exact algorithm browsers use to determine which CSS rule wins — with examples." />
  <meta property="og:title" content="How Browsers Compare Two Selectors Step-by-Step" />
  <meta property="og:url" content="{base}/blog/posts/post6" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}/blog">Blog</a> <span>/</span> <p>Browser Comparison Algorithm</p>
  </div>

  <article class="prose">
    <h1>How Browsers Compare Two Selectors (Step-by-Step)</h1>
    <p class="post-meta">Published: November 25, 2025</p>

    <p class="lead">
      Ever wondered exactly how Chrome decides between two competing rules? Here’s the precise algorithm.
    </p>

    <h2>The Comparison Algorithm</h2>
    <ol>
      <li>Compare inline styles → winner?</li>
      <li>Compare IDs → different? → higher wins</li>
      <li>Compare classes/attributes/pseudo-classes → different? → higher wins</li>
      <li>Compare elements/pseudo-elements → different? → higher wins</li>
      <li>Tied so far → later in stylesheet wins (source order)</li>
    </ol>

    <h2>Real Example Walkthrough</h2>
    <pre><code>.card &#123; background: white; &#125;         → 0-0-1-0<br>
#main .card &#123; background: gray; &#125;        → 0-1-1-0<br>
</code></pre>
    <p>→ #main .card wins at step 2 (ID column)</p>

    <h2>Tie Breaker: Source Order</h2>
    <p>Only used when specificity is identical.</p>

    <h2>FAQ</h2>
    <details>
      <summary>Does file order matter?</summary>
      <p>Only when specificity is tied and rules are in different files loaded in order.</p>
    </details>

    <p class="italic-note">
      Now you know exactly what the browser is thinking.
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
