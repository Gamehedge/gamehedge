ActiveAdmin.register Player do

# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#
# permit_params :list, :of, :attributes, :on, :model
permit_params :name, :performer_id

index :download_links => false do
    selectable_column
    column :name
    column :performer
    column :url
    actions
end

form do |f|
      f.inputs "Performer details" do
        	f.input :name
        	f.input :performer_id, :as => :select, :collection => Performer.all.order(:te_name)
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
