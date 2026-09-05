{
  "meta": {
    "project": "Garten-und Landschaftspflege B.Streich (Bianca Streich)",
    "site_type": "premium German-only multi-page marketing site (React SPA)",
    "primary_goal": "Trust + Local SEO + Contact via Telefon/WhatsApp/E-Mail (no forms)",
    "brand_attributes": [
      "natürlich",
      "hochwertig",
      "ruhig",
      "regional",
      "persönlich",
      "seriös",
      "freundlich"
    ],
    "hard_constraints": {
      "no_photos": true,
      "no_forms_booking_payment": true,
      "motion_style": "Soft Organic Motion (subtle, calm; respects prefers-reduced-motion)",
      "language": "de-DE only",
      "palette_restrictions": "dark natural green base + #0FBB82 accent + warm cream + very dark neutral text; no loud additional brights",
      "gradients": "Only subtle organic gradients as decorative/placeholder surfaces; never >20% viewport; never on text-heavy areas; never on small UI elements"
    }
  },

  "information_architecture": {
    "routes_exact": [
      { "path": "/", "label": "Startseite" },
      { "path": "/leistungen", "label": "Leistungen" },
      { "path": "/ueber-uns", "label": "Über uns" },
      { "path": "/team", "label": "Team" },
      { "path": "/impressum", "label": "Impressum" },
      { "path": "/datenschutz", "label": "Datenschutz" },
      { "path": "/agb", "label": "AGB" }
    ],
    "global_elements": {
      "header": "Logo + Navigation (Startseite, Leistungen, Über uns, Team) + sichtbare Kontakt-CTA; sticky/compact on scroll; mobile hamburger",
      "footer": "NAP + legal links",
      "recurring_contact_block": "Sie möchten Unterstützung bei der Pflege Ihres Gartens oder Grundstücks? + Anrufen / WhatsApp / E-Mail"
    }
  },

  "design_personality": {
    "style_keywords": [
      "minimalistisch",
      "klassisch-seriös",
      "naturverbunden",
      "premium 2026",
      "viel Weißraum",
      "editorial typography",
      "ruhige Oberflächen"
    ],
    "layout_principles": {
      "reading_flow": "Left-aligned, editorial rhythm; avoid centered paragraphs; use short line-lengths",
      "whitespace": "2–3x more spacing than typical templates; sections breathe",
      "visual_signature": "Cream canvas + deep forest green structure + crisp accent #0FBB82 used sparingly for CTAs/links/focus"
    }
  },

  "color_system": {
    "source_of_truth_hex": {
      "accent": "#0FBB82",
      "forest_1": "#0F2E14",
      "forest_2": "#12331A",
      "forest_3": "#204020",
      "leaf_1": "#507030",
      "leaf_2": "#608030",
      "taupe_holstentor": "#6B5B4A",
      "cream": "#F7F4EC",
      "text_dark": "#111513"
    },
    "tokens_css_variables": {
      "note": "Implement by overriding shadcn tokens in /src/index.css :root. Keep HSL tokens aligned with these HEX values (convert once, then lock).",
      "css": {
        "--brand-cream": "#F7F4EC",
        "--brand-ink": "#111513",
        "--brand-forest": "#0F2E14",
        "--brand-forest-2": "#12331A",
        "--brand-forest-3": "#204020",
        "--brand-leaf": "#507030",
        "--brand-leaf-2": "#608030",
        "--brand-taupe": "#6B5B4A",
        "--brand-accent": "#0FBB82",

        "--background": "var(--brand-cream)",
        "--foreground": "var(--brand-ink)",
        "--card": "#FFFFFF",
        "--card-foreground": "var(--brand-ink)",
        "--popover": "#FFFFFF",
        "--popover-foreground": "var(--brand-ink)",

        "--primary": "var(--brand-forest)",
        "--primary-foreground": "#F7F4EC",
        "--secondary": "rgba(15, 46, 20, 0.06)",
        "--secondary-foreground": "var(--brand-forest)",

        "--muted": "rgba(17, 21, 19, 0.06)",
        "--muted-foreground": "rgba(17, 21, 19, 0.68)",

        "--accent": "rgba(15, 187, 130, 0.12)",
        "--accent-foreground": "var(--brand-forest)",

        "--border": "rgba(15, 46, 20, 0.14)",
        "--input": "rgba(15, 46, 20, 0.18)",
        "--ring": "rgba(15, 187, 130, 0.45)",

        "--success": "#0FBB82",
        "--warning": "#6B5B4A",
        "--destructive": "#B42318",
        "--destructive-foreground": "#FFFFFF",

        "--radius": "14px"
      }
    },
    "usage_rules": {
      "accent_usage": [
        "Primary CTA buttons",
        "Link hover/active underline",
        "Focus ring",
        "Small badges (sparingly)"
      ],
      "avoid": [
        "No additional bright colors",
        "No saturated gradients",
        "No accent backgrounds behind long text"
      ]
    }
  },

  "typography": {
    "google_fonts": {
      "headings_serif": {
        "family": "Cormorant Garamond",
        "weights": [500, 600],
        "reason": "Characterful, traditional, high recognition; premium editorial feel; pairs well with serif logo wordmark."
      },
      "body_sans": {
        "family": "IBM Plex Sans",
        "weights": [400, 500, 600],
        "reason": "Highly readable, calm, professional; excellent German diacritics; feels crafted not generic."
      }
    },
    "font_tokens_css": {
      "--font-heading": "'Cormorant Garamond', ui-serif, Georgia, serif",
      "--font-body": "'IBM Plex Sans', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    },
    "type_scale_tailwind": {
      "h1": "text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.02em] leading-[1.05]",
      "h2": "text-2xl sm:text-3xl font-semibold tracking-[-0.01em] leading-[1.15]",
      "h3": "text-xl sm:text-2xl font-semibold leading-[1.2]",
      "subheading": "text-base md:text-lg text-foreground/80 leading-relaxed",
      "body": "text-sm sm:text-base leading-relaxed text-foreground/85",
      "small": "text-xs sm:text-sm text-foreground/70"
    },
    "seo_semantics": {
      "rules": [
        "Exactly one H1 per page (page hero).",
        "Services page: each service is its own H2 section (10 total).",
        "Use H3 only for sub-points inside a service section.",
        "Avoid skipping heading levels.",
        "Keep headings descriptive and natural German (no keyword stuffing)."
      ]
    }
  },

  "layout_grid_spacing": {
    "container": {
      "max_width": "max-w-6xl",
      "padding": "px-4 sm:px-6 lg:px-8",
      "section_spacing": "py-14 sm:py-18 lg:py-24",
      "stack_gap": "gap-8 sm:gap-10 lg:gap-14"
    },
    "grid_patterns": {
      "hero": "grid grid-cols-1 lg:grid-cols-12 gap-10 items-start",
      "three_highlights": "grid grid-cols-1 md:grid-cols-3 gap-6",
      "services_teaser": "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
      "legal": "prose prose-neutral max-w-3xl"
    },
    "line_length": {
      "body_max": "max-w-prose",
      "note": "Keep paragraphs ~60–75 characters per line for premium readability."
    }
  },

  "components": {
    "component_path": {
      "shadcn_primary": "/app/frontend/src/components/ui",
      "use": [
        "button.jsx",
        "card.jsx",
        "sheet.jsx (mobile menu)",
        "navigation-menu.jsx (desktop nav)",
        "separator.jsx",
        "badge.jsx",
        "aspect-ratio.jsx",
        "accordion.jsx (optional for Leistungen quick-jump)",
        "sonner.jsx (optional toast for copy-to-clipboard phone/email)"
      ]
    },

    "header": {
      "structure": "Top bar with logo left, nav center/right, contact CTA cluster right. Sticky; becomes compact with subtle border on scroll.",
      "background": "Use solid #F7F4EC or white; ensure logo on transparent background reads cleanly.",
      "desktop_nav": {
        "component": "navigation-menu",
        "item_style": "text-sm font-medium text-foreground/80 hover:text-foreground; underline accent on active",
        "active_state": "border-b-2 border-[var(--brand-accent)]"
      },
      "mobile_nav": {
        "component": "sheet",
        "touch_targets": "min-h-[44px] py-3",
        "layout": "Large stacked links + contact buttons at bottom"
      },
      "contact_cta_cluster": {
        "buttons": [
          "Anrufen",
          "WhatsApp",
          "E-Mail"
        ],
        "priority": "On desktop show all 3; on mobile show one primary (Anrufen) + menu contains all.",
        "data_testids": {
          "call": "header-call-button",
          "whatsapp": "header-whatsapp-button",
          "email": "header-email-button",
          "mobile_menu": "header-mobile-menu-button"
        }
      }
    },

    "buttons": {
      "shape": "Premium / Elegant: rounded-xl (radius token 14px), tall, calm",
      "variants": {
        "primary": {
          "use": "Main CTA (Jetzt Kontakt aufnehmen, Anrufen)",
          "tailwind": "bg-[var(--brand-accent)] text-[var(--brand-forest)] hover:bg-[color-mix(in_srgb,var(--brand-accent),white_12%)] focus-visible:ring-2 focus-visible:ring-[var(--ring)]",
          "note": "Text on accent should be dark forest for a natural premium feel (not white)."
        },
        "secondary": {
          "use": "WhatsApp / E-Mail secondary CTAs",
          "tailwind": "bg-transparent border border-[var(--border)] text-foreground hover:bg-[rgba(15,46,20,0.06)]"
        },
        "ghost": {
          "use": "Inline actions (copy phone/email)",
          "tailwind": "bg-transparent text-foreground/80 hover:text-foreground hover:bg-[rgba(17,21,19,0.04)]"
        }
      },
      "sizes": {
        "md": "h-11 px-5 text-sm",
        "lg": "h-12 px-6 text-sm"
      },
      "micro_interactions": {
        "hover": "subtle lift via shadow only (no translateY if possible); optional scale-[1.01] on large CTAs",
        "active": "scale-[0.99]",
        "transition_rule": "Never transition: all. Use transition-colors, transition-shadow, and (optionally) transition-transform only on the button element."
      }
    },

    "cards_service_tiles": {
      "component": "card",
      "style": "Cream canvas; cards are white with soft border; minimal shadow",
      "tailwind": "rounded-[var(--radius)] border border-[var(--border)] bg-white shadow-[0_1px_0_rgba(15,46,20,0.06)] hover:shadow-[0_10px_30px_rgba(15,46,20,0.10)]",
      "content": {
        "title": "font-heading text-xl",
        "meta": "small muted line (region/service tag)",
        "cta": "Text link with accent underline"
      },
      "data_testids": {
        "service_card": "service-card",
        "service_card_cta": "service-card-cta"
      }
    },

    "placeholder_surfaces_no_photos": {
      "goal": "Make image areas feel intentional and premium without stock photos.",
      "building_blocks": [
        {
          "name": "Emblem Surface",
          "use": "Hero focal block behind/around logo; Team page placeholders",
          "spec": "AspectRatio 4/3 or 1/1; center logo mark; add caption label",
          "tailwind": "relative overflow-hidden rounded-[calc(var(--radius)+6px)] border border-[rgba(15,46,20,0.16)] bg-[var(--brand-cream)]"
        },
        {
          "name": "Organic Gradient Panel (subtle)",
          "use": "Service teaser tiles, section dividers",
          "css": "background: radial-gradient(1200px 600px at 20% 10%, rgba(15,187,130,0.14), transparent 55%), radial-gradient(900px 500px at 80% 30%, rgba(96,128,48,0.18), transparent 60%), linear-gradient(180deg, rgba(15,46,20,0.06), rgba(247,244,236,0.0));",
          "note": "Keep gradients mild; never behind long paragraphs."
        },
        {
          "name": "Soft Grain Overlay",
          "use": "Applied via pseudo-element on large placeholder panels",
          "css": "background-image: url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"120\" height=\"120\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"3\" stitchTiles=\"stitch\"/></filter><rect width=\"120\" height=\"120\" filter=\"url(%23n)\" opacity=\"0.12\"/></svg>'); mix-blend-mode: multiply; opacity: 0.18;",
          "note": "Use sparingly; ensure performance (single overlay per section)."
        },
        {
          "name": "Leaf-line Motif (very subtle)",
          "use": "Background decoration in hero/contact block",
          "spec": "Thin SVG line art in rgba(15,46,20,0.08); positioned top-right; no clutter"
        }
      ],
      "aspect_ratio_rules": {
        "prevent_cls": "All placeholder surfaces must use fixed aspect ratios via AspectRatio component or explicit h-[...]",
        "recommended": ["16/9 for hero side panel", "4/3 for service tiles", "1/1 for team emblems"]
      }
    },

    "contact_cta_block": {
      "placement": "End of each page (above footer) + mid-page on Leistungen",
      "layout": "Two-column on desktop: text left, buttons right; stacked on mobile",
      "surface": "Cream with subtle border + tiny organic gradient corner",
      "tailwind": "rounded-[calc(var(--radius)+8px)] border border-[rgba(15,46,20,0.16)] bg-[var(--brand-cream)] p-6 sm:p-8",
      "buttons": {
        "order": "Anrufen (primary) then WhatsApp then E-Mail",
        "data_testids": {
          "call": "contact-cta-call-button",
          "whatsapp": "contact-cta-whatsapp-button",
          "email": "contact-cta-email-button"
        }
      }
    },

    "footer": {
      "background": "Solid deep forest (#0F2E14). No gradients.",
      "text": "Cream text (#F7F4EC) with 80% opacity for secondary lines",
      "logo_treatment": "Use a light/mono version if available; otherwise place original logo on a cream badge container.",
      "layout": "3 columns on desktop (Brand/NAP, Contact, Rechtliches) -> stacked on mobile",
      "data_testids": {
        "footer": "site-footer",
        "footer-phone": "footer-phone-link",
        "footer-email": "footer-email-link",
        "footer-address": "footer-address-text"
      }
    }
  },

  "page_blueprints": {
    "startseite": {
      "hero": {
        "h1": "Garten- und Landschaftspflege in und um Lübeck",
        "structure": "Left: H1 + intro + CTA row; Right: premium placeholder surface with logo/emblem",
        "cta": "Jetzt Kontakt aufnehmen",
        "data_testids": {
          "hero_primary_cta": "home-hero-primary-cta"
        }
      },
      "key_services": {
        "services": ["Gartenpflege", "Heckenrückschnitt", "Baumfällungen"],
        "presentation": "3 premium cards with short claim + 1-line description + link to Leistungen anchor",
        "data_testids": {
          "key-services-section": "home-key-services-section"
        }
      },
      "services_teaser_grid": {
        "goal": "Teaser of remaining services (no photos) using placeholder panels + labels",
        "cta_to_leistungen": "Mehr Leistungen ansehen"
      }
    },

    "leistungen": {
      "intro": "Short, calm intro; optional quick-jump accordion/table of contents",
      "services": {
        "count": 10,
        "each_section": "H2 title + short claim line + paragraph; optional bullet list",
        "baumfaellungen_prominence": "Give Baumfällungen a stronger placeholder surface + accent badge + earlier placement in TOC",
        "data_testids": {
          "services-page": "services-page",
          "service-section": "service-section"
        }
      },
      "weitere_leistungen": "Mention block at end (muted)"
    },

    "ueber_uns": {
      "tone": "Personal/regional; confirmed facts only",
      "layout": "Editorial: heading + short lead + 2-column text/values; emblem placeholder",
      "data_testids": {
        "about-page": "about-page"
      }
    },

    "team": {
      "no_names_no_photos": true,
      "layout": "Grid of 3–6 team value cards with emblem placeholders; focus on Arbeitsweise/Qualität/Sorgfalt",
      "data_testids": {
        "team-page": "team-page"
      }
    },

    "legal_pages": {
      "paths": ["/impressum", "/datenschutz", "/agb"],
      "layout": "Simple, readable, max-w-3xl; clear headings; no decorative gradients",
      "data_testids": {
        "legal-page": "legal-page"
      }
    }
  },

  "motion": {
    "principles": {
      "name": "Soft Organic Motion",
      "rules": [
        "Use subtle opacity + translateY (4–10px) entrance on scroll",
        "No aggressive parallax, no scroll-jacking, no pulsing",
        "Hover: gentle shadow change + tiny scale on large surfaces",
        "Respect prefers-reduced-motion: disable transforms/animations"
      ]
    },
    "implementation": {
      "library": "framer-motion (optional) OR IntersectionObserver + CSS classes (preferred for performance)",
      "recommended": "IntersectionObserver for minimal JS",
      "css_classes": {
        "base": "opacity-0 translate-y-2",
        "in": "opacity-100 translate-y-0",
        "transition": "transition-opacity duration-500 ease-out transition-transform"
      }
    }
  },

  "accessibility": {
    "contrast": "Ensure text on cream meets WCAG AA; use #111513 for body; avoid low-opacity text below 70% for long paragraphs.",
    "focus": "Visible focus ring using --ring (accent-based).",
    "touch_targets": "Min 44px height for header/menu/contact buttons.",
    "reduced_motion": "Use prefers-reduced-motion to disable entrance animations and hover transforms.",
    "aria": "Nav and mobile sheet must have aria-labels; icons must have sr-only labels."
  },

  "performance_seo": {
    "core_web_vitals": {
      "cls": "Reserve sizes for logo and placeholder surfaces (AspectRatio).",
      "lcp": "Hero placeholder should be CSS-only (no heavy images).",
      "inp": "Avoid heavy animation libs; prefer IntersectionObserver."
    },
    "local_seo": {
      "nap_consistency": "Footer NAP exactly consistent across pages.",
      "structured_content": "Use semantic sections, headings, and internal links to Leistungen anchors.",
      "language": "Set lang=de; German-only copy."
    }
  },

  "image_urls": {
    "note": "No stock photos allowed. Use only the provided logo asset + CSS/SVG placeholder surfaces.",
    "logo": {
      "category": "brand",
      "description": "Client-provided transparent logo (Holstentor + tree/shrubs + serif STREICH wordmark).",
      "url": "CLIENT_PROVIDED_ASSET"
    },
    "placeholder_surfaces": [
      {
        "category": "hero",
        "description": "CSS-only organic gradient panel with subtle grain overlay; fixed 16/9 aspect ratio.",
        "url": "CSS_ONLY"
      },
      {
        "category": "team",
        "description": "Emblem surface 1/1 with logo mark centered + caption label.",
        "url": "CSS_ONLY"
      }
    ]
  },

  "instructions_to_main_agent": [
    "Create / update global design tokens in /app/frontend/src/index.css :root to match the HEX palette above (convert to HSL if needed for shadcn tokens, but keep HEX as custom vars).",
    "Remove CRA demo styles in /app/frontend/src/App.css (spinning logo etc.). Do NOT center the app container.",
    "Use shadcn Button/Card/Sheet/NavigationMenu/AspectRatio components; keep components in .jsx (not .tsx).",
    "Implement placeholder surfaces as reusable React components (e.g., <BrandSurface variant=... />) using AspectRatio to prevent CLS.",
    "Every interactive element and key info must include stable data-testid attributes (kebab-case).",
    "No forms anywhere. Contact actions must be tel:, mailto:, and WhatsApp deep link.",
    "Footer must include NAP exactly and legal links to /impressum /datenschutz /agb.",
    "Animations: implement IntersectionObserver-based reveal with prefers-reduced-motion guard; avoid heavy parallax/3D."
  ],

  "general_ui_ux_design_guidelines_appendix": "<General UI UX Design Guidelines>  \n    - You must **not** apply universal transition. Eg: `transition: all`. This results in breaking transforms. Always add transitions for specific interactive elements like button, input excluding transforms\n    - You must **not** center align the app container, ie do not add `.App { text-align: center; }` in the css file. This disrupts the human natural reading flow of text\n   - NEVER: use AI assistant Emoji characters like`🤖🧠💭💡🔮🎯📚🎭🎬🎪🎉🎊🎁🎀🎂🍰🎈🎨🎰💰💵💳🏦💎🪙💸🤑📊📈📉💹🔢🏆🥇 etc for icons. Always use **FontAwesome cdn** or **lucid-react** library already installed in the package.json\n\n **GRADIENT RESTRICTION RULE**\nNEVER use dark/saturated gradient combos (e.g., purple/pink) on any UI element.  Prohibited gradients: blue-500 to purple 600, purple 500 to pink-500, green-500 to blue-500, red to pink etc\nNEVER use dark gradients for logo, testimonial, footer etc\nNEVER let gradients cover more than 20% of the viewport.\nNEVER apply gradients to text-heavy content or reading areas.\nNEVER use gradients on small UI elements (<100px width).\nNEVER stack multiple gradient layers in the same viewport.\n\n**ENFORCEMENT RULE:**\n    • Id gradient area exceeds 20% of viewport OR affects readability, **THEN** use solid colors\n\n**How and where to use:**\n   • Section backgrounds (not content backgrounds)\n   • Hero section header content. Eg: dark to light to dark color\n   • Decorative overlays and accent elements only\n   • Hero section with 2-3 mild color\n   • Gradients creation can be done for any angle say horizontal, vertical or diagonal\n\n- For AI chat, voice application, **do not use purple color. Use color like light green, ocean blue, peach orange etc**\n\n</Font Guidelines>\n\n- Every interaction needs micro-animations - hover states, transitions, parallax effects, and entrance animations. Static = dead. \n   \n- Use 2-3x more spacing than feels comfortable. Cramped designs look cheap.\n\n- Subtle grain textures, noise overlays, custom cursors, selection states, and loading animations: separates good from extraordinary.\n   \n- Before generating UI, infer the visual style from the problem statement (palette, contrast, mood, motion) and immediately instantiate it by setting global design tokens (primary, secondary/accent, background, foreground, ring, state colors), rather than relying on any library defaults. Don't make the background dark as a default step, always understand problem first and define colors accordingly\n    Eg: - if it implies playful/energetic, choose a colorful scheme\n           - if it implies monochrome/minimal, choose a black–white/neutral scheme\n\n**Component Reuse:**\n\t- Prioritize using pre-existing components from src/components/ui when applicable\n\t- Create new components that match the style and conventions of existing components when needed\n\t- Examine existing components to understand the project's component patterns before creating new ones\n\n**IMPORTANT**: Do not use HTML based component like dropdown, calendar, toast etc. You **MUST** always use `/app/frontend/src/components/ui/ ` only as a primary components as these are modern and stylish component\n\n**Best Practices:**\n\t- Use Shadcn/UI as the primary component library for consistency and accessibility\n\t- Import path: ./components/[component-name]\n\n**Export Conventions:**\n\t- Components MUST use named exports (export const ComponentName = ...)\n\t- Pages MUST use default exports (export default function PageName() {...})\n\n**Toasts:**\n  - Use `sonner` for toasts\"\n  - Sonner component are located in `/app/src/components/ui/sonner.tsx`\n\nUse 2–4 color gradients, subtle textures/noise overlays, or CSS-based noise to avoid flat visuals.\n</General UI UX Design Guidelines>"
}
