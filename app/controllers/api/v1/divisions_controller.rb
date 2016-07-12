class Api::V1::DivisionsController < ApplicationApiController
  include ActionController::HttpAuthentication::Token::ControllerMethods
  include ActionController::MimeResponds
  TOKEN = "TokenHere"
  before_action :authenticate

  skip_before_filter :authenticate_user! # we do not need devise authentication here
  before_filter :fetch_user, :except => [:index, :create]

  def fetch_user
    @division = Division.find_by_id(params[:id])
  end

  def index
    if params[:data] == nil
      @divisions = Division.all
    else
      @divisions = Division.where(data_params)
    end
    respond_to do |format|
      format.json { render json: @divisions }
      format.xml { render xml: @divisions }
    end
  end

  def show
    respond_to do |format|
      format.json { render json: @division }
      format.xml { render xml: @division }
    end
  end

  def create
    @division = Division.new(data_params)
    @division.password = Devise.friendly_token
    respond_to do |format|
      if @division.save
        format.json { render json: @division, status: :created }
        format.xml { render xml: @division, status: :created }
      else
        format.json { render json: @division.errors, status: :unprocessable_entity }
        format.xml { render xml: @division.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @division.update_attributes(data_params)
        format.json { render json: @division, status: :ok }
        format.xml { render xml: @division, status: :ok }
      else
        format.json { render json: @division.errors, status: :unprocessable_entity }
        format.xml { render xml: @division.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    respond_to do |format|
      if @division == nil
        format.json { render json: {"message":"Division does not exist"}, status: :unprocessable_entity }
        format.xml { render xml: {"message":"Division does not exist"}, status: :unprocessable_entity }
      elsif @division.destroy
        format.json { render json: {"message":"Division deleted"}, head: :no_content,status: :ok }
        format.xml { render xml: {"message":"Division deleted"}, head: :no_content, status: :ok }
      else
        format.json { render json: @division.errors, status: :unprocessable_entity }
        format.xml { render xml: @division.errors, status: :unprocessable_entity }
      end
    end
  end

  def data_params
    params.require(:data).permit(:id, :modelo, :marca, :capacidad, :user_id)
  end

  private
    def authenticate
      authenticate_or_request_with_http_token do |token, options|
        # Compare the tokens in a time-constant manner, to mitigate
        # timing attacks.
        ActiveSupport::SecurityUtils.secure_compare(
          ::Digest::SHA256.hexdigest(token),
          ::Digest::SHA256.hexdigest(TOKEN)
        )
      end
    end
end