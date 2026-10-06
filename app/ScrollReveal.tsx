'use client';

import { useEffect } from 'react';

export default function ScrollReveal() {
  useEffect(() => {
    const revealItems = document.querySelectorAll('.reveal');
    const root = document.documentElement;

    if (!('IntersectionObserver' in window)) {
      revealItems.forEach((item) => item.classList.add('visible'));
      return;
    }

    root.classList.add('scroll-reveal-ready');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -32px 0px' }
    );

    const observeNewItems = (items: NodeListOf<Element> | Element[]) => {
      items.forEach((item) => {
        if (!item.hasAttribute('data-reveal-observed')) {
          item.setAttribute('data-reveal-observed', '');
          observer.observe(item);
        }
      });
    };

    observeNewItems(revealItems);

    const mutations = new MutationObserver((records) => {
      records.forEach((record) => {
        record.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node.matches('.reveal')) observeNewItems([node]);
          observeNewItems(node.querySelectorAll('.reveal'));
        });
      });
    });
    mutations.observe(document.querySelector('main') ?? document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutations.disconnect();
      root.classList.remove('scroll-reveal-ready');
    };
  }, []);

  return null;
}
