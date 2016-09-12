class Api::V1::SportsController < ApplicationApiController
  include ActionController::HttpAuthentication::Token::ControllerMethods
  include ActionController::MimeResponds
  
  TOKEN = "TokenHere"
  before_action :authenticate

  skip_before_filter :authenticate_user! # we do not need devise authentication here
  before_filter :fetch_user, :except => [:index, :create]


  
  
  def fetch_user
    @sport = Sport.find_by_id(params[:id])
  end

  def index
    if params == nil
      @sports = Sport.all
    else
      @sports = Sport.where(data_params)
    end
    respond_to do |format|
      format.json { render json: @sports.to_json(:only => [:id, :name, :description, :te_uid, :url, :ggg, :slug, :active], :methods => [:image_url, :image_url_medium, :image_url_thumb])}
      format.xml { render xml: @sports.to_json(:only => [:id, :name, :description, :te_uid, :url, :ggg, :slug, :active], :methods => [:image_url, :image_url_medium, :image_url_thumb])}
    end
  end

  def show
    respond_to do |format|
      format.json { render json: @sport.to_json(:only => [:id, :name, :description, :te_uid, :url, :ggg, :slug, :active], :methods => [:image_url, :image_url_medium, :image_url_thumb])}
      format.xml { render xml: @sport.to_json(:only => [:id, :name, :description, :te_uid, :url, :ggg, :slug, :active], :methods => [:image_url, :image_url_medium, :image_url_thumb])}
    end
  end

  def create
    @sport = Sport.new(data_params)
    respond_to do |format|
      if @sport.save
        format.json { render json: @sport, status: :created }
        format.xml { render xml: @sport, status: :created }
      else
        format.json { render json: @sport.errors, status: :unprocessable_entity }
        format.xml { render xml: @sport.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @sport.update_attributes(data_params)
        format.json { render json: @sport, status: :ok }
        format.xml { render xml: @sport, status: :ok }
      else
        format.json { render json: @sport.errors, status: :unprocessable_entity }
        format.xml { render xml: @sport.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    respond_to do |format|
      if @sport == nil
        format.json { render json: {"message":"Sport does not exist"}, status: :unprocessable_entity }
        format.xml { render xml: {"message":"Sport does not exist"}, status: :unprocessable_entity }
      elsif @sport.destroy
        format.json { render json: {"message":"Sport deleted"}, head: :no_content,status: :ok }
        format.xml { render xml: {"message":"Sport deleted"}, head: :no_content, status: :ok }
      else
        format.json { render json: @sport.errors, status: :unprocessable_entity }
        format.xml { render xml: @sport.errors, status: :unprocessable_entity }
      end
    end
  end

  def data_params
    params.permit(:id, :name, :description, :te_uid, :image, :ggg, :active, :slug)
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