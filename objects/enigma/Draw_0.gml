draw_set_halign(fa_middle);
draw_set_valign(fa_middle);

var _y = y - 3/array_length(riddle)*(array_length(riddle)/2 - 1)*height;

for(var i = 0; i < array_length(riddle); i++) {
	var text = riddle[i];
	
	draw_text_transformed(x, _y, text,
							min(max_width, max_width*(string_width(text)/max_width_cmp))/string_width(text),
							(height+randomness[i])/((array_length(riddle)/3)*string_height(text)), angle);
	_y += height*3/array_length(riddle);
}