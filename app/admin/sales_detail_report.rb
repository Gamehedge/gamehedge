ActiveAdmin.register Order, as: 'SalesDetailReport' do

# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#

index do
    selectable_column
    column :te_order_id
    column :create_date
    column :event_home_team
    column :event_away_team
    column :event_date
    column :real_event_date
    column :event_location
    column :ticket_section
    column :ticket_row
    column :client_name
    column :customer_email
    column :number_of_tickets
    column :sale_price_per_ticket
    column :ticket_total
end
filter :create_date
filter :real_event_date
#
# or
#
# permit_params do
#   permitted = [:permitted, :attributes]
#   permitted << :other if params[:action] == 'create' && current_user.admin?
#   permitted
# end


end