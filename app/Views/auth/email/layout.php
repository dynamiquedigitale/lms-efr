<!DOCTYPE html>
<html lang="<?= config('app.language', 'fr') ?>">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta name="x-apple-disable-message-reformatting">
    <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title><?= $this->show('title', true) ?> - <?= config('app.name') ?></title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet" />
</head>
<body style="margin: 0; font-family: 'Poppins', sans-serif; background: #ffffff; font-size: 14px;">
    <div style="max-width: 680px; margin: 0 auto; padding: 45px 30px 60px; background: #f4f7ff; background-image: url('https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661497957196_595865/email-template-background-banner'); background-repeat: no-repeat; background-size: 800px 452px; background-position: top center; font-size: 14px; color: #434343;">
      	<header>
			<table style="width: 100%">
          		<tbody>
					<tr style="height: 0">
              			<td><img alt="" src="<?= img_url('logo/english-for-real.png') ?>" height="50px" /></td>
              			<td style="text-align: right">
							<span style="font-size: 16px; line-height: 30px; color: #ffffff"><?= date('d F Y') ?></span>
            			</td>
            		</tr>
          		</tbody>
        	</table>
      	</header>

      	<main>
        	<div style="margin: 0; margin-top: 70px; padding: 92px 30px 115px; background: #ffffff; border-radius: 30px; text-align: center;">
          		<div style="width: 100%; max-width: 489px; margin: 0 auto">
            		<h1 style="margin: 0; font-size: 24px; font-weight: 500; color: #1f1f1f;"><?= $this->show('title') ?></h1>
            		<?= $this->renderView() ?>
          		</div>
 			</div>
        	<p style="max-width: 400px; margin: 0 auto; margin-top: 90px; text-align: center; font-weight: 500; color: #8c8c8c;">
          		Besoin d'aide ? Demandez  à <a href="mailto:<?= env('mail.support.address', 'support@english-for-real.com') ?>" style="color: #499fb6; text-decoration: none"><?= env('mail.support.address', 'support@english-for-real.com') ?></a>
          		ou visitez notre <a href="" target="_blank" style="color: #499fb6; text-decoration: none">Centre d'aide</a>
        	</p>
      	</main>

      	<footer style="width: 100%; max-width: 490px; margin: 20px auto 0; text-align: center; border-top: 1px solid #e6ebf1;">
        	<p style="margin: 0; margin-top: 40px; font-size: 16px; font-weight: 600; color: #434343;">
				<?= config('app.name') ?>
			</p>
        	<p style="margin: 0; margin-top: 8px; color: #434343">Adresse 540, Ville, etat</p>
        	<div style="margin: 0; margin-top: 16px">
          		<a href="" target="_blank" style="display: inline-block">
            		<img width="36px" src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661502815169_682499/email-template-icon-facebook" />
          		</a>
				<a href="" target="_blank" style="display: inline-block; margin-left: 8px">
					<img width="36px" src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661504218208_684135/email-template-icon-instagram" />
				</a>
          		<a href="" target="_blank" style="display: inline-block; margin-left: 8px">
            		<img width="36px" src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661503043040_372004/email-template-icon-twitter" />
          		</a>
          		<a href="" target="_blank" style="display: inline-block; margin-left: 8px">
            		<img width="36px" src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661503195931_210869/email-template-icon-youtube" />
				</a>
        	</div>
        	<p style="margin: 0; margin-top: 16px; color: #434343">
          		Copyright &copy; <?= date('Y') ?> <?= config('app.name') ?>. Tous droits réservés.
        	</p>
      	</footer>
    </div>
</body>
</html>
