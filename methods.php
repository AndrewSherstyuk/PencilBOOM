<?php 

function image_width($file) {
	$desc = array();
	$desc = getimagesize($file);
	print_r($desc['3']);
}