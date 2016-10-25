class AuthController < ApplicationController
  def login
  	if Client.find_by_email(params[:email]).valid_password?(params[:password])
  		response = "valid user"
  	else
  		response = "invalid user and password"
  	end
  	render json: {response: response, user: Client.find_by_email(params[:email])}
  end
end
