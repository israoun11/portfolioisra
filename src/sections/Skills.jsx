import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionShell from '../components/SectionShell'
import { skillGroups } from '../data/skills'

export default function Skills() {
  const [active, setActive] = useState(skillGroups[0].id)
  const activeGroup = skillGroups.find((g) => g.id === active)

  return (
    <SectionShell id="skills" kicker="The skill garden" title="A working stack, orbiting the sculpture.">
      <p className="mb-8 max-w-editorial text-sm text-charcoal/55">
        A few of these — React, Node.js, MongoDB, Three.js, AI APIs, Tailwind CSS, GitHub Actions —
        are also floating around the sculpture behind this page right now, labelled as you scroll
        through this section. The full list is below.
      </p>
      <div className="flex flex-wrap gap-3">
        {skillGroups.map((group) => (
          <button
            key={group.id}
            type="button"
            onClick={() => setActive(group.id)}
            data-cursor-hover
            className={`rounded-full border px-5 py-2.5 text-sm transition-colors duration-300 ${
              active === group.id
                ? 'border-burgundy bg-burgundy text-ivory'
                : 'border-charcoal/15 text-charcoal/70 hover:border-charcoal/40'
            }`}
          >
            {group.label}
          </button>
        ))}
      </div>

      <div className="relative mt-14 min-h-[240px] rounded-3xl border border-charcoal/10 bg-paper/60 p-8 md:p-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: [0.19, 1, 0.22, 1] }}
            className="flex flex-wrap gap-3"
          >
            {activeGroup.items.map((item, i) => (
              <motion.span
                key={item}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.035, duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
                whileHover={{ y: -4, scale: 1.04 }}
                className="cursor-default select-none rounded-full border border-charcoal/12 bg-ivory px-5 py-2.5 font-display text-base text-charcoal shadow-[0_1px_0_rgba(33,29,27,0.06)]"
                data-cursor-hover
              >
                {item}
              </motion.span>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </SectionShell>
  )
}
