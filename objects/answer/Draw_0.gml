var _x = x - (length/2)*(sprite_get_width(spr_) + 10);
var _y = y;

draw_set_halign(fa_left);
draw_set_valign(fa_middle);

for (var i = 0; i < length; i++) {
	draw_sprite(spr_, 0, _x, _y);
	_x += sprite_get_width(spr_) + 10;
}