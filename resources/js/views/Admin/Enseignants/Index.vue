<template>
	<page-wrapper :title="$t('liste_des_enseignants')" :breadcrumb="[$t('enseignants')]">
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
				<app-button class="mt-1 mt-md-0" :text="$t('ajouter_un_enseignant')" icon="plus" @click.prevent="addEnseignant" />
			</b-card-header>

			<b-card-body>
				<app-empty-items v-if="!enseignants.total" :message="$t('aucun_enseignant_enregistre')" />
				<template v-else>
					<b-row class="gy-4 mb-4">
						<b-col cols="12" lg="4" md="6" v-for="enseignant in items" :key="enseignant.id">
							<user-card :user="enseignant" @show="showProfile(enseignant)" />
						</b-col>
					</b-row>
					  
					<app-pagination 
						v-model="filter.limit"
						:links="enseignants.links"
						:prev="enseignants.prev_page_url"
						:next="enseignants.next_page_url"
						:total="enseignants.total"
						:from="enseignants.from"
						:to="enseignants.to"
					/>
				</template>
			</b-card-body>
		</b-card>
	</page-wrapper>
	
	<app-modal id="user-dialog" v-model="openDialog" :title="modalTitle" :size="modalSize" no-footer @close="onCloseDialog">
		<form-enseignant v-if="openDialog && action != 'details'" :action="action" :item="item" @reset="closeDialog" @completed="refresh" />
		<details-enseignant v-else-if="openDialog && action == 'details'" :enseignant="item" />
	</app-modal>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'

import DetailsEnseignant from './Details.vue'
import FormEnseignant from './Form.vue'

import { $t } from '@/plugins/i18n'
import { handleSearch } from '@/utils/inertia'
import UserCard from '@/components/UserCard.vue'

defineOptions({ name: 'AdminListEnseignants' })

const props = defineProps({
  	enseignants: { required: true, type: Object },
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

const items = computed(() => props.enseignants.data) // Liste de tous les elements (enseignants)

const modalTitle = computed(() => {
    switch (action.value) {
        case 'create':
            return $t('ajouter_un_enseignant')
        case 'edit':
            return $t('edition_de_l_enseignant')
        default:
            return (item.value || {}).username || ''
    }
})
// eslint-disable-next-line @stylistic/js/no-extra-parens
const modalSize = computed(() => (action.value === 'details' ? 'xl' : 'lg'))

/**
 * Ouvre le formulaire d'ajout d'un enseignant
 */
function addEnseignant() {
    action.value = 'create'
    openDialog.value = true
}
/**
 * Ouvre la modale de details de l'enseignant
 */
function showProfile(enseignant) {
	item.value = enseignant
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
	handleSearch('admin.enseignants.index', {
		limit: limit || filter.limit,
		search: filter.search,
	})
}
</script>

<style>

</style>
