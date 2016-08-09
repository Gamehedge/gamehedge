class Api::V1::VenuesController < ApplicationApiController
  include ActionController::HttpAuthentication::Token::ControllerMethods
  include ActionController::MimeResponds
  TOKEN = "TokenHere"
  before_action :authenticate

  skip_before_filter :authenticate_user! # we do not need devise authentication here
  before_filter :fetch_user, :except => [:index, :create]

  def fetch_user
    @venue = Venue.find_by_id(params[:id])
  end

  def index
    if params == nil
      @venues = Venue.all
    else
      @venues = Venue.where(data_params)
    end
    respond_to do |format|
      format.json { render json: @venues.to_json(:only => [:id, :name, :address, :te_uid, :location, :url])}

      format.xml { render xml: @venues.to_json(:only => [:id, :name, :address, :te_uid, :location, :url])}
    end
  end

  def show
    respond_to do |format|
      format.json { render json: @venue.to_json(:only => [:id, :name, :address, :te_uid, :location, :url])}
      format.xml { render xml: @venue.to_json(:only => [:id, :name, :address, :te_uid, :location, :url])}
    end
  end

  def create
    @venue = Venue.new(data_params)
    @venue.password = Devise.friendly_token
    respond_to do |format|
      if @venue.save
        format.json { render json: @venue, status: :created }
        format.xml { render xml: @venue, status: :created }
      else
        format.json { render json: @venue.errors, status: :unprocessable_entity }
        format.xml { render xml: @venue.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @venue.update_attributes(data_params)
        format.json { render json: @venue, status: :ok }
        format.xml { render xml: @venue, status: :ok }
      else
        format.json { render json: @venue.errors, status: :unprocessable_entity }
        format.xml { render xml: @venue.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    respond_to do |format|
      if @venue == nil
        format.json { render json: {"message":"Venue does not exist"}, status: :unprocessable_entity }
        format.xml { render xml: {"message":"Venue does not exist"}, status: :unprocessable_entity }
      elsif @venue.destroy
        format.json { render json: {"message":"Venue deleted"}, head: :no_content,status: :ok }
        format.xml { render xml: {"message":"Venue deleted"}, head: :no_content, status: :ok }
      else
        format.json { render json: @venue.errors, status: :unprocessable_entity }
        format.xml { render xml: @venue.errors, status: :unprocessable_entity }
      end
    end
  end

  def data_params
    params.permit(:id, :name, :address, :te_uid, :location, :url)
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