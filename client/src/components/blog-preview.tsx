import { useRef } from "react";
import { Link } from "wouter";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Clock, Calendar, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import type { BlogPost } from "@shared/schema";

export function BlogPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  const latestPosts = posts?.slice(0, 3) || [];

  return (
    <section className="py-24 sm:py-32 px-6 relative overflow-hidden">
      <motion.div 
        className="absolute inset-0 gradient-mesh"
        style={{ y: backgroundY }}
      />
      
      <div className="max-w-6xl mx-auto relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-16"
        >
          <div>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-12 h-px mb-4"
              style={{ background: "linear-gradient(90deg, hsl(var(--sage) / 0.5), transparent)" }}
            />
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold mb-2 glow-text">
              From the Blog
            </h2>
            <p className="text-muted-foreground text-lg">
              Thoughts on product management, fintech, and more
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link href="/blog">
              <Button 
                variant="outline" 
                className="group border-sage/30 hover:border-sage/50"
                data-testid="link-view-all-posts"
              >
                View All Posts
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:text-sage transition-all" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border-card-border">
                <CardContent className="p-6">
                  <Skeleton className="h-4 w-20 mb-4" />
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-6 w-3/4 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <Link href={`/blog/${post.slug}`}>
                  <motion.div
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="h-full"
                  >
                    <Card
                      className="h-full glass-card cursor-pointer group border border-transparent hover:border-sage/20 transition-colors"
                      data-testid={`card-blog-${post.slug}`}
                    >
                      <CardContent className="p-6">
                        <Badge className="mb-4 text-xs badge-sage">
                          {post.category}
                        </Badge>
                        <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-sage transition-colors">
                          {post.title}
                          <ArrowUpRight className="inline-block ml-1 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3 text-sage/60" />
                            {post.publishedAt}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-sage/60" />
                            {post.readingTime} min read
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
