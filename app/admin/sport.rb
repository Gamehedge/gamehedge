ActiveAdmin.register Sport do

# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#
permit_params :id, :name, :description, :te_uid, :image, :ggg, :active, :slug

index :download_links => false do
    selectable_column
    column :id
    column ("TEVO Id")  { |sport| sport.te_uid }
    column :name
    column :slug
    column :url
    column :active
    actions
end

form multipart: true do |f|
    f.inputs "Sport details" do
      	f.input :name
      	f.input :description
      	f.input :te_uid
        f.input :ggg
        f.input :slug
        f.input :url
        f.input :active
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