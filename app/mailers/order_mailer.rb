class OrderMailer < ApplicationMailer
	default from: "Gamehedge - Contact System <edgar@toro-labs.com>"
 
    def refund_available(_id)
        @order = Order.where(:id => _id).first
        @user = Client.where(:te_uid => @order.client_id).first
        mail(to: @user.email, subject: "Refund Available")
    end

    def refund_requested(_id)
        @order = Order.where(:id => _id).first
        @user = Client.where(:te_uid => @order.client_id).first
        mail(to: 'support@gamehedge.com', subject: "Refund Requested")
    end

end
