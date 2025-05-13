if(keyboard_check(vk_control) && keyboard_check_pressed(ord("S"))) {
	show_debug_message("Saving level...")
	screen_save("D:\\Desktop\\e-niguima-dudia\\enigmas\\" + text + ".png");
	//screen_save("D:\\Desktop\\e-niguima-dudia\\enigmas\\" + "today.png");
}