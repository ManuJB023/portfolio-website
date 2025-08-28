# Manuel Bauka - Portfolio Website

A modern, responsive portfolio website showcasing AWS DevOps expertise and full-stack development projects. Built with Next.js, Tailwind CSS, and deployed on AWS Amplify with serverless contact form functionality.

## Live Site
🚀 [manuelbauka.dev](https://manuelbauka.dev)

## Features

- **Responsive Design** - Optimized for desktop, tablet, and mobile
- **Serverless Contact Form** - AWS Lambda + API Gateway + SES integration
- **Modern UI** - Tailwind CSS with shadcn/ui components
- **Fast Performance** - Next.js with automatic optimization
- **Professional Showcase** - 6 production-ready project examples

## Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling with custom design system
- **shadcn/ui** - Beautiful, accessible UI components
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Modern icon library

### Backend & Infrastructure
- **AWS Lambda** - Serverless contact form processing
- **API Gateway** - REST API with CORS configuration
- **Amazon SES** - Email delivery service
- **AWS Amplify** - Hosting and continuous deployment
- **Terraform** - Infrastructure as Code (separate repository)

## Quick Start

```bash
# Clone the repository
git clone https://github.com/ManuJB023/portfolio-website.git
cd portfolio-website

# Install dependencies
npm install

# Set up environment variables
echo "NEXT_PUBLIC_CONTACT_API=your-api-gateway-url" > .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── layout.tsx        # Root layout with fonts
│   │   ├── page.tsx          # Main portfolio page
│   │   └── globals.css       # Global styles and CSS variables
│   ├── components/
│   │   └── ui/               # Reusable UI components
│   └── lib/
│       └── utils.ts          # Utility functions
├── .env.local                # Environment variables (not tracked)
└── README.md
```

## Environment Variables

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_CONTACT_API=https://your-api-gateway-url.amazonaws.com/prod/contact
```

## Deployment

This site is automatically deployed to AWS Amplify from the `main` branch. Any push to main triggers:

1. **Build Process** - Next.js production build
2. **Testing** - Automated checks and linting  
3. **Deployment** - Global CDN distribution
4. **SSL** - Automatic certificate management

## Contact Form Architecture

The contact form uses a serverless architecture:
- **Frontend** - React form with validation
- **API Gateway** - HTTPS endpoint with CORS
- **Lambda Function** - Node.js email processing
- **Amazon SES** - Reliable email delivery

Infrastructure code is maintained separately using Terraform.

## Key Sections

- **Hero** - Professional introduction and value proposition
- **Services** - AWS DevOps and Full-Stack development offerings  
- **Portfolio** - 6 production-ready projects with GitHub links
- **Blog** - Technical articles published on Dev.to
- **Contact** - Functional form with AWS backend

## Performance Features

- **Image Optimization** - Next.js automatic image processing
- **Code Splitting** - Automatic bundle optimization
- **Font Optimization** - Google Fonts with preloading
- **Static Generation** - Pre-rendered pages for fast loading

## Development Commands

```bash
npm run dev          # Start development server
npm run build        # Create production build
npm run start        # Run production server locally
npm run lint         # Run ESLint checks
```

## Contributing

This is a personal portfolio website, but if you find issues or have suggestions, feel free to open an issue or submit a pull request.

## Contact

**Manuel Bauka**  
AWS DevOps Specialist & Full-Stack Developer

- **Website**: [manuelbauka.dev](https://manuelbauka.dev)
- **Email**: [manuelbauka@gmail.com](mailto:manuelbauka@gmail.com)
- **LinkedIn**: [linkedin.com/in/manuelbauka](https://linkedin.com/in/manuelbauka)
- **GitHub**: [github.com/ManuJB023](https://github.com/ManuJB023)

---

Built with ❤️ using Next.js, Tailwind CSS, and AWS