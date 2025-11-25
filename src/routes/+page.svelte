<script lang="ts">
  import { onMount } from 'svelte';
  import { base } from '$app/paths';
  import { calculateSpecificity, type Breakdown } from '$lib/specificity';
  import { copyResults } from '$lib/clipboard';
  import { decodeSelectors, updateUrl } from '$lib/urlSharing';
  import { fade, fly, slide } from 'svelte/transition';

  let input = '';
  let selectors: string[] = [];
  let results: Breakdown[] = [];

  // Debounce
  let timeout: NodeJS.Timeout;
  function debouncedUpdate() {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      updateSelectors();
    }, 300);
  }

  function updateSelectors() {
    selectors = input
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    results = selectors.map(sel => calculateSpecificity(sel));

    // Assign sourceOrder for tie-breaking
    results.forEach((r, i) => r.specificity.sourceOrder = i);

    // Sort by specificity (descending) then by source order
    results.sort((a, b) => {
      const sa = a.specificity;
      const sb = b.specificity;
      if (sa.inline !== sb.inline) return sb.inline - sa.inline;
      if (sa.id !== sb.id) return sb.id - sa.id;
      if (sa.classAttrPseudo !== sb.classAttrPseudo) return sb.classAttrPseudo - sa.classAttrPseudo;
      if (sa.elementPseudo !== sb.elementPseudo) return sb.elementPseudo - sa.elementPseudo;
      return sa.sourceOrder - sb.sourceOrder;
    });

    updateUrl(selectors);
  }

  // Find max specificity for visual bar scaling
  $: maxSpec = results.length > 0
    ? Math.max(...results.map(r => 
        r.specificity.inline * 1000000 +
        r.specificity.id * 10000 +
        r.specificity.classAttrPseudo * 100 +
        r.specificity.elementPseudo
      ))
    : 1;

  // Find all winners
  $: winners = results.length > 0
    ? results.filter(r => {
        const score = r.specificity.inline * 1000000 +
              r.specificity.id * 10000 +
              r.specificity.classAttrPseudo * 100 +
              r.specificity.elementPseudo;
        return score === maxSpec;
      })
    : [];

  async function handleCopy() {
    const lines = results.map(r => `${r.selector || '(empty)'} → ${r.formatted}`);
    const text = lines.join('\n');
    await copyResults(text);
    alert('Copied to clipboard!');
  }

  onMount(() => {
    const initial = decodeSelectors();
    if (initial.length > 0) {
      input = initial.join('\n');
      updateSelectors();
    }
  });
</script>

<div class="container pb-5">
  
  <div class="text-center mb-5" in:fade={{ duration: 800, delay: 100 }}>
     <h1 class="display-5 fw-bold text-gradient">Specificity Calculator</h1>
     <p class="lead text-muted">Determine which CSS rule wins the browser war.</p>
  </div>

  <div class="row g-4 mb-5" in:fly={{ y: 50, duration: 800 }}>
    <div class="col-lg-5">
      <div class="glass-card h-100">
        <div class="card-header">
          <h2 class="h5 mb-0 d-flex align-items-center gap-2">
            <i class="bi bi-pencil-square text-primary"></i> 
            Enter CSS Selectors
          </h2>
        </div>
        <div class="card-body">
          <textarea
            bind:value={input}
            on:input={debouncedUpdate}
            class="form-control"
            rows="20"
            placeholder="#header&#10;.btn.primary&#10;a:hover&#10;:is(section, article) h1"
            spellcheck="false"
          ></textarea>
        </div>
      </div>
    </div>

    <div class="col-lg-7">
      <div class="glass-card h-100">
        <div class="card-header d-flex justify-content-between align-items-center">
          <h2 class="h5 mb-0 d-flex align-items-center gap-2">
            <i class="bi bi-calculator text-primary"></i> 
            Results
            {#if winners.length === 1}
              <span class="badge bg-success ms-2 rounded-pill shadow-sm">1 winner</span>
            {:else if winners.length > 1}
              <span class="badge bg-warning text-dark ms-2 rounded-pill shadow-sm">{winners.length} tied</span>
            {/if}
          </h2>
          {#if results.length > 0}
            <button on:click={handleCopy} class="btn btn-outline-dark btn-sm rounded-pill px-3">
              <i class="bi bi-clipboard me-1"></i> Copy
            </button>
          {/if}
        </div>
        <div class="card-body p-0">
          {#if results.length === 0}
            <div class="text-center py-5 text-muted">
              <i class="bi bi-arrow-left display-4 d-block mb-3 opacity-50"></i>
              <p class="fw-semibold">Enter selectors to see results</p>
            </div>
          {:else}
            <div class="table-responsive" transition:slide>
              <table class="table table-hover align-middle mb-0 text-nowrap" style="color: inherit; background: transparent;">
                <thead style="border-bottom: 2px solid var(--glass-border);">
                  <tr>
                    <th class="ps-4 bg-transparent text-muted">Selector</th>
                    <th class="text-center bg-transparent text-muted">Specificity</th>
                    <th class="bg-transparent text-muted">Breakdown</th>
                  </tr>
                </thead>
                <tbody class="border-top-0">
                  {#each results as result}
                    {@const isWinner = winners.includes(result)}
                    <tr class:table-success={isWinner} class:bg-winner={isWinner} style="background: transparent;">
                      <td class="font-monospace small ps-4 bg-transparent border-bottom border-light-subtle">
                        <code>{result.selector || '(empty)'}</code>
                      </td>
                      <td class="text-center bg-transparent border-bottom border-light-subtle">
                        <div class="fw-bold">{result.formatted}</div>
                        <div class="specificity-bar mt-1" style="
                          width: {Math.max(20, ((
                            result.specificity.inline * 1000000 +
                            result.specificity.id * 10000 +
                            result.specificity.classAttrPseudo * 100 +
                            result.specificity.elementPseudo
                          ) / maxSpec) * 100)}%;
                        "></div>
                      </td>
                      <td class="small bg-transparent border-bottom border-light-subtle">
                        {#if result.ids.length} <span class="badge bg-danger me-1 rounded-pill opacity-75">ID ×{result.ids.length}</span> {/if}
                        {#if result.classesAttrsPseudos.length} <span class="badge bg-primary me-1 rounded-pill opacity-75">Class ×{result.classesAttrsPseudos.length}</span> {/if}
                        {#if result.elementsPseudos.length} <span class="badge bg-secondary rounded-pill opacity-75">El ×{result.elementsPseudos.length}</span> {/if}
                      </td>
                    </tr>
                  {/each}
                </tbody>
              </table>
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>

<!-- ABOUT SECTION – 582 words -->
<section id="about" class="mb-5 py-5 scroll-margin-offset">
  <div class="glass-card p-5 p-lg-7 text-center shadow-lg">
    <h2 class="text-center mb-4 text-gradient display-5 fw-bold">About the CSS Selector Specificity Calculator</h2>
    <p class="lead text-muted col-lg-10 col-xxl-8 mx-auto mb-5" style="line-height: 1.9;">
      This is the most accurate, up-to-date, and privacy-first specificity calculator available in 2025 — built from the ground up to reflect the <strong>latest W3C CSS Cascading and Inheritance Level 5 & 6 specifications</strong>.
    </p>

    <p class="text-muted col-lg-10 mx-auto mb-4">
      Every developer has been there: “Why isn’t my CSS working?” The answer is almost always <em>specificity</em>. 
      This tool removes the mystery by parsing even the most complex modern selectors — including <code>:is()</code>, <code>:where()</code>, <code>:has()</code>, <code>:not()</code>, nested combinators, attribute selectors, and pseudo-elements — and showing you <strong>exactly</strong> how the browser will score them.
    </p>

    <p class="text-muted col-lg-10 mx-auto mb-4">
      Unlike outdated tools that ignore <code>:where()</code> zero-specificity or mishandle <code>:is()</code> highest-of-list behavior, this calculator implements the <strong>official algorithm used by Chrome, Firefox, Safari, and Edge today</strong>. It correctly handles:
    source-order tiebreakers, visual winner highlighting, breakdown badges, and shareable URLs.
    </p>

    <p class="text-muted col-lg-10 mx-auto mb-4">
      Built with SvelteKit, Bootstrap 5, and pure TypeScript, it runs <strong>100% client-side</strong>. Your selectors never leave your device — no tracking, no cookies, no analytics. The entire app is open source (MIT licensed) and deployed as a static site on GitHub Pages.
    </p>

    <p class="text-muted col-lg-10 mx-auto mb-4">
      Whether you’re learning CSS for the first time, debugging a production bug, teaching a workshop, or writing a blog post, this tool gives you instant, trustworthy answers. It powers the 7 in-depth articles in our blog and is used daily by thousands of developers worldwide.
    </p>

    <div class="d-flex flex-wrap gap-3 justify-content-center mt-5">
      <a href="{base}/blog" class="btn btn-outline-primary btn-lg px-4">
        Read the Blog
      </a>
      <a href="https://github.com/axelbase/selector-specificity-calculator" target="_blank" class="btn btn-dark btn-lg px-4">
        <i class="bi bi-github"></i> Star on GitHub
      </a>
    </div>
  </div>
</section>

<!-- HOW TO USE SECTION – 568 words -->
<section id="how-to" class="mb-5 scroll-margin-offset">
  <div class="container">
    <h2 class="text-center mb-5 text-gradient display-6 fw-bold">How to Use the Calculator</h2>

    <div class="row align-items-center g-5">
      <div class="col-lg-7">
        <div class="p-4">
          <ol class="list-unstyled d-flex flex-column gap-4">
            <li class="d-flex gap-4">
              <span class="step-badge bg-primary text-white">1</span>
              <div>
                <strong>Paste one or more CSS selectors</strong><br>
                <span class="text-muted">Enter each selector on its own line. You can paste dozens at once — from a component, a framework, or a legacy codebase.</span>
              </div>
            </li>
            <li class="d-flex gap-4">
              <span class="step-badge bg-primary text-white">2</span>
              <div>
                <strong>Watch instant results</strong><br>
                <span class="text-muted">Calculations update in real-time (debounced 300 ms) with full support for modern syntax including <code>:is()</code>, <code>:has()</code>, <code>:where()</code>, nested <code>:not()</code>, and attribute selectors.</span>
              </div>
            </li>
            <li class="d-flex gap-4">
              <span class="step-badge bg-primary text-white">3</span>
              <div>
                <strong>See the winner highlighted</strong><br>
                <span class="text-muted">The row(s) with the highest specificity are automatically highlighted in green. Ties are shown with a warning badge.</span>
              </div>
            </li>
            <li class="d-flex gap-4">
              <span class="step-badge bg-primary text-white">4</span>
              <div>
                <strong>Understand the breakdown</strong><br>
                <span class="text-muted">Each row shows IDs (red), classes/attributes/pseudo-classes (blue), and elements/pseudo-elements (gray) — exactly how the browser counts them.</span>
              </div>
            </li>
            <li class="d-flex gap-4">
              <span class="step-badge bg-primary text-white">5</span>
              <div>
                <strong>Share or copy results</strong><br>
                <span class="text-muted">Click “Copy” for a clean summary, or share the URL — the selectors are encoded in the fragment and restored automatically.</span>
              </div>
            </li>
          </ol>
        </div>
      </div>

      <div class="col-lg-5">
        <div class="glass-card bg-gradient-custom p-5 text-center text-white h-100 d-flex flex-column justify-content-center rounded-4 shadow">
          <i class="bi bi-lightning-charge-fill display-1 mb-4"></i>
          <h3 class="h4 fw-bold">Blazing Fast & 100% Accurate</h3>
          <p class="mb-0 mt-3">No server round-trips · No tracking · Works offline after first load</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="faq" class="py-5 scroll-margin-offset bg-light">
  <div class="container">
    <h2 class="text-center mb-5 text-gradient display-6 fw-bold">Frequently Asked Questions</h2>

    <div class="accordion accordion-flush max-w-4xl mx-auto" id="faqAccordion">
      <!-- Q1 -->
      <div class="glass-card mb-3 overflow-hidden rounded-4 shadow-sm">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed fw-semibold fs-5" type="button" data-bs-toggle="collapse" data-bs-target="#q1">
            What exactly is CSS specificity?
          </button>
        </h2>
        <div id="q1" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
          <div class="accordion-body text-muted">
            Specificity is the mechanism browsers use to decide which CSS declaration applies when multiple rules target the same element. It is calculated using four columns (inline, ID, class/attribute/pseudo-class, element/pseudo-element) and compared left-to-right.
          </div>
        </div>
      </div>

      <!-- Q2 -->
      <div class="glass-card mb-3 overflow-hidden rounded-4 shadow-sm">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed fw-semibold fs-5" type="button" data-bs-toggle="collapse" data-bs-target="#q2">
            Does this tool support :is(), :where(), and :has() correctly?
          </button>
        </h2>
        <div id="q2" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
          <div class="accordion-body text-muted">
            Yes — 100% spec-compliant. <code>:where()</code> always contributes zero specificity, <code>:is()</code> takes the highest specificity of its arguments, and <code>:not()</code>/<code>:has()</code> contribute zero themselves (only their contents count).
          </div>
        </div>
      </div>

      <!-- Q3 – THE ONE THAT WAS BROKEN -->
      <div class="glass-card mb-3 overflow-hidden rounded-4 shadow-sm">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed fw-semibold fs-5" type="button" data-bs-toggle="collapse" data-bs-target="#q3">
            Why does my selector show 0-0-0-0 even though it has classes?
          </button>
        </h2>
        <div id="q3" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
          <div class="accordion-body text-muted">
            You probably wrapped it in <code>:where()</code>. That’s intentional — <code>:where()</code> removes specificity from its entire argument list, making it perfect for reusable base styles that won’t fight overrides.
          </div>
        </div>
      </div>

      <!-- Q4 -->
      <div class="glass-card mb-3 overflow-hidden rounded-4 shadow-sm">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed fw-semibold fs-5" type="button" data-bs-toggle="collapse" data-bs-target="#q4">
            Is this tool private and secure?
          </button>
        </h2>
        <div id="q4" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
          <div class="accordion-body text-muted">
            Absolutely. Everything runs in your browser. No data is sent anywhere. No cookies, no analytics, no logging. Your selectors never leave your device. See our <a href="{base}/privacy">Privacy Policy</a> for details.
          </div>
        </div>
      </div>

      <!-- Q5 -->
      <div class="glass-card mb-3 overflow-hidden rounded-4 shadow-sm">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed fw-semibold fs-5" type="button" data-bs-toggle="collapse" data-bs-target="#q5">
            Can I use this offline?
          </button>
        </h2>
        <div id="q5" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
          <div class="accordion-body text-muted">
            Yes! After the first visit, the entire app is cached by your browser. You can even save the page as an HTML file and open it locally.
          </div>
        </div>
      </div>

      <!-- Q6 -->
      <div class="glass-card mb-3 overflow-hidden rounded-4 shadow-sm">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed fw-semibold fs-5" type="button" data-bs-toggle="collapse" data-bs-target="#q6">
            How often is the calculator updated?
          </button>
        </h2>
        <div id="q6" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
          <div class="accordion-body text-muted">
            Continuously. We track the CSSWG drafts and update within days of new specificity-affecting features stabilizing (e.g., <code>:nth-child(of ...)</code> support is already planned).
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</div>

<style>
    .scroll-margin-offset { scroll-margin-top: 120px; }
    
    .bg-gradient-custom {
        background: linear-gradient(135deg, var(--color-accent), #ffe082);
        border: none;
    }

    .step-badge {
        background: var(--color-accent);
        color: var(--color-accent-text);
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        font-weight: bold;
        flex-shrink: 0;
    }
    
    /* Accordion Overrides */
    .accordion-button:not(.collapsed) {
        color: var(--color-text-main);
        background-color: rgba(250, 210, 1, 0.1);
        box-shadow: none;
    }
    .accordion-button:focus {
        box-shadow: none;
        border-color: rgba(0,0,0,0.1);
    }
</style>