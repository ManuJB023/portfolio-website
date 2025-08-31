"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function Portfolio() {
  // ---- Contact form state ----
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<null | { ok: boolean; msg: string }>(null)

  // IMPORTANT: set this in .env.local and on Amplify as an env var
  const apiUrl = process.env.NEXT_PUBLIC_CONTACT_API

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setResult(null)

    // basic validation
    if (!name.trim() || !email.trim() || !message.trim()) {
      setResult({ ok: false, msg: "Please fill out all fields." })
      return
    }
    // super light email check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setResult({ ok: false, msg: "Please enter a valid email address." })
      return
    }
    if (!apiUrl) {
      setResult({ ok: false, msg: "Contact API not configured." })
      return
    }

    try {
      setLoading(true)
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      })
      const data = await res.json().catch(() => ({}))

      if (res.ok) {
        setResult({ ok: true, msg: "Thanks! Your message has been sent." })
        setName("")
        setEmail("")
        setMessage("")
      } else {
        setResult({
          ok: false,
          msg: data?.error || "Something went wrong. Please try again.",
        })
      }
    } catch (error) {
      console.error("Network error:", error)
      setResult({ ok: false, msg: "Network error. Please try again." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      {/* Top nav (simple) */}
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
        <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="#home" className="text-2xl font-bold tracking-tight">Manuel Bauka</a>
          <div className="hidden md:flex gap-6 text-sm">
            <a href="#services" className="hover:text-blue-600">Services</a>
            <a href="#portfolio" className="hover:text-blue-600">Portfolio</a>
            <a href="#blog" className="hover:text-blue-600">Blog</a>
            <a href="#contact" className="hover:text-blue-600">Contact</a>
          </div>
          <Button asChild className="hidden md:inline-flex">
            <a href="#contact">Hire Me</a>
          </Button>
        </nav>
      </header>

      {/* Hero */}
      <section id="home" className="max-w-6xl mx-auto px-4 pt-16 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            AWS DevOps Specialist & Full-Stack Developer
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            I help small businesses ship faster with CI/CD, Infrastructure as Code, and scalable web apps on AWS.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Button asChild><a href="#services">View Services</a></Button>
            <Button asChild variant="outline"><a href="#portfolio">See Projects</a></Button>
          </div>
        </motion.div>
      </section>

      {/* Services */}
      <section id="services" className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Services</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="shadow-sm">
              <CardHeader><CardTitle>AWS DevOps & CI/CD</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-gray-700">
                <ul className="list-disc pl-5 space-y-1">
                  <li>GitHub Actions pipelines (build, test, deploy)</li>
                  <li>Infrastructure as Code (Terraform/CDK)</li>
                  <li>Dockerization & orchestration (ECS/EKS)</li>
                  <li>Monitoring & alerts (CloudWatch)</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="shadow-sm">
              <CardHeader><CardTitle>Full-Stack Web Apps</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-gray-700">
                <ul className="list-disc pl-5 space-y-1">
                  <li>React frontends with Tailwind UI</li>
                  <li>Node/Express APIs with JWT auth</li>
                  <li>PostgreSQL or MongoDB</li>
                  <li>Hosting on AWS (Amplify/ECS/Lambda)</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Selected Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader><CardTitle>Blog App with Testing + CI/CD Pipeline</CardTitle></CardHeader>
              <CardContent className="space-y-3 text-gray-700">
                <p>A full-stack blog application built with React, AWS CDK, and comprehensive testing + CI/CD pipeline implementation following Test-Driven Development (TDD) and DevOps best practices.</p>
                <Button asChild variant="outline">
                  <a href="https://github.com/ManuJB023/blog-app-with-cicd" target="_blank">View on GitHub</a>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader><CardTitle>Serverless API with DynamoDB</CardTitle></CardHeader>
              <CardContent className="space-y-3 text-gray-700">
                <p>A production-ready Serverless REST API with AWS Lambda, DynamoDB, and API Gateway. Features CRUD operations, input validation, and automated deployments.</p>
                <Button asChild variant="outline">
                  <a href="https://github.com/ManuJB023/my-serverless-api-dynamodb" target="_blank">View on GitHub</a>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader><CardTitle>E-commerce Starter App</CardTitle></CardHeader>
              <CardContent className="space-y-3 text-gray-700">
                <p>A production-ready full-stack e-commerce application built with React, Node.js, and deployed on AWS. Features modern UI/UX, secure payment processing, and scalable cloud infrastructure.</p>
                <Button asChild variant="outline">
                  <a href="https://github.com/ManuJB023/ecommerce-starter-app" target="_blank">View on GitHub</a>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader><CardTitle>WordPress Terraform AWS Infrastructure</CardTitle></CardHeader>
              <CardContent className="space-y-3 text-gray-700">
                <p>Terraform module to deploy scalable WordPress on AWS with RDS, Auto Scaling & ALB.</p>
                <Button asChild variant="outline">
                  <a href="https://github.com/ManuJB023/terraform-wordpress-modules" target="_blank">View on GitHub</a>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader><CardTitle>MERN Stack CI/CD Application</CardTitle></CardHeader>
              <CardContent className="space-y-3 text-gray-700">
                <p>A full-stack MERN (MongoDB, Express.js, React, Node.js) application with an automated CI/CD pipeline, featuring user authentication, task management, and AWS deployment.</p>
                <Button asChild variant="outline">
                  <a href="https://github.com/ManuJB023/mern-cicd-app" target="_blank">View on GitHub</a>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader><CardTitle>Inventory Management Dashboard</CardTitle></CardHeader>
              <CardContent className="space-y-3 text-gray-700">
                <p>Professional inventory management system built with React, Node.js, and deployed on AWS ECS using Terraform. Features a real-time dashboard, complete CRUD operations, and production-ready infrastructure.</p>
                <Button asChild variant="outline">
                  <a href="https://github.com/ManuJB023/inventory-dashboard" target="_blank">View on GitHub</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Blog */}
      <section id="blog" className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Latest Articles</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader><CardTitle>Auto-Deploy React App with GitHub Actions + AWS</CardTitle></CardHeader>
              <CardContent className="space-y-3 text-gray-700">
                <p>End-to-end CI/CD: lint, build, test, deploy to S3/CloudFront with cache-busting.</p>
                <Button asChild variant="outline">
                  <a href="https://dev.to/YOUR_USERNAME/react-cicd-aws-article" target="_blank">Read on Dev.to</a>
                </Button>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader><CardTitle>IaC for Startups: Terraform + AWS in a Weekend</CardTitle></CardHeader>
              <CardContent className="space-y-3 text-gray-700">
                <p>Reusable modules for VPC, ECS Fargate, RDS, and CloudWatch alarms - pragmatic patterns.</p>
                <Button asChild variant="outline">
                  <a href="https://dev.to/YOUR_USERNAME/terraform-aws-weekend" target="_blank">Read on Dev.to</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact / Hire Me (functional) */}
      <section id="contact" className="bg-gray-50 py-16">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Contact / Hire Me</h2>
          <p className="text-center text-gray-600 mb-8">Have a project in mind? Send a message and I will reply quickly.</p>
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <form className="grid gap-4" onSubmit={onSubmit}>
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Tell me about your project..." rows={5} value={message} onChange={(e) => setMessage(e.target.value)} required />
                </div>
                <div className="flex items-center gap-3">
                  <Button type="submit" disabled={loading}>
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
                  <Button asChild type="button" variant="outline">
                    <a href="mailto:info@manuelbauka.dev">Or email me</a>
                  </Button>
                </div>

                {result && (
                  <p className={`text-sm ${result.ok ? "text-green-600" : "text-red-600"}`}>
                    {result.msg}
                  </p>
                )}
                <p className="text-xs text-gray-500">
                  * Your message will be sent securely via AWS (API Gateway, Lambda, SES).
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-gray-500 flex flex-col md:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} Manuel Bauka. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#services" className="hover:text-blue-600">Services</a>
            <a href="#portfolio" className="hover:text-blue-600">Portfolio</a>
            <a href="#blog" className="hover:text-blue-600">Blog</a>
            <a href="#contact" className="hover:text-blue-600">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  )
}