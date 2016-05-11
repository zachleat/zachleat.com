---
title: target="_blank"
author: Zach Leatherman
layout: page
---

{% raw %}
<?php
$referrer = $_SERVER[ "HTTP_REFERER" ];
$from = $_GET[ "from" ];
if( !empty( $referrer ) ) {
?>
	<p>It’s likely you’ve been redirected to this page by an improper use of <code>target="_blank"</code>. Nothing malicious has occurred here. This page is only intended to educate about the consequences of using <code>target="_blank"</code>. <a href="https://mathiasbynens.github.io/rel-noopener/"><strong>Learn more from Mathias Bynens.</strong></a></p>
	<p>You were redirected by <code><?php echo $referrer; ?></code></p>
<?php
	if( !empty( $from ) ) {
		?><p>You were taken from <code><?php echo urldecode( $from ); ?></code></p><?php
	}
?>
	<p class="enhanced-only">Go <a href="javascript:history.back()">back from whence you came</a>.</p>
	<p>A malicious attacker could very easily put up a fake version of the site you just came from. Always check the location bar and make sure the URL matches where you expect to be.</p>
<?php
	if( !empty( $from ) ) {
?>
	<div class="iframer fullwidth">
		<div class="iframe-cover"></div>
		<iframe class="iframe-big" src="<?php echo urldecode( $from ); ?>"></iframe>
	</div>
<?php
	}
} else {
?>
	<p>You came to this site directly. Nothing to see here.</p>
<?php
}
?>
<p>Please direct feedback about this page to <a href="https://twitter.com/zachleat">@zachleat on Twitter</a> or by opening a <a href="https://github.com/zachleat/zachleat.com/issues/new">new issue on the GitHub project</a> for this web site.</p>
{% endraw %}
<script>
// remove ?from=
if( "replaceState" in window.history ) {
	window.history.replaceState( {}, "", window.location.href.replace( /(\?.*)/, '' ) );
}
</script>