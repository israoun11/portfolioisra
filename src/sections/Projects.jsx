import SectionShell from '../components/SectionShell'
import ProjectCard from './ProjectCard'
import { featuredProjects } from '../data/projects'

export default function Projects() {
  return (
    <SectionShell id="projects" kicker="Selected work" title="Four projects, closely looked at.">
      <div>
        {featuredProjects.map((project, i) => (
          <ProjectCard key={project.repo} project={project} index={i} reverse={i % 2 === 1} />
        ))}
      </div>
    </SectionShell>
  )
}
