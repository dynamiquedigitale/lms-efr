<?= $this->extend(config('auth.views.layout')) ?>
<?= $this->section('title', lang('Auth.forgotPassword')) ?>
<?= $this->section('heading', __('Entrez  votre adresse e-mail et nous vous enverrons des instructions pour de réinitialiser votre mot de passe.')) ?>

<?= $this->section('content') ?>

<form class="auth-login-form" action="<?= route('magic-link') ?>" method="POST">
	<div class="mb-1">
		<label for="email" class="form-label"><?= lang('Auth.email') ?></label>
		<input type="email" <?= $this->class(['form-control', 'is-invalid' => $errors->has('email')]) ?> value="<?= old('email') ?>" id="email" name="email" placeholder="<?= __('Entrez votre adresse email pour récupérer votre mot de passe') ?>" tabindex="1" required autofocus />
		<span class="invalid-feedback"><?= $errors->line('email') ?></span>
	</div>
	<button class="btn btn-primary w-100" tabindex="2"><?= lang('Auth.send') ?></button>
</form>

<?= $this->stop() ?>

<?php $this->start('form-footer') ?>
	<p class="text-center mt-2">
		<a href="<?= route('login') ?>"> 
			<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg> 
			<?= lang('Auth.backToLogin') ?>
		</a>
	</p>
<?php $this->stop() ?>
