class Order < ActiveRecord::Base
	belongs_to :refund_status, class_name: "RefundStatus", foreign_key: "refund_status_id"
	belongs_to :sport
	
	def display_name
		return self.id
	end
	def order_date
	    Time.zone = 'Eastern Time (US & Canada)'
	    return self.created_at
	end
	def r_event_date
	    Time.zone = 'UTC'
	    return self.real_event_date
	end
	# Filter for the order date in EST date 
	ransacker :order_date, type: :datetime,
	  	formatter: -> (date) { Time.zone = 'Eastern Time (US & Canada)'
	  		date.beginning_of_day } do |parent|
	  	parent.table[:created_at]
	end
  
end