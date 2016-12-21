<?php
$fonts = array(
	"lato" => "lato-regular-webfont."
);
$formats = array(
	"woff" => "woff",
	"ttf" => "ttf",
	"svg" => "svg",
	"eot" => "eot"
);
// From HTML5Boilerplate
$headers = array(
	"woff" => "application/font-woff",
	"eot" => "application/vnd.ms-fontobject",
	"ttf" => "application/x-font-ttf",
	"otf" => "font/opentype",
	"svg" => "image/svg+xml"
);

// Configurations
$timeout = 10;
$font = "lato";
$format = "woff";
//

header( "Content-Type: " . $headers[ $format ] );

if( $timeout ) {
	sleep( $timeout );
}

echo file_get_contents( $fonts[ $font ] . $formats[ $format ] );