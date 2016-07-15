ActiveAdmin.register Order, as: 'SalesSummaryReport' do

# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#permit_params :id, :client_id, :client_name, :te_order_id, :event_name, :event_home_team, :event_away_team, :event_date, :event_location, :ticket_section, :ticket_row, :ticket_seats, :ticket_format, :total, :cost, :order_data, :ticket_data, :event_data, :home_team_data, :away_team_data, :refund_status, :create_date, :modified_date

index :download_links => [:csv] do
    selectable_column
    column ("Order Id")  { |order| order.te_order_id }
    column ("Order Date")  { |order| order.create_date }
    column :event_name
    column ("Home Team")  { |order| order.event_home_team }
    column ("Away Team")  { |order| order.event_away_team }
    column ("Event Date")  { |order| order.real_event_date }
    column ("Venue")  { |order| order.event_location }
    column ("Section")  { |order| order.ticket_section }
    column ("Row")  { |order| order.ticket_row }
    column ("Customer Name")  { |order| order.client_name }
    column :customer_email
    column :number_of_tickets
    column :sale_price_per_ticket
    column :service_fee
    column :shipping_fee
    column :total
    
end

filter :event_home_team, label: 'Home Team'
filter :event_location, label: 'Venue'
filter :create_date, label: 'Order Date Range'
filter :real_event_date, label: 'Event Date Range'


csv do 
	column ("Order Id")  { |order| order.te_order_id }
    column ("Order Date")  { |order| order.create_date }
    column :event_name
    column ("Home Team")  { |order| order.event_home_team }
    column ("Away Team")  { |order| order.event_away_team }
    column ("Event Date")  { |order| order.real_event_date }
    column ("Venue")  { |order| order.event_location }
    column ("Section")  { |order| order.ticket_section }
    column ("Row")  { |order| order.ticket_row }
    column ("Customer Name")  { |order| order.client_name }
    column :customer_email
    column :number_of_tickets
    column :sale_price_per_ticket
    column :service_fee
    column :shipping_fee
    column :total
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