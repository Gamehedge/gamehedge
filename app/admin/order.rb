ActiveAdmin.register Order do

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  permit_params :refund_status_id

 

  index :download_links => false do
    selectable_column
    column ("Order Id")  { |order| order.te_order_id }
    column :order_date
    column ("Customer Name")  { |order| order.client_name }
    column :event_name
    column :event_date_new
    column :refund_status
    column :order_status
    actions
    # ...
  end

  filter :order_date, label: 'Order Date Range', as: :date_range
  filter :te_order_id, label: 'Order Id'
  filter :event_name
  filter :order_status
  filter :refund_status_id
  filter :client_name, label: 'Customer Name'


  form do |f|
      f.inputs "Sport details" do
        	f.input :refund_status, :as => :select, :collection => RefundStatus.all
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