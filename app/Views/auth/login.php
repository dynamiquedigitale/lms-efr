<?= $this->extend(config('auth.views.layout')) ?>
<?= $this->section('title', lang('Auth.login')) ?>
<?= $this->section('heading', __('Connectez-vous pour continuer à travailler')) ?>

<?= $this->section('content') ?>

<form class="auth-login-form" action="<?= route('login') ?>" method="POST">
	<div class="mb-1">
		<label for="login" class="form-label"><?= __('Email ou téléphone') ?></label>
		<input type="text" <?= $this->class(['form-control', 'is-invalid' => $errors->has('login')]) ?> value="<?= old('login') ?>" id="login" name="login" placeholder="<?= __('Entrez votre adresse email ou numéro de téléphone') ?>" tabindex="1" required autofocus />
		<span class="invalid-feedback"><?= $errors->line('login') ?></span>
	</div>
	<div class="mb-1">
		<div class="d-flex justify-content-between">
			<label class="form-label" for="password"><?= lang('Auth.password') ?></label>
			<a href="<?= route('magic-link') ?>"><small><?= lang('Auth.forgotPassword') ?></small></a>
		</div>
		<div class="input-group input-group-merge form-password-toggle">
			<input type="password" <?= $this->class(['form-control form-control-merge', 'is-invalid' => $errors->has('password')]) ?> id="password" name="password" placeholder="<?= __('Entrez votre mot de passe') ?>" tabindex="2" required />
			<span onclick="togglePassword(this)" <?= $this->class(['input-group-text cursor-pointer', 'border border-start-0 border-danger' => $errors->has('password')]) ?>><i data-feather="eye"></i></span>
		</div>
		<span class="invalid-feedback d-inline"><?= $errors->line('password') ?></span>
	</div>
	<?php if (config('auth.session.allow_remembering')): ?>
	<div class="mb-1">
		<div class="form-check">
			<input class="form-check-input" type="checkbox" id="remember-me" name="remember" tabindex="3" />
			<label class="form-check-label" for="remember-me"><?= lang('Auth.rememberMe') ?></label>
		</div>
	</div>
	<?php endif; ?>
	<button class="btn btn-primary w-100" tabindex="4"><?= lang('Auth.login') ?></button>
</form>

<?= $this->stop() ?>

<?php $this->start('form-footer'); if (config('auth.allow_registration')) : ?>
	<p class="text-center mt-2">
		<span><?= lang('Auth.needAccount') ?></span>
		<a href="<?= route('register') ?>"><span><?= lang('Auth.register') ?></span></a>
	</p>
<?php endif; $this->stop() ?>
