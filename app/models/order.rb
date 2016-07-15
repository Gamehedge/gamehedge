class Order < ActiveRecord::Base
	belongs_to :refund_stat, class_name: "RefundStatus", foreign_key: "refund_status_id"
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
	def order_status
		@connection = TicketEvolution::Connection.new({
		  	:token => '5bfd4b6110681d224a8c1fa6333f375f',       # => (required) The API token, used to identify you
		  	:secret => 'g3iR2RLeuzQA9vhDGfw5hRtGMnMDsimyOfQAJ4bi',      # => (required) The API secret, used to sign requests
		                      #               More info: [http://developer.ticketevolution.com/signature_tool](http://developer.ticketevolution.com/signature_tool))
		  	:version => 9,      # => (required) API version to use - the correct version at the time of this writing is 9
		  	:mode => :production,  # => (optional) Specifies the server environment to use Valid options: :production or :sandbox
		  	:logger => nil      # => (optional) Object to use for logging requests and
		                      #               responses. Any 'Logger' instance object
		                      #               is valid. EX: Logger.new('log/te_api.log')
		})
		@order = @connection.orders.show(self.te_order_id)
		return @order['state']
	end
end