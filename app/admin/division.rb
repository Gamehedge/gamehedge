ActiveAdmin.register Division do

# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#
permit_params :id, :name, :description, :te_uid, :sport_id, :division_id, :image, :is_main_division
index :download_links => false do
  selectable_column
  column :id
  column :name
  column :description
  column :sport
  column :division
  column :is_main_division
  actions
  # ...
end
form multipart: true do |f|
    f.inputs "Sport details" do
      	f.input :name
      	f.input :description
      	f.input :sport_id, :as => :select, :collection => Sport.all
  		  f.input :division_id, :as => :select, :collection => Division.where(is_main_division: true)
      	f.input :image, :as => :file, required: false
      	f.input :is_main_division
    end
    f.actions
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