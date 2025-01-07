const stats = [
  { label: "Patients satisfaits", value: "10k+" },
  { label: "Spécialistes", value: "100+" },
  { label: "Années d'expérience", value: "25+" },
  { label: "Récompenses", value: "50+" },
];

const About = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            À Propos de Nous
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 lg:mx-auto">
            Leader dans le domaine des soins de santé depuis plus de 25 ans
          </p>
        </div>

        <div className="mt-20">
          <dl className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-primary-50 px-4 py-5 sm:p-6 rounded-lg text-center"
              >
                <dt className="text-base font-normal text-gray-900">
                  {stat.label}
                </dt>
                <dd className="mt-1 text-3xl font-extrabold text-primary-600">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default About;