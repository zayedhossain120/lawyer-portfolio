"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Calendar, Award, Users, Scale, ChevronRight, Clock, User, Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const practiceAreas = [
    {
      title: "Corporate Law",
      description: "Business formation, contracts, mergers & acquisitions",
      icon: Scale
    },
    {
      title: "Family Law",
      description: "Divorce, custody, adoption, and domestic matters",
      icon: Users
    },
    {
      title: "Real Estate Law",
      description: "Property transactions, disputes, and zoning issues",
      icon: MapPin
    },
    {
      title: "Estate Planning",
      description: "Wills, trusts, probate, and asset protection",
      icon: Award
    }
  ];

  const experience = [
    {
      year: "2015 - Present",
      title: "Senior Partner",
      company: "Johnson & Associates Law Firm",
      description: "Leading corporate and commercial litigation practice"
    },
    {
      year: "2010 - 2015",
      title: "Associate Attorney",
      company: "Smith Legal Group",
      description: "Focused on business law and contract disputes"
    },
    {
      year: "2008 - 2010",
      title: "Law Clerk",
      company: "District Court",
      description: "Research and drafting for Judge Williams"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "TechStart Inc.",
      content: "Exceptional legal guidance that helped our startup navigate complex corporate regulations. Highly recommend!"
    },
    {
      name: "Michael Chen",
      company: "Chen Properties",
      content: "Professional, thorough, and always available. Made our real estate transaction smooth and stress-free."
    },
    {
      name: "Emily Rodriguez",
      company: "Family First Foundation",
      content: "Compassionate and knowledgeable during a difficult family matter. Truly dedicated to clients' best interests."
    }
  ];

  const blogPosts = [
    {
      id: 1,
      title: "Understanding Corporate Law: A Guide for Business Owners",
      excerpt: "Learn the essential aspects of corporate law that every business owner should know to protect their company and ensure compliance.",
      content: "Corporate law forms the foundation of business operations, governing how companies are formed, managed, and dissolved. As a business owner, understanding these legal frameworks is crucial for long-term success...",
      author: "Robert Johnson",
      date: "2024-01-15",
      readTime: "5 min read",
      category: "Corporate Law",
      image: "/api/placeholder/400/250"
    },
    {
      id: 2,
      title: "Estate Planning Essentials: Protecting Your Family's Future",
      excerpt: "Discover the key components of effective estate planning and how to ensure your wishes are honored while minimizing tax implications.",
      content: "Estate planning is one of the most important steps you can take to protect your family's financial future. A well-crafted estate plan not only ensures your assets are distributed according to your wishes...",
      author: "Robert Johnson",
      date: "2024-01-10",
      readTime: "7 min read",
      category: "Estate Planning",
      image: "/api/placeholder/400/250"
    },
    {
      id: 3,
      title: "Navigating Real Estate Transactions: Legal Considerations",
      excerpt: "A comprehensive overview of the legal aspects involved in real estate transactions, from contracts to closing procedures.",
      content: "Real estate transactions involve numerous legal considerations that can significantly impact both buyers and sellers. Understanding these legal requirements is essential for a smooth and successful property transfer...",
      author: "Robert Johnson",
      date: "2024-01-05",
      readTime: "6 min read",
      category: "Real Estate Law",
      image: "/api/placeholder/400/250"
    },
    {
      id: 4,
      title: "Family Law Reform: Recent Changes and Their Impact",
      excerpt: "An analysis of recent family law reforms and how they affect divorce proceedings, child custody, and spousal support.",
      content: "Family law continues to evolve, reflecting changing societal values and priorities. Recent reforms have introduced significant changes to how courts approach divorce, custody arrangements, and support obligations...",
      author: "Robert Johnson",
      date: "2023-12-28",
      readTime: "8 min read",
      category: "Family Law",
      image: "/api/placeholder/400/250"
    },
    {
      id: 5,
      title: "Business Contracts: Key Clauses Every Entrepreneur Should Understand",
      excerpt: "Essential contract clauses that protect your business interests and prevent common legal disputes in commercial agreements.",
      content: "Contracts are the lifeblood of business operations, governing relationships with customers, suppliers, partners, and employees. Understanding key contract clauses can help you negotiate better terms and avoid costly disputes...",
      author: "Robert Johnson",
      date: "2023-12-20",
      readTime: "6 min read",
      category: "Corporate Law",
      image: "/api/placeholder/400/250"
    },
    {
      id: 6,
      title: "Digital Assets in Estate Planning: What You Need to Know",
      excerpt: "How to include digital assets like cryptocurrencies, social media accounts, and online properties in your estate plan.",
      content: "As our lives become increasingly digital, estate planning must evolve to include digital assets. From cryptocurrency wallets to social media accounts, these digital properties require special consideration in your estate plan...",
      author: "Robert Johnson",
      date: "2023-12-15",
      readTime: "5 min read",
      category: "Estate Planning",
      image: "/api/placeholder/400/250"
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: ""
        });
      } else {
        toast.error(data.error || 'An error occurred while sending your message.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const categories = ["All", "Corporate Law", "Family Law", "Real Estate Law", "Estate Planning"];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Scale className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">Johnson Law</span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#home" className="text-sm font-medium hover:text-primary transition-colors">Home</a>
              <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">About</a>
              <a href="#practice" className="text-sm font-medium hover:text-primary transition-colors">Practice Areas</a>
              <a href="#experience" className="text-sm font-medium hover:text-primary transition-colors">Experience</a>
              <a href="#blog" className="text-sm font-medium hover:text-primary transition-colors">Blog</a>
              <a href="#testimonials" className="text-sm font-medium hover:text-primary transition-colors">Testimonials</a>
              <a href="#contact" className="text-sm font-medium hover:text-primary transition-colors">Contact</a>
            </div>
            <Button className="md:hidden">Menu</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-20 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4">Experienced Legal Counsel</Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Dedicated to Your
                <span className="text-primary"> Legal Success</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                With over 15 years of experience, I provide comprehensive legal services tailored to your unique needs. 
                From corporate matters to family law, I'm committed to achieving the best possible outcomes for my clients.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="w-full sm:w-auto">
                  Schedule Consultation
                </Button>
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-primary/5 rounded-full flex items-center justify-center">
                <div className="w-64 h-64 bg-background rounded-full flex items-center justify-center">
                  <Scale className="h-32 w-32 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Passionate advocate committed to delivering exceptional legal representation
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Robert Johnson, Esq.</h3>
              <p className="text-muted-foreground mb-6">
                As a dedicated legal professional with over 15 years of experience, I have built a reputation for 
                providing thoughtful, strategic legal counsel to individuals and businesses alike. My approach 
                combines deep legal knowledge with practical business sense to deliver solutions that work.
              </p>
              <p className="text-muted-foreground mb-6">
                I graduated magna cum laude from Harvard Law School and began my career at a prestigious 
                corporate firm before founding my own practice. I believe in building long-term relationships 
                with clients based on trust, transparency, and results.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-primary" />
                  <span className="text-sm">Bar Certified</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="text-sm">500+ Clients</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span className="text-sm">15+ Years Experience</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Scale className="h-5 w-5 text-primary" />
                  <span className="text-sm">95% Success Rate</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-8">
              <h4 className="text-xl font-semibold mb-4">Education & Credentials</h4>
              <div className="space-y-4">
                <div>
                  <h5 className="font-medium">Harvard Law School</h5>
                  <p className="text-sm text-muted-foreground">Juris Doctor, Magna Cum Laude</p>
                </div>
                <div>
                  <h5 className="font-medium">State Bar Association</h5>
                  <p className="text-sm text-muted-foreground">Member since 2008</p>
                </div>
                <div>
                  <h5 className="font-medium">American Bar Association</h5>
                  <p className="text-sm text-muted-foreground">Active Member</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Practice Areas */}
      <section id="practice" className="py-16 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Practice Areas</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive legal services across multiple practice areas
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {practiceAreas.map((area, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <area.icon className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">{area.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{area.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Professional Experience</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A track record of excellence and dedication
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            {experience.map((exp, index) => (
              <div key={index} className="relative pl-8 pb-8 border-l-2 border-primary/20 last:pb-0">
                <div className="absolute left-0 top-0 w-4 h-4 bg-primary rounded-full -translate-x-1/2"></div>
                <div className="bg-card rounded-lg p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <h3 className="text-xl font-semibold">{exp.title}</h3>
                    <Badge variant="outline">{exp.year}</Badge>
                  </div>
                  <p className="text-primary font-medium mb-2">{exp.company}</p>
                  <p className="text-muted-foreground">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-16 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Client Testimonials</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              What my clients say about working with me
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Legal Insights & Articles</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Stay informed with the latest legal insights, analysis, and practical guidance
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-8 space-y-4">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="text-xs sm:text-sm"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="flex flex-col hover:shadow-lg transition-all duration-300 group">
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5 rounded-t-lg flex items-center justify-center">
                  <div className="text-center">
                    <Scale className="h-12 w-12 text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Article Image</p>
                  </div>
                </div>
                <CardContent className="flex-1 p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary" className="text-xs">
                      {post.category}
                    </Badge>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <User className="h-3 w-3 mr-1" />
                      {post.author}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(post.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </div>
                  </div>
                  <Link href={`/blog/${post.id}`}>
                    <Button variant="ghost" className="w-full mt-4 group-hover:bg-primary group-hover:text-primary-foreground">
                      Read Article
                      <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No articles found matching your search criteria.</p>
            </div>
          )}

          {/* View All Articles Button */}
          <div className="text-center mt-12">
            <Link href="/blog">
              <Button variant="outline" size="lg">
                View All Articles
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ready to discuss your legal needs? Schedule a consultation today.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Office Address</p>
                    <p className="text-muted-foreground">123 Legal Street, Suite 100</p>
                    <p className="text-muted-foreground">New York, NY 10001</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-muted-foreground">(555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-muted-foreground">robert@johnsonlaw.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Office Hours</p>
                    <p className="text-muted-foreground">Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p className="text-muted-foreground">Saturday: By Appointment</p>
                  </div>
                </div>
              </div>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Schedule a Consultation</CardTitle>
                <CardDescription>
                  Fill out the form below and I'll get back to you within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">How can I help you?</Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Scale className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold">Johnson Law</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Dedicated to providing exceptional legal services with integrity and professionalism.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#home" className="hover:text-primary transition-colors">Home</a></li>
                <li><a href="#about" className="hover:text-primary transition-colors">About</a></li>
                <li><a href="#practice" className="hover:text-primary transition-colors">Practice Areas</a></li>
                <li><a href="#contact" className="hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Practice Areas</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Corporate Law</li>
                <li>Family Law</li>
                <li>Real Estate Law</li>
                <li>Estate Planning</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <Button variant="outline" size="sm">LinkedIn</Button>
                <Button variant="outline" size="sm">Twitter</Button>
              </div>
            </div>
          </div>
          <div className="border-t pt-8 mt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Johnson Law. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  );
}