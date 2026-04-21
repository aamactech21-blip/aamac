const stats = [
  { value: '15+', label: 'Years of Experience' },
  { value: '200+', label: 'Projects Delivered' },
  { value: '14', label: 'Specializations' },
  { value: '2', label: 'Certifications' },
]

export default function StatsSection() {
  return (
    <section className="bg-[#0A0A0A] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`text-center lg:text-left ${
                i !== stats.length - 1 ? 'lg:border-r lg:border-[#1A1A1A] lg:pr-8' : ''
              }`}
            >
              <p className="text-4xl md:text-5xl font-extrabold text-white mb-2">{stat.value}</p>
              <p className="text-[#6B6B6B] text-sm font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
