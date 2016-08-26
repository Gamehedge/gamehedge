ActiveAdmin.register ServiceFee do

permit_params :id, :minimum_amount, :fee_amount, :description

index :download_links => false do
    selectable_column
    column :description
    column ("If order is at least...")  { |service_fee| service_fee.minimum_amount }
    column ("Add fee amount...")  { |service_fee| service_fee.fee_amount }
    actions
end
# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#
# permit_params :list, :of, :attributes, :on, :model
#
# or
#
# permit_params do
#   permitted = [:permitted, :attributes]
#   permitted << :other if params[:action] == 'create' && current_user.admin?
#   permitted
# end


end
