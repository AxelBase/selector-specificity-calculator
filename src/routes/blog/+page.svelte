<script lang="ts">
  import { base } from '$app/paths';

  const posts = [
    { href: '/blog/posts/post1', title: 'Understanding CSS Selector Specificity', description: 'A complete beginner-friendly guide to how browsers decide which CSS rule wins.' },
    { href: '/blog/posts/post2', title: 'The 0-0-0-0 Rule Explained', description: 'Break down the four specificity columns: inline, ID, class, and element.' },
    { href: '/blog/posts/post3', title: 'Why :not(), :is(), and :has() Don’t Add Extra Specificity', description: 'Learn how modern functional pseudo-classes actually work in the cascade.' },
    { href: '/blog/posts/post4', title: '!important vs Specificity: Who Wins?', description: 'When and why you should (almost) never use !important.' },
    { href: '/blog/posts/post5', title: 'Debugging Specificity Conflicts in Real Projects', description: 'Practical tips and tools to find and fix "why isn’t my CSS working?" issues.' },
    { href: '/blog/posts/post6', title: 'How Browsers Compare Two Selectors (Step-by-Step)', description: 'See exactly how Chrome, Firefox, and Safari resolve ties.' },
    { href: '/blog/posts/post7', title: 'Best Practices for Writing Low-Specificity CSS', description: 'Write maintainable, scalable styles using BEM, utility classes, and modern methodologies.' },
  ];
</script>

<svelte:head>
  <title>Blog | CSS Selector Specificity Calculator</title>
  <meta name="description" content="Learn everything about CSS selector specificity – from basics to advanced modern features." />
</svelte:head>

<div class="container py-5">
  <header class="text-center mb-5">
    <h1 class="display-5 fw-bold">
      <i class="bi bi-journal-text"></i> Specificity Blog
    </h1>
    <p class="lead text-muted col-lg-8 mx-auto">
      Deep dives, tutorials, and best practices for mastering CSS selector specificity in 2025 and beyond.
    </p>
  </header>

  <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
    {#each posts as post}
      <div class="col">
        <a href="{base}{post.href}" class="text-decoration-none">
          <div class="card h-100 shadow-sm hover-shadow transition">
            <div class="card-body d-flex flex-column">
              <h3 class="card-title h5 fw-bold text-primary">{post.title}</h3>
              <p class="card-text text-muted flex-grow-1 small">{post.description}</p>
              <div class="mt-auto">
                <span class="text-primary fw-semibold">
                  Read more <i class="bi bi-arrow-right"></i>
                </span>
              </div>
            </div>
          </div>
        </a>
      </div>
    {/each}
  </div>
</div>

<style>
  .hover-shadow {
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .hover-shadow:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.12) !important;
  }
  .transition {
    transition: all 0.3s ease;
  }
</style>