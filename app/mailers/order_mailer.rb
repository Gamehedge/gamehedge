class OrderMailer < ApplicationMailer
	default from: "Gamehedge - Contact System <fabian@toro-labs.com>"
 
    def refund_email(_id)
        @order = Order.where(:id => _id).first
        @user = Client.where(:te_uid => @order.client_id).first
        mail(to: @user.email, subject: "Refund Available")
    end
end
