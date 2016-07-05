class Api::V1::EventsController < ApplicationApiController
  include ActionController::HttpAuthentication::Token::ControllerMethods
  include ActionController::MimeResponds
  TOKEN = "TokenHere"
  before_action :authenticate

  skip_before_filter :authenticate_user! # we do not need devise authentication here
  before_filter :fetch_user, :except => [:index, :create]

  def fetch_user
    @event = Event.find_by_id(params[:id])
  end

  def index
    if params[:data] == nil
      @events = Event.all
    else
      @events = Event.where(data_params)
    end
    respond_to do |format|
      format.json { render json: @events }
      format.xml { render xml: @events }
    end
  end

  def show
    respond_to do |format|
      format.json { render json: @event }
      format.xml { render xml: @event }
    end
  end

  def create
    @event = Event.new(data_params)
    @event.password = Devise.friendly_token
    respond_to do |format|
      if @event.save
        format.json { render json: @event, status: :created }
        format.xml { render xml: @event, status: :created }
      else
        format.json { render json: @event.errors, status: :unprocessable_entity }
        format.xml { render xml: @event.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @event.update_attributes(data_params)
        format.json { render json: @event, status: :ok }
        format.xml { render xml: @event, status: :ok }
      else
        format.json { render json: @event.errors, status: :unprocessable_entity }
        format.xml { render xml: @event.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    respond_to do |format|
      if @event == nil
        format.json { render json: {"message":"Event does not exist"}, status: :unprocessable_entity }
        format.xml { render xml: {"message":"Event does not exist"}, status: :unprocessable_entity }
      elsif @event.destroy
        format.json { render json: {"message":"Event deleted"}, head: :no_content,status: :ok }
        format.xml { render xml: {"message":"Event deleted"}, head: :no_content, status: :ok }
      else
        format.json { render json: @event.errors, status: :unprocessable_entity }
        format.xml { render xml: @event.errors, status: :unprocessable_entity }
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