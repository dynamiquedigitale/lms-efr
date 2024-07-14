<template>
	<b-card body-class="px-1 pb-0" class="card-profile p-1 pb-0 h-100 shadow-none border" :img-src="$public('img/picsum/25-600x300.jpg')" img-top>
		<div class="profile-image-wrapper">
			<div class="profile-image">
				<div class="avatar">
					<img :src="user.avatar" :alt="user.nom" />
					<span class="avatar-status-online" style="right: 5px; bottom: 5px"></span>
				</div>
			</div>
		</div>
		<h3 class="truncate text-truncate" v-b-tooltip.bottom="user.username">{{ `${user.username}` }}</h3>
		<h6 class="text-muted">{{ user.user_email }}</h6>
		<span class="badge badge-light-primary profile-badge">{{ user.matricule }}</span>
		<hr class="mb-2">
		
		<div class="d-flex justify-content-between align-items-center">
			<div>
				<h6 class="text-muted fw-bolder">{{ $t('Formations') }}</h6>
				<h3 class="mb-0">{{ user.parcours_count }}</h3>
			</div>
			<div>
				<h6 class="text-muted fw-bolder">{{ $t('Evaluations') }}</h6>
				<h3 class="mb-0">--</h3>
			</div>
		</div>


		<div class="mt-2 d-flex justify-content-center">
			<app-button text="Profil" variant="outline-primary" @click.prevent="emit('show')" />
			<div class="dropdown ms-1">
				<app-button variant="light" icon="more-horizontal" class="btn-icon btn-wave" data-bs-toggle="dropdown" text="" />
				<ul class="dropdown-menu dropdown-menu-end">
					<li>
						<a class="dropdown-item" href="#">Modifier</a>
					</li>
					<li>
						<a class="dropdown-item" href="#">Suprimer</a>
					</li>
				</ul>
			</div>
		</div>
	</b-card>
</template>

<script setup>
defineOptions({ name: 'UserCard' })
defineProps({
	user: { required: true, type: Object },
})

const emit = defineEmits(['show'])
</script>
