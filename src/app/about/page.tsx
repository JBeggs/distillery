import Link from 'next/link'
import { serverEcommerceApi, serverNewsApi } from '@/lib/api-server'
import AboutPageClient, { AnimatedSection, AnimatedCard } from '@/components/about/AboutPageClient'
import { Wine, Award, ShieldCheck, Users, TrendingUp, Zap, Link2, Package } from 'lucide-react'
import { getCompany } from '@/lib/company'
import { unwrapEcommerceProductList } from '@/lib/ecommerce-list'
import PageHero from '@/components/hero/PageHero'
import ProductCard from '@/components/products/ProductCard'

export const dynamic = 'force-dynamic'

async function getAboutContent() {
  try {
    const articlesData = await serverNewsApi.articles.getBySlug('about')
    const articles = Array.isArray(articlesData) ? articlesData : (articlesData as any)?.results || []
    return articles[0] || null
  } catch (error) {
    console.error('Error fetching about content:', error)
    return null
  }
}

async function getSampleProducts() {
  try {
    const products = await serverEcommerceApi.products.list({ is_active: true, featured: true, page_size: 4 })
    return unwrapEcommerceProductList(products).filter((p: any) => p.status !== 'archived').slice(0, 4)
  } catch {
    return []
  }
}

export default async function AboutPage() {
  const [aboutArticle, sampleProducts, company] = await Promise.all([
    getAboutContent(),
    getSampleProducts(),
    getCompany(),
  ])
  const companyName = company.name

  const sections = [
    { id: 'story', label: 'Our Story' },
    { id: 'investors', label: 'For Investors' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'believe', label: 'What We Believe' },
    ...(sampleProducts.length > 0 ? [{ id: 'examples', label: 'Our Collection' }] : []),
  ]

  return (
    <div className="min-h-screen bg-vintage-background">
      <PageHero pageSlug="about" fallback={null} />

      {/* Hero */}
      <section className="py-16 md:py-20 brand-gradient-band">
        <div className="container-wide">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-playfair mb-6 text-on-dark">
              Our Story
            </h1>
            <p className="text-xl text-on-dark-muted">
              Small-batch whiskeys, brandies, and liqueurs — rooted in grain, barrel, and time.
            </p>
          </div>
        </div>
      </section>

      <AboutPageClient sections={sections}>
      {/* Our Story */}
      <AnimatedSection id="story" className="py-16">
        <div className="container-narrow">
          {aboutArticle ? (
            <div className="article-content" dangerouslySetInnerHTML={{ __html: aboutArticle.content }} />
          ) : (
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-text-light leading-relaxed mb-6">
                {companyName} is built around slow craft: mash, fermentation, distillation, and patient
                aging — so every bottle carries a clear story from still to glass.
              </p>
              <p className="text-lg text-text-light leading-relaxed">
                We publish honest tasting notes, ABV, and provenance cues on every SKU, and we treat the
                tasting room and web shop as one experience: welcoming, informed, and never pretentious.
              </p>
            </div>
          )}
        </div>
      </AnimatedSection>

      {/* For Investors */}
      <AnimatedSection id="investors" className="py-16 bg-white">
        <div className="container-narrow">
          <h2 className="text-2xl md:text-3xl font-bold font-playfair text-text mb-6 flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-vintage-primary" />
            For Investors
          </h2>
          <div className="space-y-6 text-text-light leading-relaxed">
            <p className="text-lg">
              {companyName} operates on a lean, technology-driven business model designed for scalability
              and predictable margins. We source products through established channels, apply consistent
              markup structures, and sell directly to consumers via our e-commerce platform.
            </p>
            <div className="grid md:grid-cols-2 gap-6 my-8">
              <div className="card-vintage p-6 border-l-4 border-vintage-primary">
                <h3 className="font-semibold text-text mb-2">Sourcing & Curation</h3>
                <p className="text-text-muted text-sm">
                  Products are identified from external listings. Our system ingests product data
                  automatically, allowing rapid catalog expansion with minimal manual effort.
                </p>
              </div>
              <div className="card p-6 border-l-4 border-modern-primary">
                <h3 className="font-semibold text-text mb-2">Pricing & Margins</h3>
                <p className="text-text-muted text-sm">
                  We apply category-specific markups to ensure healthy margins while remaining
                  competitive. Pricing is transparent across core releases, limited editions, and gift sets.
                </p>
              </div>
            </div>
            <p className="text-text-light">
              The model reduces inventory risk, accelerates time-to-market, and creates a repeatable
              process that can scale with demand. Revenue flows from direct sales, with clear unit
              economics and low fixed overhead.
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* How It Works */}
      <AnimatedSection id="how-it-works" className="py-16 bg-vintage-background">
        <div className="container-narrow">
          <h2 className="text-2xl md:text-3xl font-bold font-playfair text-text mb-6 flex items-center gap-3">
            <Zap className="w-8 h-8 text-vintage-primary" />
            How the Site Works
          </h2>
          <div className="space-y-6 text-text-light leading-relaxed">
            <p className="text-lg">
              Content is managed entirely by the site owner through an admin dashboard. When adding
              a new product, the owner provides a product URL from an external source.
            </p>
            <div className="flex items-start gap-4 p-6 bg-white rounded-xl border border-gray-200">
              <div className="w-12 h-12 bg-vintage-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Link2 className="w-6 h-6 text-vintage-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-text mb-2">Automated Data Ingestion</h3>
                <p className="text-text-muted text-sm">
                  The system automatically extracts product details—including name, description,
                  images, and pricing—from the provided URL. This data is then added to the catalog
                  with minimal manual input. The owner can review, adjust, and set final pricing
                  before publishing.
                </p>
              </div>
            </div>
            <p className="text-text-light">
              This workflow enables rapid catalog growth, consistent data quality, and efficient
              operations. Products go live quickly, and the store stays fresh with new arrivals
              without heavy data-entry overhead.
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* What We Believe */}
      <AnimatedSection id="believe" className="py-16 bg-white" stagger>
        <div className="container-narrow">
          <h2 className="text-2xl font-bold font-playfair text-text mt-12 mb-6">What We Believe</h2>
          <div className="grid md:grid-cols-2 gap-6 my-8">
            <AnimatedCard className="card-vintage p-6 hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 bg-vintage-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Wine className="w-6 h-6 text-vintage-primary" />
              </div>
              <h3 className="font-semibold text-text mb-2">Grain-to-glass craft</h3>
              <p className="text-text-muted text-sm">
                We celebrate process: source ingredients, cut points, cooperage, and rest — not marketing fluff.
              </p>
            </AnimatedCard>
            <AnimatedCard className="card p-6 hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 bg-modern-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-modern-primary" />
              </div>
              <h3 className="font-semibold text-text mb-2">Label clarity</h3>
              <p className="text-text-muted text-sm">
                ABV, age statements, cask types, and batch codes belong on the page — never hidden in fine print.
              </p>
            </AnimatedCard>
            <AnimatedCard className="card p-6 hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 bg-vintage-accent/10 rounded-lg flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6 text-vintage-accent" />
              </div>
              <h3 className="font-semibold text-text mb-2">Responsible enjoyment</h3>
              <p className="text-text-muted text-sm">
                Spirits are for adults. We respect local laws, encourage moderation, and ship with care.
              </p>
            </AnimatedCard>
            <AnimatedCard className="card p-6 hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-text mb-2">Hospitality</h3>
              <p className="text-text-muted text-sm">
                Whether you visit in person or order online, we want the experience to feel like a tasting room.
              </p>
            </AnimatedCard>
          </div>
          <h2 className="text-2xl font-bold font-playfair text-text mt-12 mb-6">Our Promise</h2>
          <p className="text-text-light leading-relaxed mb-6">
            When you shop with {companyName}, you&apos;re not just buying a bottle — you&apos;re
            taking home a measured slice of our work in the stillhouse.
          </p>
          <p className="text-text-light leading-relaxed">
            Every release should be described honestly, packed to survive the journey, and paired with
            enough detail to enjoy it properly once it arrives.
          </p>
        </div>
      </AnimatedSection>

      {/* Product Examples */}
      {sampleProducts.length > 0 && (
        <AnimatedSection id="examples" className="py-16 bg-vintage-background">
          <div className="container-wide">
            <h2 className="text-2xl md:text-3xl font-bold font-playfair text-text mb-2 flex items-center gap-3">
              <Package className="w-8 h-8 text-vintage-primary" />
              From Our Collection
            </h2>
            <p className="text-text-muted mb-8 max-w-2xl">
              A sample of bottles, flights, and gift sets from our cellar.
            </p>
            <div className="product-grid">
              {sampleProducts.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link href="/products" className="btn btn-primary">
                View All Products
              </Link>
            </div>
          </div>
        </AnimatedSection>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-modern-primary text-white">
        <div className="container-wide text-center">
          <h2 className="text-3xl font-bold font-playfair mb-4">
            Ready to Explore?
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Explore limited releases, cellar staples, and tasting flights from our distillery.
          </p>
          <Link href="/products" className="btn btn-gold text-lg px-8 py-3">
            Shop Now
          </Link>
        </div>
      </section>
      </AboutPageClient>
    </div>
  )
}
