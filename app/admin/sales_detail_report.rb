ActiveAdmin.register Order, as: 'SalesDetailReport' do

# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#

index do
    selectable_column
    column :te_order_id
    column :create_date, as: "Order Date"
    column :event_home_team, as: "Home Team"
    column :event_away_team, as: "Away Team"
    column :event_date
    column :event_location, as: "Venue"
    column :ticket_section
    column :ticket_row
    column :client_name, as: "Customer Name"
    column :customer_email
    column :number_of_tickets
    column :sale_price_per_ticket
    column :ticket_total
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