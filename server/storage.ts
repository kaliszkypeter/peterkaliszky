import { type User, type InsertUser, type BlogPost, type InsertBlogPost } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private blogPosts: Map<string, BlogPost>;

  constructor() {
    this.users = new Map();
    this.blogPosts = new Map();
    this.seedBlogPosts();
  }

  private seedBlogPosts() {
    const posts: BlogPost[] = [
      {
        id: randomUUID(),
        title: "The Future of Product Management: AI-Driven Decisions",
        slug: "future-product-management-ai",
        excerpt: "How AI is transforming the way we make product decisions and what this means for PMs in 2025.",
        content: `The landscape of product management is evolving rapidly, and artificial intelligence is at the forefront of this transformation. As product owners, we're no longer just making decisions based on intuition and traditional analytics - we now have powerful AI tools that can help us understand user behavior at unprecedented scales.

## The Shift in Decision Making

Traditional product management relied heavily on:
- User interviews and surveys
- A/B testing with limited scope
- Historical data analysis
- Gut feelings refined by experience

Today, AI enables us to process millions of data points in real-time, identifying patterns that would be impossible for humans to detect. This doesn't replace human judgment - it enhances it.

## Practical Applications in Fintech

In my experience at Barion, we've seen how AI can transform payment product development. Machine learning models help us:
- Predict user churn before it happens
- Identify fraudulent transactions with higher accuracy
- Personalize user experiences at scale
- Optimize conversion funnels automatically

## The Human Element Remains Critical

> Despite all the technological advances, the human element in product management remains irreplaceable.

Understanding user emotions, building relationships with stakeholders, and making ethical decisions still require human judgment. AI is a tool, not a replacement.

### Key Takeaways

- Embrace AI as a decision-support tool, not a decision-maker
- Invest time in learning AI/ML fundamentals
- Focus on problems where AI can provide unique insights
- Never lose sight of the human experience you're designing for

The future belongs to product managers who can effectively combine human empathy with AI-powered insights.`,
        category: "Product Management",
        readingTime: 5,
        publishedAt: "Dec 15, 2024",
        featured: "true",
      },
      {
        id: randomUUID(),
        title: "Building Strong Customer Authentication: Lessons from 40K Passkey Users",
        slug: "strong-customer-authentication-passkeys",
        excerpt: "What we learned implementing passkey authentication for e-money wallets and achieving 40K+ user adoption.",
        content: `When the EU's PSD2 directive mandated Strong Customer Authentication (SCA), many saw it as a compliance burden. We saw it as an opportunity to significantly improve our users' security experience.

## The Challenge

Traditional password-based authentication was problematic:
- Users forgot passwords frequently
- Password resets created friction
- Phishing attacks were increasingly sophisticated
- Two-factor authentication added steps to the flow

## Why Passkeys

Passkeys represent a fundamental shift in authentication:
- No passwords to remember or steal
- Biometric verification feels natural
- Phishing-resistant by design
- Faster than traditional login methods

## Implementation Journey

Rolling out passkeys to our e-money wallet users required careful planning:

### Phase 1: Foundation
We started by implementing the WebAuthn standard across all platforms. This meant working closely with our mobile teams (iOS and Android) and ensuring consistent behavior across React Native and native components.

### Phase 2: User Education
Not everyone understood passkeys initially. We created simple onboarding flows that explained the benefits without technical jargon.

### Phase 3: Gradual Rollout
Rather than forcing migration, we offered passkeys as an option first. Users who tried them became advocates.

## Results

- 40,000+ users now use passkeys as their primary authentication method
- Support tickets for login issues dropped by 60%
- User satisfaction scores for the login experience increased significantly

## Key Learnings

- Make new authentication methods feel familiar
- Provide clear fallback options during transition
- Measure everything - adoption, failures, support impact
- Work with your security team from day one

The future of authentication is passwordless, and passkeys are leading the way.`,
        category: "Security",
        readingTime: 6,
        publishedAt: "Nov 28, 2024",
        featured: "false",
      },
      {
        id: randomUUID(),
        title: "Maintaining 80%+ Payment Conversion: A Product Owner's Playbook",
        slug: "payment-conversion-playbook",
        excerpt: "Strategies and tactics that helped us achieve and maintain industry-leading payment gateway conversion rates.",
        content: `Payment conversion rate is the metric that keeps fintech product owners up at night. Every percentage point matters - it directly impacts revenue and user satisfaction.

## Understanding Payment Abandonment

Users abandon payments for many reasons:
- Unexpected fees appearing late in the flow
- Too many steps to complete
- Slow page loads or technical errors
- Lack of preferred payment methods
- Security concerns

## The 80% Benchmark

Achieving 80%+ conversion isn't about one big change - it's about systematic optimization across the entire payment journey.

### Speed Matters

We found that every 100ms of latency reduces conversion by approximately 0.5%. Our obsession with performance included:
- Lazy loading non-critical elements
- Pre-fetching payment provider data
- Optimizing server response times

### Smart Defaults

Reducing cognitive load helps users complete payments:
- Remember preferred payment methods
- Pre-fill where possible
- Smart country and currency detection

### Error Recovery

When things go wrong (and they will), graceful error handling is crucial:
- Clear error messages in plain language
- Automatic retry for transient failures
- Easy path to alternative payment methods

## Monitoring and Iteration

> You can't improve what you don't measure.

We built comprehensive dashboards tracking:
- Conversion by step in the funnel
- Failure rates by payment method
- Time to complete by device type
- A/B test results in real-time

## Conclusion

Maintaining high conversion rates requires constant attention. User expectations evolve, new payment methods emerge, and competitors improve. The work is never done - but that's what makes it exciting.`,
        category: "Fintech",
        readingTime: 4,
        publishedAt: "Oct 12, 2024",
        featured: "false",
      },
      {
        id: randomUUID(),
        title: "From Monolith to Microservices: A Product Owner's Perspective",
        slug: "monolith-to-microservices",
        excerpt: "Navigating architectural transformation while keeping product velocity high - lessons from the trenches.",
        content: `Architectural transformations are often presented as purely technical decisions. In reality, they profoundly impact product development, team dynamics, and business outcomes.

## Why Architecture Matters to Product Owners

As product owners, we care about:
- How fast can we ship new features?
- How reliable is our product?
- How quickly can we scale?
- What's our cost structure?

Architecture directly affects all of these.

## The Monolith Starting Point

Our monolithic application served us well initially:
- Simple to deploy and debug
- Single codebase for the team
- Easy to understand the full system

But as we grew, challenges emerged:
- Deploys became risky and slow
- One component's issues affected everything
- Scaling meant scaling everything

## The Migration Approach

Rather than a big-bang rewrite, we took an incremental approach:

### Strangler Pattern

We gradually extracted services from the monolith:
- Identify bounded contexts
- Create new service with clean API
- Redirect traffic incrementally
- Eventually remove old code

### Product-First Prioritization

We prioritized extraction based on business impact:
- Payment processing (critical, needs independent scaling)
- User authentication (security-critical, changes frequently)
- Reporting (resource-intensive, could be optimized separately)

## Lessons Learned

- Involve product in architectural decisions from the start
- Expect temporary velocity slowdown - plan for it
- Don't microservice everything - some monolithic parts are fine
- Invest in observability before you need it

## The Result

Today our hybrid architecture gives us the best of both worlds: the simplicity of monolithic components where appropriate, and the flexibility of microservices where we need it.`,
        category: "Technology",
        readingTime: 5,
        publishedAt: "Sep 5, 2024",
        featured: "false",
      },
      {
        id: randomUUID(),
        title: "OKRs That Actually Work: Lessons from Leading SCRUM Teams",
        slug: "okrs-that-work-scrum",
        excerpt: "How to set meaningful objectives and key results that align product teams without creating bureaucratic overhead.",
        content: `OKRs (Objectives and Key Results) have become ubiquitous in product organizations. Yet many teams struggle to make them work effectively. After years of implementing OKRs across multiple SCRUM teams, here's what I've learned.

## The Common Pitfalls

Most OKR implementations fail because:
- Objectives are too vague or too tactical
- Key Results become task lists rather than outcomes
- There's no regular check-in cadence
- Teams treat OKRs as performance metrics rather than alignment tools

## Principles That Work

### Start with Problems, Not Solutions

Good objectives describe problems to solve, not features to build. Instead of "Launch mobile app redesign," try "Make mobile experience as engaging as desktop."

### Measure What Matters

Key Results should be:
- Measurable without ambiguity
- Achievable but stretching
- Within the team's influence (though not complete control)

### Quarterly with Weekly Check-ins

The quarterly cadence gives strategic focus. Weekly confidence scoring keeps everyone honest and enables course correction.

## Integration with SCRUM

OKRs and SCRUM complement each other:
- OKRs provide the "why" and direction
- Sprint goals connect OKRs to short-term work
- Sprint reviews assess OKR progress
- Retrospectives improve both processes

## Real Examples

Here's an OKR structure that worked for our payment team:

**Objective:** Make checkout the fastest in the industry

**Key Results:**
- Reduce average checkout time from 45s to 30s
- Achieve 95th percentile load time under 2s
- Increase one-click checkout adoption to 40%

## The Cultural Element

> OKRs are only as good as the culture that supports them.

Success requires:
- Psychological safety to set ambitious goals
- Leadership that separates OKRs from performance reviews
- Transparency about what's working and what isn't

When done right, OKRs create alignment and focus. When done wrong, they become bureaucratic theater.`,
        category: "Leadership",
        readingTime: 5,
        publishedAt: "Aug 18, 2024",
        featured: "false",
      },
    ];

    posts.forEach((post) => {
      this.blogPosts.set(post.id, post);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values()).sort((a, b) => {
      // Sort by featured first, then by date
      if (a.featured === "true" && b.featured !== "true") return -1;
      if (a.featured !== "true" && b.featured === "true") return 1;
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(
      (post) => post.slug === slug
    );
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const id = randomUUID();
    const post: BlogPost = { ...insertPost, id };
    this.blogPosts.set(id, post);
    return post;
  }
}

export const storage = new MemStorage();
