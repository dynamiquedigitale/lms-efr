<template>
	<div>
		<video-player
			v-if="ressource.type === 'video'"
			class="video-player vjs-big-play-centered w-100"
			:src="ressource.url"
			crossorigin="anonymous"
			playsinline
			controls
			:volume="1"
			:height="295"
			:playback-rates="[0.7, 1.0, 1.5, 2.0]"
		/>
		<audio-player
			v-if="ressource.type === 'audio'"
			:option="{
				src: ressource.url,
				title: ressource.nom,
				coverImage: $public('img/logo/english-for-real.png'),
			}"
			class="border rounded border-primary p-1 app-audio-player"
		/>
		<viewer 
			v-else-if="ressource.type === 'image'" 
			:images="[ressource.url]" class="viewer text-center" ref="viewer"
			:options="{
				title: (image, imageData) => `${image.alt} (${imageData.naturalWidth} × ${imageData.naturalHeight})`,
			}"
		>
			<template #default="scope">
				<b-img v-for="src in scope.images" :src="src" :key="src" :alt="ressource.nom" :height="295" class="cursor-pointer" />
			</template>
		</viewer>
	</div>
</template>
  
<script setup>
import 'video.js/dist/video-js.css'
import 'viewerjs/dist/viewer.css'
import 'vue3-audio-player/dist/style.css'
import AudioPlayer from 'vue3-audio-player'
import { VideoPlayer } from '@videojs-player/vue'
import { component as Viewer } from 'v-viewer'

import { computed } from 'vue'

defineOptions({ name: 'RessourceViewer' })
const props = defineProps({
	ressource: { required: true, type: Object },
})

const filename = computed(() => {
	const f = props.ressource.url.split('/')
	const last = f.pop()
	if (last) {
		return last
	}
	return `${props.ressource.nom}.${props.ressource.ext}`
})
</script>

<style>
.app-audio-player .audio__player-play-cont {
	display: flex !important; 
	justify-content: center !important;
	margin-bottom: 1.5em !important;
}
</style>
