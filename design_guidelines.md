# Design Guidelines: Product Owner Portfolio

## Design Approach
**Reference-Based Minimalism** inspired by Linear, Stripe, and Vercel portfolios. Clean, typography-focused with strategic motion design that enhances rather than distracts. Professional yet memorable.

## Typography System
- **Primary Font**: Inter (Google Fonts) - clean, professional, excellent for UI
- **Display Font**: Space Grotesk (Google Fonts) - for headlines and impact moments
- **Hierarchy**:
  - Hero Title: text-6xl/text-7xl, font-bold, Space Grotesk
  - Section Headers: text-4xl/text-5xl, font-semibold
  - Body Text: text-base/text-lg, leading-relaxed
  - Captions/Meta: text-sm, opacity-70

## Layout System
**Spacing Primitives**: Use Tailwind units of 4, 8, 12, 16, 20 (e.g., p-4, gap-8, py-20)
- Max width containers: max-w-6xl for content, max-w-4xl for blog posts
- Asymmetric grid layouts where appropriate (60/40 splits)
- Generous whitespace: py-20 to py-32 for section padding

## Page Structure

### Homepage
**No Traditional Hero** - Lead with impact:
1. **Opening Statement**: Full-width typographic introduction with animated role description ("Product Owner → Payment Systems → Digital Products") that cycles through key skills
2. **Metrics Dashboard**: Grid showcasing key achievements (80%+ conversion rate, 40K+ passkey users, 6+ years experience) with subtle number counting animations
3. **Featured Work**: Asymmetric card layout showing 2-3 major projects (Barion Payment, Peak Financial) with hover-reveal details
4. **Experience Timeline**: Horizontal scrolling timeline with company logos, roles, and key achievements
5. **Skills Matrix**: Tag cloud or grid of tools/technologies with visual clustering by category
6. **Blog Preview**: Latest 3 posts in card format
7. **Contact CTA**: Clean, centered section with email and social links

### Blog Section
- Magazine-style grid: Featured post (large card) + 3-4 recent posts (smaller cards)
- Filter/category tags
- Reading time indicators
- Individual post pages: max-w-prose, generous line-height (1.8), pull quotes for emphasis

## Component Library

### Navigation
- Sticky header, backdrop-blur effect on scroll
- Logo/name on left, minimal menu items (Work, Blog, About, Contact)
- Icons: Heroicons (outline style)

### Cards
- Border-subtle or shadow-sm, rounded-2xl
- Hover: Slight lift (translate-y-1) and shadow increase
- Internal padding: p-8
- Sections clearly defined with visual hierarchy

### Buttons
- Primary: Solid with subtle shadow, rounded-lg, px-8 py-3
- Secondary: Outlined with hover fill
- On images: Backdrop blur (backdrop-blur-md) with semi-transparent background

### Animations
**Strategic Motion Only**:
- Fade-in-up on scroll for section entrances (stagger child elements)
- Number counting for metrics (on viewport entry)
- Smooth parallax on featured work images (subtle, 10-20% movement)
- Typing effect for role description in opening statement
- Hover micro-interactions on cards (scale-105, transition-transform)

**Forbidden**: Continuous loops, distracting particles, excessive parallax

## Images

### Hero Alternative
Large professional headshot or abstract tech/payment visualization as opening section background (50vh), with overlaid text. Use backdrop-blur on text container.

### Work Section
- Project mockups/screenshots for Barion and Peak projects
- Place in asymmetric grid: Large image left (2/3 width) + content right, alternating direction
- Images should show actual UI/products if possible

### Blog
- Featured image for each post (16:9 aspect ratio)
- Optional: Author avatar/headshot for personal touch

## Special Features
- **Timeline Component**: Horizontal scroll for experience history with company logos, animated on scroll
- **Metrics Counter**: Animated numbers that count up when section enters viewport
- **Tag System**: Interactive skill/technology tags with hover states
- **Reading Progress**: Thin progress bar at top of blog posts
- **Quick Facts Sidebar**: Sticky sidebar on About/detailed pages showing education, languages, location

## Accessibility
- Semantic HTML throughout
- ARIA labels on interactive elements
- Keyboard navigation support
- Reduced motion support via prefers-reduced-motion
- Sufficient contrast ratios (WCAG AA minimum)