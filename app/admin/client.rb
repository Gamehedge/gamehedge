ActiveAdmin.register Client do

# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#
permit_params :name, :email, :password, :password_confirmation, :te_uid

index :download_links => false do
    selectable_column
    column :name
    column :email
    column ("TEVO Id")  { |client| client.te_uid }
    actions
end

form do |f|
    f.inputs "Client Details" do
      f.input :name
      f.input :email
      f.input :te_uid
      f.input :password
      f.input :password_confirmation
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