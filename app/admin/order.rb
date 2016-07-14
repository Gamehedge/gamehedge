ActiveAdmin.register Order do

# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#
permit_params :refund_stat

index do
  selectable_column
  column :id
  column :create_date
  column :client_name
  column :event_name
  column :event_date
  column :refund_stat
  actions
  # ...
end
form do |f|
    f.inputs "Sport details" do
      	f.input :refund_stat, :as => :select, :collection => RefundStatus.all
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