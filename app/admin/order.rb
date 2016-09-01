ActiveAdmin.register Order do

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  permit_params :refund_status_id, :email

  menu :if => proc{ current_admin_user.permissions.where(:name => "Order").any? }

  index :download_links => false do
    selectable_column
    column ("Order Id")  { |order| order.te_order_id }
    column :order_date
    column ("Customer Name")  { |order| order.client_name }
    column :event_name
    column :event_date
    column :refund_status
    actions
    # ...
  end

  filter :order_date, label: 'Order Date Range', as: :date_range
  filter :te_order_id, label: 'Order Id'
  filter :event_name
  filter :order_status
  filter :refund_status_id, as: :select, collection: proc { RefundStatus.all }
  filter :client_name, label: 'Customer Name'

  batch_action :refund_status_to_not_available_on do |ids|
      Order.find(ids).each do |perf|
          perf.refund_status_id = 1
          perf.save
      end
      redirect_to collection_path, alert: "The Performers selected have been modified."
  end

  batch_action :refund_status_to_available_on do |ids|
      Order.find(ids).each do |perf|
          perf.refund_status_id = 2
          perf.save
      end
      redirect_to collection_path, alert: "The Performers selected have been modified."
  end

  batch_action :refund_status_to_requested_on do |ids|
      Order.find(ids).each do |perf|
          perf.refund_status_id = 3
          perf.save
      end
      redirect_to collection_path, alert: "The Performers selected have been modified."
  end

  batch_action :refund_status_to_pending_on do |ids|
      Order.find(ids).each do |perf|
          perf.refund_status_id = 4
          perf.save
      end
      redirect_to collection_path, alert: "The Performers selected have been modified."
  end

  batch_action :refund_status_to_refunded_on do |ids|
      Order.find(ids).each do |perf|
          perf.refund_status_id = 5
          perf.save
      end
      redirect_to collection_path, alert: "The Performers selected have been modified."
  end

  form do |f|
      f.inputs "Sport details" do
        	f.input :refund_status_id, :as => :select, :collection => RefundStatus.all
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