ActiveAdmin.register AdminUser, as: 'UserPermission' do
  permit_params permissions_attributes:[:id,:name, :_destroy], admin_users_permissions_attributes:[:id,:admin_user_id,:permission_id, :_destroy]
  index do
    selectable_column
    id_column
    column :email
    actions
  end

  filter :permissions

  form do |f|
    f.inputs "Permissions" do
      f.has_many :admin_users_permissions, :allow_destroy => true do |s|
        s.input :permission
      end
    end
    f.actions
  end

end
