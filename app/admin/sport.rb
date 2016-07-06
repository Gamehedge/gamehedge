ActiveAdmin.register Sport do

# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#
permit_params :id, :name, :description, :te_uid, :image

form multipart: true do |f|
    f.inputs "Sport details" do
      	f.input :name
      	f.input :description
      	f.input :te_uid
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