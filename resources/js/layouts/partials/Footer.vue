<template>
	<footer class="footer footer-light">
		<p class="clearfix mb-0">
			<span class="float-md-start d-block d-md-inline-block mt-25">
				COPYRIGHT &copy; {{ $dayjs().format('YYYY') }}
				<a class="ms-25" href="" target="_blank">Dynamique Digital</a>
				<span class="d-none d-sm-inline-block">, Tous droits réservés</span>
			</span>
			<span class="small float-md-end d-none d-md-block">Powered by <a href="" target="_blank">Dimtrovich</a></span>
		</p>
	  </footer>
	  <button class="btn btn-primary btn-icon scroll-top" type="button"><i data-feather="arrow-up"></i></button> 
</template>

<script setup>
defineOptions({ name: 'AppFooter' })
</script>
