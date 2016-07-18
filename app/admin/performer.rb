ActiveAdmin.register Performer do

# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#
#config.per_page = 1000
permit_params :te_name, :te_slug, :image, :division_id, :sport_id
index :download_links => false do
    selectable_column
    column ("TEVO Id")  { |performer| performer.te_uid }
    column ("Name")  { |performer| performer.te_name }
    column ("Slug")  { |performer| performer.te_slug }
    column :division
    column :sport
    actions
end

form multipart: true do |f|
    f.inputs "Sport details" do
      	f.input :te_name
      	f.input :te_slug
      	f.input :division, :as => :select, :collection => Division.all
      	f.input :sport, :as => :select, :collection => Sport.all
      	f.input :image, :as => :file, required: false
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