<template>
    <section id="featured" v-if="Articles.length || Project.length">
        <div class="content">
			<div class="articles">
				<div class="title">
					<h2 class="uppercase">
						Featured <br />
						<span class="glitch" data-text="ARTICLES">Articles</span>
					</h2>
					
					<NuxtLink to="/articles">
						<span class="inner">
							View all articles
						</span>
					</NuxtLink>
				</div>

				<div class="list" v-for="(article, i) in Articles" :key="i">
					<NuxtLink :to="`/article/${article.slug}`">
						<article>
							<div class="glitch-thumb">
								<div
									class="glitch-img"
									v-for="i in 5"
									:key="i"
									:style="`background-image: url('${getThumb(article)}')`"
								/>
							</div>
							<div class="details">
								<p :data-text="article.title">
									{{ article.title }}
									<span class="cursor"></span>
								</p>
								<div class="tags">
									<span v-for="(tag, j) in article.tags" :key="j">
									{{ tag.Tag_id.title }}
									</span>
								</div>
							</div>
						</article>
					</NuxtLink>
				</div>
			</div>

			<div class="projects">
				<div class="title">
					<h2 class="uppercase">
						Featured <br />
						<span class="glitch" data-text="PROJECTS">Projects</span>
					</h2>

					<NuxtLink to="/projects">
						<span class="inner">
							View all projects
						</span>
					</NuxtLink>
				</div>
				<div class="list" v-for="(project, i) in Project" :key="i">
					<NuxtLink :to="`/project/${project.slug}`">
						<article>
							<div class="glitch-thumb">
								<div
									class="glitch-img"
									v-for="i in 5"
									:key="i"
									:style="`background-image: url('${getThumb(project)}')`"
								/>
							</div>
							<div class="details">
								<p :data-text="project.title">
									{{ project.title }}
									<span class="cursor"></span>
								</p>
								<div class="tags">
									<span v-for="(tag, j) in project.tags" :key="j">
									{{ tag.Tag_id.title }}
									</span>
								</div>
							</div>
						</article>
					</NuxtLink>
				</div>
			</div>
		</div>
    </section>
</template>

<script setup lang="ts">

	const config = useRuntimeConfig()

	onMounted(() => {
		document.querySelectorAll('article').forEach((item) => {
			item.addEventListener('mouseover', (e) => {
				const target = e.target as HTMLDivElement
				const p = target.querySelector('p')
				if (p) p.classList.add('glitch')
			})

			item.addEventListener('mouseleave', (e) => {
				const target = e.target as HTMLDivElement
				const p = target.querySelector('p')
				if (p) p.classList.remove('glitch')
			})
		})
	})

	const getThumb = (item) => {
		return `${config.apiUrl}/assets/${item.illustration.id}?width=200&height=300&fit=cover`
	}

    const FeaturedArticles = await useAsyncData('articles', () => GqlFeaturedArticles());
    const { Articles } = FeaturedArticles.data.value

    const FeaturedProjects = await useAsyncData('projects', () => GqlFeaturedProjects())
    const { Project } = FeaturedProjects.data.value
</script>
