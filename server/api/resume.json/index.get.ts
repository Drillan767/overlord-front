import yaml from 'js-yaml'
import { readFileSync } from 'fs'
import { resolve } from 'path'

export default defineEventHandler(async () => {
  const resumePath = resolve(process.cwd(), 'assets/resume.yml')
  const resumeContent = readFileSync(resumePath, 'utf8')
  const jsonResume = yaml.load(resumeContent)

  return jsonResume
})