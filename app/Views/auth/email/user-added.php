<?= $this->extend('\App\Views\auth\email\layout') ?>
<?= $this->section('title', __('Bienvenue chez English For Real')) ?>

<?= $this->section('content') ?>

<h3 style="margin: 17px 0px 0px; font-size: 16px; font-weight: 500;">
	Salut, <b><?= $user->username; ?></b>
</h3>
<p style="margin: 0; margin-top: 17px; font-weight: 500; letter-spacing: 0.56px;">
	Vous venez d'être ajouter sur la plateforme English For Real en tant que: <b><?= $user->role ?></b>.
</p>
<?php if ($user->type === \App\Enums\Role::APPRENANT): ?>
<p style="margin: 0; margin-top: 17px; font-weight: 500; letter-spacing: 0.56px;">
	Nous vous remercions pour l'interet que vous porter à l'apprentissage de la langue anglaise à travers notre équipe. 
</p>
<?php endif; ?>

<a href="<?= url_to('verify-magic-link', compact('token')) ?>" style="margin-top: 17px; color: #ffffff; font-size: 16px; font-family: Helvetica, Arial, sans-serif; text-decoration: none; border-radius: 6px; line-height: 20px; display: inline-block; font-weight: normal; white-space: nowrap; background-color: #0d6efd; padding: 8px 12px; border: 1px solid #0d6efd;">
	<?= lang('Auth.login') ?>
</a>

<?= $this->stop() ?>
