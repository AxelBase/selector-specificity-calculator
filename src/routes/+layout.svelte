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

  // --- Buy Me A Coffee Logic ---
  const paypalUsername = 'AxelLab427'; // Update this
  const donationAmounts = [1, 3, 5, 10];
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
        
        <div class="position-relative ms-2" use:clickOutside on:click_outside={closeDropdown}>
          <button class="bmac-button" on:click={toggleDropdown} aria-label="Buy me a coffee">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style="width:18px;height:18px;">
              <path d="M12.35,22.2L12,22A10,10,0,0,1,2,12V10A2,2,0,0,1,4,8H7.2A5.13,5.13,0,0,1,12,3A5.13,5.13,0,0,1,16.8,8H20A2,2,0,0,1,22,10V12A10,10,0,0,1,12.35,22.2M4,10V12A8,8,0,0,0,12,20A8,8,0,0,0,20,12V10H16.8A5.11,5.11,0,0,1,12.5,5.12A5.15,5.15,0,0,1,7.2,10H4Z"/>
            </svg>
            <span class="d-none d-md-inline">Buy me a coffee</span>
          </button>

          {#if isDropdownOpen}
            <div class="bmac-dropdown" transition:slide={{ duration: 250 }}>
              {#each donationAmounts as amount}
                <a 
                  href="https://paypal.me/{paypalUsername}/{amount}" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  on:click={closeDropdown}
                >
                  ${amount}
                </a>
              {/each}
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
      <span>&copy; {new Date().getFullYear()} AxelBase Selector Specificity Calculator</span>
      <div class="d-flex gap-3 mt-1 mt-sm-0">
        <a href="{base}/privacy" class="text-reset text-decoration-none hover-underline">Privacy</a>
        <span>|</span>
        <a href="{base}/terms" class="text-reset text-decoration-none hover-underline">Terms</a>
      </div>
    </div>
  </footer>
</div>

<style>
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