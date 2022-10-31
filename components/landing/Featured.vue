<template>
    <section id="featured" v-if="Articles.length || Project.length">
        <div class="content">
			<div class="articles">
				<div class="title">
					<h2 class="uppercase">
						Featured <br />
						<span class="glitch" data-text="ARTICLES">Articles</span>
					</h2>
					
					<Button
                        type="link"
                        link="/articles"
                        content="View all articles"
                    />
				</div>

				<div class="list" v-for="(article, i) in Articles" :key="i">
					<ItemThumbnail item-type="article" :item="article" />
				</div>
			</div>

			<div class="projects">
				<div class="title">
					<h2 class="uppercase">
						Featured <br />
						<span class="glitch" data-text="PROJECTS">Projects</span>
					</h2>

					<Button
                        type="link"
                        link="/projects"
                        content="View all projects"
                    />
				</div>
				<div class="list" v-for="(project, i) in Project" :key="i">
					<ItemThumbnail item-type="project" :item="project" />
				</div>
			</div>
		</div>
    </section>
</template>

<script setup lang="ts">
    import ItemThumbnail from '../content/ItemThumbnail.vue';
import Button from '../layout/Button.vue';

	const config = useRuntimeConfig()

	const gqlHeaders = {
		filter: {
			featured: {_eq: true},
			status: {_eq: 'published'}
		},
		limit: 3
	}

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

	const { data: FeaturedArticles } = await useAsyncGql('Articles', gqlHeaders)
    const { Articles } = FeaturedArticles.value

	const { data: FeaturedProjects } = await useAsyncGql('Projects', gqlHeaders)
    const { Project } = FeaturedProjects.value
</script>
