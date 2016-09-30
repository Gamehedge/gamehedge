//NOTE : YOU CAN USE YOUR "DVM_map_params" VALUES THAT YOU PUT IN YOUR PAGE LIKE YOUR EVENT_ID : DVM_map_params['event_id']

/** Initialize filters function
 * IMPORTANT : You should put into this function the code that initialize all the filters (qty, price...)
 */
function client_dvm_initialize_filters_inputs(){
    //####Example
    //$("#filter_qty").val('');         //Initialize Quantity Select
    //$("#filter_min_price").val('');   //Initialize min price Select
    //$("#filter_max_price").val('');   //Initialize max price Select
    //#############################
    
    //### Put your code here
    
    console.log("client_dvm_initialize_filters_inputs");
}

/** Filter map with given values
 * 
 * @param {Array} args_to_filter : Indexes to use : filter_qty,filter_min_price,filter_max_price, example : args_to_filter = {{'filter_qty':$('#filter_qty').val(),'filter_min_price':$('#filter_min_price').val(),'filter_max_price':$('#filter_max_price').val()}}
 */
function client_dvm_arg_filter(args_to_filter){
    //######################
    //### DONT'T TOUCH IT
    //### DISPLAYS JUST THE FILTERED SECTIONS IN THE MAP
    if(!is_static_map){
        dvm_map_filter(args_to_filter);
        //this is the list of ticket ids resulted by the given filter values
        //you can use it to browse filtered ticket ids
        list_ticket_id_filtred = dvm_ticket_ids_by_filters(args_to_filter);
    }
    
    //############################
    
    //### Put your code here
    //This is an example o how to show just filtered ticket sets
    /*if(list_ticket_id_filtred.length>0){
        //hide all
        $('#'+tickets_container+' .rowTicket').hide();
        for(var i in list_ticket_id_filtred){
            $('#'+tickets_container+' #'+list_ticket_id_filtred[i]).show();
        }
    }else{
        $('#'+tickets_container+' .rowTicket').show();
    }*/
    
}

/** reset map
 * 
 * @param {bool} init_filtre_vals : if true filtre inputs and selects are initialized with "client_dvm_initialize_filters_inputs" function
 */
function client_dvm_reset_maps(init_filtre_vals){
    //######################
    //### DONT'T TOUCH IT
    //init the input filter values or not
    init_filtre_vals = typeof init_filtre_vals !== 'undefined' ? init_filtre_vals : true;
    //initialize filters
    if(init_filtre_vals){
        client_dvm_initialize_filters_inputs();
    }
    //reset map
    if(!is_static_map){
        console.log("reseted")
        dvm_reset_maps(init_filtre_vals);
    }
    //######################
    
    //### Put your code here
}

/** compare tickets
 * 
 * @param {Array} arrray_of_tickets : the array of tickets to compare
 */
function client_dvm_compare_tickets(arrray_of_tickets){
    //######################
    //### DONT'T TOUCH IT
    client_dvm_initialize_filters_inputs();
    //#####################
    
    //### Put your code here
    
    //#####################
    
    //### DONT'T TOUCH IT
    if(!is_static_map){
        dvm_compare_tickets(arrray_of_tickets);
    }
    //###################
}
