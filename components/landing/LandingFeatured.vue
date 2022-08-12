<template>
    <section id="featured">
        <div class="articles">
            <h2 class="uppercase text-white">
                Featured <br />
                <span class="glitch" data-text="ARTICLES">Articles</span>
            </h2>

			<div class="list"> <!-- v-for="(article, i) in articlesData" :key="i" -->
				<NuxtLink to="/article/article-de-type-test-absolument-fabuleux">
					<article>
						<div class="glitch-thumb">
							<div
								class="glitch-img"
								v-for="i in 5"
								:key="i"
								style="background-image:url('https://api.josephlevarato.me/assets/c863148c-f73c-46b9-9363-18957211d112?width=200&height=300&fit=cover')"
							/>
						</div>
						<div class="details">
							<p>Article de type test absolument fabuleux</p>
							<div class="tags">
								<span>PHP</span>
								<span>Laravel</span>
								<span>CI/CD</span>
							</div>
						</div>
					</article>
					
				</NuxtLink>
				<NuxtLink to="/article/article-de-type-test-absolument-fabuleux">
					<article>
						<div class="glitch-thumb">
							<div class="glitch-img"></div>
							<div class="glitch-img"></div>
							<div class="glitch-img"></div>
							<div class="glitch-img"></div>
							<div class="glitch-img"></div>
						</div>
                        
						<p>Article de type test absolument fabuleux</p>
						<div class="tags">
							<span>PHP</span>
							<span>Laravel</span>
							<span>CI/CD</span>
						</div>
					</article>
					
				</NuxtLink>
			</div>
<!--
            <div class="list" v-for="(article, i) in articlesData" :key="i">
                <pre class="text-white">
                    <code>
                        {{ article }}
                    </code>
                </pre>
            </div>
        </div>
        https://api.josephlevarato.me/assets/c863148c-f73c-46b9-9363-18957211d112?width=200&height=300&fit=cover
-->
        <!--
        <div class="articles" v-for="(article, i) in articlesData" >
            <pre>
                <code>
                    {{ article }}
                </code>
            </pre>

        </div>

        <div class="projects" v-for="(project, i) in projectsData" >
            <pre>
                <code>
                    {{ project }}
                </code>
            </pre>
        </div>
-->
		</div>
    </section>
</template>

<script setup lang="ts">
    const FeaturedArticles = await useAsyncData('articles', () => GqlFeaturedArticles());
    const { Articles } = FeaturedArticles.data.value

    const FeaturedProjects = await useAsyncData('projects', () => GqlFeaturedProjects())
    const { Project } = FeaturedProjects.data.value
</script>