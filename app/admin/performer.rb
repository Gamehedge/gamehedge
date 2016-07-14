ActiveAdmin.register Performer do

# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#
#config.per_page = 1000
permit_params :id, :te_uid, :te_name, :te_slug, :image, :division_id, :sport_id
index do
    selectable_column
    
    column :te_uid
    column :te_name
    column :division
    column :sport
    actions
  end
#
# or
#
# permit_params do
#   permitted = [:permitted, :attributes]
#   permitted << :other if params[:action] == 'create' && current_user.admin?
#   permitted
# end


end