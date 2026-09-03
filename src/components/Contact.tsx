import { links } from '../data/portfolioData';

export function Contact() {
  return (
    <section id="contact" className="container-xl py-28" aria-labelledby="contact-heading">
      <div className="card mx-auto flex max-w-2xl flex-col items-center gap-6 p-10 text-center">
        <h2 id="contact-heading" className="text-3xl font-semibold sm:text-4xl">
          Have a project or opportunity in mind?
        </h2>
        <p className="max-w-md text-ink-dim">
          I`m currently looking for remote junior or full-stack opportunities — feel free to reach out.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a href={`mailto:${links.email}`} className="btn-primary">
            Email Me
          </a>
          <a href={links.linkedin} target="_blank" rel="noreferrer" className="btn-secondary">
            LinkedIn
          </a>
          <a href={links.github} target="_blank" rel="noreferrer" className="btn-secondary">
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}