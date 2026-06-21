import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/header'
import Footer from '@/components/footer'
import FloatingWhatsApp from '@/components/floating-whatsapp'
import { CheckCircle, ArrowRight, MapPin, Building2, FolderOpen } from 'lucide-react'
import { sanityWriteClient } from '@/lib/sanity-server'

export const metadata: Metadata = {
  title: 'Our Projects | AAMAC Technology',
  description:
    "Explore AAMAC Technology's delivered AV and communication projects across Kuwait — government, corporate, and institutional installations.",
}

export const revalidate = 60

type Project = {
  _id: string
  name: string
  client: string
  sector: string
  location: string
  projectType: string
  description: string
  servicesDelivered: string[]
  outcome: string
  imageUrl: string | null
}

async function getProjects(): Promise<Project[]> {
  try {
    return await sanityWriteClient.fetch(
      `*[_type == "project"] | order(_createdAt desc) {
        _id, name, client, sector, location, projectType,
        description, servicesDelivered, outcome,
        "imageUrl": image.asset->url
      }`
    )
  } catch {
    return []
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="bg-[#0A0A0A] py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-[#6B6B6B] text-sm uppercase font-semibold tracking-widest mb-4">Portfolio</p>
              <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight text-balance mb-6">
                Our{' '}
                <span className="font-accent-italic text-[#1652F0]">Projects</span>
              </h1>
              <p className="text-[#6B6B6B] text-lg leading-relaxed">
                Delivering reliable AV and communication solutions across Kuwait.
              </p>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section className="bg-white py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {projects.length === 0 ? (
              /* Empty state */
              <div className="text-center py-24 bg-[#F6F5F2] rounded-2xl">
                <FolderOpen size={56} className="text-[#E5E3DC] mx-auto mb-5" strokeWidth={1.5} />
                <h2 className="text-xl font-bold text-[#0A0A0A] mb-2">No projects yet</h2>
                <p className="text-[#6B6B6B] mb-6">Check back soon — we are updating our portfolio.</p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-[#1652F0] text-white font-bold px-7 py-3.5 rounded-xl hover:bg-[#1245d6] transition-all"
                >
                  Discuss Your Project
                  <ArrowRight size={16} />
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-24">
                {projects.map((project, idx) => (
                  <article key={project._id}>
                    {/* Label */}
                    <div className="mb-8">
                      <p className="text-[#6B6B6B] text-sm uppercase font-semibold tracking-widest mb-2">
                        {idx === 0 ? 'Featured Project' : `Project ${String(idx + 1).padStart(2, '0')}`}
                      </p>
                      <h2 className="text-3xl md:text-4xl font-extrabold text-[#0A0A0A] text-balance">
                        {project.name}
                      </h2>
                    </div>

                    {/* Project Image */}
                    {project.imageUrl ? (
                      <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-[#0A0A0A] mb-10">
                        <Image
                          src={project.imageUrl}
                          alt={project.name}
                          fill
                          className="object-cover"
                          priority={idx === 0}
                        />
                      </div>
                    ) : (
                      <div className="w-full aspect-video rounded-2xl bg-gradient-to-br from-[#0A0A0A] via-[#111827] to-[#0F1F4D] mb-10 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-[#1652F0]/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Building2 size={32} className="text-[#1652F0]" />
                          </div>
                          <p className="text-white font-bold">{project.name}</p>
                          {project.client && <p className="text-[#6B6B6B] text-sm mt-1">{project.client}</p>}
                        </div>
                      </div>
                    )}

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      <div className="lg:col-span-2 flex flex-col gap-6">
                        {/* Description */}
                        {project.description && (
                          <div className="bg-[#F6F5F2] rounded-2xl p-8">
                            <h3 className="text-[#0A0A0A] font-bold text-lg mb-4">Project Overview</h3>
                            <p className="text-[#6B6B6B] text-base leading-relaxed">{project.description}</p>
                          </div>
                        )}

                        {/* Services Delivered */}
                        {project.servicesDelivered?.length > 0 && (
                          <div className="bg-[#F6F5F2] rounded-2xl p-8">
                            <h3 className="text-[#0A0A0A] font-bold text-lg mb-5">Services Delivered</h3>
                            <ul className="flex flex-col gap-3">
                              {project.servicesDelivered.map((service) => (
                                <li key={service} className="flex items-center gap-3">
                                  <CheckCircle size={17} className="text-[#1652F0] shrink-0" />
                                  <span className="text-[#0A0A0A] font-semibold text-sm">{service}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Outcome */}
                        {project.outcome && (
                          <div className="bg-[#0A0A0A] rounded-2xl p-8">
                            <h3 className="text-white font-bold text-lg mb-4">Project Outcome</h3>
                            <p className="text-[#6B6B6B] text-base leading-relaxed">{project.outcome}</p>
                          </div>
                        )}
                      </div>

                      {/* Project Details Sidebar */}
                      <div>
                        <div className="bg-[#F6F5F2] rounded-2xl p-8 sticky top-28">
                          <h3 className="text-[#0A0A0A] font-bold text-lg mb-6">Project Details</h3>
                          <ul className="flex flex-col gap-5">
                            {project.client && (
                              <li>
                                <p className="text-[#6B6B6B] text-xs uppercase font-semibold tracking-widest mb-1">Client</p>
                                <p className="text-[#0A0A0A] font-bold text-sm">{project.client}</p>
                              </li>
                            )}
                            {project.sector && (
                              <li>
                                <p className="text-[#6B6B6B] text-xs uppercase font-semibold tracking-widest mb-1">Sector</p>
                                <p className="text-[#0A0A0A] font-bold text-sm">{project.sector}</p>
                              </li>
                            )}
                            {project.location && (
                              <li>
                                <p className="text-[#6B6B6B] text-xs uppercase font-semibold tracking-widest mb-1">Location</p>
                                <div className="flex items-center gap-1.5">
                                  <MapPin size={13} className="text-[#1652F0] shrink-0" />
                                  <p className="text-[#0A0A0A] font-bold text-sm">{project.location}</p>
                                </div>
                              </li>
                            )}
                            {project.projectType && (
                              <li>
                                <p className="text-[#6B6B6B] text-xs uppercase font-semibold tracking-widest mb-1">Project Type</p>
                                <p className="text-[#0A0A0A] font-bold text-sm">{project.projectType}</p>
                              </li>
                            )}
                          </ul>

                          <div className="mt-8 pt-6 border-t border-[#E5E3DC]">
                            <p className="text-[#6B6B6B] text-sm leading-relaxed mb-5">
                              Interested in a similar solution for your organisation?
                            </p>
                            <Link
                              href="/contact"
                              className="inline-flex items-center justify-center gap-2 w-full bg-[#1652F0] text-white font-bold text-sm px-5 py-3.5 rounded-xl hover:bg-[#1245d6] transition-all hover:-translate-y-0.5"
                            >
                              Discuss Your Project
                              <ArrowRight size={15} />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Divider between projects */}
                    {idx < projects.length - 1 && (
                      <div className="mt-24 border-t border-[#E5E3DC]" />
                    )}
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#F6F5F2] py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#0A0A0A] rounded-2xl p-12 text-center">
              <p className="text-[#6B6B6B] text-sm uppercase font-semibold tracking-widest mb-4">Work With Us</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white text-balance mb-5">
                Ready to start your next{' '}
                <span className="font-accent-italic text-[#1652F0]">AV project</span>?
              </h2>
              <p className="text-[#6B6B6B] text-base leading-relaxed max-w-xl mx-auto mb-10">
                From government council halls to corporate boardrooms, AAMAC Technology delivers AV solutions built to last.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-[#1652F0] text-white font-bold px-8 py-4 rounded-xl hover:bg-[#1245d6] transition-all hover:-translate-y-0.5"
                >
                  Get in Touch
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 border-2 border-[#2A2A2A] text-white font-bold px-8 py-4 rounded-xl hover:border-[#1652F0] transition-all"
                >
                  View Our Services
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  )
}
