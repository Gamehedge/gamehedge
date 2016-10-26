class ContactController < ApplicationController
    def index
        require 'date'
        @year = Date.today.strftime("%Y")
        @leagueList = Sport.where(active: true)
        @divisions_menu = Division.all
        @performers_menu = Performer.all
    end
    def send_message
        ApplicationMailer.contact_message(params[:name], params[:email], params[:message]).deliver
        @message = Array.new
        @message.push("succesfully")
        render json: @message
    end
    
    def send_email_message
        ApplicationMailer.contact_email_message(params[:email]).deliver
        @message = Array.new
        @message.push("succesfully")
        render json: @message
    end
end
