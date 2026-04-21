import Image from 'next/image'

const projects = [
  {
    image: '/images/project-boardroom.jpg',
    title: 'Executive Boardroom',
    category: 'Control & AV Integration',
    location: 'Kuwait City',
  },
  {
    image: '/images/project-auditorium.jpg',
    title: 'Corporate Auditorium',
    category: 'AV & Audio Systems',
    location: 'Salmiya, Kuwait',
  },
  {
    image: '/images/project-lobby.jpg',
    title: 'Hotel Lobby Digital Signage',
    category: 'Digital Signage & BGM',
    location: 'Fintas, Kuwait',
  },
  {
    image: '/images/services-av.jpg',
    title: 'Conference Suite',
    category: 'Video Conferencing',
    location: 'Kuwait City',
  },
]

export default function ProjectsSection() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-[#6B6B6B] text-sm uppercase font-semibold tracking-widest mb-3">Our Work</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0A0A0A] text-balance">
            Projects across Kuwait
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {projects.map((project) => (
            <div
              key={project.title}
              className="group relative rounded-2xl overflow-hidden bg-[#0A0A0A] aspect-[4/5]"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover opacity-80 group-hover:opacity-60 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <span className="text-[#1652F0] text-xs font-semibold uppercase tracking-wider">
                  {project.category}
                </span>
                <h3 className="text-white font-bold text-base mt-1">{project.title}</h3>
                <p className="text-[#6B6B6B] text-xs mt-0.5">{project.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
