function client_dvm_initialize_filters_inputs(){console.log("client_dvm_initialize_filters_inputs")}function client_dvm_arg_filter(args_to_filter){is_static_map||(dvm_map_filter(args_to_filter),list_ticket_id_filtred=dvm_ticket_ids_by_filters(args_to_filter)),console.log(args_to_filter)}function client_dvm_reset_maps(init_filtre_vals){init_filtre_vals="undefined"==typeof init_filtre_vals||init_filtre_vals,init_filtre_vals&&client_dvm_initialize_filters_inputs(),is_static_map||(console.log("reseted"),dvm_reset_maps(init_filtre_vals))}function client_dvm_compare_tickets(arrray_of_tickets){client_dvm_initialize_filters_inputs(),is_static_map||dvm_compare_tickets(arrray_of_tickets)}