if(keyboard_check(vk_control) && keyboard_check_pressed(ord("S"))) {
	show_debug_message("Saving level...")
	var dir = "D:\\Desktop\\e-niguima-dudia\\"
	screen_save(dir + "enigmas\\" + text + ".png");	
	//screen_save("D:\\Desktop\\e-niguima-dudia\\enigmas\\" + "today.png");
	
	var levels = "";
	if (file_exists(dir + "levels.json")) {
	    var file = file_text_open_read(dir + "levels.json");
	    while (!file_text_eof(file)) {
	        levels += file_text_read_string(file);
	    }
	    file_text_close(file);
	} else {
	    levels = "[]"; 
	}

	if((!string_pos("," + text + ",", levels)) && !(string_pos("," + text + "]", levels))) {
		levels = string_copy(levels, 1, string_length(levels) - 1) + "," + text + "]";

		var file_out = file_text_open_write(dir + "levels.json");
		file_text_write_string(file_out, levels);
		file_text_close(file_out);
	}
}