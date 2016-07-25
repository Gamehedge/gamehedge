class Order < ActiveRecord::Base
	belongs_to :refund_status, class_name: "RefundStatus", foreign_key: "refund_status_id"
	
	def display_name
		return self.id
	end
	def customer_email
		return Php.unserialize(self.order_data)['buyer']['email_addresses'][0]['address']
	end
	def number_of_tickets
		return Php.unserialize(self.order_data)['items'][0]['quantity']
	end
	def sale_price_per_ticket
		return Php.unserialize(self.order_data)['items'][0]['price']
	end
	def ticket_total
		return Php.unserialize(self.order_data)['subtotal']
	end
	def broker_name
		return Php.unserialize(self.ticket_data)['office']['name']
	end
	def cost_per_ticket
		return Php.unserialize(self.order_data)['items'][0]['ticket_group']['wholesale_price']
	end
	def service_fee
		return Php.unserialize(self.order_data)['service_fee']
	end
	def shipping_fee
		return Php.unserialize(self.order_data)['shipping']
	end
	def order_total
		return Php.unserialize(self.order_data)['total']
	end
	def order_date
	    Time.zone = 'Eastern Time (US & Canada)'
	    return self.create_date
	end
	def event_date
	    Time.zone = 'UTC'
	    return self.real_event_date
	end
	# Filter for the order date in EST date 
	ransacker :order_date, type: :datetime,
	  	formatter: -> (date) { Time.zone = 'Eastern Time (US & Canada)'
	  		date.beginning_of_day } do |parent|
	  	parent.table[:create_date]
	end

	after_update :send_refund_mail
  
	def send_refund_mail
		if self.refund_status_id == 2
	    	OrderMailer.refund_email(self.id).deliver
	    end
	    #some data has been updated
	end
  
end