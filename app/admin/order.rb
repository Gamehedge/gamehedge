ActiveAdmin.register Order do

# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#
permit_params :id, :client_id, :client_name, :te_order_id, :event_name, :event_home_team, :event_away_team, :event_date, :event_location, :ticket_section, :ticket_row, :ticket_seats, :ticket_format, :total, :cost, :order_data, :ticket_data, :event_data, :home_team_data, :away_team_data, :refund_status, :create_date, :modified_date
#
# or
#
# permit_params do
#   permitted = [:permitted, :attributes]
#   permitted << :other if params[:action] == 'create' && current_user.admin?
#   permitted
# end


end