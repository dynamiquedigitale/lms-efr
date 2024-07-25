<template>
	<page-wrapper :title="$t('liste_des_formations')" :breadcrumb="[$t('formations.title')]">
		<b-card no-body class="mb-4">
			<b-card-header class="d-flex flex-wrap justify-content-between">
				<b-row class="w-auto">
					<b-col cols="4">
						<app-select v-model="filter.limit" @update:model-value="(v) => { findItems(v) }" :options="[10, 20, 30, 50]" />
					</b-col>
					<b-col cols="8">
						<app-input-search v-model="filter.search" @keyup="findItems()" />
					</b-col>
				</b-row>
				<app-button class="mt-1 mt-md-0" :text="$t('ajouter_une_formation')" icon="plus" @click.prevent="addFormation" />
			</b-card-header>

			<b-card-body>
				<app-empty-items v-if="!formations.total" :message="$t('aucune_formation_enregistree')" />
				<template v-else>
					<b-row class="gy-6 mb-4">
						<b-col cols="12" lg="4" sm="6" v-for="formation in items" :key="formation.id">
							<b-card class="p-1 pb-0 h-100 border" no-body>
								<a href="">
									<b-img fluid :src="formation.cover_url" :alt="formation.intitule" class="rounded" />
								</a>
								<b-card-body class="p-1 pb-0">
									<div class="d-flex justify-content-between align-items-center mb-2">
										<span :class="`badge badge-light-${$statusVariant(formation.niveau)}`">{{ $t(`difficulte.${formation.niveau}`) }}</span>
										<span><b>{{ formation.lecons_count }}</b> {{ $t('lecons.title').toLowerCase() }}</span>
									</div>
									<a href="#" class="h5 d-block" style="height: 2.5em">{{ formation.intitule }}</a>
									<p class="mt-1" style="height: 3.5em">{{ formation.description }}</p>
									<div class="d-flex justify-content-center mt-1">
										<app-button :text="$t('details')" />
									</div>
								</b-card-body>
							</b-card>
						</b-col>
					</b-row>
					  
					<app-pagination 
						v-model="filter.limit"
						:links="formations.links"
						:prev="formations.prev_page_url"
						:next="formations.next_page_url"
						:total="formations.total"
						:from="formations.from"
						:to="formations.to"
					/>
				</template>
			</b-card-body>
		</b-card>
	</page-wrapper>
	
	<app-modal id="formation-dialog" v-model="openDialog" :title="modalTitle" :size="modalSize" no-footer @close="onCloseDialog">
		<form-formation v-if="openDialog && action != 'details'" :action="action" :item="item" @reset="closeDialog" @completed="closeDialog" />
		<details-formation v-else-if="openDialog && action == 'details'" :formation="item" />
	</app-modal>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'

import DetailsFormation from './Details.vue'
import FormFormation from './Form.vue'

import { $t } from '@/plugins/i18n'
import { handleSearch } from '@/utils/inertia'

defineOptions({ name: 'AdminListFormations' })

const props = defineProps({
  	formations: { required: true, type: Object },
})

const openDialog = ref(false)
// const loading = ref(true)
const action = ref(null)
const item = ref(null) // Element en cours de manipulation (notament pour l'edition)
// const itemId = ref(null) // Id de l'element en cours de manipulation (notament pour l'edition)

const filter = reactive({
	limit: 20,
	search: '',
})

const items = computed(() => props.formations.data) // Liste de tous les elements (formations)

const modalTitle = computed(() => {
    switch (action.value) {
        case 'create':
            return $t('ajouter_une_formation')
        case 'edit':
            return $t('edition_de_la_formation')
        default:
            return (item.value || {}).username || ''
    }
})
// eslint-disable-next-line @stylistic/js/no-extra-parens
const modalSize = computed(() => (action.value === 'details' ? 'xl' : 'lg'))

/**
 * Ouvre le formulaire d'ajout d'une formation
 */
function addFormation() {
    action.value = 'create'
    openDialog.value = true
}
/**
 * Ouvre la modale de details de la formation
 */
function showFormation(formation) {
	item.value = formation
	action.value = 'details'
    openDialog.value = true
}

/**
 * Provoque la fermeture de la modale
 */
 function closeDialog() {
    openDialog.value = false
    item.value = null
    action.value = null
}
/**
 * Lorsque la modale est effectivement fermee
 */
function onCloseDialog() {
    if (action.value === 'details') {
        refresh()
    }
}

/**
 * Refraichir la liste des beneficiaires apres une creation, suppression ou edition
 */
function refresh() {
    closeDialog()
    filter.search = ''
	findItems()
}


function findItems(limit){
	handleSearch('admin.formations.index', {
		limit: limit || filter.limit,
		search: filter.search,
	})
}
</script>

<style>

</style>
