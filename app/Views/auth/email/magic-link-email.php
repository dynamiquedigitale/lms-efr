<?= $this->extend('\App\Views\auth\email\layout') ?>
<?= $this->section('title', lang('Auth.magicLinkSubject')) ?>

<?= $this->section('content') ?>

<p style="margin: 17px 0px 0px; letter-spacing: 0.56px; font-weight: 500;">
	Vous recevez cet e-mail car nous avons reçu une demande de réinitialisation de mot de passe pour votre compte.
</p>

<a href="<?= url_to('verify-magic-link', compact('token')) ?>" style="margin-top: 17px; color: #ffffff; font-size: 16px; font-family: Helvetica, Arial, sans-serif; text-decoration: none; border-radius: 6px; line-height: 20px; display: inline-block; font-weight: normal; white-space: nowrap; background-color: #0d6efd; padding: 8px 12px; border: 1px solid #0d6efd;">
	<?= lang('Auth.login') ?>
</a>

<p style="margin: 0; margin-top: 17px; font-weight: 500; letter-spacing: 0.56px;">
	Ce lien de réinitialisation du mot de passe expirera dans <?= config('auth.magic_link_lifetime') / 60 ?> minutes.
</p>
<p style="margin: 0; margin-top: 17px; font-weight: 500; letter-spacing: 0.56px;">
	Si vous n'avez pas demandé de réinitialisation de mot de passe, vous pouvez ignorer ce message.
</p>
<p style="margin: 0; margin-top: 17px; font-weight: 500; letter-spacing: 0.56px;">
	Cordialement, <br /> <?= config('app.name') ?>
</p>

<?= $this->stop() ?>
