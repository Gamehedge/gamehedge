class Order < ActiveRecord::Base
	belongs_to :refund_status, class_name: "RefundStatus", foreign_key: "refund_status_id"
	
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

	after_update :send_refund_mail
  
	def send_refund_mail
		if self.refund_status_id == 2
	    	OrderMailer.refund_available(self.id).deliver
	    elsif self.refund_status_id == 3
	    	OrderMailer.refund_requested(self.id).deliver
	    end
	    #some data has been updated
	end
  
end