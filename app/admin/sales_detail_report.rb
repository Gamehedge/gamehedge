ActiveAdmin.register Order, as: 'SalesDetailReport' do

# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#permit_params :id, :client_id, :client_name, :te_order_id, :event_name, :event_home_team, :event_away_team, :event_date, :event_location, :ticket_section, :ticket_row, :ticket_seats, :ticket_format, :total, :cost, :order_data, :ticket_data, :event_data, :home_team_data, :away_team_data, :refund_status, :create_date, :modified_date
menu :if => proc{ current_admin_user.permissions.where(:name => "Reports").any? }

config.clear_action_items!

index :download_links => [:csv] do
	selectable_column
    column ("Order Id")  { |order| order.te_order_id }
    column :order_date
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
    column :ticket_total
    column :order_status
end
filter :order_date, label: 'Order Date Range', as: :date_range
filter :real_event_date, label: 'Event Date Range'
filter :te_order_id, label: 'Order Id'
filter :event_name
filter :order_status
filter :event_home_team, label: 'Home Team'
filter :event_away_team, label: 'Away Team'
filter :event_location, label: 'Venue'
filter :client_name, label: 'Customer Name'

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
    column :ticket_total
    column :order_status
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