class AuthController < ApplicationController
  def login
  	if Client.find_by_email(params[:email]).valid_password?(params[:password])
  		response = "valid user"
  	else
  		response = "invalid user and password"
  	end
  	render json: {response: response, user: Client.find_by_email(params[:email])}
  end
  def get_user
  	if client_signed_in?
  		response = "user logged"
  	else
  		response = "not logged in"
  	end
  	render json: {response: response, user: current_client}
  end
  def send_password
  	user = Client.find_by_email(params[:email])
  	user.send_reset_password_instructions
  	render json: "sent"
  end
end
