<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>Understanding CSS Selector Specificity | Specificity Calculator Blog</title>
  <meta name="description" content="Learn how browsers decide which CSS rule wins when multiple selectors target the same element. A complete beginner-friendly guide to specificity." />
  <meta property="og:title" content="Understanding CSS Selector Specificity" />
  <meta property="og:description" content="Discover why some CSS rules override others and how specificity works under the hood in modern browsers." />
  <meta property="og:url" content="{base}/blog/posts/post1" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}/blog">Blog</a> <span>/</span> <p>Understanding CSS Selector Specificity</p>
  </div>

  <article class="prose">
    <h1>Understanding CSS Selector Specificity</h1>
    <p class="post-meta">Published: November 25, 2025</p>

    <p class="lead">
      Every time two or more CSS rules apply to the same element, the browser must decide which one wins. This decision is made using <strong>specificity</strong> — one of the most important and often misunderstood concepts in CSS.
    </p>

    <h2>What Is Specificity?</h2>
    <p>
      Specificity is a scoring system that determines which CSS declaration gets applied when multiple conflicting rules target the same element. The rule with the highest specificity wins.
    </p>

    <h2>The 0-0-0-0 Scoring System</h2>
    <p>Specificity is calculated using four columns:</p>
    <ul>
      <li><strong>First column (0-)</strong>: Inline styles (style attribute)</li>
      <li><strong>Second column (-0-)</strong>: ID selectors (#header)</li>
      <li><strong>Third column (-0-)</strong>: Classes, attributes, pseudo-classes (.btn, [type="text"], :hover)</li>
      <li><strong>Fourth column (-0-0)</strong>: Element selectors and pseudo-elements (div, ::before)</li>
    </ul>

    <div class="alert alert-info my-4 p-4 bg-light border-start border-primary border-4">
      <strong>Example:</strong><br>
      <code>.button &#123; color: blue; &#125;</code> → 0-0-1-0<br>
      <code>#submit &#123; color: red; &#125;</code> → 0-1-0-0<br>
      <strong>Wins:</strong> #submit — because 1 ID beats 10,000 classes.
    </div>

    <h2>Why It Matters in Real Projects</h2>
    <p>
      Without understanding specificity, developers often resort to <code>!important</code>, overly nested selectors, or endless frustration when styles “don’t work.” This tool was built to help you visualize and debug these conflicts instantly.
    </p>

    <h2>FAQ</h2>
    <details>
      <summary>Does :not() increase specificity?</summary>
      <p>No. The content inside :not() is counted, but :not() itself adds nothing.</p>
    </details>
    <details>
      <summary>What about :is() and :where()?</summary>
      <p>:is() uses the highest specificity of its arguments. :where() always has zero specificity.</p>
    </details>
    <details>
      <summary>Can I ever “reset” specificity?</summary>
      <p>Yes — use :where() or the universal selector * to write low-specificity reusable styles.</p>
    </details>

    <p class="italic-note">
      Master specificity once, and you’ll write cleaner, more maintainable CSS forever.
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
