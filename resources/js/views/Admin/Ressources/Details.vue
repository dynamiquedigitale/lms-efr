<template>
	<b-tabs nav-class="tabs-line flex-nowrap">
		<b-tab active>
			<template #title><app-icon name="file" /><span class="align-middle ms-25">Details</span></template>
			
			<ressource-viewer :ressource="ressource" />
			<hr class="my-2" />
			<h6 class="file-manager-title my-2">{{ $t('informations') }}</h6>
			<ul class="list-unstyled">
				<li class="d-flex justify-content-between align-items-center">
					<p>{{ $t('fichier.type') }}</p>
					<p class="fw-bold">{{ ressource.ext }}</p>
				</li>
				<li class="d-flex justify-content-between align-items-center">
					<p>{{ $t('fichier.taille') }}</p>
					<p class="fw-bold">{{ ressource.sizeText }}</p>
				</li>
				<li class="d-flex justify-content-between align-items-center">
					<p>{{ $t('timestamps.added_at') }}</p>
					<p class="fw-bold">{{ $dayjs(ressource.created_at).format('DD MMMM YYYY') }}</p>
				</li>
			</ul>
			<div class="py-1 bg-light rounded-3" v-if="ressource.description !== '' && ressource.description !== null">
				<div class="container-fluid">{{ ressource.description }}</div>
			</div>
			
		</b-tab>
		<b-tab>
			<template #title><app-icon name="briefcase" /><span class="align-middle ms-25">{{ $t('parcours.title') }}</span></template>
			<p>I'm the second tab</p>
		</b-tab>
		<b-tab>
			<template #title><app-icon name="users" /><span class="align-middle ms-25">{{ $t('enseignants') }}</span></template>
			<p>I'm a disabled tab!</p>
		</b-tab>
	</b-tabs>
</template>

<script setup>
import RessourceViewer from '@/components/RessourceViewer.vue'

defineOptions({ name: 'DetailsRessource' })

const props = defineProps({
	ressource: { required: true, type: Object },
})
</script>

<style>

</style>
