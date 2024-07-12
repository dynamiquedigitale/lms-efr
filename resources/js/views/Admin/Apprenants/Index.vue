<template>
	<page-wrapper :title="$t('Liste des apprenants')" :breadcrumb="[$t('Apprenants')]">
		<b-card no-body class="mb-4">
			<b-card-header class="d-flex flex-wrap justify-content-between">
				<b-row class="w-auto">
					<b-col cols="3">
						<app-select v-model="filter.limit" @update:model-value="(v) => { findItem(v) }" :options="[10, 20, 30, 50]" />
					</b-col>
					<b-col cols="8">
						<b-input-group class="input-group-merge">
							<b-input-group-text><app-icon name="search" /></b-input-group-text>
							<b-form-input v-model="filter.search" @keyup="findItem()" :placeholder="$t('Rechercher')" />
						</b-input-group>
					</b-col>
				</b-row>
				<app-button class="mt-1 mt-md-0" :text="$t('Ajouter un apprenant')" icon="plus" />
			</b-card-header>

			<b-card-body>
				<app-empty-items v-if="!apprenants.total" :message="$t('Aucun apprenant enregistré')" />
				<template v-else>
					<b-row class="gy-4 mb-4">
						<b-col cols="12" lg="4" md="6" v-for="apprenant in items" :key="apprenant.id">
							<b-card body-class="px-1 pb-0" class="card-profile p-1 pb-0 h-100 shadow-none border" :img-src="$public('img/picsum/25-600x300.jpg')" img-top>
								<div class="profile-image-wrapper">
									<div class="profile-image">
										<div class="avatar">
											<img :src="apprenant.avatar" :alt="apprenant.nom" />
											<span class="avatar-status-online" style="right: 5px; bottom: 5px"></span>
										</div>
									</div>
								</div>
								<h3>{{ `${apprenant.prenom} ${apprenant.nom}` }}</h3>
								<h6 class="text-muted">{{ apprenant.user_email }}</h6>
								<span class="badge badge-light-primary profile-badge">{{ apprenant.matricule }}</span>
								<hr class="mb-2">
								
								<div class="d-flex justify-content-between align-items-center">
									<div>
										<h6 class="text-muted fw-bolder">{{ $t('Formations') }}</h6>
										<h3 class="mb-0">{{ apprenant.parcours_count }}</h3>
									</div>
									<div>
										<h6 class="text-muted fw-bolder">{{ $t('Evaluations') }}</h6>
										<h3 class="mb-0">--</h3>
									</div>
								</div>
	
								<app-button text="Profil" variant="outline-primary" class="mt-2" />
							</b-card>
						</b-col>
					</b-row>
					  
					<app-pagination 
						v-model="filter.limit"
						:links="apprenants.links"
						:prev="apprenants.prev_page_url"
						:next="apprenants.next_page_url"
						:total="apprenants.total"
						:from="apprenants.from"
						:to="apprenants.to"
					/>
				</template>
			</b-card-body>
		</b-card>
	</page-wrapper>
</template>

<script setup>
import { computed, reactive } from 'vue'

import { handleSearch } from '@/utils/inertia'

defineOptions({ name: 'AdminListApprenants' })

const props = defineProps({
  	apprenants: { required: true, type: Object },
})

const filter = reactive({
	limit: 20,
	search: '',
})

const items = computed(() => props.apprenants.data)

function findItem(limit){
	handleSearch('admin.apprenants.index', {
		limit: limit || filter.limit,
		search: filter.search,
	})
}
</script>

<style>

</style>
