class ContactController < ApplicationController
    def send_message
        ApplicationMailer.contact_message(params[:name], params[:email], params[:message]).deliver
        @message = Array.new
        @message.push("succesfully")
        render json: @message
    end
end
