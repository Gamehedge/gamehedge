ActiveAdmin.register AdminUser do
  permit_params :email, :password, :password_confirmation, permissions_attributes:[:id,:name, :_destroy], admin_users_permissions_attributes:[:id,:admin_user_id,:permission_id, :_destroy]

  index do
    selectable_column
    id_column
    column :email
    column :current_sign_in_at
    column :sign_in_count
    column :created_at
    actions
  end

  filter :email
  filter :current_sign_in_at
  filter :sign_in_count
  filter :created_at

  form do |f|
    f.inputs "Admin Details" do
      f.input :email
      f.input :password
      f.input :password_confirmation
    end
    f.inputs "Permissions" do
      f.has_many :admin_users_permissions, :allow_destroy => true do |s|
        s.input :permission
      end
    end
    f.actions
  end

end
