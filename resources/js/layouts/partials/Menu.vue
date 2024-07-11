<template>
	<div class="main-menu menu-fixed menu-light menu-accordion menu-shadow" data-scroll-to-active="true">
		<div class="navbar-header">
		  	<ul class="nav navbar-nav flex-row">
				<li class="nav-item me-auto">
					<Link class="navbar-brand" :href="route('home')">
						<span class="brand-logo">
							<img :src="$public('img/logo/english-for-real.png')" />
						</span>
						<h2 class="brand-text">English For Real</h2>
			  		</Link>
				</li>
				<li class="nav-item nav-toggle">
					<a class="nav-link modern-nav-toggle pe-0" data-bs-toggle="collapse">
						<i class="d-block d-xl-none text-primary toggle-icon font-medium-4" data-feather="x"></i>
						<i class="d-none d-xl-block collapse-toggle-icon font-medium-4  text-primary" data-feather="disc" data-ticon="disc"></i>
					</a>
				</li>
		  	</ul>
		</div>
		<div class="shadow-bottom"></div>
		<div class="main-menu-content">
			<ul class="navigation navigation-main" id="main-menu-navigation" data-menu="menu-navigation">
				<li v-for="(item, i) in items" :class="liClass(item)" :key="i">
					<Link v-if="!item.hasSubmenu && !item.isDivider" class="d-flex align-items-center" :href="item.url">
						<i :data-feather="item.icon"></i>
						<span class="menu-title text-truncate">{{ $t(item.text) }}</span>
					</Link>
					<template v-else-if="item.isDivider">
						<span>{{ item.text }}</span>
						<i data-feather="more-horizontal"></i>
					</template>
					<template v-else>
						<a class="d-flex align-items-center" href="#">
							<i :data-feather="item.icon"></i>
							<span class="menu-title text-truncate">{{ $t(item.text) }}</span>
						</a>
						<ul class="menu-content">
							<li v-for="(menu, j) in item.submenu" :key="j">
								<Link class="d-flex align-items-center" :href="menu.url">
									<i data-feather="circle"></i>
									<span class="menu-item text-truncate">{{ $t(menu.text) }}</span>
								</Link>
							</li>
						</ul>
					</template>
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup>
defineOptions({ name: 'AppMenu' })

import { computed } from 'vue'
import { usePage } from '@inertiajs/inertia-vue3'

import menuAdmin from '@/data/menu.admin.js'

const user = computed(() => usePage().props.value.user)

const sidebarItems = computed(() => {
	if (user.value.group === 'admin') {
		return menuAdmin
	}
	return []
})

const items = computed(() => sidebarItems.value.map(elt => ({
	...elt,
	hasSubmenu: isObject(elt) && Array.isArray(elt.submenu),
	isDivider: isObject(elt) && elt.divider == true,
})).map(elt => {
	if (elt.route) {
		// eslint-disable-next-line no-undef
		elt.url = route(elt.route)
	}
	if (elt.hasSubmenu) {
		elt.submenu = elt.submenu.map(e => ({
			...e,
			// eslint-disable-next-line no-undef
			url: route(e.route),
		}))
	}

	return elt
}))

function isObject(obj) {
  	return Object.prototype.toString.call(obj) === '[object Object]'
}

function liClass(item) {
	if (item.isDivider) {
		return 'navigation-header'
	}
	
	const { url } = usePage()

	if (item.hasSubmenu)  {
		return `nav-item has-sub ${item.url === url.value ? 'sidebar-group-active open' : ''}`
	}

	return `nav-item ${item.url === url.value ? 'active' : ''}`
}
</script>
