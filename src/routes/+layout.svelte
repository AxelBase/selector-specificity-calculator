<script lang="ts">
  import '../app.css';
  import { page } from '$app/stores';
  import { base } from '$app/paths';
  import { fly, slide } from 'svelte/transition';
  import { onMount } from 'svelte';

  // --- Logic for Base Path ---
  $: basePath = $page.url.pathname.startsWith('/selector-specificity-calculator')
    ? '/selector-specificity-calculator'
    : '';

  // --- Theme Toggle Logic ---
  let isDarkMode = false;

  function toggleTheme() {
    isDarkMode = !isDarkMode;
    const theme = isDarkMode ? 'dark' : 'light';
    document.body.setAttribute('data-bs-theme', theme);
  }

  // --- Buy Me A Coffee + Bitcoin Dropdown ---
  let isDropdownOpen = false;

  function toggleDropdown() {
    isDropdownOpen = !isDropdownOpen;
  }

  function closeDropdown() {
    isDropdownOpen = false;
  }

  function clickOutside(node: HTMLElement) {
    const handleClick = (event: MouseEvent) => {
      if (node && !node.contains(event.target as Node)) {
        node.dispatchEvent(new CustomEvent('click_outside'));
      }
    };
    document.addEventListener('click', handleClick, true);
    return {
      destroy() {
        document.removeEventListener('click', handleClick, true);
      }
    };
  }
</script>

<div class="min-vh-100 d-flex flex-column">

  <header class="fixed-top p-3 w-100" style="pointer-events: none; z-index: 1040;">
    <nav class="container glass rounded-pill px-4 py-2 d-flex justify-content-between align-items-center shadow-sm"
         style="pointer-events: auto; max-width: 1300px;">
      
      <div class="d-flex align-items-center gap-3">
        <a href="{base}/" class="d-flex align-items-center gap-2 text-decoration-none logo-group">
          <div class="logo-wrapper">
            <img src="{base}/AxelLab-Logo.ico" alt="Logo" style="height: 35px; width: auto;" />
          </div>
          <span class="navbar-brand-text d-none d-sm-inline">AxelBase</span>
        </a>

        <!-- Buy me a Coffee + Crypto Dropdown -->
        <div class="position-relative ms-2" use:clickOutside on:click_outside={closeDropdown}>
          <button
            class="bmac-button d-flex align-items-center gap-2 text-dark border-0 px-4 py-2 rounded-pill shadow-sm"
            on:click={toggleDropdown}
            aria-label="Support options"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2,21V19H20V21H2M20,8V5H4V8H20M20,10H4V13C4,14.38 4.5,15.63 5.31,16.58L11.64,19H12.36L18.69,16.58C19.5,15.63 20,14.38 20,13V10M16,2H8V4H16V2Z" />
            </svg>
            <span class="d-none d-md-inline fw-semibold">Buy me a Coffee</span>
          </button>

          {#if isDropdownOpen}
            <div 
              class="bmac-dropdown mt-2" 
              transition:fly={{ y: -10, duration: 250 }}
            >
              <a 
                href="https://buymeacoffee.com/axelbase" 
                target="_blank" 
                rel="noopener" 
                on:click={closeDropdown}
              >
                <span class="amount">$3</span> One Coffee
              </a>
              <a 
                href="https://buymeacoffee.com/axelbase" 
                target="_blank" 
                rel="noopener" 
                on:click={closeDropdown}
              >
                <span class="amount">$5</span> Two Coffees
              </a>
              <a 
                href="https://buymeacoffee.com/axelbase" 
                target="_blank" 
                rel="noopener" 
                on:click={closeDropdown}
              >
                <span class="amount">$10</span> Three Coffees
              </a>

              <a 
                href="https://buymeacoffee.com/axelbase" 
                target="_blank" 
                rel="noopener" 
                on:click={closeDropdown} 
                class="custom-amount"
              >
                Custom Amount
              </a>

              <a
                href="bitcoin:bc1q3p0e6vt492m4w4fpz5m2cl4zcfuqqkgaj6myc9?label=AxelBase&message=Buy%20me%20a%20coffee"
                on:click={closeDropdown}
                class="custom-amount bitcoin-option"
              >
                Buy via Crypto (Bitcoin)
              </a>
            </div>
          {/if}
        </div>
      </div>

      <div class="d-flex align-items-center gap-3">
        <ul style="list-style: none; display: flex; align-items: center; gap: 1.5rem; margin: 0;" class="d-none d-lg-flex">
          <li><a class="nav-link-custom" href="{base}/">Home</a></li>
          <li><a class="nav-link-custom" href="{base}/#about">About</a></li>
          <li><a class="nav-link-custom" href="{base}/#how-to">How to use</a></li>
          <li><a class="nav-link-custom" href="{base}/#faq">FAQ</a></li>
          <li><a class="nav-link-custom" href="{base}/blog">Blog</a></li>
        </ul>

        <button
          type="button"
          class="btn btn-outline-dark border-0 d-flex align-items-center justify-content-center rounded-circle"
          style="width: 40px; height: 40px;"
          on:click={toggleTheme}
          aria-label="Toggle Dark Mode"
        >
          {#if isDarkMode}
            <i class="bi bi-sun-fill fs-5 text-warning"></i>
          {:else}
            <i class="bi bi-moon-stars-fill fs-5"></i>
          {/if}
        </button>

        <button
          class="d-lg-none btn btn-link text-reset p-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mobileMenu"
          aria-label="Toggle navigation menu"
          aria-controls="mobileMenu"
          aria-expanded="false"
        >
          <i class="bi bi-grid-fill fs-2 text-primary"></i>
        </button>
      </div>
    </nav>

    <div class="collapse d-lg-none mt-2" id="mobileMenu">
      <div class="glass rounded-4 p-3 mx-3">
        <ul class="nav flex-column gap-2 text-center">
          <li><a class="nav-link p-2" href="{base}/">Home</a></li>
          <li><a class="nav-link p-2" href="{base}/#about">About</a></li>
          <li><a class="nav-link p-2" href="{base}/#how-to">How to use</a></li>
          <li><a class="nav-link p-2" href="{base}/#faq">FAQ</a></li>
          <li><a class="nav-link p-2" href="{base}/blog">Blog</a></li>
        </ul>
      </div>
    </div>
  </header>

  <main class="flex-grow-1">
    <slot />
  </main>

  <footer class="releative glass border-top py-3 mt-auto" style="z-index: 1030;">
    <div class="container d-flex flex-column flex-sm-row justify-content-between align-items-center small text-muted">
      <span>© {new Date().getFullYear()} AxelBase Selector Specificity Calculator</span>
      <div class="d-flex gap-3 mt-1 mt-sm-0">
        <a href="{base}/privacy" class="text-reset text-decoration-none hover-underline">Privacy</a>
        <span>|</span>
        <a href="{base}/terms" class="text-reset text-decoration-none hover-underline">Terms</a>
      </div>
    </div>
  </footer>
</div>

<style>
  /* Keep your existing styles from File 2, only adding/changing BMAC related ones */

  .bmac-button {
    background: var(--color-accent);
    color: var(--color-accent-text);
    font-size: 0.95rem;
    font-weight: 600;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(250, 210, 1, 0.25);
  }

  .bmac-button:hover {
    background: var(--color-accent-hover);
    transform: translateY(-1px);
    box-shadow: 0 8px 25px rgba(250, 210, 1, 0.35);
  }

  .bmac-dropdown {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    width: 240px;
    background: var(--glass-bg);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid var(--glass-border);
    border-radius: 16px;
    box-shadow: var(--glass-shadow);
    overflow: hidden;
    z-index: 1050;
  }

  .bmac-dropdown a {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 20px;
    color: var(--color-text-main);
    text-decoration: none;
    font-size: 0.96rem;
    transition: all 0.2s ease;
  }

  .bmac-dropdown a:hover {
    background: rgba(250, 210, 1, 0.25);
    color: var(--color-accent);
    padding-left: 28px;
  }

  .bmac-dropdown .amount {
    font-weight: 700;
    color: var(--color-accent);
    font-size: 1.1rem;
  }

  .bmac-dropdown .custom-amount {
    font-weight: 600;
    color: var(--color-accent);
    border-top: 1px solid var(--glass-border);
    justify-content: center !important;
  }

  .bitcoin-option {
    color: #f7931a !important;
    font-weight: 700;
  }

  .bitcoin-option:hover {
    background: rgba(247, 147, 26, 0.15) !important;
    color: #f7931a !important;
  }

  /* Your existing styles ... */
  .logo-wrapper { transition: transform 0.3s ease; }
  .logo-group:hover .logo-wrapper { transform: rotate(10deg) scale(1.1); }

  .navbar-brand-text {
    font-weight: 800;
    font-size: 1.4rem;
    color: var(--color-text-main);
    letter-spacing: -1px;
  }

  .nav-link-custom {
    position: relative;
    color: var(--color-text-main);
    font-weight: 600;
    transition: color 0.3s;
    text-decoration: none;
  }
  .nav-link-custom:hover { color: var(--color-accent); }

  .nav-link-custom::after {
    content: '';
    position: absolute;
    width: 0;
    height: 3px;
    bottom: -5px;
    left: 50%;
    background-color: var(--color-accent);
    transition: all 0.3s ease-in-out;
    transform: translateX(-50%);
    border-radius: 2px;
  }
  .nav-link-custom:hover::after { width: 80%; }

  .hover-underline:hover { text-decoration: underline !important; color: var(--color-accent) !important; }
</style>