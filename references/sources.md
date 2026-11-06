# Sources

How this skill was built, so rules can be traced and nothing is invented.

## Primary source (priority on conflicts)
- **@UXUIDesign (디자이너 마디아, Madia)** — YouTube channel. v1 of this skill distilled every public caption into Korean principles with ~1,061 concrete instructions (sizes, colors, spacing, states). v2 translates those rules to English, keeps every number, and tags them `[M]`.

## Overseas channels (caption transcripts, 3,903 videos, ~9.6M words)
| Tag | Channel | Videos / words | What it contributes |
|---|---|---|---|
| `[DC]` | DesignCourse (Gary Simon) | 1,299 / 3.65M | UI fundamentals, contrast tooling, typography fixes, cards/shadows, forms, navigation, rapid redesigns |
| `[JS]` | Jesse Showalter | 766 / 1.22M | spacing/grid systems, typography basics, 60-30-10, laws of UX, form feedback, hero sections |
| `[CM]` | CharliMarieTV | 688 / 1.13M | marketing-site design systems, critique method, dev-QA review with DevTools, mobile tips |
| `[AJ]` | AJ&Smart | 393 / 0.82M | research vs bias, business language, platform guidelines, sprints/facilitation |
| `[FG]` | Figma (official: Config, Edu, Office Hours) | 375 / 1.26M | typography systems, components/variables, accessible states, motion durations, UX writing |
| `[MZ]` | Mizko | 206 / 0.45M | 4-pt spacing, type scale, color system (10 grays / 5 steps), grids, empty states, error copy, conversion UX |
| `[TF]` | thefutur | 93 / 0.70M | pricing/business (out of scope for UI rules; not cited in references) |
| `[UXDI]` | UX Design Institute | 79 / 0.37M | accessibility (Deque, Skyscanner), user interviews, mobile usability testing |
| `[FX]` | Flux Academy | 4 / 0.01M | form vs function scoring, performance, portfolio first impressions, AI over-reliance |

Processing: `index.csv` + title theming → UI-relevance ranking by keyword density → per-theme keyword windows and numeric-fact aggregation (line-height, font sizes, padding, radius, contrast, durations, grid) → ~130 teaching videos read in compressed form (listed below). Rules were kept only when stated in captions; counts like "x7" in the research notes refer to mention frequency across the selected videos.

## Representative videos read (by topic)

### Typography
- [JesseShowalter] TYPOGRAPHY | Everything I know about Type in 10 Minutes — https://www.youtube.com/watch?v=GCluIaNmOG0
- [JesseShowalter] 5 More Typography Tips & Tricks — https://www.youtube.com/watch?v=K1Xr1AkBiTQ
- [JesseShowalter] Typographic Scales in Web Design & UI Design — https://www.youtube.com/watch?v=ot-5dQG2v5M
- [Mizko] Perfect Typography Scale for UI Design (Exact Blueprint) | Figma Tutorial — https://www.youtube.com/watch?v=hwjiExdMiNY
- [Mizko] Figma Tutorial: Create the Perfect Typography Scale for UI & Web Projects (IN 10 MINUTES) - Part 1 — https://www.youtube.com/watch?v=6EuBIwUeF48
- [Mizko] The ONLY 8 Fonts UI Designers Need. Forget The Rest. — https://www.youtube.com/watch?v=mEAmAFgzQd4
- [DesignCourse] 4 Ways to Use Letter Spacing (Tracking) in UI Design — https://www.youtube.com/watch?v=fXSxHVEQFjk
- [DesignCourse] The One Typography Mistake Most of you Make! - Including Myself! — https://www.youtube.com/watch?v=Upg7Ykl_e-4
- [DesignCourse] Typographic Visual Hierarchy in UI Design (4 Examples) — https://www.youtube.com/watch?v=u9XSmlZhYq4
- [DesignCourse] Does your Typography Stink? Let's FIX that! — https://www.youtube.com/watch?v=TF5r2-BdUSU
- [DesignCourse] Truly Fluid Typography with 1 CSS PROPERTY! — https://www.youtube.com/watch?v=dg488RrpNTc
- [Figma] Config 2025: Typography is the foundation of any design system with Elliot Jay Stocks — https://www.youtube.com/watch?v=n0iAYEpU0Fk

### Spacing & layout
- [JesseShowalter] Master Spacing in UI Design 💪 — https://www.youtube.com/watch?v=cf95Z7Ngg8k
- [Mizko] The Perfect Spacing Framework in UI Design | Figma Tutorial — https://www.youtube.com/watch?v=Al1xsdol4Pk
- [JesseShowalter] 4 Foundational UI Design Principles | C.R.A.P. — https://www.youtube.com/watch?v=uwNClNmekGU
- [JesseShowalter] Grid Systems in Web & UI Design — https://www.youtube.com/watch?v=n_V_aLqYPI0
- [JesseShowalter] Advanced Grids in UI & Web Design — https://www.youtube.com/watch?v=iRbY1rfh2xk
- [JesseShowalter] Baseline Grids | The basics of Baseline Grids in UI & Web Design — https://www.youtube.com/watch?v=rGq1GllRLjk
- [Mizko] Perfect Responsive Grid Systems Masterclass | UI Design & Figma Tutorial — https://www.youtube.com/watch?v=YO2AUiH2hyk
- [Mizko] How to Calculate Responsive Grid Layouts (STEP BY STEP!!) — https://www.youtube.com/watch?v=u2YiXAV0zBA
- [Mizko] How to UI Design WITHOUT Grids Like a PRO — https://www.youtube.com/watch?v=D0gTGwZ-LJM
- [DesignCourse] Fixing your BAD Alignment! Stop doing this one thing.. — https://www.youtube.com/watch?v=yxPk82xV7bA
- [DesignCourse] Your Designs are TOO BOXY! Here's how to fix it. — https://www.youtube.com/watch?v=kAe4EgT2KXM
- [DesignCourse] There are 12+ Things Wrong with this Layout.. — https://www.youtube.com/watch?v=g2crbT9RBAE
- [JesseShowalter] How to Make Your Designs Breathe | Top 5 Tips — https://www.youtube.com/watch?v=RlWaHwagEvE
- [DesignCourse] I don't design with GRIDS in Figma. My 3 reasons. — https://www.youtube.com/watch?v=BaYHipYZWqk

### Color, contrast, accessibility
- [JesseShowalter] 60-30-10 Color Rule — https://www.youtube.com/watch?v=UWwNIMHFdW4
- [JesseShowalter] Color Theory in UI Design — https://www.youtube.com/watch?v=-4lMJ4is2pE
- [JesseShowalter] Color in UI Design | Top 5 Tips — https://www.youtube.com/watch?v=s4XJEukEV3M
- [DesignCourse] Perfecting Contrast in UI Design - Beginners, GET IN HERE NOW! — https://www.youtube.com/watch?v=UWr-HAamc70
- [DesignCourse] Getting your Web Design CONTRAST Perfect 100% of the Time — https://www.youtube.com/watch?v=FcEyCwNmcfU
- [DesignCourse] Use this Trick to FIX Contrast Issues! — https://www.youtube.com/watch?v=5GHUDASIq-8
- [DesignCourse] Color Shades: Most of you are doing this WRONG! — https://www.youtube.com/watch?v=CFtkcimpwXQ
- [DesignCourse] UI Design Contrast: 2 MUST NEED Tools & How to Use Them — https://www.youtube.com/watch?v=9UQEGqwAjyE
- [DesignCourse] Color Crash Course for UI/UX Designers [By Example] — https://www.youtube.com/watch?v=Ewj85eIda74
- [DesignCourse] Creating Pastel Color Schemes from Scratch - UI Design — https://www.youtube.com/watch?v=fTD9coD6LG0
- [DesignCourse] EASILY Construct Color Schemes for UI/UX Design — https://www.youtube.com/watch?v=1JkeKDDOnw8
- [Mizko] UI Design Tutorial: How to Create the PERFECT Color Palette FROM SCRATCH (No Generators) — https://www.youtube.com/watch?v=U_IhV8VPoII
- [DesignCourse] Most Designers Can't Light/Dark Mode - Can you? — https://www.youtube.com/watch?v=Y8g3YtZckco
- [DesignCourse] The UI/UX of Light / Dark Mode Design (Challenge) — https://www.youtube.com/watch?v=wqTZuEQ2P-s
- [Figma] Config 2025: New options for accessible design with Tal Kailler — https://www.youtube.com/watch?v=IXj7wZqU4Gc
- [UXDesignInstitute] How to create Accessible UX | Accessibility in UX with Deque Systems | UX Insiders — https://www.youtube.com/watch?v=ww9ySxGp06M
- [UXDesignInstitute] What accessibility is & why it matters | UX Career Masterclass — https://www.youtube.com/watch?v=nYH2FcZRrZ0

### Hierarchy & anti-patterns
- [DesignCourse] The WORST Thing You Can Do (in UI Design) — https://www.youtube.com/watch?v=nL5M0qGN5RM
- [DesignCourse] 6 Ways to KILL a Great UI Design — https://www.youtube.com/watch?v=yx-YHFZ4LPs
- [DesignCourse] 6 Mistakes that Newbie Designers Make (Constantly) — https://www.youtube.com/watch?v=tsL4sFv0sgo
- [DesignCourse] This is why your Web Designs are Ugly — https://www.youtube.com/watch?v=buNpzG76K2Y
- [DesignCourse] 5 Tips to INSTANTLY Improve your UI/UX Designs — https://www.youtube.com/watch?v=82UEVnBmAck
- [DesignCourse] 9 UI Design Techniques That Will Last Forever! — https://www.youtube.com/watch?v=6AQUHnkOQl0
- [DesignCourse] Do These Things to MAKE your UI Designs BETTER — https://www.youtube.com/watch?v=pfu1CKyCc7A
- [JesseShowalter] Be a Better UI Designer in 5 minutes — https://www.youtube.com/watch?v=XoNTygM2BOI
- [JesseShowalter] 5 More UI Design Tips — https://www.youtube.com/watch?v=yx0YDSSxiJY
- [JesseShowalter] Amateur vs Pro UI Design | with examples — https://www.youtube.com/watch?v=XZf5A0wcruE
- [JesseShowalter] Do's and Dont's of UI Design — https://www.youtube.com/watch?v=wIJb0PmKVFA
- [Mizko] 6 Advanced UI Design Tips (Deep-dive) — https://www.youtube.com/watch?v=9jp_1gHhieA
- [Mizko] How to NOT Suck at UI Design - April 2021 — https://www.youtube.com/watch?v=QZj-kv_so2k
- [Mizko] How to NOT Suck in UI Design - June 2021 — https://www.youtube.com/watch?v=hBlQo5n_hWE
- [Mizko] 5 MISTAKES to AVOID in Web/UX Design!! — https://www.youtube.com/watch?v=4O_0ZHO59Oo
- [DesignCourse] The 7 Myths of UI/UX Design — https://www.youtube.com/watch?v=86ijtIdRtSU
- [DesignCourse] The UI/UX of Hero Sections (Challenge) — https://www.youtube.com/watch?v=YNxCjIccPO8
- [DesignCourse] What is the 5 SECOND TEST in Usability? — https://www.youtube.com/watch?v=kimr9kznOWA

### Components & states
- [JesseShowalter] UI Card Design | Reworking 5 Common UI Card Mistakes — https://www.youtube.com/watch?v=74DHJHibDXg
- [DesignCourse] Fixing your BROKEN Cards! Do's and DON'Ts of Card Design — https://www.youtube.com/watch?v=iWpuTwsKMtM
- [DesignCourse] Designing UI Cards That Don't Suck — https://www.youtube.com/watch?v=EN_jC26B9rg
- [DesignCourse] Can you still DROP SHADOW like it's 2004? — https://www.youtube.com/watch?v=4anIHp9INsU
- [DesignCourse] 5 Types of Shadows for your UI Designs — https://www.youtube.com/watch?v=5qL8Zg6hISU
- [DesignCourse] Become a CSS Shadow Master!  Layered CSS Shadows Tutorial — https://www.youtube.com/watch?v=DG6C-GMeLiI
- [DesignCourse] The most IMPORTANT design lesson, taught by a BUTTON! — https://www.youtube.com/watch?v=KjRPX5EeKFA
- [DesignCourse] 11 UX Tips for Successful Navigations (in 7 minutes!) — https://www.youtube.com/watch?v=D29KL52Srtw
- [DesignCourse] Your Mobile Navigations STINK! Better UX AWAITS! — https://www.youtube.com/watch?v=1D4FzPcEiN4
- [JesseShowalter] Search Box Design Tips — https://www.youtube.com/watch?v=EXB_HQa4p3Q
- [DesignCourse] New UI Design Trends - Vibrant Gradients & Colored Drop Shadows! — https://www.youtube.com/watch?v=y_MTsIQuNEo
- [DesignCourse] Could this be the BIGGEST UI Design Trend of 2020? #Neumorphism — https://www.youtube.com/watch?v=KlSLdEB3lzg
- [Mizko] Figma Tutorial: Glassmorphism UI Design Tutorial for Beginners — https://www.youtube.com/watch?v=hKwCQNuomu8
- [Figma] Create the button: Figma Design for beginners [6 of 13] — https://www.youtube.com/watch?v=PZaBmmI0s4M

### Forms & UX patterns
- [DesignCourse] You Suck at Form Design ((Probably)) — https://www.youtube.com/watch?v=z9H7p1_iI14
- [DesignCourse] UI/UX Form Design DO's and DON'Ts! Review — https://www.youtube.com/watch?v=I5Vz2pl8pPI
- [DesignCourse] Fixing your Broken Contact Forms - Rapid ReDesigns — https://www.youtube.com/watch?v=Lg13omZ8EwU
- [DesignCourse] Designing Forms in Figma - UI/UX Challenge — https://www.youtube.com/watch?v=EKjCC4PwjFo
- [JesseShowalter] The 4 Most Important Laws of UX Design — https://www.youtube.com/watch?v=eQGjV6_8t7I
- [JesseShowalter] 3 Psychology Principles in UX Design — https://www.youtube.com/watch?v=e_g8FxbrCWY
- [JesseShowalter] 5 UX Design Tips & Techniques | UX Design Basics — https://www.youtube.com/watch?v=w6qyekgIo8I
- [JesseShowalter] Ways to Improve Your UX Designs — https://www.youtube.com/watch?v=YsyY-LCaSJM
- [Mizko] How to Increase Conversion Rate - 5 Secret UX Design Tricks — https://www.youtube.com/watch?v=swLrT5w3w2U
- [Mizko] I Fixed Airbnb's UX/UI Mistakes — https://www.youtube.com/watch?v=opqIQ4bH7U0
- [DesignCourse] How to Make Super Effective Call to Actions in your UI Designs — https://www.youtube.com/watch?v=cBzU1zCSovQ
- [JesseShowalter] 10 Tips for Better Website Hero Sections — https://www.youtube.com/watch?v=HY_Ea1la6BM
- [AJSmart] UX Design: Top 5 tips from our designers — https://www.youtube.com/watch?v=3yF3NBX_8Ig

### Responsive
- [DesignCourse] Most UI/UX'ers are Bad at Responsive Design - Let's Fix That — https://www.youtube.com/watch?v=8lwW3daruv0
- [DesignCourse] UI/UX - Should you start with Mobile or Desktop Design FIRST? — https://www.youtube.com/watch?v=HkX8eao2NZ0
- [JesseShowalter] Responsive Web Design | 10 Basics — https://www.youtube.com/watch?v=zF6VSky4SIc
- [CharliMarieTV] 5 tips for designing mobile-friendly websites — https://www.youtube.com/watch?v=tgTbjIyKY3k
- [DesignCourse] Responsive CSS Grid with NO MEDIA QUERIES! — https://www.youtube.com/watch?v=bam83Xv4VMA
- [JesseShowalter] Responsive Web Design Has Never Been This Easy | Figma Breakpoints — https://www.youtube.com/watch?v=gsVwThzYwv8

### Motion
- [DesignCourse] The Most Popular UI/UX Animation Technique — https://www.youtube.com/watch?v=QiqSE2XcyDo
- [DesignCourse] Building an AWESOME Button Micro-interaction (Frontend Dev) — https://www.youtube.com/watch?v=YHYpEMgDPkU
- [DesignCourse] Using CSS Cubic-Bezier Animations for Page Transitions — https://www.youtube.com/watch?v=pxUCPbaZRQY
- [DesignCourse] SICK Dropdown Navigation with Micro-Interactions (PURE CSS) — https://www.youtube.com/watch?v=L3ISA9nbgyc
- [Mizko] Figma Tutorial: Smart Animate - Create UI & Web Animations  (in 17 Minutes) — https://www.youtube.com/watch?v=2bA13vdv9h8
- [Figma] Intro to Figma Motion for Edu with shader effects and fills — https://www.youtube.com/watch?v=-CraJDub-7Q
- [Figma] Figma for Edu: Prototyping with animations in Figma — https://www.youtube.com/watch?v=y9lZ5GMXNyU
- [Figma] Figma deep dive: Motion | Config 2026 — https://www.youtube.com/watch?v=3evAfmLVZK8

### Copy
- [Figma] Config 2025: Writing is designing with Andy Welfle — https://www.youtube.com/watch?v=2IbCtThC12c
- [DesignCourse] How to Make Super Effective Call to Actions in your UI Designs — https://www.youtube.com/watch?v=cBzU1zCSovQ
- [CharliMarieTV] How designers & copywriters work together! — https://www.youtube.com/watch?v=SD_j8l-ytyA

### Design systems & tokens
- [Mizko] Create a Figma Design System - Fundamentals (Part 1) — https://www.youtube.com/watch?v=G1xmkQeExJo
- [Mizko] Create a Figma Design System - Color Systems Tutorial (Part 2) — https://www.youtube.com/watch?v=uSZirUYhtf4
- [DesignCourse] What is a Design System? Design Systems 101 for Designers — https://www.youtube.com/watch?v=wc5krC28ynQ
- [CharliMarieTV] Figma design system for a marketing website — https://www.youtube.com/watch?v=mCULNu6-Ts0
- [CharliMarieTV] The Dropbox design secret to brand consistency — https://www.youtube.com/watch?v=yZPTzcwhC7Q
- [Figma] Office Hours: Building aligned Design Systems — https://www.youtube.com/watch?v=7AakOXqyK64
- [Figma] Config 2025: Unifying design and development through design systems — https://www.youtube.com/watch?v=X6_Bakp6xgY
- [Figma] Deep Dive into Southwest Airlines’ Design Systems | Figma — https://www.youtube.com/watch?v=1YpX4OgITkY

### Research, critique, QA
- [CharliMarieTV] How I do a front-end dev QA review — https://www.youtube.com/watch?v=0XZ7CEeCSPg
- [CharliMarieTV] How to use Inspect Element to improve your design reviews! 🔍 — https://www.youtube.com/watch?v=DWRLZWBso6M
- [CharliMarieTV] How to critique design work - with Karen Kavett | CharliMarieTV — https://www.youtube.com/watch?v=D-dFguY-vZ0
- [CharliMarieTV] Tips for giving feedback & critiques (Design advice) | CharliMarieTV — https://www.youtube.com/watch?v=ugi7ONEkzCI
- [Mizko] How to Conduct a User Interview for UX Designers (in 10 Minutes) - FREE Template Provided — https://www.youtube.com/watch?v=KZ6jj_EZUgM
- [UXDesignInstitute] How to do a mobile usability test — https://www.youtube.com/watch?v=hwS8NIh-g0Y
- [Mizko] Real UX Project: From Data, Wireframes to UI Design Process — https://www.youtube.com/watch?v=j0cR1Sf0I24
- [DesignCourse] You need to know Usability Testing (with Maze) — https://www.youtube.com/watch?v=ID0fwi2q028
- [AJSmart] User Research - Is It ACTUALLY Important? — https://www.youtube.com/watch?v=BEaqxAcXS_Y
- [FluxAcademy] 5 Amazing Websites, But Do they Work?! — https://www.youtube.com/watch?v=6D6XYXoE7cs
- [FluxAcademy] Reacting to 50 Design Portfolios in 25 Minutes — https://www.youtube.com/watch?v=NhR5hV1zC-Q
- [FluxAcademy] I Thought My Designs are Ugly, Until I Realized This — https://www.youtube.com/watch?v=1oqGaBQs4k8
- [FluxAcademy] I used Claude to design… too much — https://www.youtube.com/watch?v=i8fj-nOvpek