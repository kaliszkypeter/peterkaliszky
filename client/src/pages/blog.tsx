import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import type { BlogPost } from "@shared/schema";

export default function Blog() {
  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  const featuredPost = posts?.find((p) => p.featured === "true");
  const regularPosts = posts?.filter((p) => p.featured !== "true") || [];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <Link href="/">
              <Button variant="ghost" size="sm" className="mb-6" data-testid="link-back-home">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4">
              Blog
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Insights and thoughts on product management, fintech, 
              and building digital products.
            </p>
          </motion.div>

          {isLoading ? (
            <div className="space-y-8">
              <Skeleton className="h-64 w-full rounded-xl" />
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-48 w-full rounded-xl" />
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Featured Post */}
              {featuredPost && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mb-12"
                >
                  <Link href={`/blog/${featuredPost.slug}`}>
                    <Card
                      className="border-card-border hover-elevate cursor-pointer transition-all duration-300"
                      data-testid={`card-featured-${featuredPost.slug}`}
                    >
                      <CardContent className="p-8 sm:p-12">
                        <div className="flex items-center gap-3 mb-4">
                          <Badge>Featured</Badge>
                          <Badge variant="secondary">{featuredPost.category}</Badge>
                        </div>
                        <h2 className="font-serif text-2xl sm:text-3xl font-semibold mb-4">
                          {featuredPost.title}
                        </h2>
                        <p className="text-muted-foreground text-lg mb-6 max-w-3xl">
                          {featuredPost.excerpt}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {featuredPost.publishedAt}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {featuredPost.readingTime} min read
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              )}

              {/* Regular Posts */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  >
                    <Link href={`/blog/${post.slug}`}>
                      <Card
                        className="h-full border-card-border hover-elevate cursor-pointer transition-all duration-300"
                        data-testid={`card-post-${post.slug}`}
                      >
                        <CardContent className="p-6">
                          <Badge variant="secondary" className="mb-4 text-xs">
                            {post.category}
                          </Badge>
                          <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {post.publishedAt}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {post.readingTime} min read
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {posts?.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-muted-foreground text-lg">
                    No blog posts yet. Check back soon!
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
