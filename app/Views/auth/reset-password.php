<?= $this->extend(config('auth.views.layout')) ?>
<?= $this->section('title', __('Reinitialisation du mot de passe')) ?>
<?= $this->section('heading', $message) ?>

<?= $this->section('content') ?>

<form class="auth-login-form" action="<?= route('reset-password') ?>" method="POST">
	<div class="mb-1">
		<label class="form-label" for="password"><?= __('Nouveau mot de passe') ?></label>
		<div class="input-group input-group-merge form-password-toggle">
			<input type="password" <?= $this->class(['form-control form-control-merge', 'is-invalid' => $errors->has('password')]) ?> id="password" name="password" placeholder="........" tabindex="1" autocomplete="off" required />
			<span onclick="togglePassword(this)" <?= $this->class(['input-group-text cursor-pointer', 'border border-start-0 border-danger' => $errors->has('password')]) ?>><i data-feather="eye"></i></span>
		</div>
		<span class="invalid-feedback d-inline"><?= $errors->line('password') ?></span>
	</div>
	<div class="mb-1">
		<label class="form-label" for="password_confirmation"><?= __('Nouveau mot de passe') ?></label>
		<div class="input-group input-group-merge form-password-toggle">
			<input type="password" <?= $this->class(['form-control form-control-merge', 'is-invalid' => $errors->has('password_confirmation')]) ?> id="password_confirmation" name="password_confirmation" placeholder="........" tabindex="2" autocomplete="off" required />
			<span onclick="togglePassword(this)" <?= $this->class(['input-group-text cursor-pointer', 'border border-start-0 border-danger' => $errors->has('password_confirmation')]) ?>><i data-feather="eye"></i></span>
		</div>
		<span class="invalid-feedback d-inline"><?= $errors->line('password_confirmation') ?></span>
	</div>
	<input type="hidden" name="isMagicLogin" value="<?= $isMagicLogin ?>">
	<button class="btn btn-primary w-100" tabindex="3"><?= __('Réinitialiser') ?></button>
</form>

<?= $this->stop() ?>

<?php $this->start('form-footer') ?>
	<p class="text-center mt-2">
		<a href="<?= route('logout') ?>" class="d-flex align-items-center justify-content-center"> 
			<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-power"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path><line x1="12" y1="2" x2="12" y2="12"></line></svg>
			&nbsp; <?= __('Se déconnecter') ?>
		</a>
	</p>
<?php $this->stop() ?>
